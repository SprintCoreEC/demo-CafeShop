import React from "react";

const ColorSelector = ({ colors = [], selectedColor, onColorSelect }) => {
  const handleColorSelect = (color) => {
    onColorSelect(color); // Pasar el color seleccionado al componente padre
  };

  return (
    <div className="mb-4 text-[12px]">
      <div className="flex flex-col items-start">
        <span className="block mb-2 font-semibold text-[#4F4F4F] text-[16px]">
          Colores disponibles
        </span>
        <div className="flex items-center gap-2">
          {Object.keys(colors).map((color, index) => (
            <button
              key={index}
              className={`w-8 h-8 rounded-full transition border-2 duration-300 hover:scale-105 ${selectedColor === color ? "border-gray-500 scale-[1.1]" : "border-gray-300"
                }`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect(color)}
              aria-label={`Seleccionar color ${color}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorSelector;
