import React, { useState, useEffect } from "react";
import logo from "/logo.png";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav.tsx/bottomNav";
import * as SC from "../../style";
import { genreMap } from "../assets/genres/genresMap";

type Movie = {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
  runtime?: number;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
};

export default function Library() {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [favourites, setFavourites] = useState<Movie[]>([]);
  const [activeTab, setActiveTab] = useState<"watchlist" | "favourite" | "settings">("watchlist");

  useEffect(() => {
    const storedWatchlist = localStorage.getItem("watchlist");
    const storedFav = localStorage.getItem("favourites");
    setWatchlist(storedWatchlist ? JSON.parse(storedWatchlist) : []);
    setFavourites(storedFav ? JSON.parse(storedFav) : []);
  }, []);

  const renderMovies = (movies: Movie[], title: string) => (
    <>
      <h2 className="text-[18px] font-semibold mb-3 text-left pl-2">{title}</h2>
      {movies.length === 0 ? (
        <p className="text-gray-400 mb-4 text-sm text-center">No movies in {title.toLowerCase()} yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 w-full px-2 pb-20">
          {movies.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="rounded-lg flex justify-between bg-slate-800 hover:bg-slate-700 transition-all duration-200 overflow-hidden shadow-md"
            >
              <div className="flex flex-col text-left p-3 w-[60%]">
                <p className="text-xs text-green-400">
                  {movie.genre_ids?.map((id) => genreMap[id]).filter(Boolean).join(", ") || "Unknown Genre"}
                </p>
                <h2 className="text-base font-semibold text-white mt-1">{movie.title}</h2>
                <p className="text-xs text-gray-400 mt-1">
                  {movie.release_date ? new Date(movie.release_date).getFullYear() : "Unknown Year"} •{" "}
                  {movie.runtime ? `${movie.runtime} mins` : "Duration Unknown"}
                </p>
              </div>

              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={movie.title}
                className="object-cover h-full w-[40%] rounded-r-lg"
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );

  return (
    <SC.Main5 className="min-h-screen flex items-center justify-center bg-background text-white">
      <div className="bg-container w-full max-w-md min-h-screen shadow-md flex flex-col py-6 px-4 relative pb-24">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Link to="/home" className="text-white hover:text-green-500 transition">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-lg font-semibold">My Library</h2>
          <Link to="/home">
            <img src={logo} alt="logo" className="h-10" />
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6 gap-3">
          {["watchlist", "favourite", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-slate-700 text-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "watchlist" && renderMovies(watchlist, "Your Watchlist")}
        {activeTab === "favourite" && renderMovies(favourites, "Your Favourites")}
        {activeTab === "settings" && (
          <div className="text-gray-400 text-sm text-center py-10">Settings Coming Soon...</div>
        )}
      </div>

      {/* Bottom Nav */}
      <BottomNav />
    </SC.Main5>
  );
}
