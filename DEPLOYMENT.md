# Adelfos Marketing Website

This bundle contains the original project source and the successful production build.

## Deploy the built website
The CRA/CRACO build output is `frontend/build/`. The GitHub Pages workflow deploys this directory; upload it when deploying manually to another static host.

## Run from source
The frontend uses Yarn 1.x and Create React App/CRACO. From `frontend/`:

    yarn install
    yarn start

Build:

    yarn build

The generated site can be served from `frontend/build/`.

GitHub Pages cannot host the API. Deploy the backend using the repository's `render.yaml` Blueprint. Render prompts for a production `MONGO_URL` and a long random `ADMIN_API_TOKEN`; production startup refuses to use in-memory lead storage.

After Render creates the service, add the DNS record it specifies for `api.adelfosmarketing.com` (a CNAME for the `api` host). Wait until `https://api.adelfosmarketing.com/api/` returns `{"status":"ok","service":"adelfos-api"}` over HTTPS.

Set the repository Actions variable `REACT_APP_BACKEND_URL` to `https://api.adelfosmarketing.com`, then redeploy Pages. The workflow stops if the variable is missing, non-HTTPS, or has a trailing slash. Configure backend `CORS_ORIGINS` to include `https://adelfosmarketing.com`.

Optional Resend variables (`RESEND_API_KEY`, `SENDER_EMAIL`, and `NOTIFY_EMAIL`) enable email notifications. The API stores submissions without email configured.

The selected Render free plan may sleep when idle, causing a cold start on the first form request. Use an always-on paid plan if that delay is unacceptable for live leads.
