import React, { useState, useEffect } from "react";
import {
  FaMoneyBillWave,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaHourglassHalf,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaTimes,
} from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import StatCard from "../../utils/StatCard";
import ChartCard from "../../utils/ChartCard"; 
import {
  createEmptyChartData,
  sortObjectEntries,
  updateChartData,
  calculateChangeFromLastTwo,
} from "../../utils/chartUtils";
import { ToastContainer, toast } from "react-toastify";
import { useOrder } from "../../contexts/OrderContext";
import { useCustomers } from "../../contexts/CustomerContext";
import { useProducts } from "../../contexts/ProductsContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const getFormattedDate = (dateObj, view) => {
  return view === "daily"
    ? dateObj.toISOString().split("T")[0]
    : dateObj.toLocaleString("en-US", { month: "short", year: "numeric" }); // 👉 ejemplo: "Mar 2025"
};


const MenuDashBoard = () => {
  const [chartView, setChartView] = useState("monthly");
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalClients, setTotalClients] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [processingOrders, setProcessingOrders] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [canceledOrders, setCanceledOrders] = useState(0);
  const [salesChange, setSalesChange] = useState(0);
  const [ordersChange, setOrdersChange] = useState(0);
  const [clientsChange, setClientsChange] = useState(0);
  const [pendingChange, setPendingChange] = useState(0);
  const [processingChange, setProcessingChange] = useState(0);
  const [completedChange, setCompletedChange] = useState(0);
  const [canceledChange, setCanceledChange] = useState(0);
  const [chartsData, setChartsData] = useState({});
  const [selectedChart, setSelectedChart] = useState(null);

  const closeModal = () => setSelectedChart(null);

  /*     useEffect(() => {
          const handleResize = () => {
              setChartsData((prev) => ({ ...prev }));
          };
  
          window.addEventListener("resize", handleResize);
          return () => window.removeEventListener("resize", handleResize);
      }, []);
   */

  const { orders } = useOrder();

  useEffect(() => {
    if (!orders || orders.length === 0) return;

    let salesTotal = 0;
    const groupedData = {};

    orders.forEach((order) => {
      if (!order.date || !order.date._seconds) return;
      const date = new Date(order.date._seconds * 1000);
      const key = getFormattedDate(date, chartView);

      const total = parseFloat(order.total) || 0;
      salesTotal += total;

      if (!groupedData[key]) {
        groupedData[key] = {
          sales: 0,
          orders: 0,
          pending: 0,
          processing: 0,
          completed: 0,
          canceled: 0,
        };
      }

      groupedData[key].sales += total;
      groupedData[key].orders += 1;
      groupedData[key][order.status.toLowerCase()] += 1;
    });

    setTotalOrders(orders.length);
    setTotalSales(salesTotal);
    setPendingOrders(orders.filter(o => o.status === "Pending").length);
    setProcessingOrders(orders.filter(o => o.status === "Processing").length);
    setCompletedOrders(orders.filter(o => o.status === "Completed").length);
    setCanceledOrders(orders.filter(o => o.status === "Canceled").length);

    const entries = Object.entries(groupedData).sort(
      (a, b) => new Date(a[0]) - new Date(b[0])
    );

    const labels = entries.map((e) => e[0]);
    const sales = entries.map((e) => e[1].sales);
    const ordersCount = entries.map((e) => e[1].orders);
    const pendings = entries.map((e) => e[1].pending);
    const processing = entries.map((e) => e[1].processing);
    const completed = entries.map((e) => e[1].completed);
    const canceled = entries.map((e) => e[1].canceled);

    setSalesChange(calculateChangeFromLastTwo(entries.map(e => [e[0], e[1].sales]).filter(([, v]) => v > 0)));
    setOrdersChange(calculateChangeFromLastTwo(entries.map(e => [e[0], e[1].orders]).filter(([, v]) => v > 0)));
    setPendingChange(calculateChangeFromLastTwo(entries.map(e => [e[0], e[1].pending]).filter(([, v]) => v > 0)));
    setProcessingChange(calculateChangeFromLastTwo(entries.map(e => [e[0], e[1].processing]).filter(([, v]) => v > 0)));
    setCompletedChange(calculateChangeFromLastTwo(entries.map(e => [e[0], e[1].completed]).filter(([, v]) => v > 0)));
    setCanceledChange(calculateChangeFromLastTwo(entries.map(e => [e[0], e[1].canceled]).filter(([, v]) => v > 0)));

    setChartsData((prev) => ({
      ...prev,
      sales: createChart("#4BC0C0", "Ventas Totales", labels, sales),
      orders: createChart("#36A2EB", "Pedidos Totales", labels, ordersCount),
      pending: createChart("#FF6384", "Pendientes", labels, pendings),
      processing: createChart("#36A2EB", "Procesando", labels, processing),
      completed: createChart("#FFCE56", "Completados", labels, completed),
      canceled: createChart("#FF6384", "Cancelados", labels, canceled),
    }));

  }, [orders, chartView]);

  const { customers } = useCustomers();

  useEffect(() => {
    if (!customers || customers.length === 0) return;

    setTotalClients(customers.length);

    const clientsPerDate = {};

    customers.forEach((user) => {
      if (!user.registrationDate) return;
      const [day, month, year] = user.registrationDate.split("/");
      const dateObj = new Date(`${year}-${month}-${day}`);
      const key = getFormattedDate(dateObj, chartView);
      clientsPerDate[key] = (clientsPerDate[key] || 0) + 1;
    });

    const sorted = Object.entries(clientsPerDate)
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .filter(([, value]) => value > 0);

    setClientsChange(calculateChangeFromLastTwo(sorted));

    setChartsData((prev) => ({
      ...prev,
      customers: updateChartData(createEmptyChartData("#FFCE56", "Clientes Totales"), sorted),
    }));
  }, [customers, chartView]);

  const { products } = useProducts(); // ✅ nuevo hook

  useEffect(() => {
    if (products) {
      setTotalProducts(products.length);
    }
  }, [products]);

  const createChart = (color, label, labels, data) => ({
    labels,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: color,
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.3,
        fill: false,
      },
    ],
  });

  const chartConfigs = [
    { key: "sales", yTitle: "Ventas ($)" },
    { key: "orders", yTitle: "Pedidos" },
    { key: "customers", yTitle: "Clientes Registrados" },
    { key: "pending", yTitle: "Pendientes" },
    { key: "processing", yTitle: "En Proceso" },
    { key: "completed", yTitle: "Completados" },
    { key: "canceled", yTitle: "Cancelados" },
  ];

  return (
    <div className="p-6 w-full h-screen overflow-y-auto">
      <ToastContainer />
      <div className="flex flex-row justify-between mb-4 gap-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="relative flex border rounded-lg overflow-hidden bg-white w-fit">
          <div
            className={`absolute top-0 bottom-0 w-1/2 bg-subtitle transition-all duration-300 z-0 rounded-lg ${chartView === "monthly" ? "left-0" : "left-1/2"
              }`}
          />
          <button
            onClick={() => setChartView("monthly")}
            className={`px-4 py-2 relative z-10 w-24 text-center transition-colors duration-300 ${chartView === "monthly" ? "text-white" : "text-title"
              }`}
          >
            Mensual
          </button>
          <button
            onClick={() => setChartView("daily")}
            className={`px-4 py-2 relative z-10 w-24 text-center transition-colors duration-300 ${chartView === "daily" ? "text-white" : "text-title"
              }`}
          >
            Diario
          </button>
        </div>

      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[{
          title: "Ingresos Totales",
          value: totalSales,
          changePercent: salesChange,
          icon: FaMoneyBillWave,
          iconColor: "text-green-500"
        }, {
          title: "Pedidos",
          value: totalOrders,
          changePercent: ordersChange,
          icon: FaBox,
          iconColor: "text-blue-500"
        }, {
          title: "Productos",
          value: totalProducts,
          icon: FaShoppingCart,
          iconColor: "text-orange-500"
        }, {
          title: "Clientes Activos",
          value: totalClients,
          changePercent: clientsChange,
          icon: FaUsers,
          iconColor: "text-purple-500"
        }].map((card, index) => (
          <StatCard key={index} {...card} view={chartView} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {[{
          title: "Pedidos Pendientes",
          value: pendingOrders,
          changePercent: pendingChange,
          icon: FaHourglassHalf,
          iconColor: "text-yellow-500"
        }, {
          title: "Pedidos en Proceso",
          value: processingOrders,
          changePercent: processingChange,
          icon: FaSpinner,
          iconColor: "text-blue-500"
        }, {
          title: "Pedidos Completados",
          value: completedOrders,
          changePercent: completedChange,
          icon: FaCheckCircle,
          iconColor: "text-green-500"
        }, {
          title: "Pedidos Cancelados",
          value: canceledOrders,
          changePercent: canceledChange,
          icon: FaTimesCircle,
          iconColor: "text-red-500"
        }].map((card, index) => (
          <StatCard key={index} {...card} view={chartView} />
        ))}
      </div>

      <div className="w-full mt-4">
        <h2 className="text-2xl font-semibold mb-4">Gráficos {chartView === "monthly" ? "Mensuales" : "Diarios"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chartConfigs.map((chart, index) => (
            <div
              key={index}
              onClick={() => setSelectedChart(chart)}
              className="cursor-pointer hover:opacity-80 transition"
            >
              <ChartCard
                data={chartsData[chart.key] || createEmptyChartData("#ccc", chart.yTitle)}
                xTitle={chartView === "monthly" ? "Mes" : "Día"}
                yTitle={chart.yTitle}
                noShadow={false}
              />
            </div>

          ))}
        </div>
        {selectedChart && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div
              className="bg-white p-2 md:p-4 rounded-lg w-[90%] max-w-5xl max-h-[90vh] overflow-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Ícono de cierre */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={closeModal}
                  className="text-icons hover:text-icons-on text-2xl"
                  aria-label="Cerrar"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Contenido del Chart */}
              <ChartCard
                data={chartsData[selectedChart.key]}
                xTitle={chartView === "monthly" ? "Mes" : "Día"}
                yTitle={selectedChart.yTitle}
                noShadow={true}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MenuDashBoard;