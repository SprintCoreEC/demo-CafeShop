import { getAuthHeaders } from "../utils/authHeaders";

const API_URL = 'http://localhost:4000/api/user'; // Cambia esto por la URL base de tu API

// Función para obtener el perfil del usuario
export const getUserProfile2 = async (token) => {
  try {
    const response = await fetch(`${API_URL}/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Incluir el token en los headers
      },
    });
    return await response.json();
  } catch (error) {
    throw new Error(`Error obteniendo perfil del usuario: ${error.message}`);
  }
};

export const getUserProfile = async () => {
  try {
    const headers = await getAuthHeaders();

    const response = await fetch(`${API_URL}/profile`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error obteniendo el perfil del usuario");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en `getUserProfile`:", error);
    throw new Error(`Error obteniendo perfil del usuario: ${error.message}`);
  }
};

export const getUserAddresses = async () => {
  try {
    const headers = await getAuthHeaders();

    const response = await fetch(`${API_URL}/get-address`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error obteniendo direcciones del usuario");
    }

    const data = await response.json();
    return data.addresses;
  } catch (error) {
    console.error("Error obteniendo direcciones:", error.message);
    throw error;
  }
};


// Función para actualizar la información del usuario
export const updateUserInfo = async (userInfo) => {
  try {
    const headers = await getAuthHeaders();
    headers["Content-Type"] = "application/json";

    const response = await fetch(`${API_URL}/update-info`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al actualizar la información del usuario");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en `updateUserInfo`:", error);
    throw new Error(`Error actualizando información del usuario: ${error.message}`);
  }
};

// Función para actualizar la imagen de perfil del usuario
export const updateProfileImage = async (file) => {
  const formData = new FormData();
  formData.append('profileImage', file);

  try {
    const headers = await getAuthHeaders(); // 🔐 Obtiene el token actualizado
    // No agregar 'Content-Type', FormData lo hace automáticamente

    const response = await fetch(`${API_URL}/update-profile-image`, {
      method: 'PUT',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error actualizando imagen de perfil");
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error actualizando imagen de perfil: ${error.message}`);
  }
};

// Función para agregar una dirección
export const addAddress = async (address) => {
  try {
    const headers = await getAuthHeaders(); // 🔐 Obtener token actualizado

    const response = await fetch(`${API_URL}/add-address`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error agregando dirección");
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error agregando dirección: ${error.message}`);
  }
};

// Función para editar una dirección
export const editAddress = async (address) => {
  try {
    const headers = await getAuthHeaders();

    const response = await fetch(`${API_URL}/edit-address`, {
      method: "PUT",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error editando dirección");
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error editando dirección: ${error.message}`);
  }
};
// Función para eliminar una dirección
export const deleteAddress = async (addressId) => {
  try {
    const headers = await getAuthHeaders();

    const response = await fetch(`${API_URL}/delete-address`, {
      method: "DELETE",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ addressId }), // 🔥 Se envía el ID en el body
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error eliminando dirección");
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error eliminando dirección: ${error.message}`);
  }
};

// Función para agregar o actualizar un método de pago
export const addOrUpdatePaymentMethod = async (paymentMethod) => {
  try {
    const headers = await getAuthHeaders();
    headers["Content-Type"] = "application/json";

    const response = await fetch(`${API_URL}/add-payment-method`, {
      method: 'POST',
      headers,
      body: JSON.stringify(paymentMethod),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error agregando/actualizando método de pago");
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error agregando/actualizando método de pago: ${error.message}`);
  }
};

// Función para agregar un nuevo pedido al historial del usuario
export const addOrder = async (token, order) => {
  try {
    const response = await fetch(`${API_URL}/add-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    });
    return await response.json();
  } catch (error) {
    throw new Error(`Error agregando pedido: ${error.message}`);
  }
};

// Función para actualizar las preferencias de notificación del usuario
export const updateNotificationPreferences = async (preferences) => {
  try {
    const headers = await getAuthHeaders();
    headers["Content-Type"] = "application/json";

    const response = await fetch(`${API_URL}/update-notification-preferences`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(preferences),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error actualizando preferencias de notificación");
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error actualizando preferencias de notificación: ${error.message}`);
  }
};

// API_URL ya está definido previamente
// Función para eliminar un método de pago
export const deletePaymentMethod = async (methodId) => {
  try {
    const headers = await getAuthHeaders();
    headers["Content-Type"] = "application/json";

    const response = await fetch(`${API_URL}/payment-method`, {
      method: 'DELETE',
      headers,
      body: JSON.stringify({ methodId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error eliminando el método de pago');
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error eliminando método de pago: ${error.message}`);
  }
};
