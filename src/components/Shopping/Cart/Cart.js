import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FaArrowLeft, FaRegTrashAlt, FaSearch } from "react-icons/fa";
import { CarritoContext } from "../../../services/carritoProvider";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsCartX } from "react-icons/bs";
import ActionButton from "../../General/ActionButton";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80";

const CarritoDeCompras = () => {
  const navigate = useNavigate();
  const { carrito, eliminarProducto, actualizarCantidad, vaciarCarrito } =
    useContext(CarritoContext);

  const calcularTotal = () => {
    return carrito
      .reduce((total, producto) => total + producto.precio * producto.cantidad, 0)
      .toFixed(2);
  };

  const baseButtonStyles =
    "px-4 py-2 rounded-lg flex items-center justify-center font-medium transition-all duration-300 hover:scale-105";
  const outlineButtonStyles = `${baseButtonStyles} border border-lines text-subtitle hover:text-title`;
  const solidButtonStyles = `${baseButtonStyles} bg-button text-blank hover:bg-button-on`;

  const [showIcons, setShowIcons] = useState(true);

  useEffect(() => {
    const handleResize = () => setShowIcons(window.innerWidth >= 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleIncreaseQuantity = (producto) => {
    const maxStock = producto.stock ?? 0;

    if (producto.cantidad < maxStock) {
      actualizarCantidad(producto.slug, 1);
    } else {
      toast.warning(`Solo hay ${maxStock} unidades disponibles.`);
    }
  };

  const handleDecreaseQuantity = (producto) => {
    if (producto.cantidad > 1) {
      actualizarCantidad(producto.slug, -1);
    }
  };

  const handleDelete = (slug) => {
    eliminarProducto(slug);
    toast.success("Producto eliminado del carrito");
  };

  const handlePayMethod = () => {
    navigate(`/pay-method`);
  };

  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  return (
    <div className="flex flex-col min-h-screen pt-16 sm:pt-20 md:pt-24 px-[4em] md:px-[14em] overflow-x-hidden bg-bg">
      {carrito.length > 0 && (
        <div className="flex items-center flex-wrap gap-2 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-blank rounded-full shadow-md text-icons hover:bg-title hover:text-blank transition-all duration-300 flex items-center justify-center mr-4"
          >
            <FaArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold text-title">Detalles del pedido</h1>
        </div>
      )}

      {carrito.length === 0 ? (
        <div className="flex flex-col w-full items-center justify-center pt-12 sm:pt-16 md:pt-20 px-6 sm:px-8">
          <BsCartX className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 text-icons mb-4" />
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-2 px-2 text-title">
            Carrito vacío
          </h2>
          <p className="text-content text-center mb-6 px-2 max-w-md">
            No hay productos en tu carrito. Explora nuestros productos y añade
            algo especial.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 sm:justify-center sm:items-center px-2 text-center w-full max-w-md">
            <Link to="/" className={`${outlineButtonStyles} w-full sm:w-auto`}>
              {showIcons && (
                <FaArrowLeft className="mr-2 h-4 w-4 text-icons" />
              )}
              Volver a la tienda
            </Link>

            <Link to="/" className={`${solidButtonStyles} w-full sm:w-auto`}>
              {showIcons && <FaSearch className="mr-2 h-4 w-4" />}
              Buscar productos
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row w-full gap-6 pb-8">
          {/* Products list */}
          <div className="w-full lg:w-3/5 overflow-y-auto max-h-[60vh] md:max-h-[65vh] lg:max-h-[70vh]">
            {carrito.map((producto) => (
              <div
                key={producto.id}
                className="border border-lines rounded-lg mb-4 p-4 sm:p-5 bg-box"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                  {/* ✅ Imagen: siempre cover, sin espacios blancos */}
                  <div className="w-full sm:w-24 h-40 sm:h-24 overflow-hidden rounded mb-3 sm:mb-0 bg-bg2">
                    <img
                      src={producto.image || FALLBACK_IMG}
                      alt={producto.nombre}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_IMG;
                      }}
                    />
                  </div>

                  <div className="flex-1 w-full">
                    <h3 className="font-semibold text-title">
                      {producto.nombre}
                    </h3>
                    <p className="text-sm text-content">
                      Precio: ${producto.precio}
                    </p>
                    <p className="text-sm text-content">
                      Stock disponible: {producto.stock ?? "No disponible"}
                    </p>

                    <div className="flex items-center mt-2 justify-between sm:justify-start">
                      <div className="flex items-center">
                        <button
                          className="border border-lines p-2 rounded hover:bg-special-1 hover:text-blank transition-all text-icons"
                          onClick={() => handleDecreaseQuantity(producto)}
                        >
                          <FaMinus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>

                        <span className="mx-2 text-content">
                          {producto.cantidad}
                        </span>

                        <button
                          className="border border-lines p-2 rounded hover:bg-special-1 hover:text-blank transition-all text-icons"
                          onClick={() => handleIncreaseQuantity(producto)}
                        >
                          <FaPlus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(producto.slug)}
                          className="border border-lines p-2 rounded ml-4 hover:bg-delete hover:text-blank transition-all text-icons"
                        >
                          <FaRegTrashAlt className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                      </div>

                      <div className="text-right sm:hidden">
                        <p className="font-semibold text-title">
                          ${(producto.precio * producto.cantidad).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:block text-right">
                    <p className="font-semibold text-title">
                      ${(producto.precio * producto.cantidad).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-end">
              <ActionButton
                onClick={() => navigate("/")}
                variant="left"
                className="w-full cursor-pointer text-center"
              >
                Seguir comprando
              </ActionButton>
            </div>
          </div>

          {/* Order summary */}
          <div className="w-full lg:w-2/5 mt-4 lg:mt-0">
            <div className="border border-lines rounded-lg p-5 bg-box sticky top-4">
              <div className="flex justify-between mb-4">
                <h2 className="text-lg font-semibold text-title">
                  Resumen del Pedido
                </h2>
                <button
                  onClick={() => setMostrarConfirmacion(true)}
                  className="text-delete hover:text-delete-on transition-all"
                >
                  <FaRegTrashAlt className="h-5 w-5" />
                </button>
              </div>

              <div className="max-h-[30vh] overflow-y-auto mb-4">
                {carrito.map((producto) => (
                  <div
                    key={producto.id}
                    className="flex justify-between mb-2"
                  >
                    <span className="text-sm sm:text-base truncate max-w-[70%] text-content">
                      {producto.nombre} x{producto.cantidad}
                    </span>
                    <span className="text-sm sm:text-base text-title">
                      ${(producto.precio * producto.cantidad).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="my-4 border-lines" />

              <div className="flex justify-between font-semibold text-title mb-4">
                <span>Total</span>
                <span>${calcularTotal()}</span>
              </div>

              <ActionButton
                onClick={handlePayMethod}
                variant="shake"
                className="w-full cursor-pointer text-center"
              >
                Proceder al Pago
              </ActionButton>
            </div>
          </div>
        </div>
      )}

      {mostrarConfirmacion && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setMostrarConfirmacion(false)}
        >
          <div
            className="bg-blank rounded-lg p-6 w-[80%] max-w-md shadow-lg mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-title mb-4">
              ¿Deseas vaciar el carrito?
            </h3>
            <p className="text-sm sm:text-base text-content mb-6">
              Esta acción eliminará todos los productos del carrito. No podrás
              deshacerla.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => setMostrarConfirmacion(false)}
                className="w-full sm:w-auto px-4 py-2 border border-lines text-subtitle rounded hover:bg-bg2 transition"
              >
                Cancelar
              </button>

              <button
                onClick={() => {
                  vaciarCarrito();
                  setMostrarConfirmacion(false);
                  toast.info("Carrito vaciado con éxito");
                }}
                className="w-full sm:w-auto px-4 py-2 bg-delete text-blank rounded hover:bg-delete-on transition"
              >
                Vaciar
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default CarritoDeCompras;
