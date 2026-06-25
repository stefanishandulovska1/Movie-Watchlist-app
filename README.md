# Movie Watchlist

Movie Watchlist is a full-stack web application for tracking movies that the user wants to watch or has already watched. The application allows adding, editing, deleting, and organizing movies by favorite and watched status.

## Features

- Add a new movie
- Edit movie details
- Delete a movie
- Mark movie as favorite
- Mark movie as watched or not watched
- View all movies in a clean UI

## Tech Stack

### Frontend
- React
- Vite
- CSS

### Backend
- Node.js
- Express

### Database
- PostgreSQL

### DevOps / Deployment
- Docker
- Docker Compose
- GitHub Actions
- Kubernetes
- Argo CD

## Project Structure

```text
movie-watchlist/
├── backend/
├── frontend/
├── db/
├── docker-compose.yaml
├── README.md
└── .gitignore
```

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/stefanishandulovska1/movie-watchlist.git
cd movie-watchlist
```

### 2. Start with Docker Compose

```bash
docker compose up --build
```

### 3. Open the application

Frontend:
```text
http://localhost:3000
```

Backend health check:
```text
http://localhost:5001/api/health
```

## Environment / Ports

The project uses the following ports:

- Frontend: `3000`
- Backend: `5001`
- PostgreSQL: `5432`

## Docker

The application is containerized with separate Dockerfiles for:
- frontend
- backend

Docker Compose is used to orchestrate:
- frontend
- backend
- database

## CI/CD

The project uses GitHub Actions for CI.

CI pipeline responsibilities:
- Trigger on push to GitHub
- Build Docker images
- Push Docker images to Docker Hub

Planned CD / bonus part:
- Kubernetes deployment
- Argo CD synchronization

## Kubernetes

The Kubernetes part of the project includes manifests for:

- Namespace
- ConfigMap
- Secret
- Deployment
- Service
- Ingress
- StatefulSet for PostgreSQL

## Author

Project developed as a course project for Continuous Integration and Delivery.