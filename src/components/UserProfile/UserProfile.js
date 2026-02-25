import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import ActionButton from "../General/ActionButton";
import perfil from "../../assets/perfil.jpeg";
import { FaRegUser, FaHistory, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineDirections } from "react-icons/md";
import { BsCreditCard } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GoLock } from "react-icons/go";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

Modal.setAppElement("#root");

/* =========================
   DEMO DATA (SprintCore Ecuador)
   ========================= */

const DEMO_PROFILE = {
  name: "SprintCore",
  lastName: "Ecuador",
  email: "demo@sprintcore.ec",
  phone: "+593 95 921 8750",
  createdAt: { _seconds: Math.floor(new Date("2023-04-15").getTime() / 1000) },
  profileImage: perfil,
  paymentMethods: [
    {
      methodId: "pm-1",
      type: "Visa",
      cardNumber: "4111111111114242",
      cardHolder: "SPRINTCORE ECUADOR",
      expirationDate: "2027-09",
    },
    {
      methodId: "pm-2",
      type: "Mastercard",
      cardNumber: "5555555555554444",
      cardHolder: "SPRINTCORE S.A.S.",
      expirationDate: "2028-02",
    },
  ],
  notificationPreferences: {
    emailNotifications: true,
    smsNotifications: false,
    promotionalOffers: true,
  },
};

const DEMO_ADDRESSES = [
  {
    addressId: "addr-1",
    addressLine: "Av. República y Diego de Almagro (Oficina SprintCore)",
    postalCode: "170102",
    city: "Quito",
    state: "Pichincha",
    country: "Ecuador",
    isDefault: true,
  },
  {
    addressId: "addr-2",
    addressLine: "Av. Francisco de Orellana, Edif. Empresarial (Sucursal)",
    postalCode: "090150",
    city: "Guayaquil",
    state: "Guayas",
    country: "Ecuador",
    isDefault: false,
  },
];

const DEMO_ORDERS = [
  {
    orderId: "SC-ORD-2026-0001",
    date: {
      _seconds: Math.floor(new Date("2026-01-12T15:30:00").getTime() / 1000),
    },
    total: 268.5,
    status: "Completed",
    paymentMethod: "Visa terminada en 4242",
    shippingAddress: DEMO_ADDRESSES[0],
    items: [
      { name: "Audífonos Noise Cancelling", quantity: 1, price: 149.5 },
      { name: "Café Artesanal Premium", quantity: 2, price: 59.5 },
    ],
  },
  {
    orderId: "SC-ORD-2026-0002",
    date: {
      _seconds: Math.floor(new Date("2026-01-18T10:05:00").getTime() / 1000),
    },
    total: 149.0,
    status: "Processing",
    paymentMethod: "Mastercard terminada en 4444",
    shippingAddress: DEMO_ADDRESSES[1],
    items: [{ name: "Zapatillas Nike Urban", quantity: 1, price: 149.0 }],
  },
];

