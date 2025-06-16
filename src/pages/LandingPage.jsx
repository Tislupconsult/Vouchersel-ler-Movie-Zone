import React from "react";
import { Link } from "react-router-dom";
import * as SC from "../../style";
import logo from "/logo.png";

export default function LandingPage() {
  return (
    <SC.Main7 className="min-h-screen flex flex-col bg-slate-950 text-white">
      {/* Logo */}
      <img src={logo} alt="logo" className="h-16 absolute top-6 left-6" />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-28">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight tracking-tight text-green-400">
          Vouchersel$ler Movie Zone
        </h1>
        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mb-8">
          Explore top-rated movies, build your watchlist, and save your favourites — all in one place.
        </p>
        <Link
          to="/log_in"
          className="bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg transition-all duration-300"
        >
          Start Exploring
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-12 bg-slate-900">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">Features</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-slate-800/70 p-6 rounded-xl border border-slate-700 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-green-400">Smart Recommendations</h3>
            <p className="text-gray-400">Get personalized movie suggestions based on your taste.</p>
          </div>
          <div className="bg-slate-800/70 p-6 rounded-xl border border-slate-700 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-green-400">Watchlist</h3>
            <p className="text-gray-400">Save movies to watch later and keep track of what you love.</p>
          </div>
          <div className="bg-slate-800/70 p-6 rounded-xl border border-slate-700 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-green-400">Explore Trailers</h3>
            <p className="text-gray-400">Watch official trailers before committing to a film night.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-center text-sm text-slate-400 py-6 border-t border-slate-700">
        &copy; {new Date().getFullYear()} Vouchersel$ler Movie Zone. All rights reserved.
      </footer>
    </SC.Main7>
  );
}
