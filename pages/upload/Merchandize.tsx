import { useState } from "react";
import axios from "axios";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import AdminSidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/Admin/navbar";

const AdminMerchUpload = () => {
  const [merch, setMerch] = useState<{ name: string; image: File | null; price: string; description: string }>({
    name: "",
    image: null,
    price: "",
    description: "",
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMerch((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMerch((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", merch.name);
    if (merch.image) {
      formData.append("image", merch.image);
    }
    formData.append("price", merch.price);
    formData.append("description", merch.description);

    // Debugging: Log formData entries
    console.log("Submitting form data:");
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }   

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/merchandise/admin/merch", formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          "Accept": "application/json",
        },
      });

      console.log("Response:", response.data);
      alert("Merchandise uploaded successfully!");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error uploading merchandise:", error.response?.data || error.message);
        alert(`Failed to upload merchandise. ${error.response?.data?.message || ""}`);
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred while uploading merchandise.");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <div className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} transition-width duration-300`}>
        <AdminSidebar isCollapsed={isSidebarCollapsed} toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col transition-margin duration-300 ml-auto w-full">
        <Navbar />
        <main className="flex-grow p-6 bg-white shadow-md rounded-lg w-full">
          <div className="flex justify-center items-center h-full p-6">
            <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-center">Upload Merchandise</h2>
              <form onSubmit={handleSubmit} className="space-y-4 text-black">
                <Input name="name" placeholder="Name" onChange={handleChange} required />
                <Input type="file" accept="image/*" onChange={handleImageChange} required />
                <Input name="price" placeholder="Price" type="number" onChange={handleChange} required />
                <Input name="description" placeholder="Description" onChange={handleChange} required />
                <Button type="submit" className="w-full">Upload</Button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminMerchUpload;
