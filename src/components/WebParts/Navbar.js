import React, { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import logo from "../../assets/logoCafe.webp";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../../services/carritoProvider";
import { FiMenu } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const { cantidadProductos } = useCarrito();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleMainMenu = () => {
    navigate(`/`);
  };

  const handleCart = () => {
    navigate(`/cart`);
  };

  const handleProfile = () => {
    navigate(`/profile`);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed w-full h-14 lg:h-18 top-0 bg-gradient-to-r from-[#EFE6DA] to-[#F8F3E9] text-icons z-50">
      <div className="w-full h-full px-[6%] lg:px-[10%] flex items-center justify-between border-b-2 border-lines">
        <div
          className="w-10 lg:w-12 h-full flex items-center justify-center overflow-hidden rounded-lg cursor-pointer"
          onClick={handleMainMenu}
        >
          <img src={logo} alt="Logo" className="object-contain w-full h-full" />
        </div>

        {/* Desktop Menu */}
        <div className="items-center hidden justify-center lg:flex w-auto">
          <ul className="lg:flex flex-col lg:px-2 text-sm font-medium rtl:space-x-reverse lg:flex-row lg:bg-transparent relative">
            <div className="flex gap-x-14 font-medium">
              <button onClick={() => navigate(`/home`)} className="relative hover:text-icons-on transition-all hover:translate-y-[2px]">Inicio</button>
              <button onClick={() => navigate(`/`)} className="relative hover:text-icons-on transition-all hover:translate-y-[2px]">Tienda</button>
              <button onClick={() => navigate(`/about`)} className="relative hover:text-icons-on transition-all hover:translate-y-[2px]">Sobre Nosotros</button>
              <button onClick={() => navigate(`/questions`)} className="relative hover:text-icons-on transition-all hover:translate-y-[2px]">Preguntas Frecuentes</button>
            </div>
          </ul>
        </div>

        <div className="flex gap-x-3 md:gap-x-5 items-center">
          <div
            className={`flex items-center border border-icons transition-all duration-300 focus-within:bg-bg pr-2 text-content rounded-2xl`}
          >
            <input
              type="text"
              className={`flex-grow outline-none bg-inherit text-xs h-8 px-[2px] placeholder-icons-off transition-all duration-300 rounded-2xl
              ${isSearchExpanded
                  ? "max-w-full w-28 md:w-full ml-2"
                  : "max-w-[0px] lg:max-w-full w-0 lg:w-auto lg:ml-2"
                }`}
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <IoIosSearch
              className="ml-1 cursor-pointer w-5 h-4 transition-all hover:text-icons-on"
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            />
          </div>

          <button onClick={handleProfile}>
            <IoPersonOutline className="cursor-pointer transition-all hover:text-icons-on" />
          </button>

          <button onClick={handleCart} className="items-center justify-center">
            <div className="absolute rounded-full transition-all bg-special-1 text-white hover:scale-105 top-[10px] bg-primary font-medium w-4 h-4 ml-2 text-[10px] text-center items-center justify-center cursor-pointer">
              <span>{cantidadProductos}</span>
            </div>
            <IoCartOutline className="cursor-pointer transition-all hover:text-icons-on" />
          </button>
          <button onClick={toggleMobileMenu} className="relative">
            {isMobileMenuOpen ? (
              <IoMdClose className="cursor-pointer lg:hidden transition-all hover:text-icons-on" />
            ) : (
              <FiMenu className="cursor-pointer lg:hidden transition-all hover:text-icons-on" />
            )}
          </button>
        </div>
      </div>

      <div 
        className={`lg:hidden absolute w-full bg-gradient-to-r from-[#EFE6DA] to-[#F8F3E9] border-b-2 border-lines shadow-lg transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-64" : "max-h-0"
        }`}
      >
        <div className="flex flex-col py-2 px-[6%]">
          <button 
            onClick={() => handleNavigation('/home')} 
            className="py-3 text-left font-medium hover:text-icons-on transition-all border-b border-lines-light"
          >
            Inicio
          </button>
          <button 
            onClick={() => handleNavigation('/')} 
            className="py-3 text-left font-medium hover:text-icons-on transition-all border-b border-lines-light"
          >
            Tienda
          </button>
          <button 
            onClick={() => handleNavigation('/about')} 
            className="py-3 text-left font-medium hover:text-icons-on transition-all border-b border-lines-light"
          >
            Sobre Nosotros
          </button>
          <button 
            onClick={() => handleNavigation('/questions')} 
            className="py-3 text-left font-medium hover:text-icons-on transition-all"
          >
            Preguntas Frecuentes
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;