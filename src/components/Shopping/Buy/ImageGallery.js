import React, { useState, useEffect, useCallback, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ImageGallery = ({ name, images, discount, onImageSelect }) => {
  const [displayImages, setDisplayImages] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const productIdRef = useRef(null);

  const initializeImages = useCallback(() => {
    if (images.length > 0) {
      setDisplayImages(images);
      setMainImage(images[0]);
      onImageSelect(images[0]);
    }
  }, [images, onImageSelect]);

  useEffect(() => {
    const currentProductId = `${name}-${images[0]}`;

    if (productIdRef.current !== currentProductId) {
      productIdRef.current = currentProductId;
      initializeImages();
    }
  }, [name, images, initializeImages]);

  const handleImageClick = (clickedImage) => {
    setDisplayImages((prevImages) => {
      const mainImageIndex = prevImages.indexOf(mainImage);
      const clickedImageIndex = prevImages.indexOf(clickedImage);
      const newImages = [...prevImages];

      newImages[mainImageIndex] = clickedImage;
      newImages[clickedImageIndex] = mainImage;

      setMainImage(clickedImage);
      onImageSelect(clickedImage);
      return newImages;
    });
  };

  const formattedDiscount = discount ? `-${discount}% OFF` : '';

  return (
    <div className="flex flex-col p-4 w-auto items-center">
      <div className="relative md:w-[70%] center">
        <LazyLoadImage
          src={mainImage}
          alt={name}
          effect="blur"
          wrapperClassName="w-full h-auto aspect-square rounded-lg mb-8 shadow-md overflow-hidden"
          className="w-full h-full object-cover"
        />
        {formattedDiscount && (
          <div className="absolute max-w-30 top-0 right-0 bg-red-600 text-white font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg shadow-lg shadow-white">
            {formattedDiscount}
          </div>
        )}
      </div>
      <div className="flex md:w-[70%] justify-between">
        {displayImages.slice(1, 4).map((img, index) => (
          <div key={`${img}-${index}`} className="w-[30%] aspect-square rounded-lg overflow-hidden shadow-md">
            <LazyLoadImage
              src={img}
              alt={`${name} - ${index + 1}`}
              effect="blur"
              onClick={() => handleImageClick(img)}
              wrapperClassName="w-full h-full"
              className="w-full h-full object-cover cursor-pointer transition duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
