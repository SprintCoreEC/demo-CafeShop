import { getAuthHeaders } from "../utils/authHeaders";

const API_URL = 'http://localhost:4000/admin'; // Asegúrate de que coincida con la URL de tu backend

// Función para obtener la lista de usuarios
export const fetchAllUsers = async () => {
  try {
    const headers = await getAuthHeaders();

    const response = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error obteniendo la lista de usuarios");
    }

    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error("Error obteniendo la lista de usuarios:", error);
    throw error;
  }
};

export const getAdminProfile = async () => {
  try {
    console.log("🚀 Iniciando `getAdminProfile`...");

    const headers = await getAuthHeaders();
    headers["Content-Type"] = "application/json";

    const response = await fetch(`${API_URL}/admin/profile`, {
      method: "GET",
      headers,
    });

    console.log("📡 Respuesta del servidor recibida:", response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener el perfil");
    }

    const data = await response.json();
    console.log("Perfil del administrador obtenido:", data.profile);

    return data.profile;
  } catch (error) {
    console.error("Error en `getAdminProfile`:", error);
    throw error;
  }
};

// Actualizar el perfil del administrador
export const updateAdminProfile = async (profileData) => {
  try {
    console.log("🚀 Enviando actualización de perfil...");

    const headers = await getAuthHeaders();
    headers["Content-Type"] = "application/json"; // agregar manualmente

    const response = await fetch(`${API_URL}/admin/profile`, {
      method: "PUT",
      headers,
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al actualizar el perfil");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en `updateAdminProfile`:", error);
    throw error;
  }
};


// Actualizar la imagen de perfil del administrador
export const updateAdminProfileImage = async (formData) => {
  try {
    const headers = await getAuthHeaders(); // sin Content-Type

    const response = await fetch(`${API_URL}/admin/profile/image`, {
      method: "PUT",
      headers,
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al subir imagen");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en `updateAdminProfileImage`:", error);
    throw error;
  }
};

// Servicio para actualizar el campo receiveNotifications
export const updateReceiveNotifications = async (receiveNotifications) => {
  try {
    console.log("🚀 Iniciando `updateReceiveNotifications` en el frontend...");
    console.log("🔔 Nuevo estado de notificaciones:", receiveNotifications);

    const headers = await getAuthHeaders();
    headers["Content-Type"] = "application/json";

    const response = await fetch(`${API_URL}/admin/profile/receiveNotifications`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ receiveNotifications }),
    });

    console.log("📡 Respuesta del servidor recibida:", response);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error en la respuesta del servidor:", errorData);
      throw new Error(errorData.message || "Error al actualizar las notificaciones");
    }

    const data = await response.json();
    console.log("Notificaciones actualizadas con éxito:", data.receiveNotifications);

    return data;
  } catch (error) {
    console.error("Error al actualizar las notificaciones:", error);
    throw error;
  }
};

