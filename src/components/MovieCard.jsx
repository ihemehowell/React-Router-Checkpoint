function MovieCard({ movie }) {
  // Remove HTML tags from TVMaze summary
  const cleanSummary = movie.summary
    ? movie.summary.replace(/<[^>]+>/g, "")
    : "No description available.";

  return (
    <div className="relative bg-white rounded-2xl shadow-md overflow-hidden group cursor-pointer">
      {/* Poster */}
      {movie.image?.medium ? (
        <img
          src={movie.image.medium}
          alt={movie.name}
          className="w-full h-72 object-cover object-center"
        />
      ) : (
        <div className="w-full h-72 flex items-center justify-center bg-gray-200 text-gray-500">
          No Image
        </div>
      )}

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 text-white opacity-0 group-hover:opacity-70 transition-opacity duration-500 p-4 flex flex-col justify-end">
        <h2 className="text-lg font-bold">{movie.name}</h2>
        <p className="text-sm text-gray-200 line-clamp-3">{cleanSummary}</p>

        <div className="flex items-center justify-between mt-3">
          <span className="text-yellow-400 font-bold">
            ⭐ {movie.rating?.average ? movie.rating.average.toFixed(1) : "N/A"}
          </span>
          <span className="text-sm text-gray-300">
            {movie.premiered ? movie.premiered.slice(0, 4) : "—"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
