import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { listProductsByTypeSlug } from '../../services/productService';
import ProductCard from '../Shopping/Buy/ProductCard';
import Sidebar from '../WebParts/Sidebar';
import ProductSkeleton from '../WebParts/ProductSkeleton';
import NoProducts from '../Advices/NoProducts';
import Navbar from '../WebParts/Navbar';

// Definir el mapeo de tipos de productos a filtros
const productTypeFiltersMap = {
  "rodilleras": [
    {
      title: "Tamaño",
      options: ["Pequeño", "Mediano", "Grande"],
    },
    {
      title: "Material",
      options: ["Neopreno", "Poliéster", "Algodón"],
    },
  ],
  "ternos": [
    {
      title: "Color",
      options: ["Negro", "Gris", "Azul"],
    },
    {
      title: "Tamaño",
      options: ["S", "M", "L", "XL"],
    },
  ],
  "camisetas": [
    {
      title: "Tamaño",
      options: ["S", "M", "L", "XL"],
    },
    {
      title: "Material",
      options: ["Algodón", "Poliéster", "Mezcla"],
    },
  ],
  "chocolate-blanco": [
    {
      title: "Porcentaje de cacao",
      options: ["20%", "30%", "40%"],
    },
    {
      title: "Marca",
      options: ["Nestlé", "Lindt", "Milka"],
    },
  ],
  "relojes": [
    {
      title: "Bandas",
      options: ["Hombre", "Mujer", "Plateadas"],
    },
    {
      title: "Marca",
      options: ["Rolex", "Gucci", "Milka"],
    },
  ],
  // Otros tipos de productos con sus respectivos filtros...
};

const ProductListByType = () => {
  const { slug } = useParams(); // Obtener el slug del tipo de producto desde la URL
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);

  // Obtener los filtros adecuados según el tipo de producto seleccionado
  const productTypeFilters = productTypeFiltersMap[slug] || [];

  // Función de filtrado de productos
  const filterProducts = (searchTerm = "") => {
    const filtered = products.filter((product) => {
      const price = product.newPrice ? parseFloat(product.newPrice) : parseFloat(product.oldPrice);
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesPrice && matchesSearch;
    });
    setFilteredProducts(filtered);
  };

  // Llamada inicial para obtener los productos por tipo
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Iniciar carga
        const data = await listProductsByTypeSlug(slug);
        setProducts(data);
        setFilteredProducts(data); // Inicialmente mostrar todos
      } catch (error) {
        console.error('Error al obtener productos:', error);
      } finally {
        setLoading(false); // Finalizar carga
      }
    };

    fetchProducts();
  }, [slug]);

  // Actualizar el filtro cada vez que cambie el rango de precios, productos o búsqueda
  useEffect(() => {
    filterProducts(searchTerm);
  }, [priceRange, products, searchTerm]);

  return (
    <div className="w-full min-h-screen">
      <Navbar onSearch={(term) => setSearchTerm(term)} />
      <div className="flex">
        {/* Barra lateral de filtros */}
        <div className="flex w-1/4 pt-10 h-[100vh] ml-[8%] justify-center">
          <Sidebar categories={productTypeFilters} onPriceChange={setPriceRange} />
        </div>
        {/* Listado de productos */}
        <div className="flex flex-wrap w-full pl-12 px-8 py-12 pt-[6rem] gap-8 mr-[8%] overflow-y-auto h-full hide-scrollbar">
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <NoProducts />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListByType;