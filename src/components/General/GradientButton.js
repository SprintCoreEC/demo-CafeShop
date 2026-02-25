import React from 'react';

const GradientButton = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="text-white w-full h-full rounded-lg px-6 py-2 lg:text-md md:text-xs transition duration-300 bg-[#B45309] hover:bg-[#9C460C]"
  >
    {children}
  </button>
);

export default GradientButton;