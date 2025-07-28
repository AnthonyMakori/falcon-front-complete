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
  const [editMovieData, setEditMovieData] = useState<Movie | null>(null);

  interface Movie {
    id: number;
    title: string;
    category: string;
    price: number;
    date_released: string;
    purchases: number;
    description?: string;
    currency?: string;
  }

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies`);
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this movie?")) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}`);
      setMovies(movies.filter(movie => movie.id !== id));
      alert("Movie deleted successfully.");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete movie.");
    }
  };

  const handleEdit = (movie: Movie) => {
    setEditMovieData(movie);
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-screen">
      <div className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} transition-width duration-300`}>
        <AdminSidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      <div className="flex-1 flex flex-col transition-margin duration-300 ml-auto w-full">
        <Navbar />

        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Movie Management</h1>
            <Button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                setEditMovieData(null);
                setIsModalOpen(true);
              }}
            >
              + Add New Movie
            </Button>
          </div>

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
                      <Button
                        className="bg-green-500 text-white px-2 py-1 rounded"
                        onClick={() => handleEdit(movie)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                        onClick={() => handleDelete(movie.id)}
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>

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

      {isModalOpen && (
        <MovieUploadModal
          onClose={() => {
            setIsModalOpen(false);
            setEditMovieData(null);
          }}
          onSuccess={() => {
            setIsSuccessMessageVisible(true);
            fetchMovies();
          }}
          initialData={editMovieData}
        />
      )}

      {isSuccessMessageVisible && (
        <div className="fixed bottom-4 left-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
          Movie uploaded successfully!
        </div>
      )}
    </div>
  );
}

// Reusable Upload & Edit Modal
interface Movie {
  id: number;
  title: string;
  category: string;
  price: number;
  date_released: string;
  purchases: number;
  description?: string;
  currency?: string;
}

const MovieUploadModal = ({
  onClose,
  onSuccess,
  initialData,
}: {
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Movie | null;
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [price, setPrice] = useState(initialData?.price?.toString() || '');
  const [poster, setPoster] = useState<File | null>(null);
  const [category, setCategory] = useState(initialData?.category || '');
  const [dateReleased, setDateReleased] = useState(initialData?.date_released || '');
  const [currency, setCurrency] = useState(initialData?.currency || 'USD');
  const [convertedPrice, setConvertedPrice] = useState('');
  const [movieFile, setMovieFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const convertPrice = (amount: string, currency: string) => {
    const rates: Record<string, number> = { USD: 1, EUR: 0.92, GBP: 0.78, KES: 130 };
    return (parseFloat(amount) * (rates[currency] || 1)).toFixed(2);
  };

  useEffect(() => {
    if (price) {
      setConvertedPrice(convertPrice(price, currency));
    }
  }, [price, currency]);

  const handleUpload = async () => {
    if (!title || !description || !price || !category || !dateReleased || (!initialData && (!poster || !movieFile))) {
      alert('All fields are required.');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('currency', currency);
      formData.append('date_released', dateReleased);
      if (poster) formData.append('poster', poster);

      if (initialData) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/movies/${initialData.id}/update`, formData);
        alert("Movie updated successfully!");
      } else {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload-movie`, {
          method: 'POST',
          body: formData,
        });
        const metadata = await res.json();
        if (!metadata.videoId) throw new Error("Failed to get video ID");

        const bunnyUploadUrl = `https://video.bunnycdn.com/library/468878/videos/${metadata.videoId}`;
        await fetch(bunnyUploadUrl, {
          method: 'PUT',
          headers: {
            'AccessKey': '9a08c4d9-5e1c-45e6-b85aca0a3e25-2cc4-49ce',
            'Content-Type': 'application/octet-stream',
          },
          body: movieFile,
        });
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Upload error:", err);
      alert("An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-black" style={{ marginTop: "40px" }}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] h-[500px] overflow-y-auto ml-[200px] border-blue-600">
        <h2 className="text-xl font-bold mb-4">{initialData ? "Edit Movie" : "Upload New Movie"}</h2>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium">Movie Title</label>
            <input type="text" className="w-full border p-2 rounded mb-2 border-blue-600" value={title} onChange={(e) => setTitle(e.target.value)} />
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
            <textarea className="w-full border p-2 rounded mb-2 border-blue-600" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input type="number" className="w-full border p-2 rounded mb-2 border-blue-600" value={price} onChange={(e) => setPrice(e.target.value)} />
            {convertedPrice && <p className="text-sm text-blue-600">Converted Price: {convertedPrice} {currency}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Currency</label>
            <select className="w-full border p-2 rounded border-blue-600" value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="USD">USD</option>
              <option value="KES">KES</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Date Released</label>
            <input type="date" className="w-full border p-2 rounded mb-2 border-blue-600" value={dateReleased} onChange={(e) => setDateReleased(e.target.value)} />
          </div>
          {!initialData && (
            <>
              <div className="col-span-2">
                <label className="block text-sm font-medium">Movie Poster</label>
                <input type="file" className="w-full border p-2 rounded mb-2 border-blue-600" onChange={(e) => setPoster(e.target.files?.[0] || null)} />
              </div>
              <input type="file" accept="video/*" onChange={(e) => setMovieFile(e.target.files?.[0] || null)} />
              {movieFile && <p className="text-green-600 text-sm">Movie file selected: {movieFile.name}</p>}
            </>
          )}
        </div>

        <div className="flex justify-between mt-4">
          <Button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>Cancel</Button>
          <Button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleUpload} disabled={isUploading}>
            {isUploading ? "Uploading..." : initialData ? "Update" : "Upload"}
          </Button>
        </div>
      </div>
    </div>
  );
};
