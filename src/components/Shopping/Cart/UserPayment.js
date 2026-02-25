import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPaypal,
  FaArrowLeft,
  FaExclamationTriangle,
  FaPlus,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CarritoContext } from "../../../services/carritoProvider";
import { FaRegCreditCard } from "react-icons/fa6";
import Modal from "react-modal";
import ActionButton from "../../General/ActionButton";
import { motion, AnimatePresence } from "framer-motion";

const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "600px",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    border: "none",
    backgroundColor: "#FFFAF5",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(4px)",
  },
};

Modal.setAppElement("#root");

/* =========================
   DEMO: Direcciones SprintCore Ecuador
   ========================= */
const DEMO_ADDRESSES = [
  {
    addressId: "addr-sc-quito",
    addressLine: "Av. República y Diego de Almagro (Oficina SprintCore)",
    postalCode: "170102",
    city: "Quito",
    state: "Pichincha",
    country: "Ecuador",
    isDefault: true,
  },
  {
    addressId: "addr-sc-gye",
    addressLine: "Av. Francisco de Orellana, Edif. Empresarial (Sucursal)",
    postalCode: "090150",
    city: "Guayaquil",
    state: "Guayas",
    country: "Ecuador",
    isDefault: false,
  },
];

const lsKeyAddresses = "demo_addresses_sprintcore";
const genId = (prefix = "id") =>
  `${prefix}-${Math.random().toString(16).slice(2)}-${Date.now().toString(16)}`;

