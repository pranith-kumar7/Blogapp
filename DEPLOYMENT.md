# Deployment Guide

## Recommended Setup

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Backend on Render

Root directory:

```text
Backend
```

Build command:

```text
npm install
```

Start command:

```text
npm start
```

Environment variables:

```text
PORT=7000
DB_URL=<your-mongodb-atlas-connection-string>
SECRET_KEY=<strong-random-secret>
CLIENT_URL=<your-vercel-frontend-url>
```

After deploy, copy the backend URL. Example:

```text
https://your-blog-api.onrender.com
```

## Frontend on Vercel

Root directory:

```text
frontend
```

Framework preset:

```text
Create React App
```

Environment variable:

```text
REACT_APP_API_URL=https://your-blog-api.onrender.com
```

Build command:

```text
npm run build
```

Output directory:

```text
build
```

## MongoDB Atlas

1. Create a free cluster.
2. Create a database user.
3. Allow network access from your deployment platform or use `0.0.0.0/0` for testing.
4. Copy the connection string into `DB_URL`.

## Final README Updates

Once deployed, update `README.md` with:

- your Vercel frontend URL under `Live Demo`
- one screenshot of the homepage or article view
