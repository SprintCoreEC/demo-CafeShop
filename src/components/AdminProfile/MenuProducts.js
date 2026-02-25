import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";
import { useProducts } from "../../contexts/ProductsContext";

const MenuProducts = ({ setActiveTab, setProductInfo }) => {
  const {
    loading,
    products,
    searchTerm,
    setSearchTerm,
    handleDeleteProduct,
  } = useProducts();

  return (
    <div className="min-h-screen bg-bg2 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
        style={{ height: "calc(100vh - 3rem)" }}
      >
        {/* Header */}
        <div className="p-6 border-b border-lines flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-title">
            Gestión de Productos
          </h1>
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="peer w-full border border-lines p-2 pl-10 rounded-lg focus:border-button focus:ring-0 focus:outline-none transition-all duration-300"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lines peer-focus:text-button transition-colors duration-300 pointer-events-none" />
            </div>

            <button
              onClick={() => {
                setProductInfo(null);
                setActiveTab("newproduct");
              }}
              className="w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-2 rounded-lg border border-button text-button hover:bg-button hover:text-white transition-all duration-300 shadow-sm active:scale-95"
            >
              Nuevo
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-button"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <p className="text-lg text-subtitle mb-4">
                {searchTerm
                  ? "No se encontraron productos"
                  : "No hay productos registrados"}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-button hover:text-button-on"
                >
                  Limpiar búsqueda
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="border border-lines rounded-xl overflow-hidden flex flex-col h-full bg-white hover:shadow-md transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="relative w-full h-48 bg-gray-100">
                    <LazyLoadImage
                      src={product.image}
                      alt={product.name}
                      effect="blur"
                      className="w-full h-full object-cover"
                      wrapperClassName="w-full h-full"
                    />
                    {/* Discount Badge */}
                    {product.discount > 0 && (
                      <div className="absolute top-3 right-3 bg-button text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
                        -{product.discount}%
                      </div>
                    )}
                    {/* Stock Status */}
                    <div className="absolute bottom-3 left-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.stock > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-delete"
                        }`}
                      >
                        {product.stock > 0
                          ? `${product.stock} disponibles`
                          : "Agotado"}
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 flex flex-col flex-grow">
                    {/* Name and Price */}
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-title line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="flex flex-col items-end">
                        <span className="text-lg font-bold text-button">
                          ${product.newPrice.toFixed(2)}
                        </span>
                        {product.oldPrice > 0 && (
                          <span className="text-xs text-content line-through">
                            ${product.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-content mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Tags */}
                    {product.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="bg-button-off text-xs text-subtitle px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {product.tags.length > 3 && (
                          <span className="bg-button-off text-xs text-subtitle px-2 py-1 rounded-full">
                            +{product.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-auto flex justify-between gap-4">
                      {/* Botón Editar */}
                      <button
                        onClick={() => {
                          setProductInfo(product);
                          setActiveTab("editproduct");
                        }}
                        className="w-1/2 flex justify-center items-center gap-2 px-4 py-2 rounded-lg border border-button text-button hover:bg-button hover:text-white transition-all duration-300 shadow-sm"
                      >
                        Editar
                        <FaEdit className="text-lg" />
                      </button>

                      {/* Botón Eliminar */}
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="w-1/2 flex justify-center items-center gap-2 px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm"
                      >
                        Eliminar
                        <FaTrash className="text-lg" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default MenuProducts;
