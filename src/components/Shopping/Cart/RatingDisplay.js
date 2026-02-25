import React from 'react';
import { FaStar } from 'react-icons/fa';

const RatingDisplay = ({ rating, votes }) => (
  <div className="flex items-center mb-4">
    {[...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-[#F2C518] fill-[#F2C518]' : 'text-[#D1D1D1]'}`} // Color de estrella vacía
      />
    ))}
    <span className="ml-2 text-[#3D3C46] text-sm font-semibold">{votes} votos</span>
  </div>
);

export default RatingDisplay;
