import React from 'react';

const CustomCheckbox = ({ checked, onChange, label }) => {
  return (
    <label className="flex items-center cursor-pointer select-none">
      <div className="relative">
        <input
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={onChange}
        />
        <div
          className={`w-4 h-4 flex items-center justify-center border-2 rounded ${checked ? 'bg-[#F2372E] border-[#F2372E]' : 'border-gray-300'}`}
        >
          {checked && (
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          )}
        </div>
      </div>
      <span className="ml-2 text-subtitle">{label}</span>
    </label>
  );
};

export default CustomCheckbox;
