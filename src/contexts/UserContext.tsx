import { createContext, useContext, useEffect, useState } from "react";

type User = {
  full_name: string;
  avatar: string;
  id: number;
  email: string;
};

type UserContextType = {
  user: User | null;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Tự động cập nhật khi localStorage thay đổi
  useEffect(() => {
    const syncUserFromLocalStorage = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    syncUserFromLocalStorage(); // Khởi tạo ban đầu

    // Lắng nghe sự kiện "storage" khi localStorage thay đổi từ tab khác
    window.addEventListener("storage", syncUserFromLocalStorage);

    return () => {
      window.removeEventListener("storage", syncUserFromLocalStorage);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
