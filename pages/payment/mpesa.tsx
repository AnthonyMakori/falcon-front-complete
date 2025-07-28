// ✅ Removed unused `loading` state
// You can re-enable it later if you want a loading spinner

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Table, Thead, Tbody, Tr, Th, Td } from "../../components/ui/table";
import { CheckCircle, XCircle, Search } from "lucide-react";
import AdminSidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/Admin/navbar";

export default function MpesaPaymentsAdmin() {
  const [search, setSearch] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  type MpesaPayment = {
    id: string | number;
    email?: string;
    checkout_request_id?: string;
    amount: string | number;
    status: string;
    transaction_date?: string;
    created_at?: string;
  };

  const [mpesaPayments, setMpesaPayments] = useState<MpesaPayment[]>([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("https://api.falconeyephilmz.com/api/payments/mpesa");
        setMpesaPayments(response.data);
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      }
    };

    fetchPayments();
  }, []);

  const filteredPayments = mpesaPayments.filter((payment) =>
    payment.email?.toLowerCase().includes(search.toLowerCase()) ||
    payment.checkout_request_id?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex">
      <div className={`${isSidebarCollapsed ? "w-16" : "w-64"} transition-width duration-300`}>
        <AdminSidebar isCollapsed={isSidebarCollapsed} toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      </div>

      <div className="flex-1 flex flex-col transition-margin duration-300 ml-auto w-full">
        <Navbar />
        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-semibold text-blue-600">MPesa Payments</h1>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4 text-black">
                <Input
                  placeholder="Search by email or transaction ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-72"
                />
                <Button variant="outline">
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-black">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Transaction ID</Th>
                    <Th>Email</Th>
                    <Th>Amount</Th>
                    <Th>Status</Th>
                    <Th>Date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredPayments.map((payment) => (
                    <Tr key={payment.id}>
                      <Td>{payment.checkout_request_id}</Td>
                      <Td>{payment.email}</Td>
                      <Td>KES {parseFloat(payment.amount.toString()).toLocaleString()}</Td>
                      <Td>
                        {payment.status === "Success" ? (
                          <span className="flex items-center text-green-600">
                            <CheckCircle className="w-5 h-5 mr-1" /> {payment.status}
                          </span>
                        ) : payment.status === "Pending" ? (
                          <span className="text-yellow-600">{payment.status}</span>
                        ) : (
                          <span className="flex items-center text-red-600">
                            <XCircle className="w-5 h-5 mr-1" /> {payment.status}
                          </span>
                        )}
                      </Td>
                      <Td>{new Date(payment.transaction_date || payment.created_at || "").toLocaleDateString()}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
