import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByCategorySlug } from '../../services/productService';
import ProductCard from '../Shopping/Buy/ProductCard';
import Sidebar from '../WebParts/Sidebar';
import ProductSkeleton from '../WebParts/ProductSkeleton';
import NoProducts from '../Advices/NoProducts';
import Navbar from '../WebParts/Navbar';

// Definir el mapeo de categorías a filtros
const categoryFiltersMap = {
    "vestimenta": [
        {
            title: "Tipo de Prenda",
            options: ["Camisetas", "Pantalones", "Chaquetas"],
        },
        {
            title: "Talla",
            options: ["S", "M", "L", "XL"],
        },
    ],
    "glaseadas": [
        {
            title: "Tipo de Glaseado",
            options: ["Chocolate", "Vainilla", "Fresa"],
        },
        {
            title: "Envases",
            options: ["Bolsa", "Caja"],
        },
    ],
    "tecnologia": [
        {
            title: "Categoría",
            options: ["Laptops", "Tabletas", "Teléfonos"],
        },
        {
            title: "Marca",
            options: ["Apple", "Samsung", "Dell"],
        },
    ],
    "suplementos": [
        {
            title: "Tipo",
            options: ["Proteína", "Creatina", "Vitaminas"],
        },
        {
            title: "Presentación",
            options: ["Polvo", "Cápsulas", "Tabletas"],
        },
    ],
};

const ProductListByCategory = () => {
    const { slug } = useParams(); // Obtener el slug de la categoría desde la URL
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState([0, 100]);

    // Obtener los filtros adecuados según la categoría seleccionada
    const categoryFilters = categoryFiltersMap[slug] || [];

    // Función de filtrado de productos
    const filterProducts = (searchTerm = '') => {
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

    // Llamada inicial para obtener los productos por categoría
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true); // Iniciar carga
                setProducts([]); // Vaciar productos al iniciar carga
                setFilteredProducts([]); // Vaciar productos filtrados

                const data = await getProductsByCategorySlug(slug);
                setProducts(data);
                setFilteredProducts(data); // Inicialmente mostrar todos
            } catch (error) {
                console.error('Error al obtener productos:', error);
            } finally {
                setLoading(false); // Finalizar carga
            }
        };

        fetchProducts();
    }, [slug]); // Escuchar cambios en el slug de la categoría

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
                    <Sidebar categories={categoryFilters} onPriceChange={setPriceRange} />
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

export default ProductListByCategory;