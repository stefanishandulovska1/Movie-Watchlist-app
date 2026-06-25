import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";
import moviesRouter from "./routes/movies.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", message: "Backend and database are working" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.use("/api/movies", moviesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});