import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

interface MediaItem {
    id: number;
    title: string;
    type: "movie" | "series";
    description: string;
    imageUrl: string;
}

const ITEMS_PER_PAGE = 4;

const NewReleased = () => {
    const [filter, setFilter] = useState<"all" | "movie" | "series">("all");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [mediaData, setMediaData] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMedia = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/latest-media");
    
                type RawMediaItem = Omit<MediaItem, "type">;
    
                const movies = (response.data.movies as RawMediaItem[]).map((movie) => ({
                    ...movie,
                    type: "movie" as const,
                }));
                const series = (response.data.series as RawMediaItem[]).map((series) => ({
                    ...series,
                    type: "series" as const,
                }));
    
                setMediaData([...movies, ...series]);
            } catch (error) {
                console.error("Error fetching media:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchMedia();
    }, []);
    

    const filteredData = mediaData
        .filter((item) => filter === "all" || item.type === filter)
        .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const displayedData = filteredData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (direction: "next" | "prev") => {
        setCurrentPage((prev) => {
            if (direction === "next" && prev < totalPages) return prev + 1;
            if (direction === "prev" && prev > 1) return prev - 1;
            return prev;
        });
    };

    return (
        <div className="p-6 bg-gray-900 relative">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Newly Released</h1>
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                <input
                    type="text"
                    placeholder="Search titles..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:w-auto px-4 py-2 text-black border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as "all" | "movie" | "series")}
                    className="px-4 py-2 text-black border rounded focus:outline-none focus:ring focus:ring-blue-300"
                >
                    <option value="all">All</option>
                    <option value="movie">Movies</option>
                    <option value="series">Series</option>
                </select>
            </div>

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedData.map((item) => (
                        <div
                            key={item.id}
                            className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-bold text-blue-600">{item.title}</h2>
                                <p className="text-gray-600">{item.description}</p>
                                <span
                                    className="inline-block mt-2 px-2 py-1 rounded text-sm bg-green-100 text-green-600"
                                >
                                    {item.type === "movie" ? "Movie" : "Series"}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {filteredData.length > ITEMS_PER_PAGE && (
                <div className="flex justify-center items-center mt-6 gap-4">
                    <button
                        onClick={() => handlePageChange("prev")}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-black font-semibold">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange("next")}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Back Button */}
            <button
                onClick={() => window.history.back()}
                className="fixed bottom-6 right-6 flex items-center px-4 py-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                </svg>
                Back
            </button>
        </div>
    );
};

export default NewReleased;
