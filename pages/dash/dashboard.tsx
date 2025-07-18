import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import AdminSidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/Admin/navbar";
import { BarChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Bar } from "recharts";

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedRevenueType, setSelectedRevenueType] = useState("mpesa");

  // Static revenue data for full year (Jan - Dec)
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const mpesaRevenue = months.map((month) => ({
    month,
    revenue: Math.floor(Math.random() * (32000 - 3000) + 10000)
  }));
  
  const bankRevenue = months.map((month) => ({
    month,
    revenue: Math.floor(Math.random() * (20000 - 5000) + 5000)
  }));

  return (
    <div className="flex flex-col md:flex-row text-black bg-gray-100 min-h-screen">
      <div className={`${isSidebarCollapsed ? "w-16" : "w-64"} transition-width duration-300`}>
        <AdminSidebar isCollapsed={isSidebarCollapsed} toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      </div>
      <div className="flex-1 flex flex-col transition-margin duration-300">
        <Navbar />
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 text-blue-600">
            {[
              { title: "Total Users", value: 5 },
              { title: "Total Subscribers", value: 5 },
              { title: "Total Reviews", value: 34 },
              { title: "Total Cast and Crew", value: 45 },
              { title: "Total Series", value: 15 },
              { title: "Total Movies", value: 25 }
            ].map((item) => (
              <Card key={item.title} className="p-4 shadow-md rounded-xl hover:shadow-lg transition-all duration-200">
                <CardContent className="text-lg md:text-xl font-semibold text-center">
                  {item.title}: {item.value}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
            <h2 className="text-lg md:text-xl font-bold mb-4 text-green-600">Revenue Overview</h2>

            <div className="flex gap-4 mb-4 justify-center md:justify-start">
              <button
                className={`px-3 md:px-4 py-2 rounded-md font-medium transition-all duration-200 ${selectedRevenueType === "mpesa" ? "bg-blue-600 text-white" : "bg-gray-300 hover:bg-gray-400"}`}
                onClick={() => setSelectedRevenueType("mpesa")}
              >
                M-Pesa Revenue
              </button>
              <button
                className={`px-3 md:px-4 py-2 rounded-md font-medium transition-all duration-200 ${selectedRevenueType === "bank" ? "bg-blue-600 text-white" : "bg-gray-300 hover:bg-gray-400"}`}
                onClick={() => setSelectedRevenueType("bank")}
              >
                Bank Revenue
              </button>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={selectedRevenueType === "mpesa" ? mpesaRevenue : bankRevenue}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill={selectedRevenueType === "mpesa" ? "#4CAF50" : "#8884d8"} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;