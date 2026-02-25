import React, { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import PriceRange from './PriceRange';

const Sidebar = ({ categories, onPriceChange }) => {
    const [activeCategories, setActiveCategories] = useState({});
    const [priceRange, setPriceRange] = useState([0, 100]);

    const toggleCategory = (index) => {
        setActiveCategories((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    const handlePriceChange = (newRange) => {
        setPriceRange(newRange);
        onPriceChange(newRange);
    };

    return (
        <div className="relative pb-1 w-full mt-14 hidden md:block text-subtitle outline-none max-w-[18rem]">
            <h2 className="font-semibold text-content ml-3 mb-4">Filtrar</h2>

            {/* Rango de precio */}
            <div className="flex mb-6 justify-center z-10">
                <PriceRange priceRange={priceRange} setPriceRange={handlePriceChange} />
            </div>
            <hr className="w-full my-4 border-gray-300" />

            {/* Filtros de las categorías */}
            {categories.map((category, index) => (
                <div key={index} className="mb-4">
                    <button
                        className="flex items-center justify-between w-full text-left font-semibold py-2 px-4"
                        onClick={() => toggleCategory(index)}
                    >
                        {category.title}
                        <span>{activeCategories[index] ? <FaAngleUp /> : <FaAngleDown />}</span>
                    </button>
                    {activeCategories[index] && (
                        <ul className="mt-2 pl-4">
                            {category.options.map((option, idx) => (
                                <li key={idx} className="flex items-center py-1 pl-1">
                                    <input
                                        type="checkbox"
                                        className="mr-3 rounded-md text-gray-400 focus:ring-gray-400 border-gray-300"
                                        id={`option-${index}-${idx}`}
                                    />
                                    <label htmlFor={`option-${index}-${idx}`} className="text-sm font-medium">
                                        {option}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    )}
                    <hr className="w-full mt-4 border-gray-300" />
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
