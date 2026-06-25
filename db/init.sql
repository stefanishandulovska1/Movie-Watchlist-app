CREATE TABLE IF NOT EXISTS movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  genre VARCHAR(100),
  release_year INTEGER,
  is_favorite BOOLEAN DEFAULT FALSE,
  is_watched BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO movies (title, description, genre, release_year, is_favorite, is_watched)
VALUES
  ('Inception', 'A mind-bending sci-fi thriller about dreams within dreams.', 'Sci-Fi', 2010, TRUE, TRUE),
  ('Interstellar', 'A space exploration story about survival and time.', 'Sci-Fi', 2014, TRUE, FALSE),
  ('The Dark Knight', 'Batman faces the Joker in Gotham City.', 'Action', 2008, FALSE, TRUE),
  ('Parasite', 'A dark social thriller about class differences.', 'Thriller', 2019, FALSE, FALSE)
ON CONFLICT DO NOTHING;