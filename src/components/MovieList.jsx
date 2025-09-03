import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  if (movies.length === 0) {
    return <p className="text-center text-gray-500">No movies found 🎥</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {movies.map((movie) => (
    <div key={movie.id} className="transition-transform duration-300 hover:scale-105">
      <MovieCard movie={movie} />
    </div>
  ))}
</div>
  );
}

export default MovieList;
