import { useState } from "react";
import { toast } from "react-toastify";
import { getAuthHeaders } from "../utils/authHeaders";

const API_URL = "http://localhost:4000/api/products";



export const createProduct = async (productData) => {
  try {
    console.log("🚀 Iniciando `createProduct` en el frontend...");
    console.log("📦 Datos enviados:", productData);

    const headers = await getAuthHeaders();

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("oldPrice", productData.oldPrice);
    formData.append("newPrice", productData.newPrice);
    formData.append("description", productData.description || "");
    formData.append("stock", productData.stock);
    formData.append("rating", productData.rating || 0);
    formData.append("slug", productData.slug || "");

    if (productData.tags && Array.isArray(productData.tags)) {
      formData.append("tags", JSON.stringify(productData.tags));
    }

    if (productData.image) {
      formData.append("image", productData.image);
    }

    const response = await fetch(`${API_URL}/`, {
      method: "POST",
      headers, // no agregues 'Content-Type' manualmente
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Error al crear el producto");
    }

    return result;
  } catch (error) {
    console.error("Error en `createProduct`:", error);
    throw error;
  }
};


export const editProduct = async (id, productData, imageFile) => {
  try {
    console.log("🚀 Iniciando `editProduct` en el frontend...");
    console.log("🆔 ID del producto:", id);
    console.log("📦 Datos enviados:", productData);

    const headers = await getAuthHeaders();

    const formData = new FormData();
    Object.keys(productData).forEach((key) => {
      if (key === "tags" && Array.isArray(productData[key])) {
        formData.append(key, JSON.stringify(productData[key]));
      } else {
        formData.append(key, productData[key]);
      }
    });

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers,
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Error al actualizar el producto");
    }

    return result;
  } catch (error) {
    console.error("Error en `editProduct`:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const headers = await getAuthHeaders();

    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al eliminar el producto");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
};

const CACHE_EXPIRATION_TIME = 60 * 60 * 1000; // 1 hora en milisegundos

export const listProducts = async () => {
  try {
    console.log("🔍 Ejecutando listProducts...");

    console.log("🌍 Haciendo petición a la API:", API_URL);
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    let products = await response.json();
    console.log("📡 Datos obtenidos desde la API (sin filtrar):", products.length);

    // 🔥 Eliminar duplicados usando Map antes de retornar
    const uniqueProducts = Array.from(new Map(
      products.map(product => [product.id, product])
    ).values());

    console.log("Datos después de eliminar duplicados:", uniqueProducts.length);

    return uniqueProducts;
  } catch (error) {
    console.error("🚨 Error al obtener productos:", error);
    throw error;
  }
};

export const getProductsAdmin = async () => {
  try {
    const headers = await getAuthHeaders();

    const response = await fetch(`${API_URL}/adminProducts`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const products = await response.json();

    // Elimina duplicados por ID
    const uniqueProducts = Array.from(
      new Map(products.map((product) => [product.id, product])).values()
    );

    return uniqueProducts;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};






export const getProductById = async (id) => {
  try {
    console.log(`🔍 Buscando producto con ID: ${id}`);

    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`Error al obtener el producto: ${response.status} - ${response.statusText}`);
    }

    const fetchedProduct = await response.json();
    console.log("📡 Producto obtenido desde la API:", fetchedProduct);

    return fetchedProduct;
  } catch (error) {
    console.error("🚨 Error al obtener el producto:", error);
    throw error;
  }
};



export const getProductsBySubCategory = async (subCategoryId) => {
  try {
    console.log(`🔍 Buscando productos en subcategoría: ${subCategoryId}`);

    const response = await fetch(`${API_URL}/subCategory/${subCategoryId}`);

    if (!response.ok) {
      throw new Error(`Error al obtener los productos: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("📡 Productos obtenidos desde la API:", data.length);

    return data;
  } catch (error) {
    console.error("🚨 Error al obtener productos por subcategoría:", error);
    throw error;
  }
};



export const listProductsByTypeSlug = async (slug) => {
  try {
    console.log(`🔍 Buscando productos con tipo de slug: ${slug}`);

    const response = await fetch(`${API_URL}/producttype/${slug}`);

    if (!response.ok) {
      throw new Error(`Error al obtener productos: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("📡 Productos obtenidos desde la API:", data.length);

    return data;
  } catch (error) {
    console.error("🚨 Error al obtener productos por tipo de slug:", error);
    throw error;
  }
};


export const listProductsByType = async (productTypeId) => {
  try {
    console.log(`🔍 Buscando productos con tipo de producto ID: ${productTypeId}`);

    const response = await fetch(`${API_URL}/producttype/${productTypeId}`);

    if (!response.ok) {
      throw new Error(`Error al obtener productos: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("📡 Productos obtenidos desde la API:", data.length);

    return data;
  } catch (error) {
    console.error("🚨 Error al obtener productos por tipo:", error);
    throw error;
  }
};


export const getProductsByCategorySlug = async (slug) => {
  try {
    console.log(`🔍 Buscando productos en la categoría con slug: ${slug}`);

    const response = await fetch(`${API_URL}/category/${slug}`);

    if (!response.ok) {
      throw new Error(`Error al obtener productos: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("📡 Productos obtenidos desde la API:", data.length);

    return data;
  } catch (error) {
    console.error("🚨 Error al obtener productos por slug de categoría:", error);
    throw error;
  }
};


export const getProductsByCategory = async (categoryId) => {
  try {
    console.log(`🔍 Buscando productos en la categoría con ID: ${categoryId}`);

    const response = await fetch(`${API_URL}/category/${categoryId}`);

    if (!response.ok) {
      throw new Error(`Error al obtener productos: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("📡 Productos obtenidos desde la API:", data.length);

    return data;
  } catch (error) {
    console.error("🚨 Error al obtener productos por categoría:", error);
    throw error;
  }
};



export const getProductBySlug = async (slug) => {
  try {
    console.log(`🔍 Buscando producto con slug: ${slug}`);

    const response = await fetch(`${API_URL}/slug/${slug}`);

    if (!response.ok) {
      throw new Error(`Error al obtener el producto: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("📡 Producto obtenido desde la API:", data);

    return data;
  } catch (error) {
    console.error("🚨 Error al obtener el producto por slug:", error);
    throw error;
  }
};


