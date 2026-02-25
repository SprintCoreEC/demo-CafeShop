import { useState, useEffect } from "react";
import { createProduct, editProduct } from "../../services/productService";
import { getTypes } from "../../services/apiService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import ImageSelector from "../Shopping/Buy/ImageSelector";
import { motion, AnimatePresence } from "framer-motion";

const NewProduct = ({ productToEdit, setActiveTab }) => {
  const [isEditMode, setIsEditMode] = useState(!!productToEdit);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  // Form states
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [productTypeId, setProductTypeId] = useState("");
  const [types, setTypes] = useState([]);

  useEffect(() => {
    setIsEditMode(!!productToEdit);
    if (productToEdit) {
      setId(productToEdit.id || "");
      setName(productToEdit.name || "");
      setOldPrice(productToEdit.oldPrice || "");
      setNewPrice(productToEdit.newPrice || "");
      setDescription(productToEdit.description || "");
      setStock(productToEdit.stock || "");
      setTags(productToEdit.tags || []);
      setImage(productToEdit.image || "");
      setProductTypeId(productToEdit.productTypeId || "");
    } else {
      // Reset form when not in edit mode
      setId("");
      setName("");
      setOldPrice("");
      setNewPrice("");
      setDescription("");
      setStock("");
      setTags([]);
      setImage("");
      setProductTypeId("");
    }
  }, [productToEdit]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const data = await getTypes();
        setTypes(data);
      } catch (error) {
        console.error("Error fetching product types:", error);
        toast.error("Error al cargar los tipos de producto");
      }
    };
    fetchTypes();
  }, []);

  const handleTagInputChange = (e) => setTagInput(e.target.value);

  const handleTagKeyPress = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const validateProduct = () => {
    if (!name.trim()) {
      toast.error("Por favor, ingresa un nombre para el producto.");
      return false;
    }
    if (!stock || isNaN(stock) || Number(stock) < 0) {
      toast.error("Por favor, ingresa un stock válido.");
      return false;
    }
    if (isNaN(oldPrice) || isNaN(newPrice)) {
      toast.error("Por favor, ingresa precios válidos.");
      return false;
    }
    if (Number(newPrice) >= Number(oldPrice)) {
      toast.error("El precio de oferta debe ser menor que el precio original.");
      return false;
    }
    if (tags.length === 0) {
      toast.error("Por favor, agrega al menos una etiqueta.");
      return false;
    }
    if (!image) {
      toast.error("Por favor, selecciona una imagen para el producto.");
      return false;
    }
    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateProduct()) return;

    setLoading(true);

    try {
      const productData = {
        name,
        oldPrice: parseFloat(oldPrice),
        newPrice: parseFloat(newPrice),
        description,
        stock: parseInt(stock),
        tags,
        productTypeId,
        image,
      };

      if (isEditMode) {
        await editProduct(id, productData, image);
        toast.success("Producto actualizado con éxito");
      } else {
        await createProduct(productData);
        toast.success("Producto creado con éxito");
      }
      
      setActiveTab("products");
    } catch (error) {
      console.error("Error processing product:", error);
      toast.error(`Error al ${isEditMode ? "actualizar" : "crear"} el producto`);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (value) => {
    if (!value) return "";
    return parseFloat(value).toFixed(2);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-bg2 p-4 sm:p-6"
    >
      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-icons border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-white">
                {isEditMode ? "Actualizando producto..." : "Creando producto..."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-box h-[92vh] overflow-y-scroll rounded-xl shadow-lg p-6 border border-lines mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("products")}
            className="p-2 bg-white rounded-full shadow-md hover:bg-title text-icons hover:text-blank transition-colors duration-300 mr-4"
          >
            <FaArrowLeft className="h-5 w-5 hover:text-inherit" />
          </motion.button>
          <h2 className="text-2xl font-bold text-title">
            {isEditMode ? 'Actualizar producto' : 'Crear nuevo producto'}
          </h2>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Product Name */}
          <motion.div 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-sm font-medium text-subtitle mb-2">
              Nombre del Producto <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre del producto"
              className="w-full px-4 py-2 border border-lines rounded-lg focus:ring-2 focus:ring-icons-on focus:border-transparent transition-all"
              required
            />
          </motion.div>

          {/* Product Type */}
          {/* <motion.div 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-subtitle mb-2">
              Tipo de Producto <span className="text-red-500">*</span>
            </label>
            <select
              value={productTypeId}
              onChange={(e) => setProductTypeId(e.target.value)}
              className="w-full px-4 py-2 border border-lines rounded-lg focus:ring-2 focus:ring-icons-on focus:border-transparent transition-all"
              required
            >
              <option value="">Selecciona un tipo</option>
              {types.map((type) => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </motion.div>
 */}
          {/* Prices */}
          <motion.div 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-sm font-medium text-subtitle mb-2">
                Precio Original <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-content">$</span>
                <input
                  type="number"
                  value={oldPrice}
                  onChange={(e) => setOldPrice(e.target.value)}
                  onBlur={(e) => setOldPrice(formatPrice(e.target.value))}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-2 border border-lines rounded-lg focus:ring-2 focus:ring-icons-on focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-subtitle mb-2">
                Precio Oferta <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-content">$</span>
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  onBlur={(e) => setNewPrice(formatPrice(e.target.value))}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-2 border border-lines rounded-lg focus:ring-2 focus:ring-icons-on focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
          </motion.div>

          {/* Stock */}
          <motion.div 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-medium text-subtitle mb-2">
              Stock Disponible <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="0"
              min="0"
              className="w-full px-4 py-2 border border-lines rounded-lg focus:ring-2 focus:ring-icons-on focus:border-transparent transition-all"
              required
            />
          </motion.div>
        </div>

        {/* Description */}
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <label className="block text-sm font-medium text-subtitle mb-2">
            Descripción <span className="text-sm text-content">(Máx. 160 caracteres)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe el producto..."
            maxLength={160}
            rows={3}
            className="w-full px-4 py-2 border border-lines rounded-lg focus:ring-2 focus:ring-icons-on focus:border-transparent transition-all"
          />
          <div className="flex justify-between mt-1">
            <p className="text-xs text-content">
              {description.length}/160 caracteres
            </p>
            {description.length >= 160 && (
              <p className="text-xs text-red-500">Límite alcanzado</p>
            )}
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-6"
        >
          <label className="block text-sm font-medium text-subtitle mb-2">
            Etiquetas <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagKeyPress}
            placeholder="Escribe y presiona Enter o ',' para agregar"
            className="w-full px-4 py-2 border border-lines rounded-lg focus:ring-2 focus:ring-icons-on focus:border-transparent transition-all"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            <AnimatePresence>
              {tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="bg-button-off text-title px-3 py-1 rounded-full text-sm flex items-center hover:bg-lines transition-colors cursor-pointer"
                  onClick={() => removeTag(tag)}
                >
                  {tag} <FaTimes className="ml-1 text-xs" />
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
          {tags.length === 0 && (
            <p className="text-xs text-content mt-1">Agrega al menos una etiqueta</p>
          )}
        </motion.div>

        {/* Image Selector */}
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <label className="block text-sm font-medium text-subtitle mb-2">
            Imagen del Producto <span className="text-red-500">*</span>
          </label>
          <ImageSelector setImage={setImage} initialImage={image} />
          {!image && (
            <p className="text-xs text-red-500 mt-1">Debes seleccionar una imagen</p>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-end"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleFormSubmit}
            className="px-6 py-3 bg-button text-white rounded-lg font-medium transition-colors duration-300 hover:bg-button-on shadow-md"
          >
            {isEditMode ? "Actualizar Producto" : "Crear Producto"}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NewProduct;