import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPaypal, FaArrowLeft } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CarritoContext } from '../../services/carritoProvider';
import { FaRegCreditCard } from 'react-icons/fa6';
import { createOrder } from '../../services/orderService';
import { getUserAddresses, addAddress } from '../../services/userService';

const PayMethod = () => {
    const navigate = useNavigate();
    const { carrito } = useContext(CarritoContext);
    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const token = localStorage.getItem('token');
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [newAddress, setNewAddress] = useState({
        addressLine: '',
        postalCode: '',
        city: '',
        state: '',
        country: ''
    });
    const [showAddressModal, setShowAddressModal] = useState(false);

    const calcularTotal = () => {
        return carrito.reduce(
            (total, producto) => total + producto.precio * producto.cantidad,
            0
        ).toFixed(2);
    };

    const handleBackToCart = () => {
        navigate('/carrito');
    };

    useEffect(() => {
        const fetchAddresses = async () => {
            if (!token) return;

            try {
                const addressData = await getUserAddresses(token);
                setAddresses(addressData.length > 0 ? addressData : []);
                if (addressData.length > 0) {
                    setSelectedAddress(addressData[0]); // Selecciona la primera dirección por defecto
                }
            } catch (error) {
                toast.error("Error al obtener las direcciones");
            }
        };

        fetchAddresses();
    }, [token]);

    const handlePayWithPaypal = async () => {
        if (!selectedAddress) {
            toast.error("⚠️ Debes seleccionar una dirección antes de pagar.");
            return;
        }

        setLoading(true);
        try {
            const total = calcularTotal();
            const orderData = {
                date: new Date(),
                total,
                items: carrito.map((item) => ({
                    productId: item.id,
                    name: item.nombre,
                    price: item.precio,
                    quantity: item.cantidad,
                })),
                status: "pending",
                paymentMethod: "PayPal",
                address: selectedAddress, // Dirección seleccionada
            };

            await createOrder(orderData, token);
            toast.success("Pedido creado con éxito");

            setTimeout(() => {
                navigate("/payment-confirmation");
            }, 2000);
        } catch (error) {
            toast.error("Error al procesar el pedido");
        } finally {
            setLoading(false);
            setPaymentSuccess(true);
        }
    };

    const handleAddAddress = async () => {
        if (!newAddress.addressLine || !newAddress.city || !newAddress.state || !newAddress.country || !newAddress.postalCode) {
            toast.error("⚠️ Todos los campos de dirección son obligatorios.");
            return;
        }

        try {
            const response = await addAddress(token, newAddress);
            const updatedAddresses = [...addresses, response];
            setAddresses(updatedAddresses);
            setSelectedAddress(response); // Seleccionar la nueva dirección
            setShowAddressModal(false);
            toast.success("Dirección agregada correctamente");
        } catch (error) {
            toast.error("Error al agregar la dirección");
        }
    };

    return (
        <div className="flex flex-col min-h-screen pt-[6rem] overflow-hidden items-center w-full px-4 md:px-0">
            <div className="w-full max-w-3xl">
                <div className="flex items-center mb-6">
                    <button
                        onClick={handleBackToCart}
                        className="p-2 bg-white rounded-full shadow-md hover:bg-title hover:text-white hover:scale-[102%] transition-all duration-300 flex items-center justify-center mr-4"
                    >
                        <FaArrowLeft className="h-5 w-5" />
                    </button>
                    <h1 className="text-2xl font-bold">Método de pago</h1>
                </div>

                {/* Selección de dirección */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-4">Selecciona una dirección de entrega</h2>
                    {addresses.length > 0 ? (
                        <div className="space-y-4">
                            {addresses.map((address) => (
                                <label
                                    key={address.addressLine}
                                    className={`block p-3 border rounded-lg cursor-pointer ${selectedAddress === address ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                                        }`}
                                    onClick={() => setSelectedAddress(address)}
                                >
                                    <input
                                        type="radio"
                                        name="address"
                                        className="hidden"
                                        checked={selectedAddress === address}
                                        readOnly
                                    />
                                    <div>
                                        <p><strong>{address.addressLine}</strong></p>
                                        <p>{address.city}, {address.state}, {address.country}</p>
                                        <p>Código Postal: {address.postalCode}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
                            <p>⚠️ No tienes una dirección registrada. Debes agregar una antes de pagar.</p>
                            <button
                                onClick={() => setShowAddressModal(true)}
                                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                            >
                                Agregar Dirección
                            </button>
                        </div>
                    )}
                </div>

                <button
                    onClick={handlePayWithPaypal}
                    disabled={loading || paymentSuccess || !selectedAddress}
                    className={`w-full ${loading || paymentSuccess || !selectedAddress
                            ? 'bg-gray-400'
                            : 'bg-button hover:bg-button-on'
                        } text-white py-3 rounded-lg font-medium transition duration-300 flex items-center justify-center`}
                >
                    {loading ? "Procesando..." : "Pagar con PayPal"}
                </button>
            </div>

            {/* Modal para agregar nueva dirección */}
            {showAddressModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Agregar Dirección</h2>
                        <input type="text" placeholder="Dirección" value={newAddress.addressLine} onChange={(e) => setNewAddress({ ...newAddress, addressLine: e.target.value })} className="w-full p-2 border rounded-lg mb-2" />
                        <input type="text" placeholder="Código Postal" value={newAddress.postalCode} onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })} className="w-full p-2 border rounded-lg mb-2" />
                        <input type="text" placeholder="Ciudad" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} className="w-full p-2 border rounded-lg mb-2" />
                        <input type="text" placeholder="Estado" value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} className="w-full p-2 border rounded-lg mb-2" />
                        <input type="text" placeholder="País" value={newAddress.country} onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })} className="w-full p-2 border rounded-lg mb-4" />
                        <button onClick={handleAddAddress} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Guardar Dirección</button>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default PayMethod;
