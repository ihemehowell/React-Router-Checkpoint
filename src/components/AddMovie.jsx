import { useState } from "react";

export default function AddMovie({ onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    summary: "",
    image: "",
    rating: "",
    premiered: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMovie = {
      id: Date.now(),
      name: formData.name,
      summary: formData.summary,
      image: formData.image ? { medium: formData.image } : null,
      rating: { average: formData.rating ? Number(formData.rating) : null },
      premiered: formData.premiered || null,
    };

    onAdd(newMovie);

    // Reset form
    setFormData({
      name: "",
      summary: "",
      image: "",
      rating: "",
      premiered: "",
    });

    setIsOpen(false);
  };

  return (
    <>
      {/* Floating + button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-indigo-600 text-white text-3xl flex items-center z-40 justify-center shadow-lg hover:bg-indigo-700"
      >
       +
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 transition-opacity duration-1000 bg-opacity-20 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
            >
              ✖
            </button>

            <h2 className="text-xl font-bold mb-4">Add a Movie</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Movie Title"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />

              <textarea
                name="summary"
                placeholder="Description"
                value={formData.summary}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="image"
                placeholder="Poster URL"
                value={formData.image}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="number"
                name="rating"
                placeholder="Rating (0–10)"
                value={formData.rating}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="premiered"
                placeholder="Release Year (e.g. 2024)"
                value={formData.premiered}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700"
              >
                Add Movie
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
