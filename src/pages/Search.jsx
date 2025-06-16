import React, { useState } from "react";
import { CustomInput } from "../components/input";
import { ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav.tsx/bottomNav";
import * as SC from "../../style";
import logo from "/logo.png";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function SearchFunction() {
  const [movieName, setMovieName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!movieName.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movieName)}`
      );
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SC.Main3 className="min-h-screen flex items-center justify-center bg-[#0f0c29] bg-gradient-to-br from-[#302b63] to-[#24243e]">
      <div className="bg-[#1e1e2f] text-white py-8 px-4 rounded-2xl shadow-md w-full max-w-md min-h-screen flex flex-col text-center">
        {/* Header */}
        <span className="flex justify-between items-center mb-6">
          <Link to="/home">
            <ArrowLeft size={22} className="text-white" />
          </Link>
          <h2 className="text-lg font-semibold">Search Movies</h2>
          <img src={logo} alt="Trendz Movies Logo" className="h-10" />
        </span>

        {/* Search Input */}
        <form className="space-y-4" onSubmit={handleSearch}>
          <CustomInput
            name="name"
            placeholder="Search movie title"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            className="pr-10"
            rightIcon={
              <button type="submit">
                <Search className="text-gray-300 hover:text-white" size={20} />
              </button>
            }
          />
        </form>

        {/* Results */}
        <div className="mt-6 text-left mb-12">
          {isLoading && <p className="text-center text-sm mt-4 text-gray-300">Searching...</p>}

          {!isLoading && searchResults.length === 0 && movieName && (
            <p className="text-center text-sm mt-4 text-gray-400">No results found.</p>
          )}

          <div className="grid grid-cols-2 gap-4 mt-4">
            {searchResults.map((movie) => (
              <Link
                to={`/movie/${movie.id}`}
                key={movie.id}
                className="bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] rounded-lg overflow-hidden transition-all duration-200"
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      : "https://via.placeholder.com/200x300?text=No+Image"
                  }
                  alt={movie.title}
                  className="w-full h-auto"
                />
                <p className="p-2 text-sm font-medium">{movie.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </SC.Main3>
  );
}
