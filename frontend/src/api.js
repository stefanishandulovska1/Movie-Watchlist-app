const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001";

export async function getMovies() {
  const res = await fetch(`${API_BASE}/api/movies`);
  return res.json();
}

export async function createMovie(movie) {
  const res = await fetch(`${API_BASE}/api/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(movie)
  });
  return res.json();
}

export async function updateMovie(id, movie) {
  const res = await fetch(`${API_BASE}/api/movies/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(movie)
  });
  return res.json();
}

export async function deleteMovie(id) {
  const res = await fetch(`${API_BASE}/api/movies/${id}`, {
    method: "DELETE"
  });
  return res.json();
}

export async function toggleFavorite(id) {
  const res = await fetch(`${API_BASE}/api/movies/${id}/favorite`, {
    method: "PATCH"
  });
  return res.json();
}

export async function toggleWatched(id) {
  const res = await fetch(`${API_BASE}/api/movies/${id}/watched`, {
    method: "PATCH"
  });
  return res.json();
}