import React, { useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaCheckCircle, FaShoppingBag } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import confetti from "canvas-confetti";

const TWO_MINUTES_MS = 120000;

function formatOrderDate(dateValue) {
  // Soporta:
  // - string ("2026-01-21" / "21/01/2026")
  // - Date
  // - { _seconds: number } (como Firestore)
  // - number (timestamp ms)
  if (!dateValue) return "—";

  try {
    // Firestore-like
    if (typeof dateValue === "object" && typeof dateValue._seconds === "number") {
      const d = new Date(dateValue._seconds * 1000);
      return d.toLocaleString("es-EC", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    // Date object
    if (dateValue instanceof Date) {
      return dateValue.toLocaleString("es-EC", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    // timestamp ms
    if (typeof dateValue === "number") {
      const d = new Date(dateValue);
      return d.toLocaleString("es-EC", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    // string
    if (typeof dateValue === "string") {
      // Intentar parsear
      const parsed = new Date(dateValue);
      if (!Number.isNaN(parsed.getTime())) {
        return parsed.toLocaleString("es-EC", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
      }
      return dateValue;
    }

    return "—";
  } catch {
    return "—";
  }
}

function formatMoney(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return "$0.00";
  return n.toLocaleString("es-EC", { style: "currency", currency: "USD" });
}

const PaymentConfirmation = () => {
  const navigate = useNavigate();
  const [showIcons, setShowIcons] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isAnimating, setIsAnimating] = useState(true);

  const formattedDate = useMemo(
    () => (orderDetails ? formatOrderDate(orderDetails.date) : "—"),
    [orderDetails]
  );

  useEffect(() => {
    const shootConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#b39374", "#9a6f46", "#FFFAF5", "#E6D7C3"],
      });
    };

    const purchaseTimeRaw = localStorage.getItem("purchaseConfirmed");
    const orderRaw = localStorage.getItem("orderDetails");

    let parsedOrder = null;
    try {
      parsedOrder = orderRaw ? JSON.parse(orderRaw) : null;
    } catch {
      parsedOrder = null;
    }

    if (!purchaseTimeRaw || !parsedOrder) {
      navigate("/");
      return;
    }

    const purchaseTime = parseInt(purchaseTimeRaw, 10);
    if (!purchaseTime || Number.isNaN(purchaseTime)) {
      localStorage.removeItem("purchaseConfirmed");
      localStorage.removeItem("orderDetails");
      navigate("/");
      return;
    }

    const timeElapsed = Date.now() - purchaseTime;
    if (timeElapsed > TWO_MINUTES_MS) {
      localStorage.removeItem("purchaseConfirmed");
      localStorage.removeItem("orderDetails");
      navigate("/");
      return;
    }

    setOrderDetails(parsedOrder);
    shootConfetti();

    const handleResize = () => {
      setShowIcons(window.innerWidth >= 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Detener animación después de 3 segundos
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 3000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [navigate]);

  const baseButtonStyles =
    "px-6 py-3 rounded-lg flex items-center justify-center font-medium transition-all duration-300 shadow-md";
  const outlineButtonStyles = `${baseButtonStyles} border border-lines text-title hover:bg-lines hover:shadow-lg`;
  const solidButtonStyles = `${baseButtonStyles} bg-button hover:bg-button-on text-white hover:shadow-lg`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen bg-bg2 px-6"
    >
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  y: 0,
                  x: Math.random() * window.innerWidth,
                  opacity: 1,
                }}
                animate={{
                  y: window.innerHeight,
                  opacity: 0,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 3,
                  ease: "linear",
                  delay: Math.random() * 0.5,
                }}
                className="absolute text-xl"
                style={{
                  color: ["#b39374", "#9a6f46", "#E6D7C3"][
                    Math.floor(Math.random() * 3)
                  ],
                  left: `${Math.random() * 100}%`,
                }}
              >
                ✓
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col w-full items-center justify-center pt-12 sm:pt-16 md:pt-20 px-4 sm:px-8 pb-10 max-w-2xl">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <FaCheckCircle className="h-20 w-20 sm:h-24 sm:w-24 text-icons mb-6" />
        </motion.div>

        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl font-bold text-center mb-4 px-2 text-title"
        >
          ¡Pago Demo Exitoso!
        </motion.h2>

        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-content text-center mb-8 px-2 max-w-md text-lg"
        >
          Tu pedido ha sido procesado con éxito. Recibirás un correo con los
          detalles de la compra.
        </motion.p>

        {orderDetails && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-md mb-10 bg-box rounded-xl shadow-lg p-6 border border-lines"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-between pb-3 border-b border-lines"
              >
                <span className="font-medium text-content">
                  Número de pedido:
                </span>
                <span className="text-subtitle font-semibold">
                  {orderDetails.orderId || "—"}
                </span>
              </motion.div>

              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex justify-between pb-3 border-b border-lines"
              >
                <span className="font-medium text-content">Fecha:</span>
                <span className="text-subtitle">{formattedDate}</span>
              </motion.div>

              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex justify-between pb-3 border-b border-lines"
              >
                <span className="font-medium text-content">
                  Método de pago:
                </span>
                <span className="text-subtitle">
                  {orderDetails.paymentMethod || "—"}
                </span>
              </motion.div>

              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex justify-between pt-2"
              >
                <span className="font-bold text-lg text-title">Total:</span>
                <span className="font-bold text-lg text-button">
                  {formatMoney(orderDetails.total)}
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col gap-4 sm:flex-row sm:gap-6 w-full max-w-md"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link to="/profile" className={solidButtonStyles}>
              {showIcons && <FaShoppingBag className="mr-3 h-5 w-5" />}
              <span>Ver mis pedidos</span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link to="/" className={outlineButtonStyles}>
              {showIcons && <FaArrowLeft className="mr-3 h-5 w-5" />}
              <span>Seguir comprando</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <ToastContainer position="bottom-center" autoClose={3000} />
    </motion.div>
  );
};

export default PaymentConfirmation;
