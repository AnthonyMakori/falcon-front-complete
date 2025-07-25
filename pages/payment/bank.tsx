import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Table, Thead, Tbody, Tr, Th, Td } from "../../components/ui/table";
import { CheckCircle, XCircle, Search } from "lucide-react";
import AdminSidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/Admin/navbar";

const transactions = [
  { id: "TXN12345", user: "John Doe", amount: "$10", status: "Success", date: "2025-02-17" },
  { id: "TXN12346", user: "Jane Smith", amount: "$15", status: "Pending", date: "2025-02-16" },
  { id: "TXN12347", user: "Michael Brown", amount: "$20", status: "Failed", date: "2025-02-15" },
];

export default function BankPaymentsAdmin() {
  const [search, setSearch] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const filteredTransactions = transactions.filter((txn) =>
    txn.user.toLowerCase().includes(search.toLowerCase()) || txn.id.includes(search)
  );

  return (
    <div className="flex">
      <div className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} transition-width duration-300`}>
        <AdminSidebar isCollapsed={isSidebarCollapsed} toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      </div>
      
      <div className="flex-1 flex flex-col transition-margin duration-300 ml-auto w-full">
        <Navbar />
        <h1 className="text-2xl font-semibold text-blue-600 mb-8">Bank Payments</h1>
        <Card className="mb-8">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 text-black">
              <Input
                placeholder="Search by user or transaction ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-72 text-black"
              />
              <Button variant="outline">
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card >
        <Card>
          <CardContent className="p-4 text-black">
            <Table>
              <Thead>
                <Tr>
                  <Th>Transaction ID</Th>
                  <Th>User</Th>
                  <Th>Amount</Th>
                  <Th>Status</Th>
                  <Th>Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredTransactions.map((txn) => (
                  <Tr key={txn.id}>
                    <Td>{txn.id}</Td>
                    <Td>{txn.user}</Td>
                    <Td>{txn.amount}</Td>
                    <Td>
                      {txn.status === "Success" ? (
                        <span className="flex items-center text-green-600">
                          <CheckCircle className="w-5 h-5 mr-1" /> {txn.status}
                        </span>
                      ) : txn.status === "Pending" ? (
                        <span className="text-yellow-600">{txn.status}</span>
                      ) : (
                        <span className="flex items-center text-red-600">
                          <XCircle className="w-5 h-5 mr-1" /> {txn.status}
                        </span>
                      )}
                    </Td>
                    <Td>{txn.date}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}