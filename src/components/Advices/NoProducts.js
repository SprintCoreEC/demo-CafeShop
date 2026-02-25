import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaSearch, FaBox } from 'react-icons/fa';
import { GiBoxTrap } from "react-icons/gi";

const NoProducts = () => {
  const [showIcons, setShowIcons] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowIcons(window.innerWidth >= 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const baseButtonStyles = 'px-4 py-2 rounded-lg flex items-center justify-center font-medium transition-all duration-300 hover:scale-105';

  const outlineButtonStyles = `${baseButtonStyles} border border-gray-300 text-gray-800`;
  const solidButtonStyles = `${baseButtonStyles} bg-black text-white`;

  return (
    <div className="flex flex-col w-full items-center justify-center rounded-lg pt-24 -translate-x-14 md:translate-x-0">
      <GiBoxTrap className="h-20 w-20 text-icons mb-4" />
      <h2 className="text-2xl font-semibold text-center mb-2 px-2">No hay productos disponibles</h2>
      <p className="text-content text-center mb-6 px-2 max-w-md">
        Lo sentimos, por el momento no hay artículos disponibles en esta sección.
        Estamos trabajando para brindarte los mejores productos.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 sm:justify-center sm:items-center px-2 text-center">
        <Link to="/" className={`${outlineButtonStyles} w-full sm:w-auto text-subtitle border-lines hover:text-title`}>
          {showIcons && <FaArrowLeft className="mr-2 h-4 w-4" />} Volver a la tienda
        </Link>
        <Link to="/" className={`${solidButtonStyles} w-full sm:w-auto bg-button`}>
          {showIcons && <FaSearch className="mr-2 h-4 w-4" />} Encuentra otros productos
        </Link>
      </div>
    </div>
  );
};

export default NoProducts;