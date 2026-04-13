# Blog App

A full-stack blogging platform built with React, Express, and MongoDB. Users can sign up, browse articles, and comment on posts. Authors can publish, edit, soft-delete, and restore their own articles.

## Quick Look

- Live Demo: Not deployed yet
- Frontend: React, Redux Toolkit, Bootstrap
- Backend: Express, MongoDB, JWT auth
- Run Mode: local development or Express-served production build

## Preview

The next upgrade for this repo is adding a deployed URL and a homepage screenshot. The codebase is already structured for that path with environment-based API configuration and an Express production build flow.

## Why This Project

This project was built to model a role-based content platform with separate user and author workflows, JWT-based authentication, and a backend that can serve both API traffic and a production React build. It demonstrates how to structure a small full-stack application so it can run locally during development and be prepared for deployment with environment-based configuration.

## Engineering Highlights

- Role-based flows for readers and authors
- JWT-backed authentication for protected actions
- Express API split into user, author, and admin route modules
- MongoDB-backed persistence for users, authors, articles, and comments
- Frontend API configuration moved to environment variables for local and deployed environments
- Backend can serve the production React build for a single-server deployment model

## Tech Stack

- Frontend: React, React Router, Redux Toolkit, Axios, Bootstrap
- Backend: Node.js, Express, MongoDB
- Authentication: JWT-based auth with protected author/user flows

## Architecture

- React frontend handles signup, login, article browsing, author publishing, and comments
- Express backend exposes modular route groups for users, authors, and admin actions
- MongoDB stores application data for users, authors, articles, and comment threads
- Express can also serve the built frontend for a single-service deployment path

## Features

- User and author signup/login
- Article publishing and editing for authors
- Soft delete and restore for articles
- Commenting flow for readers
- Shared Express API for user, author, and admin routes

## Project Structure

```text
BlogApp/
|-- Backend/
|   |-- Apis/
|   |-- middleware/
|   `-- server.js
`-- frontend/
    |-- src/
    |-- public/
    `-- build/  # generated for production
```

## Run Locally

### 1. Backend environment

Create `Backend/.env` from `Backend/.env.example`:

```env
PORT=7000
DB_URL=mongodb://localhost:27017
SECRET_KEY=your-secret-key
```

### 2. Frontend environment

Create `frontend/.env` from `frontend/.env.example`:

```env
REACT_APP_API_URL=http://localhost:7000
```

### 3. Install dependencies

```powershell
cd Backend
npm install
cd ..\frontend
npm install
```

### 4. Start MongoDB

```powershell
mongod
```

### 5. Start the backend

```powershell
cd Backend
npm start
```

### 6. Start the frontend

```powershell
cd frontend
npm start
```

Open `http://localhost:3000`.

## Production Build

To serve the React build through Express:

```powershell
cd frontend
npm run build
cd ..\Backend
npm start
```

The backend serves the built frontend from `frontend/build`.

## Deployment Notes

- Set `DB_URL` to a hosted MongoDB instance such as MongoDB Atlas.
- Set `SECRET_KEY` to a strong secret in your deployment environment.
- Set `REACT_APP_API_URL` to your deployed backend URL when hosting the frontend separately.
- Set `CLIENT_URL` to your deployed frontend URL so the backend accepts cross-origin requests.
- If you serve the frontend from Express, make sure the frontend is built before starting the backend.
- Full deployment steps are in `DEPLOYMENT.md`.

## Recruiter Notes

- This repo demonstrates end-to-end ownership across frontend, backend, auth, database integration, and production build serving.
- The current version is structured to be deployable with environment-specific configuration rather than being tied to a local-only setup.
- It is a strong foundation for a hosted demo using MongoDB Atlas plus a frontend/backend deployment platform.

## Next Improvements

- Add request validation and clearer API error responses
- Add automated tests for auth and article flows
- Add CI checks for build/test
- Deploy frontend and backend with live demo links
