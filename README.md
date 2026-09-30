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
- `/curriculum`: the four-chapter course map with learning outcomes and photo placeholders.
- `/playground`: interactive model and prompt experiments.
- `/about`: project story, principles, and photo placeholders for team/classroom images.
- `/resources` and `/field-guide`: further reading and a responsible-use checklist.
- `/signup`, `/portal`, `/learn`, and `/progress`: local learner setup and learning workspace.

Public-page typography uses Poppins with the Butler Regular/Bold web font used by the reference site. Butler is loaded from the same CDN font URLs as the reference.

## Verify

```powershell
npm run lint
npm run build
npm run test:api
```

The backend API endpoints are `GET /api/v1/health/` and `GET /api/v1/challenge/?offset=0`. Challenge content is stored in local SQLite and can be managed at `/admin/` after creating a Django superuser. The API returns public content only; it does not accept learner profiles, notes, scores, or progress.

For deployment, set `DJANGO_DEBUG=false`, provide a unique `DJANGO_SECRET_KEY`, and set `DJANGO_ALLOWED_HOSTS` to the backend hostnames. The development-only secret is rejected when debug mode is disabled.
