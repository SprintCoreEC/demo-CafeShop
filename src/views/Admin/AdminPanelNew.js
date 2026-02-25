import { useState, useEffect, useRef } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-image-crop/dist/ReactCrop.css";
import { BiSolidCategoryAlt } from "react-icons/bi";
import {
  FaTachometerAlt,
  FaShoppingCart,
  FaBoxOpen,
  FaUsers,
  FaCog,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
  FaUserCircle,
  FaBars,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAdminProfile } from "../../services/adminService";
import "react-lazy-load-image-component/src/effects/blur.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuCategories from "../../components/AdminProfile/MenuCategories";
import NewProduct from "../../components/AdminProfile/NewProduct";
import MenuDashBoard from "../../components/AdminProfile/MenuDashBoard";
import MenuOrders from "../../components/AdminProfile/MenuOrders";
import MenuCustomers from "../../components/AdminProfile/MenuCustomers";
import MenuSettings from "../../components/AdminProfile/MenuSettings";
import MenuProducts from "../../components/AdminProfile/MenuProducts";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { motion, AnimatePresence } from "framer-motion";
import { OrderProvider } from "../../contexts/OrderContext";
import { CustomersProvider } from "../../contexts/CustomerContext";
import { AdminSettingsProvider } from "../../contexts/AdminSettingsContext";
import { useAdminSettings } from "../../contexts/AdminSettingsContext";
import { ProductsProvider } from "../../contexts/ProductsContext";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({});
  const [collapsed, setCollapsed] = useState(false);
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "dashboard";
  });
  const { adminData } = useAdminSettings();

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Sesión cerrada correctamente.");
      navigate("/admin-login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error("Hubo un problema al cerrar sesión.");
    }
  };

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div>
            <ProductsProvider>
              <CustomersProvider>
                <OrderProvider>
                  <MenuDashBoard />
                </OrderProvider>
              </CustomersProvider>
            </ProductsProvider>
          </div>
        );
      case "orders":
        return (
          <div className="w-full h-screen overflow-y-auto">
            <OrderProvider>
              <MenuOrders />
            </OrderProvider>
          </div>
        );
      case "customers":
        return (
          <div className="w-full h-screen overflow-y-auto">
            <CustomersProvider>
              <MenuCustomers />
            </CustomersProvider>
          </div>
        );
      case "categories":
        return (
          <div className="w-full h-screen overflow-y-auto">
            <MenuCategories />
          </div>
        );
      case "settings":
        return <MenuSettings />;
      case "products":
        return (
          <div className="w-full h-screen overflow-y-auto">
            <ProductsProvider>
              <MenuProducts
                setActiveTab={setActiveTab}
                setProductInfo={setProductInfo}
              />
            </ProductsProvider>
          </div>
        );
      case "newproduct":
        return <NewProduct setActiveTab={setActiveTab} />;
      case "editproduct":
        return (
          <NewProduct productToEdit={productInfo} setActiveTab={setActiveTab} />
        );
      default:
        return <div>Sección no encontrada</div>;
    }
  };

  const handleMenuItemClick = (tab) => {
    setActiveTab(tab);
    setShowMobileMenu(false);
  };

  return (
    <div className="flex">
      <Sidebar
        collapsed={collapsed}
        width="280px"
        collapsedWidth="80px"
        className="h-screen border-r bg-white"
        breakPoint="md"
      >
        <div className="flex flex-col h-full">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              {!collapsed && <h1 className="text-xl font-bold">Admin Panel</h1>}
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                {collapsed ? (
                  <FaChevronRight size={20} color="#4F4F4F" />
                ) : (
                  <FaChevronLeft size={20} color="#4F4F4F" />
                )}
              </button>
            </div>
            <div
              className={`flex items-center ${
                collapsed ? "justify-center" : "justify-start"
              } space-x-4 mb-6 transition-all duration-300`}
            >
              {adminData.profileImage ? (
                <img
                  src={adminData.profileImage}
                  alt="Imagen de perfil"
                  className="w-10 h-10 rounded-full object-cover cursor-default flex items-center justify-center"
                />
              ) : (
                <FaUserCircle className="w-16 h-16 text-gray-400 cursor-default" />
              )}
              {!collapsed && (
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">
                    {adminData.name}
                  </span>
                  <span className="text-sm text-content">
                    {adminData.email}
                  </span>
                </div>
              )}
            </div>
          </div>
          <Menu
            menuItemStyles={{
              button: ({ active }) => {
                return {
                  backgroundColor: active ? "#f3f4f6" : undefined,
                  "&:hover": {
                    backgroundColor: "slate",
                  },
                };
              },
            }}
          >
            <MenuItem
              icon={<FaTachometerAlt size={20} color="#4F4F4F" />}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              icon={<FaShoppingCart size={20} color="#4F4F4F" />}
              onClick={() => setActiveTab("orders")}
            >
              Pedidos
            </MenuItem>
            <MenuItem
              icon={<FaBoxOpen size={20} color="#4F4F4F" />}
              onClick={() => setActiveTab("products")}
            >
              Productos
            </MenuItem>
            <MenuItem
              icon={<FaUsers size={20} color="#4F4F4F" />}
              onClick={() => setActiveTab("customers")}
            >
              Clientes
            </MenuItem>
            {/* <MenuItem
              icon={<BiSolidCategoryAlt size={20} color="#4F4F4F" />}
              onClick={() => setActiveTab("categories")}
            >
              Categorias
            </MenuItem> */}
            <MenuItem
              icon={<FaCog size={20} color="#4F4F4F" />}
              onClick={() => setActiveTab("settings")}
            >
              Configuración
            </MenuItem>
          </Menu>
          <div className="mt-auto p-4">
            <button
              onClick={logout}
              className="w-full flex items-center justify-center p-3 mt-4 border border-gray-300 rounded-lg hover:bg-gray-100 text-delete hover:text-delete-on"
            >
              <FaSignOutAlt
                size={16}
                className="text-delete hover:text-delete-on mr-3"
              />
              {!collapsed && <span>Cerrar Sesión</span>}
            </button>
          </div>
        </div>
      </Sidebar>
      {!showMobileMenu && (
        <button
          ref={menuButtonRef}
          onClick={toggleMobileMenu}
          className="md:hidden fixed top-2 left-2 z-30 p-2 bg-white rounded-lg shadow-md"
        >
          <FaBars size={20} color="#4F4F4F" />
        </button>
      )}

      {/* Sidebar móvil */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden fixed inset-y-0 left-0 z-20 w-64 bg-white shadow-lg"
            ref={sidebarRef}
          >
            <div className="flex flex-col h-full p-4">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  <FaChevronLeft size={20} color="#4F4F4F" />
                </button>
              </div>
              <div className="flex items-center space-x-4 mb-6">
                {adminData.profileImage ? (
                  <img
                    src={adminData.profileImage}
                    alt="Imagen de perfil"
                    className="w-10 h-10 rounded-full object-cover cursor-default"
                  />
                ) : (
                  <FaUserCircle className="w-16 h-16 text-gray-400 cursor-default" />
                )}
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">
                    {adminData.name}
                  </span>
                  <span className="text-sm text-content">
                    {adminData.email}
                  </span>
                </div>
              </div>
              <div className="flex-grow">
                <button
                  onClick={() => handleMenuItemClick("dashboard")}
                  className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg ${
                    activeTab === "dashboard"
                      ? "bg-gray-100"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <FaTachometerAlt size={20} color="#4F4F4F" className="mr-3" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => handleMenuItemClick("orders")}
                  className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg ${
                    activeTab === "orders" ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  <FaShoppingCart size={20} color="#4F4F4F" className="mr-3" />
                  <span>Pedidos</span>
                </button>
                <button
                  onClick={() => handleMenuItemClick("products")}
                  className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg ${
                    activeTab === "products"
                      ? "bg-gray-100"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <FaBoxOpen size={20} color="#4F4F4F" className="mr-3" />
                  <span>Productos</span>
                </button>
                <button
                  onClick={() => handleMenuItemClick("customers")}
                  className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg ${
                    activeTab === "customers"
                      ? "bg-gray-100"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <FaUsers size={20} color="#4F4F4F" className="mr-3" />
                  <span>Clientes</span>
                </button>
                <button
                  onClick={() => handleMenuItemClick("settings")}
                  className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg ${
                    activeTab === "settings"
                      ? "bg-gray-100"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <FaCog size={20} color="#4F4F4F" className="mr-3" />
                  <span>Configuración</span>
                </button>
              </div>
              <button
                onClick={logout}
                className="w-full flex items-center justify-center p-3 mt-4 border border-gray-300 rounded-lg hover:bg-gray-100 text-delete hover:text-delete-on"
              >
                <FaSignOutAlt
                  size={16}
                  className="mr-3 text-delete hover:text-delete-on"
                />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenido principal */}
      <div className="flex-1 md:ml-0">
        {/* Overlay para móvil */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-10 bg-black"
              onClick={toggleMobileMenu}
            />
          )}
        </AnimatePresence>

        <div className="">{renderContent()}</div>
      </div>
      <ToastContainer />
    </div>
  );
}
