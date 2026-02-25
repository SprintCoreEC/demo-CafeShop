import {
  FaEllipsisH,
  FaEnvelope,
  FaUser,
  FaTrash,
  FaSearch,
  FaPhone,
  FaShoppingBag,
  FaCalendarAlt,
} from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useCustomers } from "../../contexts/CustomerContext";
const ITEMS_PER_PAGE = 5;

const MenuCustomers = () => {
  const {
    customers,
    searchTerm,
    setSearchTerm,
    handleDropdownToggleCliente,
    activeDropdownCliente,
    dropdownRefs,
    buttonRefs,
    loading,
    handlePreviousPage,
    currentPage,
    handleNextPage,
    handlePageChange,
  } = useCustomers();

  const paginatedCustomers = customers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(customers.length / ITEMS_PER_PAGE);

  const renderCustomerRow = (customer, index) => {
    const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
    const isDropdownOpen = activeDropdownCliente === globalIndex;
    return (
      <motion.tr
        key={`${customer.id}-${index}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: index * 0.05 }}
        className={`hover:bg-gray-50 ${
          index !== paginatedCustomers.length - 1 ? "border-b border-lines" : ""
        }`}
      >
        <td className="py-4 px-4">
          <div className="flex items-center">
            <LazyLoadImage
              src={customer.avatar}
              alt={customer.name}
              effect="blur"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </td>
        <td className="py-4 px-4">
          <div className="flex flex-col">
            <span className="font-medium text-title">{customer.name}</span>
            <span className="text-xs text-content">{customer.email}</span>
          </div>
        </td>
        <td className="py-4 px-4">
          <div className="flex items-center text-content">
            <FaPhone className="mr-2 text-sm text-icons" />
            <span>{customer.phone}</span>
          </div>
        </td>
        <td className="py-4 px-4">
          <div className="flex items-center text-content">
            <FaShoppingBag className="mr-2 text-sm text-icons" />
            <span className="whitespace-nowrap">
              {customer.totalOrders} compras
            </span>
          </div>
        </td>
        <td className="py-4 px-4">
          <div className="flex items-center text-content">
            <FaCalendarAlt className="mr-2 text-sm text-icons" />
            <span>{customer.registrationDate}</span>
          </div>
        </td>
        <td className="py-4 px-4 text-right relative">
          <button
            type="button"
            ref={(el) => (buttonRefs.current[globalIndex] = el)}
            className="p-2 rounded-md hover:bg-lines text-icons hover:text-button transition-colors"
            onClick={() => handleDropdownToggleCliente(globalIndex)}
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <FaEllipsisH />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                ref={(el) => {
                  dropdownRefs.current[globalIndex] = el;
                  // Verificar posición después de que el elemento se renderice
                  if (el) {
                    const rect = el.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    const spaceBelow = windowHeight - rect.bottom;

                    if (spaceBelow < rect.height) {
                      el.style.bottom = "100%";
                      el.style.top = "auto";
                    }
                  }
                }}
                className="absolute right-0 z-10 mt-1 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
                style={{
                  // Estilos iniciales
                  top: "100%",
                  bottom: "auto",
                }}
              >
                <ul className="py-1">
                  <li className="flex items-center px-4 py-2 hover:bg-lines cursor-pointer text-content">
                    <FaEnvelope className="mr-2 text-icons" />
                    <span>Enviar email</span>
                  </li>
                  <li className="flex items-center px-4 py-2 hover:bg-lines cursor-pointer text-content">
                    <FaUser className="mr-2 text-icons" />
                    <span>Ver perfil</span>
                  </li>
                  <li className="flex items-center px-4 py-2 hover:bg-lines cursor-pointer text-delete">
                    <FaTrash className="mr-2" />
                    <span>Eliminar</span>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </td>
      </motion.tr>
    );
  };

  return (
    <div className="min-h-screen bg-bg2 p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
        style={{ height: "calc(100vh - 3rem)" }}
      >
        {/* Header */}
        <div className="p-6 border-b border-lines">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-semibold text-title">
              Gestión de Clientes
            </h1>
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Buscar clientes por nombre, email o teléfono..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-lines p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-button"
              />
              <FaSearch className="absolute left-3 top-3 text-icons" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-button"></div>
            </div>
          ) : customers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <p className="text-lg text-subtitle mb-4">
                {searchTerm
                  ? "No se encontraron clientes"
                  : "No hay clientes registrados"}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-button hover:text-button-on"
                >
                  Limpiar búsqueda
                </button>
              )}
            </div>
          ) : (
            <table className="min-w-full">
              <thead className="sticky top-0 bg-gray-50 z-10">
                <tr className="border-b border-lines">
                  <th className="py-3 px-4 text-left font-semibold text-subtitle">
                    Cliente
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-subtitle">
                    Contacto
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-subtitle">
                    Teléfono
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-subtitle">
                    Compras
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-subtitle">
                    Registro
                  </th>
                  <th className="py-3 px-4 text-right font-semibold text-subtitle">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedCustomers.map((customer, index) =>
                  renderCustomerRow(customer, index)
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm md:text-base">
              Mostrando {paginatedCustomers.length} de {customers.length}{" "}
              clientes
            </p>

            <div className="flex items-center gap-2">
              {/* Botón Anterior */}
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-md ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100 transition-colors"
                }`}
                aria-label="Página anterior"
              >
                <FiChevronLeft className="h-5 w-5" />
              </button>

              {/* Números de Página */}
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-9 h-9 flex items-center justify-center rounded-md text-sm font-medium ${
                        currentPage === pageNum
                          ? "bg-button text-white shadow-sm"
                          : "text-gray-700 hover:bg-gray-100 transition-colors"
                      }`}
                      aria-current={
                        currentPage === pageNum ? "page" : undefined
                      }
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <span className="text-gray-500 px-1">...</span>
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className={`w-9 h-9 flex items-center justify-center rounded-md text-sm font-medium ${
                        currentPage === totalPages
                          ? "bg-button text-white shadow-sm"
                          : "text-gray-700 hover:bg-gray-100 transition-colors"
                      }`}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>

              {/* Botón Siguiente */}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100 transition-colors"
                }`}
                aria-label="Página siguiente"
              >
                <FiChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MenuCustomers;
