import { Button } from "../../components/ui/button";
import { useState, useEffect } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "../../components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "../../components/ui/pagination";
import AdminSidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/Admin/navbar";
import axios from "axios";

export default function MovieManagement() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);
  interface Movie {
    id: number;
    title: string;
    category: string;
    price: number;
    date_released: string;
    purchases: number;
  }

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/movies`)
      .then((response) => setMovies(response.data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);
  

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} transition-width duration-300`}>
        <AdminSidebar 
          isCollapsed={isSidebarCollapsed} 
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        />
      </div>
      
      <div className="flex-1 flex flex-col transition-margin duration-300 ml-auto w-full">
        <Navbar />
        
        <div className="p-4">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Movie Management</h1>
            <Button 
              className="bg-blue-500 text-white px-4 py-2 rounded" 
              onClick={() => setIsModalOpen(true)}
            >
              + Add New Movie
            </Button>
          </div>
          
          {/* Table Section */}
          <div className="overflow-x-auto">
      <Table>
        <Thead>
          <Tr>
            <Th>Movie Title</Th>
            <Th>Category</Th>
            <Th>Price</Th>
            <Th>Date Released</Th>
            <Th>Purchases</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {movies.map((movie) => (
            <Tr key={movie.id}>
              <Td>{movie.title}</Td>
              <Td>{movie.category}</Td>
              <Td>${movie.price}</Td>
              <Td>{movie.date_released}</Td>
              <Td>{movie.purchases}</Td>
              <Td>
                <Button className="bg-green-500 text-white px-2 py-1 rounded">
                  Edit
                </Button>
                <Button className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
          
          {/* Pagination Section */}
          <div className="flex justify-between items-center mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">...</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">100</PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            <div className="flex gap-2">
              <Button className="bg-gray-300 px-3 py-1 rounded">Previous</Button>
              <Button className="bg-gray-300 px-3 py-1 rounded">Next</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Upload Modal */}
      {isModalOpen && (
        <MovieUploadModal 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={() => setIsSuccessMessageVisible(true)} 
        />
      )}
      
      {/* Success Message */}
      {isSuccessMessageVisible && (
        <div className="fixed bottom-4 left-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
          Movie uploaded successfully!
        </div>
      )}
    </div>
  );
}

// Modal Component for Uploading Movies
const MovieUploadModal = ({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [poster, setPoster] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [dateReleased, setDateReleased] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [convertedPrice, setConvertedPrice] = useState('');
  const [movieFile, setMovieFile] = useState<File | null>(null);

  // Price conversion function
  const convertPrice = (amount: string, currency: string) => {
    const rates: Record<string, number> = { USD: 1, EUR: 0.92, GBP: 0.78, KES: 130 };
    return (parseFloat(amount) * (rates[currency] || 1)).toFixed(2);
  };

  useEffect(() => {
    if (price) {
      setConvertedPrice(convertPrice(price, currency));
      console.log("Converted Price:", convertedPrice);
    }
  }, [price, currency]);

  const handleUpload = async () => {
  if (!title || !description || !price || !poster || !category || !dateReleased || !movieFile) {
    alert('All fields are required, including the movie file');
    return;
  }

  setIsUploading(true);

  try {
    // 1. Send metadata & poster to Laravel (excluding video file)
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('poster', poster);
    formData.append('category', category);
    formData.append('currency', currency);
    formData.append('date_released', dateReleased);

    const metadataRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload-movie`, {
      method: 'POST',
      body: formData,
    });

    const metadata = await metadataRes.json();
    if (!metadata.videoId) {
      throw new Error("Failed to get video ID from server.");
    }

    // Upload movie file directly to Bunny
    const BUNNY_LIBRARY_ID = "468878";
    const BUNNY_API_KEY = "9a08c4d9-5e1c-45e6-b85aca0a3e25-2cc4-49ce";

    const bunnyUploadUrl = `https://video.bunnycdn.com/library/${BUNNY_LIBRARY_ID}/videos/${metadata.videoId}`;

    const uploadRes = await fetch(bunnyUploadUrl, {
      method: 'PUT',
      headers: {
        'AccessKey': BUNNY_API_KEY,
        'Content-Type': 'application/octet-stream',
      },
      body: movieFile,
    });

    if (!uploadRes.ok) {
      throw new Error("Video upload to Bunny failed.");
    }

    alert("Movie uploaded successfully!");
    onSuccess();
    onClose();
  } catch (error: any) {
    console.error('Upload error:', error);
    alert(error.message || 'Unknown error during upload.');
  } finally {
    setIsUploading(false);
  }
};

  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-black" style={{ marginTop: "40px" }}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] h-[500px] overflow-y-auto ml-[200px] border-blue-600">
        <h2 className="text-xl font-bold mb-4">Upload New Movie</h2>
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium">Movie Title</label>
            <input 
              type="text" 
              className="w-full border p-2 rounded mb-2 border-blue-600" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium">Category</label>
            <select 
              className="w-full border p-2 rounded mb-2 border-blue-600" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Romance">Romance</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Psychological Thriller">Psychological Thriller</option>
              <option value="Film Noir">Film Noir</option>
              <option value="Thriller">Thriller</option>
              <option value="Romcom">Romcom</option>
              <option value="Horror">Horror</option>
              <option value="Crime Film">Crime Film</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Documentary">Documentary</option>
              <option value="Animation">Animation</option>
              <option value="Adventure">Adventure</option>
              <option value="Musical">Musical</option>
              <option value="War">War</option>
              <option value="Highbrid Genre">Highbrid Genre</option>
              <option value="Experimental">Experimental</option>
              <option value="Narrative">Narative</option>
              <option value="History">History</option>
              <option value="Melodrama">Melodrama</option>
              <option value="Dark comedy">Dark Comedy</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea 
              className="w-full border p-2 rounded mb-2 border-blue-600" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium">Price</label>
            <input 
              type="number" 
              className="w-full border p-2 rounded mb-2 border-blue-600" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Currency</label>
            <select 
              className="w-full border p-2 rounded border-blue-600" 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="KES">KES</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Date Released</label>
            <input 
              type="date" 
              className="w-full border p-2 rounded mb-2 border-blue-600" 
              value={dateReleased} 
              onChange={(e) => setDateReleased(e.target.value)}
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium">Movie Poster</label>
            <input 
              type="file" 
              className="w-full border p-2 rounded mb-2 border-blue-600" 
              onChange={(e) => setPoster(e.target.files ? e.target.files[0] : null)} 
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium">Movie File (Max: 6GB)</label>
            <input 
              type="file" 
              accept="video/mp4,video/mkv,video/ts" 
              className="w-full border p-2 rounded mb-2 border-blue-600" 
              onChange={(e) => setMovieFile(e.target.files ? e.target.files[0] : null)} 
            />
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <Button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            className="bg-blue-500 text-white px-4 py-2 rounded" 
            onClick={handleUpload} 
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </div>
    </div>
  );
};
