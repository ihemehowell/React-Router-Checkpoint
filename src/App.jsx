import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import MovieList from "./components/MovieList";
import AddMovie from "./components/AddMovie";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);

  // Load movies from localStorage on mount
  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("userMovies")) || [];
    setMovies(savedMovies);
  }, []);

  // Fetch from TVMaze when searching
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let url =
          search.trim() === ""
            ? `https://api.tvmaze.com/shows`
            : `https://api.tvmaze.com/search/shows?q=${search}`;

        const res = await fetch(url);
        const data = await res.json();

        let shows = Array.isArray(data)
          ? data.map((item) => (item.show ? item.show : item))
          : [];

        // Apply rating filter
        if (rating) {
          shows = shows.filter(
            (show) => show.rating.average && show.rating.average >= rating
          );
        }

        // Merge API results with user-added movies
        const userMovies = JSON.parse(localStorage.getItem("userMovies")) || [];
        setMovies([...userMovies, ...shows]);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [search, rating]);

  // Add movie handler (persist in localStorage)
  const handleAddMovie = (newMovie) => {
    const updatedUserMovies = [
      newMovie,
      ...(JSON.parse(localStorage.getItem("userMovies")) || []),
    ];
    localStorage.setItem("userMovies", JSON.stringify(updatedUserMovies));
    setMovies((prev) => [newMovie, ...prev]);
  };

  return (
 <div className="min-h-screen p-6 bg-gradient-to-br from-red-800 via-gray-900 to-black relative">
  <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/40 pointer-events-none" />
  
  <h1 className="text-3xl font-bold text-center mb-6 relative z-10 text-white">
     Movie Search App
  </h1>
      {/* Floating Add Button / Modal */}
      <AddMovie onAdd={handleAddMovie} />

      {/* Filter */}
      <Filter onSearch={setSearch} onRatingChange={setRating} />

      {loading ? (
        <p className="text-center text-gray-500">Loading movies...</p>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
}
