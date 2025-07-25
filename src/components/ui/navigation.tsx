import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useRouter } from 'next/navigation';
import { useUser } from "@/contexts/UserContext";

function Navbar() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const { user, logout } = useUser();

  useEffect(() => {
  setMounted(true);
  setShowDropdown(false);
  }, [user]);


  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };
  
  return (
    <nav className="bg-white dark:bg-[#0f0f0f] text-black dark:text-white p-4 flex justify-between items-center relative">
      <div className="text-xl font-bold">My HR App</div>

      <div className="flex items-center gap-4">
        {user && (
          <div className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              
              <span>{user.fullName}</span>
              <img
                src={user.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full border"
              />
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-lg z-10"
                  onMouseLeave={() => setShowDropdown(false)}
>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 block text-sm w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
          className="px-3 py-1 rounded"
        >
          {currentTheme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
