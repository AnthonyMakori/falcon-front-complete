import { useState, useEffect } from "react";
import {
  Home,
  Film,
  DollarSign,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Users,
  Clapperboard,
  Shirt,
  BarChart3,
  NotepadText,
  ArrowBigUp,
  Banknote,
  CreditCard,
  
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const AdminSidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
  const router = useRouter();
  const [mediaDropdown, setMediaDropdown] = useState({ videos: false, cast: false });
  const [dropdowns, setDropdowns] = useState({ videos: false, cast: false, payments: false });
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024); // lg breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`h-screen ${
        isCollapsed || isMobileView ? "w-20" : "w-64"
      } bg-gray-900 text-white p-4 flex flex-col fixed transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-6">
        {!isCollapsed && !isMobileView && (
          <h1 className="text-xl font-bold text-center flex-1">Admin Panel</h1>
        )}
        <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-gray-700">
          {isCollapsed || isMobileView ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Scrollable Content */}
      <nav className="flex-1 space-y-4 overflow-y-auto max-h-screen pr-2">
        {/* MAIN */}
        <div>
          <h2 className="text-gray-400 uppercase text-sm mb-2">
            {isCollapsed || isMobileView ? "MAI" : "Main"}
          </h2>
          <Link href="/dash/dashboard">
            <div
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition hover:bg-gray-700 ${
                router.pathname === "/dash/dashboard" ? "bg-gray-700" : ""
              }`}
            >
              <Home size={20} />
              {!isCollapsed && !isMobileView && <span>Dashboard</span>}
            </div>
          </Link>
          <Link href="/analytics/analytics">
            <div className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition hover:bg-gray-700">
              <BarChart3 size={20} />
              {!isCollapsed && !isMobileView && <span>Analytics</span>}
            </div>
          </Link>
        </div>

        {/* MEDIA MANAGEMENT */}
        <div>
          <h2 className="text-gray-400 uppercase text-sm mb-2">
            {isCollapsed || isMobileView ? "MED" : "Media Management"}
          </h2>
          <div
            className="cursor-pointer flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700"
            onClick={() => setMediaDropdown({ ...mediaDropdown, videos: !mediaDropdown.videos })}
          >
            <ArrowBigUp size={20} />
            {!isCollapsed && !isMobileView && <span>Upload</span>}
          </div>
          {mediaDropdown.videos && !isCollapsed && !isMobileView && (
            <div className="ml-6 space-y-2">
              <Link href="/upload/UploadMovie">
                <div className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-lg">
                  <Film size={16} />
                  <span>Movies</span>
                </div>
              </Link>
              <Link href="/upload/UploadSeries">
                <div className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-lg">
                  <Clapperboard size={16} />
                  <span>Series</span>
                </div>
              </Link>
              <Link href="/upload/UploadMerchandise">
                <div className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-lg">
                  <Shirt size={16} />
                  <span>Merchandise</span>
                </div>
              </Link>
              <Link href="/upload/UploadEvent">
                <div className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-lg">
                  <NotepadText size={16} />
                  <span>Event</span>
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* SUBSCRIPTION */}
        <div>
          <h2 className="text-gray-400 uppercase text-sm mb-2">
            {isCollapsed || isMobileView ? "SUB" : "Subscription"}
          </h2>
          <Link href="/subscription/subscription">
            <div className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition hover:bg-gray-700">
              <DollarSign size={20} />
              {!isCollapsed && !isMobileView && <span>Subscriptions</span>}
            </div>
          </Link>
        </div>

        {/* MANAGEMENT */}
        <div>
          <h2 className="text-gray-400 uppercase text-sm mb-2">
            {isCollapsed || isMobileView ? "MAN" : "Management"}
          </h2>
          <Link href="/users/users">
            <div className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition hover:bg-gray-700">
              <Users size={20} />
              {!isCollapsed && !isMobileView && <span>Users</span>}
            </div>
          </Link>
          <div
            className="cursor-pointer flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700"
            onClick={() => setDropdowns({ ...dropdowns, payments: !dropdowns.payments })}
          >
            <CreditCard size={20} />
            {!isCollapsed && !isMobileView && <span>Payments</span>}
          </div>
          {dropdowns.payments && !isCollapsed && !isMobileView && (
            <div className="ml-6 space-y-2">
              <Link href="/payment/bank">
                <div className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-lg">
                  <Banknote size={16} />
                  <span>Bank</span>
                </div>
              </Link>
              <Link href="/payment/mpesa">
                <div className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-lg">
                  <DollarSign size={16} />
                  <span>Mpesa</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="mt-auto">
        <button className="flex items-center gap-3 p-3 rounded-lg w-full bg-red-600 hover:bg-red-700">
          <LogOut size={20} />
          {!isCollapsed && !isMobileView && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
