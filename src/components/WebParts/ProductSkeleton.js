// components/ProductSkeleton.js
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductSkeleton = () => {
  return (
    <div className="relative w-full bg-white rounded-2xl shadow-lg overflow-hidden max-w-[17rem] cursor-default">
      <div className="relative">
        <Skeleton height={256} className="w-full h-[16rem] object-cover" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent opacity-50"></div>
      </div>
      <div className="flex flex-col -mt-5 content-around relative px-4 pt-2 pb-[3rem] bg-[#fdfdfd] rounded-t-2xl ">
        <h3 className="text-lg font-semibold mb-1 text-[#4F4F4F]">
          <Skeleton width={`80%`} />
        </h3>
        <div className="flex flex-wrap gap-1 mb-1">
          <Skeleton width={50} height={20} style={{ borderRadius: '10px' }} />
          <Skeleton width={50} height={20} style={{ borderRadius: '10px' }} />
          <Skeleton width={50} height={20} style={{ borderRadius: '10px' }} />
        </div>
        <p className="text-[#3D3C46] mb-4 font-normal text-xs">
          <Skeleton count={2} />
        </p>
      </div>
      <div className="absolute h-14 bottom-0 pb-3 w-full flex justify-between px-4 text-[14px] items-center">
        <div className="flex flex-col">
          <Skeleton width={60} />
          <Skeleton width={40} />
        </div>
        <Skeleton height={30} width={100} style={{ borderRadius: '15px' }} />
      </div>
    </div>
  );
};

export default ProductSkeleton;
