# Signal Lab

Signal Lab is an interactive AI learning portal for grades 9–12. The React/Vite frontend contains the public website and learning studio. A Django API serves public, rotating field challenges. Learner names, grades, notes, flashcards, and progress remain in browser `localStorage`; they are not sent to Django.

## Requirements

- Node.js 20 or newer
- Python 3.11 or newer

## Install

From this directory:

```powershell
npm install
python -m pip install -r backend/requirements.txt
python backend/manage.py migrate
```

## Run locally

Start the Django API in one terminal:

```powershell
python backend/manage.py runserver 127.0.0.1:8000
```

To edit the public challenge rotation, create an administrator once with `python backend/manage.py createsuperuser`, then sign in at `http://127.0.0.1:8000/admin/`.

Start Vite in another terminal:

```powershell
npm run dev
```

Open the URL Vite prints, normally `http://localhost:5173`. Vite proxies `/api` requests to Django at port 8000. The public challenge falls back to bundled prompts if Django is not running.

## Pages

- `/`: Home, interactive AI examples, curriculum preview, challenge, and progress overview.
- `/curriculum`: the four-chapter course map with learning outcomes.
- `/playground`: interactive model and prompt experiments.
- `/about`: project story and principles.
- `/resources` and `/field-guide`: further reading and a responsible-use checklist.
- `/reading-list`, `/checkout`, `/order-confirmed`: the book shop (see **Shop** below).
- `/sources`: every photograph, icon, typeface, and book credited, generated from the code.
- `/signup`, `/portal`, `/learn`, and `/progress`: local learner setup and learning workspace.

Public-page typography uses Poppins with the Butler Regular/Bold web font used by the reference site. Butler is loaded from the same CDN font URLs as the reference.

## Two features that are deliberately not connected

Both are built out as far as they can go without a live service behind them. Each has
one file that is the only place to change when connecting it.

**Ask Signal** — the chat panel in the corner of every page. `src/lib/aiClient.ts` holds
the adapter. It currently answers from a hand-written guide to the site; set `MODE` to
`'live'` and point `VITE_ASSISTANT_ENDPOINT` at a backend route that holds the API key.
The file documents the request and response shape the route must speak. The key must
stay on the server — anything in this bundle is public.

**The shop** — `/reading-list`, the cart, and `/checkout`. The cart, promo codes, tax
and shipping arithmetic, and card validation (including the Luhn checksum) are all real
and all run in the browser. `src/lib/checkout.ts` is where a processor would attach, and
explains why the raw card number should be replaced by a hosted field rather than sent
from here. No card is charged and no order is transmitted; orders are written to
`localStorage` only.

## Images

Eight photographs, all from Pexels, in `public/photos/`. `src/data/photos.ts` is the
single source of truth: the `/sources` page is generated from it, and every photo on
the site carries its photographer's name in the corner. The people in these photos are
not connected to this project, and no caption suggests they are.

## Verify

```powershell
npm run lint
npm run build
npm run check:credits
npm run test:api
```

`check:credits` compares the icons and photographs the site actually uses against what
`/sources` claims, and fails if the two have drifted apart. Run it before submitting.

The backend API endpoints are `GET /api/v1/health/` and `GET /api/v1/challenge/?offset=0`. Challenge content is stored in local SQLite and can be managed at `/admin/` after creating a Django superuser. The API returns public content only; it does not accept learner profiles, notes, scores, or progress.

For deployment, set `DJANGO_DEBUG=false`, provide a unique `DJANGO_SECRET_KEY`, and set `DJANGO_ALLOWED_HOSTS` to the backend hostnames. The development-only secret is rejected when debug mode is disabled.

## Deploy both parts to one Azure App Service

The included `.github/workflows/azure-webapps-python.yml` workflow builds the
Vite site, tests and packages Django, and deploys the frontend and API together
to one **Linux App Service**. If Azure created a Python deployment workflow
with the same filename, replace its contents with the workflow in this
repository; don't leave two Azure deploy workflows enabled. The frontend's
client-side routes, API, and Django admin share one origin. App Service serves
the SPA files at the site root and Django's admin assets under `/static/`.

1. Create a Linux Web App using the **Python 3.11** runtime. In its
   **Configuration → General settings**, set the startup command to
   `bash startup.sh`.
2. Add these App Service application settings:
   - `DJANGO_DEBUG`: `false`
   - `DJANGO_SECRET_KEY`: a unique, private random value
   - `DJANGO_ALLOWED_HOSTS`: your app host, such as `your-app.azurewebsites.net`
   - `SQLITE_PATH`: `/home/data/db.sqlite3`
   - `DJANGO_STATIC_ROOT`: `/home/data/staticfiles`
   - `WEBSITES_ENABLE_APP_SERVICE_STORAGE`: `true`
   - `SCM_DO_BUILD_DURING_DEPLOYMENT`: `false` (the workflow packages Python dependencies itself)
3. In the GitHub repository, add the app's name as the
   `AZURE_WEBAPP_NAME` repository variable and its publish profile XML as the
   `AZURE_WEBAPP_PUBLISH_PROFILE` repository secret.
4. Run **Actions → Deploy to Azure App Service → Run workflow**, or push to
   `main`.

The startup script applies database migrations and collects Django admin
assets before starting Gunicorn. SQLite and collected admin assets are kept
under `/home`, which is persistent App Service storage when
`WEBSITES_ENABLE_APP_SERVICE_STORAGE` is enabled (the Linux App Service
default). SQLite is suitable for a single app instance; do not scale this app
out to multiple instances, since they would not share one SQLite database.
Back up `/home/data/db.sqlite3` before deployments or other maintenance.
