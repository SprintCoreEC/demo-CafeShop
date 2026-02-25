import { getAuthHeaders } from "../utils/authHeaders";

// 📂 services/orderService.js
const BASE_URL = "http://localhost:4000/api/user";

export const createOrder = async (orderData) => {
    try {
        const headers = await getAuthHeaders();
        headers["Content-Type"] = "application/json";

        const response = await fetch(`${BASE_URL}/add-order`, {
            method: "POST",
            headers,
            body: JSON.stringify(orderData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al crear la orden");
        }

        return data;
    } catch (error) {
        console.error("Error al crear la orden:", error.message);
        throw error;
    }
};

export const getUserOrders = async () => {
    try {
        const headers = await getAuthHeaders();

        const response = await fetch(`${BASE_URL}/orders`, {
            method: "GET",
            headers,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al obtener los pedidos");
        }

        return data.orders;
    } catch (error) {
        console.error("Error al obtener pedidos:", error.message);
        throw error;
    }
};

export const fetchAllOrders = async () => {
    try {
        const headers = await getAuthHeaders(); // 🔐 Obtiene el token de Firebase

        const response = await fetch(`${BASE_URL}/all-orders`, {
            method: "GET",
            headers,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al obtener los pedidos");
        }

        return data.orders;
    } catch (error) {
        console.error("Error al obtener los pedidos:", error.message);
        throw error;
    }
};

export const updateOrderStatus = async (orderId, newStatus) => {
    try {
        const headers = await getAuthHeaders(); // 🔐 Token desde Firebase
        headers["Content-Type"] = "application/json";

        const response = await fetch(`${BASE_URL}/${orderId}`, {
            method: "PUT",
            headers,
            body: JSON.stringify({ status: newStatus }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al actualizar el estado de la orden");
        }

        return data;
    } catch (error) {
        console.error("Error al actualizar el estado de la orden:", error.message);
        throw error;
    }
};

