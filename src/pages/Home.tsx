import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../api/tmdb";
import logo from "/logo.png";
import NewRelease from "../components/newRelease/newRelease";
import Trending from "../components/Trending/trending";
import PopularCategories from "../components/PopularCategory/popularCategories";
import BottomNav from "../components/BottomNav.tsx/bottomNav";
import * as SC from "../../style";
import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);

    async function loadMovies() {
      try {
        const movies = await fetchTrendingMovies();
        setTrendingMovies(movies);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    }

    loadMovies();
  }, []);

  return (
    <SC.Main2 className="min-h-screen bg-slate-950 text-white">
      <div className="w-full max-w-3xl mx-auto p-y flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between items-center bg-slate-800 p-4 rounded-xl shadow-md">
          <Link to="/home">
            <img src={logo} alt="logo" className="h-10 hover:scale-105 transition-transform" />
          </Link>
          <h2 className="text-lg font-semibold capitalize text-green-400">
            Welcome, {username || "Guest"}
          </h2>
          <Link to="/profile">
            <UserCircle size={28} className="text-white hover:text-green-400 transition-colors" />
          </Link>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          <Trending />
          <NewRelease />
          <PopularCategories />
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 w-full max-w-3xl mx-auto">
          <BottomNav />
        </div>
      </div>
    </SC.Main2>
  );
}
