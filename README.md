# Adelfos Marketing Website

## Frontend deployment

The frontend uses CRA/CRACO. From `frontend/`:

```powershell
yarn install
yarn build
```

Deploy the generated `frontend/build/` directory to a static host such as Netlify, Vercel, Cloudflare Pages, or S3.

Set `REACT_APP_BACKEND_URL` to the public HTTPS origin of the deployed API before building, without a trailing slash. For GitHub Pages, configure it as a repository Actions variable; Pages cannot serve `/api` itself, and the deploy workflow fails if the value is missing. Configure backend `CORS_ORIGINS` to include `https://adelfosmarketing.com`.

## Backend deployment

The production API is configured by the repository's `render.yaml` Blueprint. During setup, provide a production MongoDB `MONGO_URL` and a long random `ADMIN_API_TOKEN`. Production startup refuses to use the in-memory fallback.

Point the `api` DNS record at the hostname provided by Render, then set the GitHub Actions repository variable `REACT_APP_BACKEND_URL` to `https://api.adelfosmarketing.com` and redeploy Pages. See [DEPLOYMENT.md](DEPLOYMENT.md) for the full sequence and the selected free-plan cold-start limitation.

For local development, copy `backend/.env.example` to `backend/.env` and run:

```powershell
cd backend
python -m uvicorn server:app --host 127.0.0.1 --port 8000
```

The API health checks are available at `/api/` and `/`.
