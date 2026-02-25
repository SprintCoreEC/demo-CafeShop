import React, { useMemo, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Tag from "./Tag";
import Price from "./Price";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CarritoContext } from "../../../services/carritoProvider";
import "react-lazy-load-image-component/src/effects/blur.css";
import QuantitySelector from "../Cart/QuantitySelector";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80";

function getFirstColorImage(colors) {
  if (!colors || typeof colors !== "object") return "";
  const firstKey = Object.keys(colors)[0];
  const arr = firstKey ? colors[firstKey] : null;
  return Array.isArray(arr) && arr.length > 0 ? arr[0] : "";
}

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const { slug, name, tags, description, oldPrice, newPrice, stock, id } =
    product;

  // ✅ Demo-friendly: soporta image, images[], colors{}
  const displayImage = useMemo(() => {
    if (product?.image) return product.image;
    if (Array.isArray(product?.images) && product.images.length > 0)
      return product.images[0];
    const colorImg = getFirstColorImage(product?.colors);
    if (colorImg) return colorImg;
    return FALLBACK_IMG;
  }, [product]);

  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { carrito, agregarAlCarrito } = useContext(CarritoContext);

  const maxQuantity = Number(stock) || 0;

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

  const handleAddToCart = () => {
    const productoEnCarrito = carrito.find((item) => item.slug === slug);
    const cantidadExistente = productoEnCarrito
      ? productoEnCarrito.cantidad
      : 0;
    const cantidadTotal = cantidadExistente + quantity;

    if (cantidadTotal > maxQuantity) {
      toast.error("Has alcanzado el límite disponible para este producto.");
      setIsAdding(false);
      return;
    }

    if (isAdding) return;
    setIsAdding(true);

    if (quantity < 1) {
      toast.error("La cantidad debe ser al menos 1");
      setIsAdding(false);
      return;
    }

    if (quantity > maxQuantity) {
      toast.error(`Solo hay ${maxQuantity} unidades disponibles.`);
      setIsAdding(false);
      return;
    }

    const productoSeleccionado = {
      id,
      slug,
      nombre: name,
      precio: newPrice || oldPrice,
      image: displayImage, // ✅ aquí ahora sí siempre hay imagen
      cantidad: quantity,
      stock: maxQuantity,
    };

    agregarAlCarrito(productoSeleccionado);

    toast.dismiss();
    toast.success("Producto agregado al carrito", { autoClose: 2000 });

    setTimeout(() => setIsAdding(false), 1000);
  };

  const goToDetail = () => {
    if (!slug) return;
    navigate(`/product/${slug}`);
  };

  return (
    <div className="relative bg-[#FFFBF8] w-full rounded-xl shadow-md overflow-hidden max-w-[17rem] cursor-default flex flex-col">
      <div className="relative w-full h-[16rem] overflow-hidden">
        <LazyLoadImage
          src={displayImage}
          alt={name}
          effect="blur"
          className="w-full h-full object-cover"
          wrapperClassName="w-full h-full"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMG;
          }}
        />
      </div>

      <div
        className="flex-grow flex flex-col -mt-10 relative pl-4 pr-[3.6rem] pt-2 border-t-2 border-lines bg-[#FFFBF8]"
        onClick={goToDetail}
        role="button"
        tabIndex={0}
      >
        <h3 className="text-lg font-semibold mb-1 text-title">{name}</h3>
        <Price oldPrice={oldPrice} newPrice={newPrice} />

        <div className="flex flex-wrap gap-1 mb-1">
          {tags?.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-1">
              {tags.map((tag, index) => (
                <Tag key={index} text={tag} />
              ))}
            </div>
          )}
        </div>

        <p className="text-content mb-4 font-normal text-[12px]">
          {description}
        </p>
      </div>

      <div className="w-full px-4 pb-4 mt-auto bg-[#FFFBF8]">
        <QuantitySelector
          quantity={quantity}
          onIncrease={handleIncreaseQuantity}
          onDecrease={handleDecreaseQuantity}
          handleAddToCart={handleAddToCart}
        />
      </div>

      <ToastContainer />
    </div>
  );
};

export default ProductCard;