const genId = (prefix = "id") =>
  `${prefix}-${Math.random().toString(16).slice(2)}-${Date.now().toString(16)}`;

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("datos");
  const navigate = useNavigate();

  const [profile, setProfile] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [notificationPreferences, setNotificationPreferences] = useState({});

  const [newAddress, setNewAddress] = useState({
    addressLine: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
  });

  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: "Visa",
    cardNumber: "",
    cardHolder: "",
    expirationDate: "",
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [modalType, setModalType] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fileInputRef = useRef(null);

  const tabs = [
    { name: "datos", icon: <FaRegUser /> },
    { name: "historial", icon: <FaHistory /> },
    { name: "direcciones", icon: <MdOutlineDirections /> },
    { name: "tarjetas", icon: <BsCreditCard /> },
    { name: "notificaciones", icon: <IoMdNotificationsOutline /> },
    { name: "seguridad", icon: <GoLock /> },
  ];

  /* =========================
     DEMO: Load initial data
     ========================= */
  useEffect(() => {
    setLoadingProfile(true);
    const t = setTimeout(() => {
      setProfile(DEMO_PROFILE);
      setPaymentMethods(DEMO_PROFILE.paymentMethods || []);
      setNotificationPreferences(DEMO_PROFILE.notificationPreferences || {});
      setAddresses(DEMO_ADDRESSES);
      setOrders(DEMO_ORDERS);
      setLoadingProfile(false);
    }, 450); // pequeño loader para “sensación real”
    return () => clearTimeout(t);
  }, []);

  /* =========================
     Modal helpers
     ========================= */
  const openModal = (type, item = null) => {
    setModalType(type);
    setConfirmDelete(false);
    setDeleteItem(null);
    setCurrentAddress(null);
    setCurrentPaymentMethod(null);
    setOrderDetails(null);

    if (type === "editAddress") {
      setCurrentAddress(item);
      setNewAddress(item);
    } else if (type === "editPaymentMethod") {
      setCurrentPaymentMethod(item);
      setNewPaymentMethod(item);
    } else if (type === "orderDetails") {
      setOrderDetails(item);
    } else if (type === "addAddress") {
      setNewAddress({
        addressLine: "",
        postalCode: "",
        city: "",
        state: "",
        country: "",
      });
    } else if (type === "addPaymentMethod") {
      setNewPaymentMethod({
        type: "Visa",
        cardNumber: "",
        cardHolder: "SPRINTCORE ECUADOR",
        expirationDate: "",
      });
    }

    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalType("");
    setCurrentAddress(null);
    setCurrentPaymentMethod(null);
    setOrderDetails(null);
    setConfirmDelete(false);
    setDeleteItem(null);
    setNewAddress({
      addressLine: "",
      postalCode: "",
      city: "",
      state: "",
      country: "",
    });
    setNewPaymentMethod({
      type: "Visa",
      cardNumber: "",
      cardHolder: "",
      expirationDate: "",
    });
  };

  /* =========================
     DEMO actions (no backend)
     ========================= */
  const handleLogout = async () => {
    toast.success("Sesión cerrada correctamente.");
    navigate("/"); // demo: vuelve al home
  };

  const handleUpdateUserInfo = async () => {
    toast.success("Información actualizada correctamente (DEMO)");
  };

  const handleAddAddress = async () => {
    const payload = {
      ...newAddress,
      addressId: genId("addr"),
      isDefault: addresses.length === 0,
    };
    setAddresses((prev) => [...prev, payload]);
    closeModal();
    toast.success("Dirección agregada correctamente (DEMO)");
  };

  const handleEditAddress = async () => {
    setAddresses((prev) =>
      prev.map((addr) =>
        addr.addressId === newAddress.addressId ? newAddress : addr,
      ),
    );
    closeModal();
    toast.success("Dirección actualizada correctamente (DEMO)");
  };

  const handleDeleteAddress = async () => {
    setAddresses((prev) =>
      prev.filter((addr) => addr.addressId !== deleteItem),
    );
    closeModal();
    toast.success("Dirección eliminada correctamente (DEMO)");
  };

  const handleAddOrUpdatePaymentMethod = async () => {
    if (!newPaymentMethod.type || !newPaymentMethod.cardNumber) {
      toast.error("Completa el tipo y el número de tarjeta.");
      return;
    }

    if (modalType === "addPaymentMethod") {
      const payload = {
        ...newPaymentMethod,
        methodId: genId("pm"),
      };
      setPaymentMethods((prev) => [...prev, payload]);
    } else {
      setPaymentMethods((prev) =>
        prev.map((m) =>
          m.methodId === newPaymentMethod.methodId ? newPaymentMethod : m,
        ),
      );
    }

    closeModal();
    toast.success("Método de pago agregado/actualizado correctamente (DEMO)");
  };

  const handleDeletePaymentMethod = async () => {
    setPaymentMethods((prev) => prev.filter((m) => m.methodId !== deleteItem));
    closeModal();
    toast.success("Método de pago eliminado correctamente (DEMO)");
  };

  const handleUpdateNotificationPreferences = async (updatedPreferences) => {
    setNotificationPreferences(updatedPreferences);
    toast.success("Preferencias de notificación actualizadas (DEMO)");
  };

  // DEMO: imagen local preview (sin subir a servidor)
  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, profileImage: imageUrl }));
    toast.success("Imagen de perfil actualizada (DEMO)");
  };

  const confirmDeleteItem = (itemId, type) => {
    setDeleteItem(itemId);
    setModalType(type);
    setConfirmDelete(true);
    setModalIsOpen(true);
  };

  const handleChangePassword = async () => {
    // DEMO validations igual que antes
    if (!currentPassword || !newPassword || !confirmPassword) {
      if (!currentPassword) toast.error("Debes ingresar tu contraseña actual.");
      else if (!newPassword)
        toast.error("Debes ingresar una nueva contraseña.");
      else toast.error("Debes confirmar tu nueva contraseña.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Las nuevas contraseñas no coinciden.");
      return;
    }

    // DEMO: no autenticamos, solo simulamos éxito
    toast.success("Contraseña actualizada correctamente (DEMO).");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="container mx-auto p-4">
      {loadingProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-icons border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-title">Perfil de Usuario</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-1/4 min-w-[16rem]">
          <div className="bg-box border rounded-lg shadow-md p-4">
            <div className="text-center mb-4">
              <div className="relative flex items-center justify-between w-full px-4">
                <h2 className="text-xl font-semibold text-title text-center flex-grow">
                  {profile.name && profile.lastName
                    ? `${profile.name} ${profile.lastName}`
                    : "Cargando..."}
                </h2>

                <button
                  onClick={handleLogout}
                  className="text-delete hover:text-delete-on transition duration-300"
                  title="Cerrar sesión"
                >
                  <FaSignOutAlt size={24} />
                </button>
              </div>

              <p className="text-content">
                Miembro desde{" "}
                {profile.createdAt?._seconds
                  ? new Date(
                      profile.createdAt._seconds * 1000,
                    ).toLocaleDateString()
                  : "..."}
              </p>

              <p className="text-content">Email: {profile.email || "..."}</p>
              <p className="text-content">Tel: {profile.phone || "..."}</p>
            </div>

            <div className="flex flex-col items-center mb-4">
              <img
                src={profile.profileImage || perfil}
                alt={profile.name || "Perfil"}
                className="w-32 h-32 object-cover rounded-full mb-6"
              />

              <input
                type="file"
                id="profile-image-upload"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              <ActionButton
                onClick={() => fileInputRef.current?.click()}
                variant="grow"
              >
                Cambiar foto
              </ActionButton>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="bg-box border rounded-lg shadow-md flex flex-col h-full">
            <div className="border-b">
              <div className="flex justify-around space-x-2 p-4 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`px-4 py-2 font-medium rounded-md flex flex-row justify-center items-center blankspace-nowrap ${
                      activeTab === tab.name
                        ? "bg-button text-blank"
                        : "text-subtitle"
                    }`}
                  >
                    <span className="lg:mr-2">{tab.icon}</span>
                    <span className="hidden lg:inline">
                      {tab.name.charAt(0).toUpperCase() + tab.name.slice(1)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 flex-1">
              {/* ========================= DATOS ========================= */}
              {activeTab === "datos" && (
                <div className="px-4 py-2 max-h-[38vh] md:max-h-[78vh] overflow-hidden overflow-y-scroll">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-subtitle mb-2">
                      Información Personal
                    </h2>
                    <p className="text-sm text-icons-on">
                      Actualiza tus datos personales
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-content mb-2">
                        Nombre
                      </label>
                      <input
                        value={profile.name || ""}
                        onChange={(e) =>
                          setProfile({ ...profile, name: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-border-on focus:border-border-on transition-all"
                        placeholder="Tu nombre"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-content mb-2">
                        Apellido
                      </label>
                      <input
                        value={profile.lastName || ""}
                        onChange={(e) =>
                          setProfile({ ...profile, lastName: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-border-on focus:border-border-on transition-all"
                        placeholder="Tu apellido"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-content mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={profile.phone || ""}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-border-on focus:border-border-on transition-all"
                      placeholder="+593 9X XXX XXXX"
                    />
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-medium text-content mb-2">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={profile.email || ""}
                        disabled
                        className="w-full px-4 py-2 border border-border rounded-lg bg-amber-50 text-subtitle"
                      />
                      <div className="absolute right-3 top-2.5">
                        <span className="bg-lines text-amber-800 text-xs px-2 py-0.5 rounded-full">
                          Verificado
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-delete mt-1">
                      Para cambiar tu correo, contacta con soporte
                    </p>
                  </div>

                  <ActionButton
                    onClick={handleUpdateUserInfo}
                    variant="right"
                    className="w-full md:w-auto"
                  >
                    Guardar cambios
                  </ActionButton>
                </div>
              )}

              {/* ========================= HISTORIAL ========================= */}
              {activeTab === "historial" && (
                <div className="px-4 py-2 max-h-[38vh] md:max-h-[78vh] overflow-hidden overflow-y-scroll">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-subtitle">
                      Historial de Pedidos
                    </h2>
                    <span className="bg-lines text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {orders.length}{" "}
                      {orders.length === 1 ? "pedido" : "pedidos"}
                    </span>
                  </div>

                  {orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.orderId}
                          className="border border-lines rounded-lg p-4 hover:shadow-md transition-all duration-200"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                            <div>
                              <p className="text-xs font-medium text-delete">
                                Fecha
                              </p>
                              <p className="text-sm font-medium text-subtitle">
                                {new Date(
                                  order.date._seconds * 1000,
                                ).toLocaleString("es-ES", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs font-medium text-delete">
                                Total
                              </p>
                              <p className="text-lg font-bold text-amber-800">
                                {order.total.toLocaleString("es-ES", {
                                  style: "currency",
                                  currency: "USD",
                                })}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs font-medium text-delete">
                                Estado
                              </p>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  order.status === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "Pending"
                                      ? "bg-lines text-amber-800"
                                      : order.status === "Processing"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-rose-100 text-rose-800"
                                }`}
                              >
                                {order.status}
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t border-amber-50">
                            <button
                              onClick={() => openModal("orderDetails", order)}
                              className="text-icons-on hover:text-amber-800 font-medium flex items-center text-sm"
                            >
                              Ver detalles
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 ml-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </button>

                            <span className="text-xs text-amber-400">
                              ID: {String(order.orderId).slice(0, 8)}...
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="mt-4 text-lg font-medium text-amber-800">
                        No hay pedidos registrados
                      </h3>
                      <p className="mt-1 text-sm text-delete">
                        Tus próximos pedidos aparecerán aquí
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* ========================= DIRECCIONES ========================= */}
              {activeTab === "direcciones" && (
                <div className="px-4 py-2 max-h-[38vh] md:max-h-[78vh] overflow-hidden overflow-y-scroll">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-subtitle">
                      Direcciones Guardadas
                    </h2>
                    <span className="bg-lines text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {addresses.length}{" "}
                      {addresses.length === 1 ? "dirección" : "direcciones"}
                    </span>
                  </div>

                  {addresses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {addresses.map((address) => (
                        <div
                          key={address.addressId}
                          className={`border border-lines rounded-lg p-4 hover:shadow-md transition-all duration-200 ${
                            address.isDefault
                              ? "ring-2 ring-border-on bg-amber-50"
                              : ""
                          }`}
                        >
                          {address.isDefault && (
                            <span className="inline-block bg-border text-amber-800 text-xs font-medium px-2 py-0.5 rounded-full mb-2">
                              Predeterminada
                            </span>
                          )}

                          <div className="flex items-start">
                            <div className="bg-button-off p-2 rounded-lg mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-icons-on"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            </div>

                            <div className="flex-1">
                              <h3 className="font-medium text-subtitle">
                                {address.addressLine}
                              </h3>
                              <p className="text-sm text-content">
                                {address.city}, {address.state}
                              </p>
                              <p className="text-sm text-content">
                                {address.postalCode}, {address.country}
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-end space-x-2 mt-4">
                            <button
                              onClick={() => openModal("editAddress", address)}
                              className="px-3 py-1 text-sm border border-border-on text-content rounded-lg hover:bg-amber-50 transition-colors flex items-center"
                            >
                              Editar
                            </button>

                            <button
                              onClick={() =>
                                confirmDeleteItem(
                                  address.addressId,
                                  "deleteAddress",
                                )
                              }
                              className="px-3 py-1 text-sm border border-rose-300 text-delete rounded-lg hover:bg-rose-50 transition-colors flex items-center"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 mb-6">
                      <h3 className="mt-4 text-lg font-medium text-amber-800">
                        No hay direcciones guardadas
                      </h3>
                      <p className="mt-1 text-sm text-delete">
                        Tus direcciones aparecerán aquí
                      </p>
                    </div>
                  )}

                  <ActionButton
                    onClick={() => openModal("addAddress")}
                    variant="right"
                  >
                    Añadir Nueva Dirección
                  </ActionButton>
                </div>
              )}

              {/* ========================= TARJETAS ========================= */}
              {activeTab === "tarjetas" && (
                <div className="px-4 py-2 max-h-[38vh] md:max-h-[78vh] overflow-hidden overflow-y-scroll">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-subtitle">
                      Métodos de Pago
                    </h2>
                    <span className="bg-lines text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {paymentMethods.length}{" "}
                      {paymentMethods.length === 1 ? "método" : "métodos"}
                    </span>
                  </div>

                  {paymentMethods.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {paymentMethods.map((payment) => (
                        <div
                          key={payment.methodId}
                          className="border border-lines rounded-lg p-4 hover:shadow-md transition-all duration-200"
                        >
                          <div className="flex items-start">
                            <div className="bg-lines p-2 rounded-lg mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-icons-on"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-subtitle">
                                {payment.type} terminada en{" "}
                                {String(payment.cardNumber).slice(-4)}
                              </h3>
                              <p className="text-sm text-content">
                                Expira: {payment.expirationDate}
                              </p>
                              <p className="text-sm text-content">
                                Titular: {payment.cardHolder}
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-end space-x-2 mt-4">
                            <button
                              onClick={() =>
                                openModal("editPaymentMethod", payment)
                              }
                              className="px-3 py-1 text-sm border border-border-on text-content rounded-lg hover:bg-amber-50 transition-colors"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() =>
                                confirmDeleteItem(
                                  payment.methodId,
                                  "deletePaymentMethod",
                                )
                              }
                              className="px-3 py-1 text-sm border border-rose-300 text-rose-700 rounded-lg hover:bg-rose-50 transition-colors"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 mb-6">
                      <h3 className="mt-4 text-lg font-medium text-amber-800">
                        No hay métodos de pago
                      </h3>
                      <p className="mt-1 text-sm text-delete">
                        Tus métodos de pago aparecerán aquí
                      </p>
                    </div>
                  )}

                  <ActionButton
                    onClick={() => openModal("addPaymentMethod")}
                    variant="right"
                    className="cursor-pointer w-full md:w-auto"
                  >
                    Añadir Nuevo Método de Pago
                  </ActionButton>
                </div>
              )}

              {/* ========================= NOTIFICACIONES ========================= */}
              {activeTab === "notificaciones" && (
                <div className="px-4 py-2 max-h-[38vh] md:max-h-[78vh] overflow-hidden overflow-y-scroll">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-subtitle">
                      Preferencias de Notificación
                    </h2>
                    <p className="text-sm text-icons-on mt-1">
                      Personaliza cómo recibes nuestras comunicaciones (DEMO)
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        key: "emailNotifications",
                        title: "Notificaciones por correo",
                        desc: "Actualizaciones importantes y resúmenes",
                      },
                      {
                        key: "smsNotifications",
                        title: "Notificaciones SMS",
                        desc: "Alertas importantes por mensaje de texto",
                      },
                      {
                        key: "promotionalOffers",
                        title: "Ofertas promocionales",
                        desc: "Descuentos exclusivos y novedades",
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between p-3 hover:bg-amber-50 rounded-lg transition-colors"
                      >
                        <div className="flex items-center">
                          <div className="bg-button-off p-2 rounded-lg mr-3">
                            <IoMdNotificationsOutline className="h-5 w-5 text-icons-on" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-subtitle">
                              {item.title}
                            </label>
                            <p className="text-xs text-content">{item.desc}</p>
                          </div>
                        </div>

                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={notificationPreferences[item.key] || false}
                            onChange={(e) =>
                              handleUpdateNotificationPreferences({
                                ...notificationPreferences,
                                [item.key]: e.target.checked,
                              })
                            }
                          />
                          <div className="relative w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-border-on after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-icons-on"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================= SEGURIDAD ========================= */}
              {activeTab === "seguridad" && (
                <div className="px-4 py-2 max-h-[38vh] md:max-h-[78vh] overflow-hidden overflow-y-scroll">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-title">
                      Seguridad de la Cuenta
                    </h2>
                    <p className="text-sm text-icons-on mt-1">
                      Protege tu cuenta con contraseñas seguras (DEMO)
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-subtitle mb-4 flex items-center">
                        <GoLock className="h-5 w-5 mr-2 text-icons-on" />
                        Cambiar Contraseña
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-content mb-2">
                            Contraseña Actual
                          </label>
                          <input
                            type="password"
                            placeholder="Ingresa tu contraseña actual"
                            className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-border-on focus:border-border-on transition-all"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-content mb-2">
                            Nueva Contraseña
                          </label>
                          <input
                            type="password"
                            placeholder="Crea una nueva contraseña (mínimo 6 caracteres)"
                            className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-border-on focus:border-border-on transition-all"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                          <p className="text-xs text-delete mt-1">
                            Usa una combinación de letras, números y símbolos
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-content mb-2">
                            Confirmar Nueva Contraseña
                          </label>
                          <input
                            type="password"
                            placeholder="Vuelve a ingresar la nueva contraseña"
                            className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-border-on focus:border-border-on transition-all"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>

                        <div className="pt-2">
                          <ActionButton
                            onClick={handleChangePassword}
                            variant="right"
                            className="w-full md:w-auto"
                          >
                            Cambiar Contraseña
                          </ActionButton>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 pb-4">
                      <h3 className="text-md font-medium text-title">
                        Configuración de Seguridad Avanzada
                      </h3>

                      <div className="flex items-center justify-between py-4">
                        <div>
                          <label className="block text-sm font-medium text-content mb-1">
                            Autenticación de Doble Factor (2FA)
                          </label>
                          <p className="text-xs text-amber-600">
                            Proteja su cuenta con doble autenticación de inicio
                          </p>
                        </div>

                        <div className="flex items-center">
                          <button
                            type="button"
                            className="relative inline-flex h-6 w-12 items-center rounded-full transition-colors bg-content focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
                            disabled
                            aria-disabled="true"
                          >
                            <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow translate-x-1" />
                          </button>
                          <span className="ml-3 text-sm font-medium text-content">
                            Deshabilitado
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 p-4 bg-amber-50 rounded-lg border-[1px] border-border">
                        <div className="flex items-center">
                          <span className="text-icons mr-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="12" y1="8" x2="12" y2="12"></line>
                              <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                          </span>
                          <p className="text-sm text-subtitle/70 font-medium">
                            Esta funcionalidad estará disponible en la próxima
                            actualización del sistema.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* ========================= MODAL ========================= */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Formulario"
      >
        <div className="p-6 max-h-[90vh] overflow-y-auto">
          {/* Add/Edit Address */}
          {modalType === "addAddress" || modalType === "editAddress" ? (
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-subtitle">
                  {modalType === "addAddress"
                    ? "Añadir Nueva Dirección"
                    : "Editar Dirección"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-delete hover:text-content"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    id: "addressLine",
                    label: "Dirección",
                    value: newAddress.addressLine,
                  },
                  { id: "city", label: "Ciudad", value: newAddress.city },
                  {
                    id: "state",
                    label: "Estado/Provincia",
                    value: newAddress.state,
                  },
                  {
                    id: "postalCode",
                    label: "Código Postal",
                    value: newAddress.postalCode,
                  },
                  { id: "country", label: "País", value: newAddress.country },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block text-sm font-medium text-content mb-1"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      value={field.value}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          [field.id]: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-border-on focus:border-border-on transition-all"
                    />
                  </div>
                ))}

                <div className="pt-4 flex justify-end space-x-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 border border-border-on text-content rounded-lg hover:bg-amber-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={
                      modalType === "addAddress"
                        ? handleAddAddress
                        : handleEditAddress
                    }
                    className="px-4 py-2 bg-icons-on text-white rounded-lg hover:bg-content transition-colors"
                  >
                    {modalType === "addAddress"
                      ? "Añadir Dirección"
                      : "Guardar Cambios"}
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {/* Add/Edit Payment */}
          {modalType === "addPaymentMethod" ||
          modalType === "editPaymentMethod" ? (
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-subtitle">
                  {modalType === "addPaymentMethod"
                    ? "Añadir Método de Pago"
                    : "Editar Método de Pago"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-delete hover:text-content"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium text-title mb-1"
                    >
                      Tipo de Tarjeta
                    </label>
                    <select
                      id="type"
                      value={newPaymentMethod.type}
                      onChange={(e) =>
                        setNewPaymentMethod({
                          ...newPaymentMethod,
                          type: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border text-content border-border rounded-lg focus:ring-2 focus:ring-border-on focus:border-border-on transition-all"
                    >
                      <option value="Visa">Visa</option>
                      <option value="Mastercard">Mastercard</option>
                      <option value="American Express">American Express</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="block text-sm font-medium text-title mb-1"
                    >
                      Número de Tarjeta
                    </label>

                    <input
                      id="cardNumber"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      maxLength={19}
                      value={newPaymentMethod.cardNumber}
                      onChange={(e) => {
                        const digitsOnly = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 16);
                        const formatted = digitsOnly.replace(
                          /(\d{4})(?=\d)/g,
                          "$1 ",
                        );

                        setNewPaymentMethod({
                          ...newPaymentMethod,
                          cardNumber: formatted,
                        });
                      }}
                      className="w-full px-3 py-2 border text-content border-border rounded-lg focus:ring-2 focus:ring-border-on focus:border-border-on transition-all"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="cardHolder"
                    className="block text-sm font-medium text-title mb-1"
                  >
                    Nombre del Titular
                  </label>
                  <input
                    id="cardHolder"
                    value={newPaymentMethod.cardHolder}
                    onChange={(e) =>
                      setNewPaymentMethod({
                        ...newPaymentMethod,
                        cardHolder: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border text-content border-border rounded-lg focus:ring-2 focus:ring-border-on focus:border-border-on transition-all"
                    placeholder="Como aparece en la tarjeta"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="expirationDate"
                      className="block text-sm font-medium text-title mb-1"
                    >
                      Fecha de Expiración
                    </label>
                    <input
                      id="expirationDate"
                      type="month"
                      value={newPaymentMethod.expirationDate}
                      onChange={(e) =>
                        setNewPaymentMethod({
                          ...newPaymentMethod,
                          expirationDate: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border text-content border-border rounded-lg focus:ring-2 focus:ring-border-on focus:border-border-on transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cvv"
                      className="block text-sm font-medium text-title mb-1"
                    >
                      CVV
                    </label>
                    <input
                      id="cvv"
                      type="password"
                      maxLength="3"
                      className="w-full px-3 py-2 border text-content border-border rounded-lg focus:ring-2 focus:ring-border-on focus:border-border-on transition-all"
                      placeholder="•••"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end space-x-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 border border-border-on text-title rounded-lg hover:bg-amber-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAddOrUpdatePaymentMethod}
                    className="px-4 py-2 bg-button text-white rounded-lg hover:bg-button-on transition-colors"
                  >
                    {modalType === "addPaymentMethod"
                      ? "Añadir Método"
                      : "Guardar Cambios"}
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {/* Order Details */}
          {modalType === "orderDetails" && orderDetails ? (
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-subtitle">
                  Detalles del Pedido
                </h2>
                <button
                  onClick={closeModal}
                  className="text-delete hover:text-content"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="bg-amber-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-medium text-icons-on">
                      NÚMERO DE PEDIDO
                    </p>
                    <p className="text-sm text-subtitle">
                      #{orderDetails.orderId}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-icons-on">FECHA</p>
                    <p className="text-sm text-subtitle">
                      {new Date(
                        orderDetails.date._seconds * 1000,
                      ).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-icons-on">TOTAL</p>
                    <p className="text-sm text-subtitle">
                      {orderDetails.total.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-subtitle mb-3">
                  Resumen del Pedido
                </h3>
                <div className="space-y-4">
                  {orderDetails.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b border-lines pb-3"
                    >
                      <div className="flex items-center">
                        <div className="bg-button-off rounded-lg p-2 mr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-icons-on"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-subtitle">
                            {item.name}
                          </p>
                          <p className="text-sm text-icons-on">
                            Cantidad: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium text-subtitle">
                        {(item.price * item.quantity).toLocaleString("es-ES", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-subtitle mb-3">
                    Información de Envío
                  </h3>
                  <div className="bg-amber-50 rounded-lg p-4">
                    <div className="text-sm text-subtitle">
                      <p>{orderDetails.shippingAddress.addressLine}</p>
                      <p>
                        {orderDetails.shippingAddress.city},{" "}
                        {orderDetails.shippingAddress.state}
                      </p>
                      <p>{orderDetails.shippingAddress.postalCode}</p>
                      <p>{orderDetails.shippingAddress.country}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-subtitle mb-3">
                    Método de Pago
                  </h3>
                  <div className="bg-amber-50 rounded-lg p-4">
                    <p className="text-sm text-subtitle">
                      {orderDetails.paymentMethod || "No especificado"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-icons-on text-white rounded-lg hover:bg-content transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          ) : null}

          {/* Confirm Delete */}
          {confirmDelete ? (
            <div className="max-w-md mx-auto text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-rose-100 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-rose-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-subtitle mb-2">
                ¿Estás seguro?
              </h2>
              <p className="text-content mb-6">
                Esta acción no se puede deshacer
              </p>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-border-on text-content rounded-lg hover:bg-amber-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={
                    modalType === "deleteAddress"
                      ? handleDeleteAddress
                      : handleDeletePaymentMethod
                  }
                  className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
                >
                  Confirmar Eliminación
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </Modal>

      <ToastContainer />
    </div>
  );
}
