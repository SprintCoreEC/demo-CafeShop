import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import Navbar from "./components/WebParts/Navbar";
import ProductCard from "./components/Shopping/Buy/ProductCard";
import ProductSkeleton from "./components/WebParts/ProductSkeleton";
import NoProducts from "./components/Advices/NoProducts";
import ProductDetailCard from "./components/Shopping/Buy/ProductDetailCard";

import CarritoDeCompras from "./components/Shopping/Cart/Cart";
import UserPayment from "./components/Shopping/Cart/UserPayment";
import PaymentConfirmation from "./components/Shopping/Buy/PaymentConfirmation";
import UserProfile from "./components/UserProfile/UserProfile";

import Landing from "./views/User/Landing";
import AboutUs from "./views/User/AboutUs";
import FrequentQuestions from "./views/User/FrequentQuestions";

import AdminPanelNew from "./views/Admin/AdminPanelNew";
import { AdminSettingsProvider } from "./contexts/AdminSettingsContext";

import { ToastContainer } from "react-toastify";

// 🎬 Animación de carga de café
import { Player } from "@lottiefiles/react-lottie-player";
import coffeeAnimation from "./assets/lottie/coffee-loading2.json";

// ✅ Demo data
import { getDemoProducts, getDemoProductByIdOrSlug } from "./demo/demoProducts";

function App() {
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [loading, setLoading] = useState(true);

  // 🎬 Estado para controlar que la app cargue después de la animación
  const [appLoaded, setAppLoaded] = useState(false);

  // ✅ Carga DEMO (simula backend con delay para que se vea real)
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        await new Promise((r) => setTimeout(r, 600));
        if (!alive) return;

        const demo = getDemoProducts();
        setProducts(demo);
        setFilteredProducts(demo);
      } catch (e) {
        console.error("Error demo al obtener productos:", e);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    filterProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceRange, products]);

  const filterProducts = (searchTerm = "") => {
    const filtered = products.filter((product) => {
      const price = product.newPrice ? parseFloat(product.newPrice) : parseFloat(product.oldPrice);
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(product.tags) &&
          product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())));

      const stock = parseInt(product.stock || "0", 10);
      return matchesPrice && matchesSearch && stock > 0;
    });

    setFilteredProducts(filtered);
  };

  // ✅ Demo: obtiene producto desde el archivo demo (por id o slug)
  const fetchProductDetails = async (idOrSlug) => {
    try {
      await new Promise((r) => setTimeout(r, 200));
      const product = getDemoProductByIdOrSlug(idOrSlug);
      setSelectedProduct(product);
    } catch (e) {
      console.error("Error demo al obtener detalles del producto:", e);
      setSelectedProduct(null);
    }
  };

  // ✅ Navbar en todas las rutas excepto admin (si quieres ocultarlo ahí)
  const isAdminRoute = location.pathname.startsWith("/admin") || location.pathname.startsWith("/admin-new");
  const showNavbar = !isAdminRoute;

  // 🎬 Muestra la animación antes de renderizar la app
  if (!appLoaded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <Player
          autoplay
          loop={false}
          src={coffeeAnimation}
          className="w-36 h-36"
          onEvent={(event) => {
            if (event === "complete") setAppLoaded(true);
          }}
        />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-bl from-box to-bg2 text-content">
      {showNavbar && <Navbar onSearch={filterProducts} />}

      <Routes>
        <Route
          path="/"
          element={
            <div className="flex">
              <div className="flex flex-wrap ml-[8%] w-full pl-12 px-8 py-12 pt-[6rem] gap-8 mr-[8%] justify-center lg:justify-normal overflow-y-auto h-full hide-scrollbar">
                {loading ? (
                  Array.from({ length: 8 }).map((_, index) => <ProductSkeleton key={index} />)
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
                ) : (
                  <NoProducts />
                )}
              </div>

              <ToastContainer />
            </div>
          }
        />

        <Route
          path="/product/:slug"
          element={
            <ProductDetailCard product={selectedProduct} fetchProductDetails={fetchProductDetails} />
          }
        />

        {/* ✅ Flujo ecommerce demo (público) */}
        <Route path="/cart" element={<CarritoDeCompras />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/pay-method" element={<UserPayment />} />
        <Route path="/payment-confirmation" element={<PaymentConfirmation />} />

        {/* Contenido informativo */}
        <Route path="/home" element={<Landing />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/questions" element={<FrequentQuestions />} />

        {/* Admin demo */}
        <Route
          path="/admin-new"
          element={
            <AdminSettingsProvider>
              <AdminPanelNew />
            </AdminSettingsProvider>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<NoProducts />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
