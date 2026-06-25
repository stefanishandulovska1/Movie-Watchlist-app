import { useEffect, useState } from "react";
import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  toggleFavorite,
  toggleWatched
} from "./api";
import "./App.css";

const initialForm = {
  title: "",
  description: "",
  genre: "",
  release_year: "",
  is_favorite: false,
  is_watched: false
};

export default function App() {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const loadMovies = async () => {
    try {
      const data = await getMovies();
      setMovies(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load movies:", error);
      setMovies([]);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      release_year: form.release_year ? Number(form.release_year) : null
    };

    try {
      if (editingId) {
        await updateMovie(editingId, payload);
        setEditingId(null);
      } else {
        await createMovie(payload);
      }

      setForm(initialForm);
      loadMovies();
    } catch (error) {
      console.error("Failed to save movie:", error);
    }
  };

  const handleEdit = (movie) => {
    setEditingId(movie.id);
    setForm({
      title: movie.title || "",
      description: movie.description || "",
      genre: movie.genre || "",
      release_year: movie.release_year || "",
      is_favorite: movie.is_favorite || false,
      is_watched: movie.is_watched || false
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);
      loadMovies();
    } catch (error) {
      console.error("Failed to delete movie:", error);
    }
  };

  const handleFavorite = async (id) => {
    try {
      await toggleFavorite(id);
      loadMovies();
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  const handleWatched = async (id) => {
    try {
      await toggleWatched(id);
      loadMovies();
    } catch (error) {
      console.error("Failed to toggle watched:", error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(initialForm);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Movie Watchlist</h1>
        <p className="subtitle">Track movies, favorites and watched status.</p>

        <form className="movie-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Movie title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={form.genre}
            onChange={handleChange}
          />

          <input
            type="number"
            name="release_year"
            placeholder="Release year"
            value={form.release_year}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows="4"
          />

          <div className="checkboxes">
            <label>
              <input
                type="checkbox"
                name="is_favorite"
                checked={form.is_favorite}
                onChange={handleChange}
              />
              Favorite
            </label>

            <label>
              <input
                type="checkbox"
                name="is_watched"
                checked={form.is_watched}
                onChange={handleChange}
              />
              Watched
            </label>
          </div>

          <div className="form-buttons">
            <button type="submit">
              {editingId ? "Update movie" : "Add movie"}
            </button>

            {editingId && (
              <button type="button" className="secondary" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="movie-grid">
          {movies.length === 0 ? (
            <div className="empty-state">
              <p>No movies yet. Add your first movie.</p>
            </div>
          ) : (
            movies.map((movie) => (
              <div className="movie-card" key={movie.id}>
                <div className="movie-header">
                  <h2>{movie.title}</h2>
                  <span>{movie.release_year || "N/A"}</span>
                </div>

                <p><strong>Genre:</strong> {movie.genre || "N/A"}</p>
                <p>{movie.description || "No description."}</p>

                <div className="badges">
                  <span className={movie.is_favorite ? "badge favorite active" : "badge favorite"}>
                    {movie.is_favorite ? "Favorite" : "Not favorite"}
                  </span>
                  <span className={movie.is_watched ? "badge watched active" : "badge watched"}>
                    {movie.is_watched ? "Watched" : "Not watched"}
                  </span>
                </div>

                <div className="card-buttons">
                  <button type="button" onClick={() => handleFavorite(movie.id)}>
                    Toggle favorite
                  </button>
                  <button type="button" onClick={() => handleWatched(movie.id)}>
                    Toggle watched
                  </button>
                  <button type="button" onClick={() => handleEdit(movie)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="danger"
                    onClick={() => handleDelete(movie.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}