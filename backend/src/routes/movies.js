import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM movies ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch movies", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM movies WHERE id = $1", [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch movie", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      genre,
      release_year,
      is_favorite = false,
      is_watched = false
    } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    const result = await pool.query(
      `INSERT INTO movies (title, description, genre, release_year, is_favorite, is_watched)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, description, genre, release_year || null, is_favorite, is_watched]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to create movie", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const {
      title,
      description,
      genre,
      release_year,
      is_favorite,
      is_watched
    } = req.body;

    const result = await pool.query(
      `UPDATE movies
       SET title = $1,
           description = $2,
           genre = $3,
           release_year = $4,
           is_favorite = $5,
           is_watched = $6
       WHERE id = $7
       RETURNING *`,
      [title, description, genre, release_year || null, is_favorite, is_watched, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to update movie", error: error.message });
  }
});

router.patch("/:id/favorite", async (req, res) => {
  try {
    const result = await pool.query(
      `UPDATE movies
       SET is_favorite = NOT is_favorite
       WHERE id = $1
       RETURNING *`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle favorite", error: error.message });
  }
});

router.patch("/:id/watched", async (req, res) => {
  try {
    const result = await pool.query(
      `UPDATE movies
       SET is_watched = NOT is_watched
       WHERE id = $1
       RETURNING *`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle watched status", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM movies WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete movie", error: error.message });
  }
});

export default router;