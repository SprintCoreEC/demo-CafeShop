import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const CustomSelectNew = ({ options, initialValue, onChange, customStyles }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialValue);
  const [dropdownDirection, setDropdownDirection] = useState('down');
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setSelectedOption(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && selectRef.current && dropdownRef.current) {
      const selectRect = selectRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - selectRect.bottom;
      const dropdownHeight = 200; // Altura estimada del dropdown (ajusta según necesites)
      
      setDropdownDirection(spaceBelow < dropdownHeight ? 'up' : 'down');
    }
  }, [isOpen]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

  // Convertir opciones a formato simple si vienen como objetos {value, label}
  const normalizedOptions = options.map(opt => typeof opt === 'object' ? opt.value : opt);

  return (
    <div ref={selectRef} className="relative inline-block text-left min-w-[120px]">
      <button
        type="button"
        className={`flex items-center justify-between w-full px-3 py-2 text-sm bg-white border border-lines rounded-lg shadow-sm hover:border-icons focus:outline-none focus:ring-1 focus:ring-icons-on ${
          customStyles?.control ? customStyles.control : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="truncate text-content">
          {selectedOption}
        </span>
        <FaChevronDown
          className={`ml-2 h-3 w-3 text-content transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: dropdownDirection === 'down' ? -10 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: dropdownDirection === 'down' ? -10 : 10 }}
            transition={{ duration: 0.2 }}
            className={`absolute right-0 z-50 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
              dropdownDirection === 'down' ? 'mt-1' : 'mb-1 bottom-full'
            }`}
          >
            <div className="py-1 max-h-60 overflow-auto" role="menu" aria-orientation="vertical">
              {normalizedOptions.map((option) => (
                <button
                  key={option}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-lines focus:bg-lines focus:outline-none ${
                    option === selectedOption ? 'bg-gray-50' : ''
                  }`}
                  role="menuitem"
                  onClick={() => handleSelect(option)}
                >
                  <span className="text-content">
                    {option}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomSelectNew;