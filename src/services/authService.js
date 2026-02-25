import { getAuthHeaders } from "../utils/authHeaders";

const API_URL = 'http://localhost:4000/api/auth';

export const registerUser = async (userData) => {
  try {
    const headers = await getAuthHeaders(); // 🔐 Obtenemos el token del usuario

    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers, // Solo pasa el Authorization (sin content-type para FormData)
      body: userData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error en la solicitud de registro");
    }

    return data;
  } catch (error) {
    console.error("Error en el servicio registerUser:", error);
    throw new Error(error.message);
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en la solicitud de inicio de sesión');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginAdmin = async (credentials) => {
  try {
    console.log("📩 Enviando credenciales:", credentials); // 🔹 Verifica qué datos estás enviando

    const response = await fetch(`${API_URL}/admin-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    console.log("📤 Respuesta del servidor:", response);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error recibido del servidor:", errorData);
      throw new Error(errorData.message || 'Error en la solicitud de inicio de sesión para administrador');
    }

    const data = await response.json();
    console.log("Datos recibidos del servidor:", data); // 🔹 Asegúrate de que el token se recibe

    if (!data.token) {
      throw new Error('No se recibió el token en la respuesta del servidor.');
    }

    return data; // Retornar el token
  } catch (error) {
    console.error("Error en `loginAdmin`:", error.message);
    throw new Error(error.message);
  }
};
