import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Table, Thead, Tbody, Tr, Th, Td } from "../../components/ui/table";
import AdminSidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/Admin/navbar";
import Modal from "../../components/ui/modal";
import { fetchSeries, addSeries, deleteSeries, uploadEpisode } from "../../utils/api";
import axios from "axios";

type Series = {
  id: number;
  title: string;
  category: string;
  price: number;
  release_date: string;
  episodes: number;
  purchases: number;
  poster:string;
};

export default function SeriesManagement() {
  const [perPage, setPerPage] = useState(25);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState("new");
  const [seriesData, setSeriesData] = useState<Series[]>([]);
  const [newSeries, setNewSeries] = useState({
    title: "",
    category: "",
    price: "",
    release_date: "",
    episodes: "",
    poster: "",
  });

  // Fetch series from the backend
  useEffect(() => {
    loadSeries();
  }, []);

  const loadSeries = async () => {
    try {
      const data = await fetchSeries();
      setSeriesData(data);
    } catch (error) {
      console.error("Error fetching series:", error);
    }
  };

  // Handle input change for adding series
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSeries({ ...newSeries, [e.target.name]: e.target.value });
  };


  const handleAddSeries = async (): Promise<void> => {
    try {
      const formData = new FormData();
formData.append("title", newSeries.title);
formData.append("category", newSeries.category);
formData.append("price", String(newSeries.price)); // Ensure it's a string
formData.append("release_date", newSeries.release_date);
formData.append("episodes", String(newSeries.episodes)); // Ensure it's a string

if (posterFile) {
  formData.append("poster", posterFile);
}
  
      const response = await axios.post("http://127.0.0.1:8000/api/series", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Series added successfully", response.data);
  
      // Refresh series list after successful addition
      loadSeries();
  
      // Reset form
      setNewSeries({
        title: "",
        category: "",
        price: "",
        release_date: "",
        episodes: "",
        poster: "",
      });
      setPosterFile(null);
      setIsModalOpen(false); // Close modal after successful submission
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error adding series", error.response?.data || error.message);
      } else {
        console.error("Error adding series", error);
      }
    }
  };
  

  // Delete series
  const handleDeleteSeries = async (id: number) => {
    try {
      await deleteSeries(id);
      loadSeries();
    } catch (error) {
      console.error("Error deleting series:", error);
    }
  };

  // Upload an episode
  const handleUploadEpisode = async () => {
    const seriesId = (document.querySelector("select[name='seriesId']") as HTMLSelectElement)?.value;
    const fileInput = document.querySelector("input[name='episodeFile']") as HTMLInputElement;

    if (!seriesId || !fileInput.files?.length) {
      alert("Please select a series and upload an episode.");
      return;
    }

    const formData = new FormData();
    formData.append("series_id", seriesId);
    formData.append("episode", fileInput.files[0]);

    try {
      await uploadEpisode(formData);
      setIsModalOpen(false);
      loadSeries();
    } catch (error) {
      console.error("Error uploading episode:", error);
    }
  };

  const [posterFile, setPosterFile] = useState<File | null>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0] || null;
    setPosterFile(file);
  }
  

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`${isSidebarCollapsed ? "w-16" : "w-64"} transition-width duration-300`}>
        <AdminSidebar isCollapsed={isSidebarCollapsed} toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      </div>

      <div className="flex-1 flex flex-col transition-margin duration-300 ml-auto w-full">
        <Navbar />

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Series Management</h2>
            <Button className="bg-blue-600 text-white" onClick={() => setIsModalOpen(true)}>+ Upload Content</Button>
          </div>

          <Table>
            <Thead>
              <Tr>
                <Th>Series Title</Th>
                <Th>Category</Th>
                <Th>Price</Th>
                <Th>Date Released</Th>
                <Th>No of Episodes</Th>
                <Th>Purchases</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {seriesData.map((series) => (
                <Tr key={series.id}>
                  <Td>{series.title}</Td>
                  <Td>{series.category}</Td>
                  <Td>${series.price}</Td>
                  <Td>{series.release_date}</Td>
                  <Td>{series.episodes}</Td>
                  <Td>{series.purchases}</Td>
                  <Td>
                    <Button className="bg-red-500 text-white" onClick={() => handleDeleteSeries(series.id)}>Delete</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <div className="flex justify-between items-center mt-4">
            <div>
              <span>Show </span>
              {[25, 50, 75, 100].map((num) => (
                <Button key={num} className={`mx-1 ${perPage === num ? "bg-blue-600 text-white" : "bg-gray-200"}`} onClick={() => setPerPage(num)}>
                  {num}
                </Button>
              ))}
            </div>
            <div>
              <Button className="bg-gray-300 mr-2">Previous</Button>
              <Button className="bg-gray-300">Next</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} title={<span className="text-blue-600">Upload Content</span>}>
        <div className="mb-4 text-black">
          <label className="block text-black font-semibold mb-1">Upload Type:</label>
          <select
            className="p-2 border rounded w-full"
            value={uploadType}
            onChange={(e) => setUploadType(e.target.value)}
          >
            <option value="new">New Series</option>
            <option value="episode">Upload Episode</option>
          </select>
        </div>

        {uploadType === "new" ? (
          <div className="grid grid-cols-2 gap-4 text-black">
            <input className="p-2 border rounded" type="text" name="title" placeholder="Series Title" onChange={handleInputChange} />
            <input className="p-2 border rounded" type="text" name="category" placeholder="Category" onChange={handleInputChange} />
            <input className="p-2 border rounded" type="number" name="price" placeholder="Price" onChange={handleInputChange} />
            <input className="p-2 border rounded" type="date" name="release_date" placeholder="Release Date" onChange={handleInputChange} />
            <input className="p-2 border rounded" type="number" name="episodes" placeholder="Number of Episodes" onChange={handleInputChange} />
            
            {/* Poster Upload Field */}
            <div className="col-span-2">
              <label className="block text-black font-semibold">Upload Poster:</label>
              <input className="p-2 border rounded w-full" type="file" accept="image/*" onChange={handleFileChange} />
            </div>
          </div>
        ) : (
          <div className="text-black">
            <label className="block text-black font-semibold mb-1">Select Series:</label>
            <select className="p-2 border rounded w-full text-black" name="seriesId">
              {seriesData.map((series) => (
                <option key={series.id} value={series.id}>{series.title}</option>
              ))}
            </select>

            <label className="block text-black font-semibold mt-4">Upload Episode:</label>
            <input className="p-2 border rounded w-full text-black" type="file" name="episodeFile" />
          </div>
        )}

        <div className="flex justify-end mt-4">
          <Button className="bg-green-600 text-white" onClick={uploadType === "new" ? handleAddSeries : handleUploadEpisode}>
            Submit
          </Button>
        </div>
      </Modal>

      )}
    </div>
  );
}
