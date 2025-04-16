import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { useState } from "react";
import { BarChart, LineChart, PieChart } from "../../components/ui/charts";
import { Table, Thead, Tbody, Tr, Th, Td } from "../../components/ui/table";
import { CalendarIcon } from "lucide-react";
import { DatePicker } from "../../components/ui/datepicker";
import AdminSidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/Admin/navbar";

// Define DateRange type
type DateRange = {
  from: Date | null;
  to: Date | null;
};

export default function AdminAnalytics() {
  const [dateRange, setDateRange] = useState<DateRange>({ from: null, to: null });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-200">
      <div className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} transition-width duration-300`}>
        <AdminSidebar isCollapsed={isSidebarCollapsed} toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      </div>
      
      <div className="flex-1 flex flex-col transition-margin duration-300 ml-auto w-full">
        <Navbar />

        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-blue-600">Admin Analytics</h1>
            <DatePicker range={dateRange} setRange={setDateRange} icon={<CalendarIcon />} />
          </div>

          <Tabs defaultValue="movies" className="bg-white p-6 rounded-lg shadow-md">
            <TabsList className="flex space-x-4 border-b pb-2">
              <TabsTrigger value="movies" className="text-blue-600 font-semibold">Movies</TabsTrigger>
              <TabsTrigger value="series" className="text-green-600 font-semibold">Series</TabsTrigger>
              <TabsTrigger value="merch" className="text-purple-600 font-semibold">Merchandise</TabsTrigger>
              <TabsTrigger value="events" className="text-orange-600 font-semibold">Events</TabsTrigger>
              <TabsTrigger value="users" className="text-red-600 font-semibold">Users</TabsTrigger>
            </TabsList>

            {/* Movies Analytics */}
            <TabsContent value="movies" className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-white shadow-md border-l-8 border-blue-600">
                  <CardHeader>
                    <CardTitle className="text-blue-600">Movie Sales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BarChart data={[]} />
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-md border-l-8 border-blue-400">
                  <CardHeader>
                    <CardTitle className="text-blue-400">Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LineChart data={[]} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Series Analytics */}
            <TabsContent value="series" className="p-4">
              <Card className="bg-white shadow-md border-l-8 border-green-600">
                <CardHeader>
                  <CardTitle className="text-green-600">Series Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart data={[]} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Merchandise Analytics */}
            <TabsContent value="merch" className="p-4">
              <Card className="bg-white shadow-md border-l-8 border-purple-600">
                <CardHeader>
                  <CardTitle className="text-purple-600">Merchandise Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <PieChart data={[]} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Events Analytics */}
            <TabsContent value="events" className="p-4">
              <Card className="bg-white shadow-md border-l-8 border-orange-600">
                <CardHeader>
                  <CardTitle className="text-orange-600">Event Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart data={[]} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Analytics */}
            <TabsContent value="users" className="p-4">
              <Card className="bg-white shadow-md border-l-4 border-red-600">
                <CardHeader>
                  <CardTitle className="text-red-600">Active Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <Thead>
                      <Tr>
                        <Th className="text-gray-700">User</Th>
                        <Th className="text-gray-700">Email</Th>
                        <Th className="text-gray-700">Last Active</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>John Doe</Td>
                        <Td>john@example.com</Td>
                        <Td>2025-02-16</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
