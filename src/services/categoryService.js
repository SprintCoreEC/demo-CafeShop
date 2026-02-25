const BASE_URL = "http://localhost:4000/api/";

// Crear una nueva subcategoría dentro de una categoría específica
export const createCategory = async (itemType, data) => {
  try {
    const response = await fetch(`${BASE_URL}${itemType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error creando ${itemType}`);
    }

    return await response.json(); // Retorna los datos creados desde el backend
  } catch (error) {
    console.error(`Error en createItem (${itemType}):`, error);
    throw error;
  }
};


export const deleteItem = async (itemId, itemType) => {
  try {
    const response = await fetch(`${BASE_URL}${itemType}/${itemId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error eliminando el ítem");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en deleteItem:", error);
    throw error;
  }
};
