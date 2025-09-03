import { useEffect, useState } from "react";

export default function Filter({ onSearch, onRatingChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Call parent search function
  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedSearch);
    }
  }, [debouncedSearch, onSearch]);

  return (
    <div className="flex flex-col md:flex-row mx-auto w-full gap-4 items-center  mb-6">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by title..."
        className="p-2 border-b border-gray-300  w-full md:w-1/2 text-white outline-0"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Rating Filter */}
      <select
        className="p-2 border border-gray-100 rounded-lg   text-white outline-0"
        onChange={(e) => onRatingChange(e.target.value)}
      >
        <option value="">Filter by rating</option>
        <option value="9">9+</option>
        <option value="8">8+</option>
        <option value="7">7+</option>
        <option value="6">6+</option>
      </select>
    </div>
  );
}
