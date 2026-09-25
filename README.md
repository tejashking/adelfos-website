# Adelfos Marketing Website

## Frontend deployment

The frontend uses CRA/CRACO. From `frontend/`:

```powershell
yarn install
yarn build
```

Deploy the generated `frontend/build/` directory to a static host such as Netlify, Vercel, Cloudflare Pages, or S3.

Set `REACT_APP_BACKEND_URL` before building when the API is hosted separately. Leave it empty when the frontend and API share the same origin with `/api` reverse-proxying.

## Backend deployment

From `backend/`, install `requirements.txt` and run:

```powershell
python -m uvicorn server:app --host 0.0.0.0 --port 8000
```

Copy `backend/.env.example` to `backend/.env` locally, or configure the same values in the hosting provider's environment settings. Use a real `MONGO_URL` in production because the in-memory fallback is cleared when the server restarts.

The API health checks are available at `/api/` and `/`.
