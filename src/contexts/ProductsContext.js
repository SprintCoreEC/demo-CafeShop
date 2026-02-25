import { createContext, useState, useContext, useEffect } from "react";
import { getProductsAdmin, deleteProduct } from "../services/productService";
import { toast } from "react-toastify";

const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const productsData = await getProductsAdmin();

            const formattedProducts = productsData.map((product) => ({
                id: product.id,
                name: product.name,
                description: product.description,
                newPrice: product.newPrice,
                oldPrice: product.oldPrice,
                stock: parseInt(product.stock, 10),
                status: parseInt(product.stock, 10) > 0 ? "En stock" : "Agotado",
                image: product.image,
                tags: product.tags || [],
                rating: product.rating || 0,
                votes: product.votes || 0,
                discount: product.discount || 0,
            }));

            const uniqueProducts = [
                ...new Map(formattedProducts.map((product) => [product.id, product])).values(),
            ];

            setProducts(uniqueProducts);
            setLoading(false);
        } catch (error) {
            toast.error("Error al obtener los productos.");
            console.error("❌ Error al obtener los productos:", error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await deleteProduct(id);
            toast.success("Producto eliminado con éxito.");
            fetchProducts();
        } catch (error) {
            toast.error("Error al eliminar el producto.");
            console.error("❌ Error al eliminar el producto:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductsContext.Provider
            value={{
                loading,
                setLoading,
                products,
                searchTerm,
                setSearchTerm,
                fetchProducts,
                handleDeleteProduct,
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
};
