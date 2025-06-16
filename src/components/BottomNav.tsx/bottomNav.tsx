import { Home, Search, Bookmark, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { label: "Home", icon: <Home size={22} />, path: "/home" },
    { label: "Search", icon: <Search size={22} />, path: "/search" },
    { label: "Library", icon: <Bookmark size={22} />, path: "/library" },
    { label: "Profile", icon: <User size={22} />, path: "/profile" },
  ];

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-slate-800 text-white py-3 px-4 shadow-t z-50 border-t border-slate-700">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center justify-center text-xs transition-all duration-200 ${
                isActive ? "text-green-400 font-semibold" : "text-slate-300 hover:text-green-300"
              }`}
            >
              {item.icon}
              <span className="mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </footer>
  );
}
