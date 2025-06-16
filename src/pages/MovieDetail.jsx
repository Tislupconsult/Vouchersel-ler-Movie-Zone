import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import logo from '/logo.png';
import { ArrowLeft, Bookmark } from "lucide-react";
import * as SC from "../../style";
import BottomNav from "../components/BottomNav.tsx/bottomNav";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [related, setRelated] = useState([]);
  const [credits, setCredits] = useState(null);
  const [reviews, setReviews] = useState([]);

  const handleAddToWatchlist = () => {
    const existing = JSON.parse(localStorage.getItem("watchlist")) || [];
    const isAlreadyAdded = existing.find((item) => item.id === movie.id);
    if (!isAlreadyAdded) {
      const newWatchlist = [...existing, movie];
      localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
      alert("Added to watchlist");
    } else {
      alert("Movie already in watchlist");
    }
  };

  useEffect(() => {
    async function fetchData() {
      const [movieRes, relatedRes, creditsRes, reviewsRes] = await Promise.all([
        fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`),
        fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`),
        fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`),
        fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`),
      ]);

      const movieData = await movieRes.json();
      const relatedData = await relatedRes.json();
      const creditsData = await creditsRes.json();
      const reviewsData = await reviewsRes.json();

      setMovie(movieData);
      setRelated(relatedData.results || []);
      setCredits(creditsData);
      setReviews(reviewsData.results.slice(0, 2));
    }

    fetchData();
  }, [id]);

  const director = credits?.crew?.find((person) => person.job === "Director");
  const cast = credits?.cast?.slice(0, 4);

  if (!movie) return <div className="text-white p-10">Loading...</div>;

  return (
    <SC.Main4 className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-container text-light-text py-8 px-4 lg:rounded-2xl shadow-md w-full max-w-md min-h-screen flex flex-col text-center">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-5">
          <Link to="/home">
            <ArrowLeft size={20} />
          </Link>
          <img src={logo} alt="Trendz Movies" className="h-10" />
          <Link to="/library">
            <Bookmark size={20} />
          </Link>
        </div>

        {/* Movie Poster */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full max-w-md mb-4 rounded-lg"
        />

        {/* Details */}
        <div className="text-left px-2">
          <h1 className="text-xl font-bold mb-3">{movie.title}</h1>
          <p className="mb-2 text-sm text-justify text-gray-300">{movie.overview}</p>

          {/* Cast */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Cast</h2>
            <div className="flex items-center pl-2">
              {cast?.map((actor, index) => (
                <div
                  key={actor.id}
                  className={`w-12 h-12 rounded-full border-[3px] border-background overflow-hidden ${index !== 0 ? "-ml-2" : ""}`}
                >
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "https://via.placeholder.com/60x60?text=No+Img"
                    }
                    alt={actor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Director & Ratings */}
          <div className="mt-6">
            <p className="mb-1"><strong>Director:</strong> {director?.name}</p>

            <h2 className="text-lg font-semibold mt-4 mb-2">Ratings</h2>
            <div className="flex gap-6">
              <div className="flex flex-col items-center w-[40%]">
                <span className="text-3xl font-bold">{movie.vote_average.toFixed(1)}</span>
                <span className="text-red-500 text-xl">★★★★★</span>
                <p className="text-sm text-gray-400 mt-1 text-center">
                  {movie.vote_count?.toLocaleString()} reviews
                </p>
              </div>

              <div className="flex flex-col justify-between w-full gap-2">
                {[5, 4, 3, 2, 1].map((stars, i) => {
                  const percentage = 40 - i * 10;
                  return (
                    <div key={stars} className="flex items-center gap-2 w-full">
                      <p className="text-sm w-4">{stars}</p>
                      <div className="w-full h-2 bg-gray-700 rounded">
                        <div
                          className="h-full bg-red-600"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Reviews</h2>
            {reviews.length === 0 ? (
              <p className="text-gray-400">No reviews available.</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="py-3 text-sm border-b border-slate-700">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={`https://ui-avatars.com/api/?name=${review.author}&background=5E0B0B&color=fff`}
                      alt={review.author}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{review.author}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-red-500 mb-2">
                    {"★".repeat(Math.min(review.author_details.rating || 5, 5))}
                  </div>
                  <p className="text-gray-300">{review.content.slice(0, 200)}...</p>
                  <div className="mt-2 flex gap-4 text-xs text-gray-400">
                    <span>👍 {Math.floor(Math.random() * 20) + 1}</span>
                    <span>💬 {Math.floor(Math.random() * 5)}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Related Movies */}
          <h2 className="mt-6 text-lg font-semibold mb-2">Related Movies</h2>
          <div className="custom-scroll flex gap-3 overflow-x-auto py-3">
            {related.map((relMovie) => (
              <div
                key={relMovie.id}
                className="bg-[rgba(153,27,27,0.7)] relative py-2 rounded-md min-w-[230px] min-h-[380px]"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${relMovie.poster_path}`}
                  alt={relMovie.title}
                  className="w-full absolute top-0 rounded-t-md"
                />
                <p className="text-sm absolute bottom-2 left-3">{relMovie.title}</p>
              </div>
            ))}
          </div>

          {/* Watchlist Button */}
          <button
            onClick={handleAddToWatchlist}
            className="mt-6 w-full bg-red-700 py-2 rounded-md text-white hover:bg-red-800 transition mb-20"
          >
            Add to Watchlist
          </button>
        </div>
      </div>
      <BottomNav />
    </SC.Main4>
  );
}
