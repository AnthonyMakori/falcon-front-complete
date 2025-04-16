import Image from "next/image";
import { useState } from "react";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const [user] = useState({ name: "Admin User", profilePic: "/profile.jpg" });
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    // Perform logout logic (e.g., clearing tokens, redirecting to login page)
    console.log("You logged out");
    window.location.href = "Auth/signin";
  };

  return (
    <nav className="w-full bg-gray-900 text-white p-4 flex justify-between items-center top-0 left-0 z-50">
      <div className="text-lg font-semibold">{user.name}</div>
      <div className="relative">
        <div
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-white cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image src={user.profilePic} alt="User Profile" width={40} height={40} />
        </div>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-md rounded-md">
            <ul className="py-2">
              <li 
                className="px-4 py-2 flex items-center gap-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => (window.location.href = "/profile")}
              >
                <FiUser /> Profile
              </li>
              <li 
                className="px-4 py-2 flex items-center gap-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => (window.location.href = "/settings")}
              >
                <FiSettings /> Settings
              </li>
              <li 
                className="px-4 py-2 flex items-center gap-2 hover:bg-gray-200 cursor-pointer"
                onClick={handleLogout}
              >
                <FiLogOut /> Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
