import React from 'react';

const ProductDetailSkeleton = () => {
  return (
    <div className="relative w-full h-auto cursor-default pt-[3.6rem]">
      <div className="flex h-full gap-8">
        {/* Parte izquierda - Galería de imágenes */}
        <div className="w-1/2 pt-2 relative pl-28">
          {/* Imagen principal */}
          <div className="md:w-[82%] h-[428px] bg-[#EBEBEB] animate-pulse rounded-lg mb-8 mt-16"></div>
          {/* Miniaturas de imágenes */}
          <div className="flex justify-between gap-4 md:w-[82%]">
            <div className="w-[30%] h-[100px] bg-[#EBEBEB] animate-pulse rounded-lg"></div>
            <div className="w-[30%] h-[100px] bg-[#EBEBEB] animate-pulse rounded-lg"></div>
            <div className="w-[30%] h-[100px] bg-[#EBEBEB] animate-pulse rounded-lg"></div>
          </div>
        </div>

        {/* Parte derecha - Detalles del producto */}
        <div className="w-1/2 md:pr-[8%] pt-8 ">
          {/* Precio */}
          <div className="w-10 h-4 bg-[#EBEBEB] animate-pulse rounded mb-4"></div>
          <div className="w-14 h-6 bg-[#EBEBEB] animate-pulse rounded mb-4"></div>
          {/* Nombre del producto */}
          <div className="w-2/3 h-8 bg-[#EBEBEB] animate-pulse rounded mb-4"></div>
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="h-4 bg-[#EBEBEB] w-24 rounded"></div>
            <div className="ml-2 h-4 bg-[#EBEBEB] w-12 rounded"></div>
          </div>
          {/* Etiquetas */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="w-16 h-6 bg-[#EBEBEB] animate-pulse rounded"></div>
            <div className="w-16 h-6 bg-[#EBEBEB] animate-pulse rounded"></div>
            <div className="w-16 h-6 bg-[#EBEBEB] animate-pulse rounded"></div>
          </div>
          {/* Descripción */}
          <div className="my-4">
            <div className="w-1/4 h-6 bg-[#EBEBEB] animate-pulse rounded mb-2"></div>
            <div className="w-3/4 h-4 bg-[#EBEBEB] animate-pulse rounded mb-2"></div>
            <div className="w-3/4 h-4 bg-[#EBEBEB] animate-pulse rounded mb-2"></div>
          </div>
          {/* Selector de Tallas */}
          <div className="my-4">
            <div className="w-1/4 h-6 bg-[#EBEBEB] animate-pulse rounded mb-2"></div>
            <div className="w-1/4 h-8 bg-[#EBEBEB] animate-pulse rounded mb-2"></div>
            <div className="flex flex-row">
              <div className="w-8 h-8 mr-2 bg-[#EBEBEB] animate-pulse rounded mb-2"></div>
              <div className="w-8 h-8 mr-2 bg-[#EBEBEB] animate-pulse rounded mb-2"></div>
            </div>
          </div>
          {/* Selector de Cantidad */}
          <div className="w-14 h-6 bg-[#EBEBEB] animate-pulse rounded mb-2"></div>
          <div className="w-20 h-10 bg-[#EBEBEB] animate-pulse rounded-lg mb-4"></div>
          {/* Botón de agregar al carrito */}
          <div className="w-full h-12 bg-[#EBEBEB] animate-pulse rounded-lg mt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
