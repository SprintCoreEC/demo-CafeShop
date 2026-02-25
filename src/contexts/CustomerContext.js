import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import { fetchAllUsers } from "../services/adminService";

const CustomersContext = createContext();
export const useCustomers = () => {
  return useContext(CustomersContext);
};

export const CustomersProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [activeDropdownCliente, setActiveDropdownCliente] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const customersPerPage = 10;
  const totalPages = Math.ceil(customers.length / customersPerPage);
  const dropdownRefs = useRef({});
  const buttonRefs = useRef({});

  const fetchCustomers = async () => {
    try {
      const users = await fetchAllUsers(); // ✅ ya no pasas token
      const formattedUsers = users.map((user) => ({
        avatar: user.profileImage,
        name: `${user.name} ${user.lastName}`,
        email: user.email,
        phone: user.phone,
        totalOrders: user.orderHistory ? user.orderHistory.length : 0,
        registrationDate: new Date(
          user.createdAt._seconds * 1000
        ).toLocaleDateString(),
      }));
      setCustomers(formattedUsers);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error al obtener los clientes:", error);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleDropdownToggleCliente = (index) => {
    setActiveDropdownCliente(activeDropdownCliente === index ? null : index);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdownCliente !== null) {
        const dropdownElement = dropdownRefs.current[activeDropdownCliente];
        const buttonElement = buttonRefs.current[activeDropdownCliente];

        if (
          dropdownElement &&
          !dropdownElement.contains(event.target) &&
          buttonElement &&
          !buttonElement.contains(event.target)
        ) {
          setActiveDropdownCliente(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdownCliente]);

  return (
    <CustomersContext.Provider
      value={{
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
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};
