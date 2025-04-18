import { Button } from "../../components/ui/button";
import { useState, useEffect } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "../../components/ui/table";
import { Trash, Edit, Eye } from "lucide-react";
import AdminSidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/Admin/navbar";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import axios from "axios";

export default function ActorsPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newActor, setNewActor] = useState({ name: "", movies: "", series: "", role: "" });
  const [actors, setActors] = useState<{ id: number; name: string; movies: string; series: string; role: string }[]>([]);

  useEffect(() => {
    fetchActors();
  }, []);

  const fetchActors = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/actors`);
      setActors(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching actors:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };
  
  


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewActor({ ...newActor, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/actors`,
        newActor
      );
      alert(response.data.message);
      setIsModalOpen(false);
      fetchActors();
    } catch (error) {
      console.error("Error saving actor:", error);
      alert("There was an error saving the actor.");
    }
  };
  

  return (
    <div className="flex h-screen">
      <div className={`${isSidebarCollapsed ? "w-16" : "w-64"} transition-width duration-300`}>
        <AdminSidebar isCollapsed={isSidebarCollapsed} toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      </div>

      <div className="flex-1 flex flex-col transition-margin duration-300 ml-auto w-full">
        <Navbar />
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Actors</h1>
            <Button className="bg-blue-600 text-white" onClick={() => setIsModalOpen(true)}>
              Add Actor
            </Button>
          </div>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Movies Acted</Th>
                <Th>Series Acted</Th>
                <Th>Role</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {actors.length > 0 ? (
                actors.map((actor) => (
                  <Tr key={actor.id}>
                    <Td>{actor.name}</Td>
                    <Td>{actor.movies}</Td>
                    <Td>{actor.series}</Td>
                    <Td>{actor.role}</Td>
                    <Td className="flex gap-3">
                      <Trash className="text-red-500 cursor-pointer" size={18} />
                      <Edit className="text-yellow-500 cursor-pointer" size={18} />
                      <Eye className="text-blue-500 cursor-pointer" size={18} />
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={5} className="text-center text-gray-500">
                    No actors found.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <DialogContent>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-black">
              <h2 className="text-xl font-bold mb-4 text-blue-600">Add New Actor</h2>
              <div className="mb-3">
                <label className="block mb-1">Name</label>
                <input type="text" name="name" value={newActor.name} onChange={handleInputChange} className="border p-2 w-full rounded" />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Movies Acted</label>
                <input type="number" name="movies" value={newActor.movies} onChange={handleInputChange} className="border p-2 w-full rounded" />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Series Acted</label>
                <input type="number" name="series" value={newActor.series} onChange={handleInputChange} className="border p-2 w-full rounded" />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Role</label>
                <input type="text" name="role" value={newActor.role} onChange={handleInputChange} className="border p-2 w-full rounded" />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <Button className="bg-gray-500 text-white" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-green-600 text-white" onClick={handleSave}>
                  Save
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
