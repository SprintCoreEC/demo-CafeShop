import React, { useState, useEffect } from "react";

const SizeSelector = ({ sizes, selectedSize: initialSelectedSize, onSizeSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(sizes)[0] || "");
  const [selectedSize, setSelectedSize] = useState(initialSelectedSize?.size || ""); // Inicializar con talla del prop
  const [filteredSizes, setFilteredSizes] = useState([]);

  useEffect(() => {
    setFilteredSizes(sizes[selectedCategory] || []);
  }, [selectedCategory, sizes]);
  
  useEffect(() => {
    if (initialSelectedSize) {
      setSelectedCategory(initialSelectedSize.category); // Asegurar que la categoría también se actualice
      setSelectedSize(initialSelectedSize.size);
    }
  }, [initialSelectedSize]); // Se ejecuta solo cuando cambia la talla inicial

  useEffect(() => {
    if (selectedSize) {
      onSizeSelect({ size: selectedSize, category: selectedCategory });
    }
  }, [selectedSize, selectedCategory, onSizeSelect]);

  return (
    <div className="mb-6">
      <div className="flex flex-col items-start">
        <span className="block mb-3 font-semibold text-gray-700 text-base">
          Seleccionar tamaño
        </span>

        {/* Categorías */}
        <div className="flex items-center bg-gray-200 rounded-lg p-1 mb-4">
          {Object.keys(sizes).map((category) => (
            <button
              key={category}
              className={`px-3 py-1 mx-0 font-medium text-sm transition-colors duration-200 rounded-lg 
                ${selectedCategory === category
                  ? "bg-white text-gray-800 shadow"
                  : "text-subtitle hover:text-gray-800"
                }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tallas */}
        <div className="grid grid-cols-5 gap-3">
          {filteredSizes.length > 0 ? (
            filteredSizes.map((size) => (
              <button
                key={size}
                className={`px-3 py-1 rounded-lg border text-sm font-medium transition-all duration-200 
                  ${selectedSize === size
                    ? "bg-red-600 text-white border-red-600 shadow-lg"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))
          ) : (
            <span className="col-span-5 text-content text-sm">
              Seleccione una categoría de talla.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SizeSelector;
