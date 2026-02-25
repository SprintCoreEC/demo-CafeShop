import React from "react";
const QuantitySelector = ({ quantity, onIncrease, onDecrease, handleAddToCart}) => (
  <div className="w-full text-blank">
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center rounded-lg w-full">
        <button
          onClick={onDecrease}
          className="p-2 w-[34px] aspect-square rounded-tl-md rounded-bl-md hover:bg-special-button bg-special-button-on mr-[2px] transition-all duration-300"
        >
          -
        </button>
        <button onClick={handleAddToCart} className="flex-1 text-center font-medium py-2 text-blank hover:bg-special-button rounded-sm bg-special-button-on transition-all duration-300">
          Añadir al carrito ({quantity})
        </button>
        <button
          onClick={onIncrease}
          className="p-2 w-[34px] aspect-square rounded-tr-md rounded-br-md hover:bg-special-button bg-special-button-on ml-[2px] transition-all duration-300"
        >
        +
        </button>
      </div>
    </div>
    {/* <ToastContainer/> */}
  </div>
);

export default QuantitySelector;
