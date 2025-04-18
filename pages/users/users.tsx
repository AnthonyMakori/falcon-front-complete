import { Table } from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useState, useEffect } from "react";
import { Search, Trash2, Edit, Eye } from "lucide-react";
import AdminSidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/Admin/navbar";

const UsersPage = () => {
  interface User {
    id: number;
    name: string;
    email: string;
    subscription: boolean;
    totalPurchases: number;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
  
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchUsers();
  }, []);
  

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <Navbar />

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Users Management</h1>

          <div className="flex mb-4 items-center gap-2">
            <Input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-72 text-black"
            />
            <Button variant="outline">
              <Search size={16} />
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table className="w-full border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-gray-200 text-gray-700">
                <tr className="text-left">
                  <th className="py-3 px-4">User ID</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Subscription</th>
                  <th className="py-3 px-4">Total Purchases</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td colSpan={6}>
                    <hr className="border-t border-gray-300" />
                  </td>
                </tr>

                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="py-3 px-4">{user.id}</td>
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">
                      {user.subscription ? "Active" : "Inactive"}
                    </td>
                    <td className="py-3 px-4">${user.totalPurchases}</td>
                    <td className="py-3 px-4 flex justify-center gap-3">
                      <Button variant="ghost" size="small">
                        <Eye size={18} className="text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="small">
                        <Edit size={18} className="text-green-500" />
                      </Button>
                      <Button variant="ghost" size="small">
                        <Trash2 size={18} className="text-red-500" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
