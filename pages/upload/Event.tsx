import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import AdminSidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/Admin/navbar";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function UploadEvent() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [eventData, setEventData] = useState({
        title: "",
        date: "",
        poster: null as File | null,
        description: "",
        location: "",
        price: "",
    });
    const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setEventData({ ...eventData, poster: e.target.files[0] });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("title", eventData.title);
        formData.append("date", eventData.date);
        if (eventData.poster) formData.append("poster", eventData.poster);
        formData.append("description", eventData.description);
        formData.append("location", eventData.location);
        formData.append("price", eventData.price);
    
        try {
            const response = await fetch(`${API_URL}/events`, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json" 
                },
            });
    
            // Log raw response text to debug issues
            const text = await response.text();
            console.log("Raw response:", text);
    
            // Try parsing JSON
            const result = JSON.parse(text);
            if (!response.ok) throw new Error(result.message || "Failed to upload event");
    
            console.log("Event uploaded:", result);
            setMessage({ text: "Event uploaded successfully!", type: "success" });
    
            // Reset form
            setEventData({
                title: "",
                date: "",
                poster: null,
                description: "",
                location: "",
                price: "",
            });
        } catch (error) {
            console.error("Upload error:", error);
            const errorMessage = error instanceof Error ? error.message : "An error occurred";
            setMessage({ text: errorMessage, type: "error" });
        } finally {
            setTimeout(() => setMessage(null), 5000);
        }
    };
    

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} transition-width duration-300 fixed h-full`}>
                <AdminSidebar isCollapsed={isSidebarCollapsed} toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
            </div>

            {/* Main Content */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
                <Navbar />
                <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
                    <h2 className="text-2xl text-blue-600 font-semibold text-center mb-4">Upload Event</h2>

                    {/* Success/Error Message */}
                    {message && (
                        <p className={`text-center mb-4 ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
                            {message.text}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4 text-black">
                        <div className="flex gap-4">
                            <Input
                                type="text"
                                name="title"
                                placeholder="Event Title"
                                value={eventData.title}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                type="date"
                                name="date"
                                value={eventData.date}
                                onChange={handleChange}
                                required
                                className="text-black"
                            />
                        </div>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                        <Textarea
                            name="description"
                            placeholder="Event Description"
                            value={eventData.description}
                            onChange={handleChange}
                            required
                        />
                        <div className="flex gap-4">
                            <Input
                                type="text"
                                name="location"
                                placeholder="Location"
                                value={eventData.location}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                type="number"
                                name="price"
                                placeholder="Entry Price (Leave empty if free)"
                                value={eventData.price}
                                onChange={handleChange}
                            />
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 border border-red-700">Upload Event</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