const safeLoadAddresses = () => {
  try {
    const raw = localStorage.getItem(lsKeyAddresses);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
};

const saveAddresses = (arr) => {
  try {
    localStorage.setItem(lsKeyAddresses, JSON.stringify(arr));
  } catch {}
};

const PayMethod = () => {
  const navigate = useNavigate();
  const { carrito, vaciarCarrito } = useContext(CarritoContext);

  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [newAddress, setNewAddress] = useState({
    addressLine: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
  });

  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const calcularTotal = () => {
    return carrito
      .reduce(
        (total, producto) => total + producto.precio * producto.cantidad,
        0
      )
      .toFixed(2);
  };

  const handleBackToCart = () => {
    navigate("/cart");
  };

  useEffect(() => {
    // DEMO: cargar direcciones desde localStorage o fallback a SprintCore quemado
    setLoadingAddresses(true);

    const t = setTimeout(() => {
      const cached = safeLoadAddresses();
      const initial = cached?.length ? cached : DEMO_ADDRESSES;

      setAddresses(initial);

      // Selecciona la primera por defecto o la que tenga isDefault
      const preferred =
        initial.find((a) => a.isDefault) || (initial.length ? initial[0] : null);

      setSelectedAddress(preferred);
      setLoadingAddresses(false);
    }, 450);

    return () => clearTimeout(t);
  }, []);

  const handlePayWithPaypal = async () => {
    if (!selectedAddress) {
      toast.error("⚠️ Debes seleccionar una dirección antes de pagar.");
      return;
    }

    if (!carrito?.length) {
      toast.error("Tu carrito está vacío.");
      return;
    }

    setLoading(true);
    try {
      const total = calcularTotal();

      // DEMO: orderData coherente
      const orderData = {
        orderId: `SC-ORD-${new Date().getFullYear()}-${Math.floor(
          Math.random() * 10000
        )
          .toString()
          .padStart(4, "0")}`,
        date: { _seconds: Math.floor(Date.now() / 1000) },
        total: Number(total),
        items: carrito.map((item) => ({
          productId: item.id,
          name: item.nombre,
          price: item.precio,
          quantity: item.cantidad,
          slug: item.slug,
          image: item.image, // si existe
        })),
        status: "Pending",
        paymentMethod: "PayPal",
        shippingAddress: selectedAddress,
        merchant: {
          name: "SprintCore Ecuador",
          email: "sprintcoreec@gmail.com",
          country: "Ecuador",
        },
      };

      // DEMO: “crear orden” (solo localStorage)
      toast.success("Pedido creado con éxito (DEMO)");

      vaciarCarrito();
      localStorage.setItem("purchaseConfirmed", Date.now().toString());
      localStorage.setItem("orderDetails", JSON.stringify(orderData));

      setPaymentSuccess(true);

      setTimeout(() => {
        navigate("/payment-confirmation");
      }, 1600);

      // limpieza
      setTimeout(() => {
        localStorage.removeItem("purchaseConfirmed");
        localStorage.removeItem("orderDetails");
      }, 120000);
    } catch (error) {
      console.error(error);
      toast.error("Error al procesar el pedido");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async () => {
    if (
      !newAddress.addressLine ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.country ||
      !newAddress.postalCode
    ) {
      toast.error("Todos los campos de dirección son obligatorios.");
      return;
    }

    try {
      const newAddressData = {
        ...newAddress,
        addressId: genId("addr"),
        isDefault: addresses.length === 0,
      };

      const updated = [...addresses, newAddressData];
      setAddresses(updated);
      setSelectedAddress(newAddressData);
      saveAddresses(updated);

      setShowAddressModal(false);
      setNewAddress({
        addressLine: "",
        postalCode: "",
        city: "",
        state: "",
        country: "",
      });

      toast.success("Dirección agregada correctamente (DEMO)");
    } catch (error) {
      console.error("Error en handleAddAddress:", error);
      toast.error("Error al agregar la dirección");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col min-h-screen pt-[6rem] overflow-hidden items-center w-full px-4 md:px-0 bg-bg2"
    >
      <AnimatePresence>
        {loadingAddresses && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="flex flex-col items-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-12 h-12 border-4 border-icons border-t-transparent rounded-full"
              ></motion.div>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-white"
              >
                Cargando direcciones...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-3xl">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBackToCart}
            className="p-2 bg-white rounded-full shadow-md hover:bg-title hover:text-white transition-all duration-300 flex items-center justify-center mr-4"
          >
            <FaArrowLeft className="h-5 w-5" />
          </motion.button>

          <h1 className="text-3xl font-bold text-title">Método de pago</h1>
        </motion.div>

        {/* Direcciones */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-box rounded-xl shadow-lg p-6 mb-6 border border-lines"
        >
          <h2 className="text-xl font-semibold mb-4 text-title">
            Selecciona una dirección de entrega
          </h2>

          {addresses.length > 0 ? (
            <div className="space-y-3">
              {addresses.map((address, index) => (
                <motion.div
                  key={address.addressId || address.addressLine || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <label
                    className={`block p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedAddress?.addressId === address.addressId ||
                      selectedAddress?.addressLine === address.addressLine
                        ? "border-button bg-button-off shadow-md"
                        : "border-lines hover:border-icons"
                    }`}
                    onClick={() => setSelectedAddress(address)}
                  >
                    <input
                      type="radio"
                      name="address"
                      className="hidden"
                      checked={
                        selectedAddress?.addressId === address.addressId ||
                        selectedAddress?.addressLine === address.addressLine
                      }
                      readOnly
                    />
                    <div className="text-content">
                      <p className="font-medium">{address.addressLine}</p>
                      <p className="text-sm">
                        {address.city}, {address.state}, {address.country}
                      </p>
                      <p className="text-sm">
                        Código Postal: {address.postalCode}
                      </p>
                    </div>
                  </label>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start bg-button-off text-title border-l-4 border-icons p-4 rounded-lg mb-6"
            >
              <FaExclamationTriangle className="text-2xl text-icons flex-shrink-0 mt-1" />
              <div className="ml-3">
                <h2 className="font-semibold text-lg">Dirección Requerida</h2>
                <p className="text-sm text-content">
                  Debes agregar una dirección de entrega antes de realizar tu
                  pedido.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowAddressModal(true)}
                  className="mt-3 bg-button hover:bg-button-on text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center"
                >
                  <FaPlus className="mr-2" />
                  Agregar Dirección
                </motion.button>
              </div>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddressModal(true)}
            className="mt-4 w-full py-2 border-2 border-dashed border-lines rounded-lg text-content hover:border-icons hover:text-title transition-all duration-300 flex items-center justify-center"
          >
            <FaPlus className="mr-2" />
            Agregar nueva dirección
          </motion.button>
        </motion.div>

        {/* Resumen */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-box rounded-xl shadow-lg p-6 mb-6 border border-lines"
        >
          <h2 className="text-xl font-semibold mb-4 text-title">
            Resumen del pedido
          </h2>

          <div className="space-y-3 mb-4">
            {carrito.map((producto, index) => (
              <motion.div
                key={producto.id || producto.slug || index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
                className="flex justify-between items-center py-2 border-b border-lines last:border-0"
              >
                <span className="text-content">
                  {producto.nombre}{" "}
                  <span className="text-sm text-subtitle">
                    x{producto.cantidad}
                  </span>
                </span>
                <span className="font-medium text-title">
                  ${(producto.precio * producto.cantidad).toFixed(2)}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-lines pt-4 mb-6">
            <div className="flex justify-between font-semibold text-lg text-title">
              <span>Total</span>
              <span>${calcularTotal()}</span>
            </div>
          </div>
        </motion.div>

        {/* Métodos de pago */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-box rounded-xl shadow-lg p-6 mb-10 border border-lines"
        >
          <h2 className="text-xl font-semibold mb-4 text-title">
            Métodos de pago
          </h2>

          <motion.div
            whileHover={{ y: -2 }}
            className="border rounded-xl p-4 mb-4 cursor-pointer border-icons bg-box transition-all shadow-sm hover:shadow-md"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-4">
                <FaPaypal className="text-3xl text-blue-500" />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">PayPal</h3>
                <p className="text-sm text-content">
                  Paga de forma segura con tu cuenta de PayPal
                </p>
              </div>
              <div className="flex-shrink-0">
                <input
                  type="radio"
                  name="payment-method"
                  className="form-radio h-5 w-5 text-blue-500"
                  defaultChecked
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            className="border rounded-xl p-4 cursor-not-allowed bg-box opacity-70 transition-all"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-4">
                <div className="bg-gray-200 rounded-full p-2 flex items-center justify-center">
                  <FaRegCreditCard className="text-3xl text-icons-off" />
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">Tarjeta de crédito/débito</h3>
                <p className="text-sm text-content">Deshabilitado para Demo</p>
              </div>
              <div className="flex-shrink-0">
                <input
                  type="radio"
                  name="payment-method"
                  className="form-radio h-5 w-5 text-gray-400"
                  disabled
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mt-6"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <ActionButton
              onClick={handlePayWithPaypal}
              variant="right"
              disabled={loading || paymentSuccess || !selectedAddress}
              className={`w-full py-3 rounded-xl transition-all duration-300 flex items-center justify-center ${
                loading || paymentSuccess || !selectedAddress
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-button hover:bg-button-on shadow-md hover:shadow-lg"
              }`}
            >
              {loading ? (
                <div className="flex flex-row items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Procesando...
                </div>
              ) : (
                <div className="flex flex-row items-center">
                  <FaPaypal className="mr-2 text-xl" />
                  Pagar con PayPal
                </div>
              )}
            </ActionButton>
          </motion.div>
        </motion.div>

        {/* Modal Agregar Dirección */}
        <Modal
          isOpen={showAddressModal}
          onRequestClose={() => setShowAddressModal(false)}
          style={customModalStyles}
          contentLabel="Agregar Dirección"
          closeTimeoutMS={200}
        >
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-bold mb-6 text-title">
              Agregar Dirección
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-content mb-1">
                  Dirección
                </label>
                <input
                  type="text"
                  placeholder="Ej. Calle 123, Av. Principal"
                  value={newAddress.addressLine}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, addressLine: e.target.value })
                  }
                  className="w-full border border-lines rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-icons-on focus:border-transparent transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-content mb-1">
                    Código Postal
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. 170102"
                    value={newAddress.postalCode}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, postalCode: e.target.value })
                    }
                    className="w-full border border-lines rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-icons-on focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-content mb-1">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Quito"
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                    className="w-full border border-lines rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-icons-on focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-content mb-1">
                    Estado/Provincia
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Pichincha"
                    value={newAddress.state}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, state: e.target.value })
                    }
                    className="w-full border border-lines rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-icons-on focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-content mb-1">
                    País
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Ecuador"
                    value={newAddress.country}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, country: e.target.value })
                    }
                    className="w-full border border-lines rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-icons-on focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowAddressModal(false)}
                className="px-5 py-2 border border-lines rounded-lg text-content hover:bg-gray-100 transition-all"
              >
                Cancelar
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAddAddress}
                className="px-5 py-2 bg-button text-white rounded-lg hover:bg-button-on transition-all shadow-md"
              >
                Guardar Dirección
              </motion.button>
            </div>
          </motion.div>
        </Modal>
      </div>

      <ToastContainer />
    </motion.div>
  );
};

export default PayMethod;
