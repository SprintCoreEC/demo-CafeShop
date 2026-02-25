import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import PriceDisplay from "./Price";
import RatingDisplay from "../Cart/RatingDisplay";
import Tag from "./Tag";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "../Cart/QuantitySelector";
import ColorSelector from "../Cart/ColorSelector";
import ImageGalery from "../Buy/ImageGallery";
import ProductDetailSkeleton from "../../WebParts/ProductDetailSkeleton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetailCard = ({ product, fetchProductDetails }) => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] = useState("EC");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [mainImage, setMainImage] = useState("");
  const [colorImages, setColorImages] = useState([]);

  const currentProduct = product;

  const maxQuantity = useMemo(() => {
    const s = parseInt(currentProduct?.stock || "0", 10);
    return Number.isFinite(s) && s > 0 ? s : 1;
  }, [currentProduct?.stock]);

  const updateImagesByColor = (color, colors, images) => {
    // colors: objeto { "Rojo": ["url1", "url2"], ... }
    // images: arreglo fallback ["url1", ...]
    if (colors && color && colors[color] && colors[color].length > 0) {
      setColorImages(colors[color]);
      setMainImage(colors[color][0] || "");
      return;
    }

    if (Array.isArray(images) && images.length > 0) {
      setColorImages(images);
      setMainImage(images[0] || "");
      return;
    }

    setColorImages([]);
    setMainImage("");
  };

  // ✅ DEMO: cargar detalles por slug (1 vez por cambio)
  useEffect(() => {
    if (!slug) return;
    fetchProductDetails(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // ✅ Cuando llega el producto, inicializa imágenes y reinicia selecciones base
  useEffect(() => {
    if (!currentProduct) return;

    // reset suave para demo (sin "editar producto" desde carrito)
    setQuantity(1);
    setSelectedColor("");
    setSelectedSize("EC");

    updateImagesByColor("", currentProduct.colors, currentProduct.images);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProduct]);

  // ✅ Cambiar imágenes si seleccionas color
  useEffect(() => {
    if (!currentProduct) return;
    updateImagesByColor(selectedColor, currentProduct.colors, currentProduct.images);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColor]);

  if (!currentProduct) {
    return <ProductDetailSkeleton />;
  }

  const {
    name,
    tags,
    description,
    oldPrice,
    newPrice,
    rating,
    votes,
    sizes,
    images,
    discount,
    stock,
    colors,
  } = currentProduct;

  const handleGoBack = () => {
    navigate("/");
  };

  // ✅ DEMO: agrega al carrito (si tu CarritoDeCompras usa localStorage/context interno, funcionará)
  // Si tu carrito todavía depende de backend, igual quedará el toast y podrás enseñar el flujo.
  const handleAddToCart = () => {
    if (sizes && !selectedSize) {
      toast.error("Por favor selecciona una talla antes de agregar al carrito");
      return;
    }
    if (colors && !selectedColor) {
      toast.error("Por favor selecciona un color antes de agregar al carrito");
      return;
    }

    try {
      const productoSeleccionado = {
        slug: currentProduct.slug,
        nombre: name,
        precio: newPrice || oldPrice,
        imagen: mainImage || (Array.isArray(images) ? images[0] : ""),
        cantidad: quantity,
        talla: selectedSize,
        color: selectedColor || "predeterminado",
      };

      // ✅ Demo-friendly: guardamos en localStorage como respaldo (si tu app ya tiene provider, esto no estorba)
      // - Si ya tienes un carrito real en contexto, puedes quitar este bloque.
      const key = "demo_cart_items";
      const prev = JSON.parse(localStorage.getItem(key) || "[]");
      localStorage.setItem(key, JSON.stringify([...prev, productoSeleccionado]));

      toast.success("Producto agregado al carrito correctamente");
    } catch (error) {
      toast.error("Error al procesar el producto");
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity((prev) => prev + 1);
    } else {
      toast.warning(`Solo hay ${maxQuantity} unidades disponibles.`);
    }
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="relative w-full h-auto cursor-default pt-[3.6rem]">
      <div className="flex h-full">
        <div className="w-1/2 pt-2 relative">
          <button
            onClick={handleGoBack}
            className="relative left-4 top-4 p-2 bg-white rounded-full shadow-md hover:bg-[#5E558A] hover:text-white z-10 hover:scale-110 transition duration-300 flex items-center justify-center"
          >
            <FaArrowLeft className="h-5 w-5" />
          </button>

          {colorImages && (
            <ImageGalery
              name={name}
              images={colorImages}
              discount={discount}
              onImageSelect={setMainImage}
            />
          )}
        </div>

        <div className="w-1/2 md:pr-[8%] pt-8">
          <PriceDisplay oldPrice={oldPrice} newPrice={newPrice} />
          <h2 className="text-2xl font-semibold mt-2 mb-2 text-[#4F4F4F]">
            {name}
          </h2>

          {rating && <RatingDisplay rating={rating} votes={votes} />}

          <div className="flex flex-wrap gap-2 mb-2">
            {tags && tags.map((tag, index) => <Tag key={index} text={tag} />)}
          </div>

          <div className="my-4">
            <h3 className="font-semibold mb-1 text-[16px] text-[#4F4F4F]">
              Descripción
            </h3>
            <p className="text-[#636363] font-normal">{description}</p>
          </div>

          {/* Selector de tamaños */}
          {sizes && (
            <SizeSelector
              sizes={sizes}
              selectedSize={selectedSize}
              onSizeSelect={setSelectedSize}
            />
          )}

          {/* Selector de colores */}
          {colors && (
            <ColorSelector
              colors={colors}
              selectedColor={selectedColor}
              onColorSelect={(color) => setSelectedColor(color)}
            />
          )}

          <QuantitySelector
            quantity={quantity}
            onIncrease={handleIncreaseQuantity}
            onDecrease={handleDecreaseQuantity}
          />

          <button
            className="my-4 w-full py-[0.8em] transition-all text-center bg-white border-2 text-[12px] border-[#5E558A] text-[#5E558A] rounded-lg font-bold hover:bg-[#5E558A] hover:text-gray-50"
            onClick={handleAddToCart}
          >
            Agregar al carrito
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ProductDetailCard;
