import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "../../components/ui/table";
import { Trash, Edit, Eye } from "lucide-react";
import AdminSidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/Admin/navbar";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import { getDirectors, addDirector, deleteDirector, updateDirector } from "../../utils/api";

interface Director {
  id: number;
  name: string;
  age: number;
  movies: number;
  series: number;
  ranking: number;
}

export default function DirectorsPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [directors, setDirectors] = useState<Director[]>([]);
  const [editingDirector, setEditingDirector] = useState<Director | null>(null);
  const [newDirector, setNewDirector] = useState({ name: "", age: "", movies: "", series: "", ranking: "" });

  useEffect(() => {
    fetchDirectors();
  }, []);

  const fetchDirectors = async () => {
    const data = await getDirectors();
    setDirectors(data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDirector({ ...newDirector, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (editingDirector) {
      await updateDirector(editingDirector.id, newDirector);
    } else {
      await addDirector(newDirector);
    }
    fetchDirectors();
    setIsModalOpen(false);
    setNewDirector({ name: "", age: "", movies: "", series: "", ranking: "" });
    setEditingDirector(null);
  };

  const handleDelete = async (id: number) => {
    await deleteDirector(id);
    fetchDirectors();
  };

  const handleEdit = (director: Director) => {
    setNewDirector({
      name: director.name,
      age: director.age.toString(),
      movies: director.movies.toString(),
      series: director.series.toString(),
      ranking: director.ranking.toString(),
    });
    
    setEditingDirector(director);
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-screen">
      <div className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} transition-width duration-300`}>
        <AdminSidebar isCollapsed={isSidebarCollapsed} toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      </div>
      
      <div className="flex-1 flex flex-col transition-margin duration-300 ml-auto w-full">
        <Navbar />
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Directors</h1>
            <Button className="bg-blue-600 text-white" onClick={() => setIsModalOpen(true)}>Add Director</Button>
          </div>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Age</Th>
                <Th>Movies Directed</Th>
                <Th>Series Directed</Th>
                <Th>Ranking</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {directors.map((director) => (
                <Tr key={director.id}>
                  <Td>{director.name}</Td>
                  <Td>{director.age}</Td>
                  <Td>{director.movies}</Td>
                  <Td>{director.series}</Td>
                  <Td>{director.ranking}</Td>
                  <Td className="flex gap-3">
                    <Edit className="text-yellow-500 cursor-pointer" size={18} onClick={() => handleEdit(director)} />
                    <Trash className="text-red-500 cursor-pointer" size={18} onClick={() => handleDelete(director.id)} />
                    <Eye className="text-blue-500 cursor-pointer" size={18} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <DialogContent>
            <div className="bg-white p-6 rounded-lg shadow-lg fixed inset-0 m-auto max-w-md text-black">
              <h2 className="text-xl font-bold mb-4 text-blue-600">{editingDirector ? "Edit Director" : "Add New Director"}</h2>
              <div className="mb-3">
                <label className="block mb-1">Name</label>
                <input type="text" name="name" value={newDirector.name} onChange={handleInputChange} className="border p-2 w-full rounded" />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Age</label>
                <input type="number" name="age" value={newDirector.age} onChange={handleInputChange} className="border p-2 w-full rounded" />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Movies Directed</label>
                <input type="number" name="movies" value={newDirector.movies} onChange={handleInputChange} className="border p-2 w-full rounded" />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Series Directed</label>
                <input type="number" name="series" value={newDirector.series} onChange={handleInputChange} className="border p-2 w-full rounded" />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Ranking</label>
                <input type="number" name="ranking" value={newDirector.ranking} onChange={handleInputChange} className="border p-2 w-full rounded" />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <Button className="bg-gray-500 text-white" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button className="bg-green-600 text-white" onClick={handleSave}>{editingDirector ? "Update" : "Save"}</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
