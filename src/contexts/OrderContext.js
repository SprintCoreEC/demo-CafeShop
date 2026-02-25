// src/context/OrderContext.js

import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchAllOrders, updateOrderStatus } from "../services/orderService";
import { toast } from "react-toastify";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const ITEMS_PER_PAGE = 10
  const [searchTerm, setSearchTerm] = useState("");
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredOrders, setFilteredOrders] = useState([]);

  const paginatedOrders = orders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Processing: "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
    Canceled: "bg-red-100 text-red-800"
  };

  // Función para cargar todos los pedidos
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const fetchedOrders = await fetchAllOrders();
      // Ordenar por fecha descendente (más recientes primero)
      const sorted = fetchedOrders.sort(
        (a, b) => b.date._seconds - a.date._seconds
      );
      setOrders(sorted);
    } catch (error) {
      toast.error("No se pudieron cargar los pedidos");
      console.error("❌ Error al obtener los pedidos", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar el estado del pedido
  const handleStatusChange = async (orderId, newValue) => {
    try {
      await updateOrderStatus(orderId, newValue);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, status: newValue } : order
        )
      );
      toast.success("¡Estado de la orden actualizado correctamente!");
    } catch (error) {
      toast.error("Error al actualizar el estado: " + error.message);
    }
  };

  // Función para manejar la paginación
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    let result = orders;

    // Aplicar filtro de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(order =>
        (order.customerName?.toLowerCase()?.includes(term) ?? false) ||
        (order.orderId?.toLowerCase()?.includes(term) ?? false) ||
        (order.email?.toLowerCase()?.includes(term) ?? false)
      );
    }

    // Aplicar filtro de estado
    if (statusFilter !== "all") {
      result = result.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(result);
    setCurrentPage(1); // Resetear a la primera página al aplicar filtros
  }, [searchTerm, statusFilter, orders]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        selectedOrder,
        setSelectedOrder,
        currentPage,
        setCurrentPage,
        loading,
        totalPages,
        paginatedOrders,
        handleStatusChange,
        handlePreviousPage,
        handleNextPage,
        searchTerm,
        setSearchTerm,
        filteredOrders,
        statusFilter,
        setStatusFilter,
        statusColors,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
