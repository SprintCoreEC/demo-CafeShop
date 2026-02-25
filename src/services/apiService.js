const BASE_URL = "http://localhost:4000/api/";
const API_URL = 'http://localhost:4000/api/menus'; 

export const getMenuIndex = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Error al obtener los productos');
  }

  return response.json();
};

export const getTypes = async () => {
  const response = await fetch(`${API_URL}/types`);

  if (!response.ok) {
    throw new Error('Error al obtener los productos');
  }

  return response.json();
};

/* export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) throw new Error('Error fetching categories');
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const getSubcategories = async (categoryId) => {
  try {
    const response = await fetch(`${BASE_URL}/categories/${categoryId}/subcategories`);
    if (!response.ok) throw new Error('Error fetching subcategories');
    return await response.json();
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    return [];
  }
};

export const getSubsubcategories = async (subcategoryId) => {
  try {
    const response = await fetch(`${BASE_URL}/subcategories/${subcategoryId}/subsubcategories`);
    if (!response.ok) throw new Error('Error fetching subsubcategories');
    return await response.json();
  } catch (error) {
    console.error('Error fetching subsubcategories:', error);
    return [];
  }
};

export const getTypeProducts = async (subsubcategoryId) => {
  try {
    const response = await fetch(`${BASE_URL}/subsubcategories/${subsubcategoryId}/typeProducts`);
    if (!response.ok) throw new Error('Error fetching typeProducts');
    return await response.json();
  } catch (error) {
    console.error('Error fetching typeProducts:', error);
    return [];
  }
}; */
