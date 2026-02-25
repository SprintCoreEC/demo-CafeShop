import React from 'react';

const Price = ({ oldPrice, newPrice }) => {
  return (
    <div className="absolute flex flex-col items-end right-0 pr-4">
      {newPrice ? (
        <>
          {/* <span className="line-through block text-xs text-gray-400 font-semibold" style={{ textDecorationColor: '#F90000' }}>
            ${oldPrice}
          </span> */}
          <span className="font-bold text-lg text-[#5C5C5C]" >
            ${newPrice}
          </span>
        </>
      ) : (
        <span> ${oldPrice} </span>
      )}
    </div>
  );
};

export default Price;