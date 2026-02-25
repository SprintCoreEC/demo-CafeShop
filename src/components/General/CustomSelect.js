import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from "react-icons/fa";

const CustomSelect = ({ options, initialValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialValue);
  const selectRef = useRef(null);

  const statusColors = {
    'Pendiente': 'bg-yellow-100 text-yellow-800',
    'Procesando': 'bg-blue-100 text-blue-800',
    'Completado': 'bg-green-100 text-green-800',
    'Cancelado': 'bg-red-100 text-red-800'
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

  return (
    <div ref={selectRef} className="relative inline-block text-left">
      <button
        type="button"
        className="flex items-center justify-between w-36 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className={`flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedOption]}`}>
          {selectedOption}
        </span>
        <FaChevronDown
          className={`ml-2 h-3 w-3 text-content transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-1 w-36 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {options.map((option) => (
              <button
                key={option}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${option === selectedOption ? 'bg-gray-50' : ''}`}
                role="menuitem"
                onClick={() => handleSelect(option)}
              >
                <span className={`flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[option]}`}>
                  {option}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
