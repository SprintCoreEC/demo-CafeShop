import { FaEye, FaArrowLeft, FaSearch, FaFilter } from "react-icons/fa";
import CustomSelectNew from "../General/CustomSelectNew";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useOrder } from "../../contexts/OrderContext";

const MenuOrders = () => {
  const {
    selectedOrder,
    setSelectedOrder,
    orders,
    currentPage,
    setCurrentPage,
    paginatedOrders,
    handleStatusChange,
    handlePreviousPage,
    handleNextPage,
    loading,
    totalPages,
    searchTerm,
    setSearchTerm,
    filteredOrders,
    statusFilter,
    setStatusFilter,
    statusColors,

  } = useOrder();

  return (
    <div className="min-h-screen bg-bg2 p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
        style={{ height: "calc(100vh - 3rem)", minHeight: "600px" }}
      >
        {selectedOrder ? (
          <div className="p-6 overflow-y-auto flex flex-col h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 rounded-full text-title/80 hover:text-title hover:bg-title/10 transition-colors duration-200 border border-transparent hover:border-title-40"
                >
                  <FaArrowLeft className="h-5 w-5" />
                </button>

                <h1 className="text-2xl font-bold text-title">
                  Detalles del pedido
                </h1>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="space-y-4 text-sm md:text-base flex-grow"
            >
              {[
                { label: "Número de pedido", value: selectedOrder.orderId },
                { label: "Cliente", value: selectedOrder.customerName },
                { label: "Correo electrónico", value: selectedOrder.email },
                {
                  label: "Fecha",
                  value: new Date(
                    selectedOrder.date._seconds * 1000
                  ).toLocaleString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                },
                {
                  label: "Correo enviado",
                  value: selectedOrder.emailSent ? (
                    <span className="text-green-600">Sí</span>
                  ) : (
                    <span className="text-red-600">No</span>
                  ),
                },
                { label: "Método de Pago", value: selectedOrder.paymentMethod },
                {
                  label: "Dirección",
                  value: `${selectedOrder.shippingAddress.addressLine}, ${selectedOrder.shippingAddress.city}`,
                },
                {
                  label: "Estado",
                  value: (
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        statusColors[selectedOrder.status]
                      }`}
                    >
                      {selectedOrder.status}
                    </span>
                  ),
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="flex flex-col md:flex-row justify-between pb-4 border-b border-lines"
                >
                  <span className="font-medium text-subtitle px-2 w-48 flex-shrink-0">
                    {item.label}
                  </span>
                  <span className="text-content px-2 break-words">
                    {item.value}
                  </span>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <h3 className="text-lg font-semibold text-title mb-4">
                  Productos
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr className="border-b border-lines">
                        {["Producto", "Precio", "Cantidad", "Subtotal"].map(
                          (header, i) => (
                            <th
                              key={i}
                              className={`py-3 px-4 ${
                                header === "Producto"
                                  ? "text-left"
                                  : "text-right"
                              } font-semibold text-subtitle`}
                            >
                              {header}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>

                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + index * 0.05 }}
                          className="border-b border-lines hover:bg-gray-50"
                        >
                          <td className="py-3 px-4 text-left text-content">
                            {item.name}
                          </td>
                          <td className="py-3 px-4 text-right text-content">
                            ${item.price}
                          </td>
                          <td className="py-3 px-4 text-right text-content">
                            {item.quantity}
                          </td>
                          <td className="py-3 px-4 text-right text-content font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg mt-6"
            >
              <span className="text-lg font-semibold text-subtitle">
                Total:
              </span>
              <span className="text-xl font-bold text-title">
                ${selectedOrder.total}
              </span>
            </motion.div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-lines">
              <h1 className="text-2xl md:text-3xl font-semibold text-title">
                Gestión de Pedidos
              </h1>

              <div className="flex flex-col sm:flex-row mt-4 gap-2">
                <div className="relative flex-grow sm:max-w-md w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Buscar pedidos..."
                    className="pl-10 pr-4 py-2 w-full border border-lines rounded-lg focus:ring-2 focus:ring-icons-on focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex justify-end items-center gap-2 mr-0 sm:mr-4 w-full mb-2">
                  <FaFilter className="text-gray-500 mr-2" />
                  <CustomSelectNew
                    options={[
                      { value: "all", label: "Todos los estados" },
                      { value: "Pending", label: "Pendiente" },
                      { value: "Processing", label: "Procesando" },
                      { value: "Completed", label: "Completado" },
                      { value: "Canceled", label: "Cancelado" },
                    ].map((opt) => opt.label)}
                    initialValue={
                      [
                        { value: "all", label: "Todos los estados" },
                        { value: "Pending", label: "Pendiente" },
                        { value: "Processing", label: "Procesando" },
                        { value: "Completed", label: "Completado" },
                        { value: "Canceled", label: "Cancelado" },
                      ].find((opt) => opt.value === statusFilter)?.label ||
                      "Todos los estados"
                    }
                    onChange={(selectedLabel) => {
                      const valueMapping = {
                        "Todos los estados": "all",
                        Pendiente: "Pending",
                        Procesando: "Processing",
                        Completado: "Completed",
                        Cancelado: "Canceled",
                      };
                      setStatusFilter(valueMapping[selectedLabel]);
                    }}
                    customStyles={{
                      control: "min-w-[220px] w-full sm:w-auto",
                    }}
                  />
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex-grow flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-button"></div>
              </div>
            ) : (
              <>
                <div className="flex-grow overflow-y-auto">
                  <table className="min-w-full divide-y divide-lines">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                      <tr>
                        {[
                          "ID Pedido",
                          "Cliente",
                          "Fecha",
                          "Estado",
                          "Total",
                          "Detalles",
                        ].map((header, i) => (
                          <th
                            key={i}
                            className={`px-6 py-3 text-left text-xs font-medium text-subtitle uppercase tracking-wider ${
                              header === "Acciones" ? "text-center" : ""
                            }`}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-lines">
                      {paginatedOrders.length > 0 ? (
                        paginatedOrders.map((pedido) => (
                          <motion.tr
                            key={pedido.orderId}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="hover:bg-gray-50"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-content">
                              <div className="font-medium">
                                {pedido.orderId}
                              </div>
                              <div className="text-xs text-gray-500">
                                {pedido.emailSent ? (
                                  <span className="text-green-600">
                                    Email enviado
                                  </span>
                                ) : (
                                  <span className="text-red-600">
                                    Email pendiente
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-content">
                                {pedido.customerName}
                              </div>
                              <div className="text-xs text-gray-500">
                                {pedido.email}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-content">
                              {new Date(
                                pedido.date._seconds * 1000
                              ).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                              <CustomSelectNew
                                options={[
                                  { value: "Pending", label: "Pendiente" },
                                  { value: "Processing", label: "Procesando" },
                                  { value: "Completed", label: "Completado" },
                                  { value: "Canceled", label: "Cancelado" },
                                ]}
                                initialValue={pedido.status}
                                onChange={(newValue) =>
                                  handleStatusChange(pedido.orderId, newValue)
                                }
                                customStyles={{
                                  control: (provided) => ({
                                    ...provided,
                                    minWidth: "120px",
                                    borderColor: "#E6D7C3",
                                    boxShadow: "none",
                                    "&:hover": {
                                      borderColor: "#b39374",
                                    },
                                  }),
                                }}
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-content">
                              ${pedido.total}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                              <button
                                type="button"
                                className="p-2 rounded-md text-icons-off hover:text-icons transition-colors"
                                onClick={() => setSelectedOrder(pedido)}
                              >
                                <FaEye className="text-lg" />
                              </button>
                            </td>
                          </motion.tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="px-6 py-12 text-center">
                            <div className="text-gray-500">
                              No se encontraron pedidos que coincidan con los
                              filtros
                            </div>
                            <button
                              onClick={() => {
                                setSearchTerm("");
                                setStatusFilter("all");
                              }}
                              className="mt-2 text-button hover:text-button-on"
                            >
                              Limpiar filtros
                            </button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-600 text-sm md:text-base">
                      Mostrando {paginatedOrders.length} de{" "}
                      {filteredOrders.length} pedidos
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
                        {Array.from(
                          { length: Math.min(5, totalPages) },
                          (_, i) => {
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
                                onClick={() => setCurrentPage(pageNum)}
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
                          }
                        )}

                        {/* Puntos suspensivos y último botón si necesario */}
                        {totalPages > 5 && currentPage < totalPages - 2 && (
                          <>
                            <span className="text-gray-500 px-1">...</span>
                            <button
                              onClick={() => setCurrentPage(totalPages)}
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
              </>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MenuOrders;
