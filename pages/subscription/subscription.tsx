import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Table, Tbody, Td, Th, Thead, Tr } from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { Search } from "lucide-react";
import Head from "next/head";
import AdminSidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/Admin/navbar";

const subscriptions = [
  { id: 1, user: "John Doe", plan: "Premium", amount: "$10", status: "Active", startDate: "2025-01-01", endDate: "2025-12-31" },
  { id: 2, user: "Jane Smith", plan: "Basic", amount: "$5", status: "Expired", startDate: "2024-02-01", endDate: "2024-12-31" },
  { id: 3, user: "Alice Brown", plan: "Standard", amount: "$7", status: "Active", startDate: "2025-03-01", endDate: "2026-02-28" },
];

export default function SubscriptionsPage() {
  const [search, setSearch] = useState("");

  const filteredSubscriptions = subscriptions.filter((sub) =>
    sub.user.toLowerCase().includes(search.toLowerCase())
  );
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Head>
        <title>Subscriptions</title>
        <meta name="description" content="subscriptions done" />
        <meta name="keywords" content="subscribe" />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} transition-width duration-300`}>
        <AdminSidebar isCollapsed={isSidebarCollapsed} toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      </div>
    
      <div className="flex-1 flex flex-col transition-margin duration-300 ml-auto w-full">
      <Navbar />
      <h1 className="text-2xl font-bold">Subscriptions</h1>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold text-green-600">Active Subscriptions</h2>
            <p className="text-2xl font-bold text-green-600">{subscriptions.filter(sub => sub.status === "Active").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold text-red-500">Expired Subscriptions</h2>
            <p className="text-2xl font-bold text-red-500">{subscriptions.filter(sub => sub.status === "Expired").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold text-blue-600">Total Subscriptions</h2>
            <p className="text-2xl font-bold text-blue-600">{subscriptions.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-2 text-black rounded-lg p-2 w-1/3 mb-8">
        <Search className="h-5 w-5 text-gray-500" />
        <Input
          type="text"
          placeholder="Search by user name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Table>
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Plan</Th>
            <Th>Amount</Th>
            <Th>Status</Th>
            <Th>Start Date</Th>
            <Th>End Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredSubscriptions.map((sub) => (
            <Tr key={sub.id}>
              <Td>{sub.user}</Td>
              <Td>{sub.plan}</Td>
              <Td>{sub.amount}</Td>
              <Td>
                <Badge variant={sub.status === "Active" ? "success" : "destructive"}>{sub.status}</Badge>
              </Td>
              <Td>{sub.startDate}</Td>
              <Td>{sub.endDate}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
    </div>
  );
}
