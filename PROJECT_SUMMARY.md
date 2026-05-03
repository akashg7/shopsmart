# ShopSmart — Project Summary

**Course:** 6th Semester — DevOps | **Author:** Akash G | **Repo:** github.com/akashg7/shopsmart

## What is ShopSmart?
A full-stack MERN e-commerce app where users can browse products, search by keyword, and navigate through paginated results. Built to demonstrate real-world **DevOps practices** — CI/CD, testing, containerization, linting, and automated deployment.

## Architecture
- **Frontend:** React 18 + Vite (port 5173) — product grid, search bar, pagination
- **Backend:** Node.js + Express (port 5001) — REST API with MongoDB via Mongoose
- **Database:** MongoDB Atlas — seeded with 100 products from DummyJSON API

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Paginated product listing (`?page=1&limit=30`) |
| GET | `/api/products/search` | Search by keyword (`?q=laptop`) |
| GET | `/api/products/:id` | Single product by ID |
| POST | `/api/products/add` | Add a new product |
| GET | `/api/health` | Health check |

## Folder Structure
- `client/` — React frontend (components: `ProductCard`, pages: `ProductsPage`)
- `server/` — Express backend (controllers, routes, models, config)
- `tests/` — Playwright test suites (unit, integration, e2e)
- `.github/` — CI/CD workflows + Dependabot config
- `scripts/` — Idempotent setup script

## Testing Pyramid
1. **Unit (Backend):** Jest + Supertest — tests `/api/health` without DB connection
2. **Unit (Frontend):** Vitest — tests App component renders correctly
3. **Component Tests:** Playwright CT — tests `ProductCard` and `ProductsPage` in a real browser
4. **Integration:** Playwright — tests frontend ↔ backend API communication (fetch, search, pagination)
5. **E2E:** Playwright — full user journey: open homepage → see products → search → verify results

## CI/CD Pipelines (GitHub Actions)

**CI (`main.yml`)** — Runs on every push/PR:
1. Install deps (server, client, root)
2. Lint backend + frontend (ESLint, zero warnings allowed)
3. Run backend unit tests (Jest)
4. Build frontend (Vite)
5. Install Playwright browsers → run all Playwright tests

**CD (`deploy.yml`)** — Runs on push to `main`:
1. SSHs into AWS EC2 using GitHub Secrets
2. Installs Node.js + PM2 if missing
3. Clones/pulls the repo, installs deps, builds frontend
4. Restarts backend with PM2

## Containerization
- **Dockerfiles:** Separate for `client/` (node:18-alpine, port 5173) and `server/` (node:18-alpine, port 5001)
- **Docker Compose:** Orchestrates both services with volume mounts for live reload

## Deployment
- **Render.com** (`render.yaml`): Backend as web service, frontend as static site
- **AWS EC2** (`deploy.yml`): Automated via SSH + PM2 process management

## Code Quality
- **ESLint:** Configured for both client (React rules) and server (Node rules), zero-warning policy in CI
- **Prettier:** Consistent formatting — single quotes, 2-space tabs, semicolons, 100 char width
- **Dependabot:** Scans npm deps weekly for `/`, `/client`, `/server`, and GitHub Actions

## Idempotent Setup Script (`scripts/setup.sh`)
Safe to run multiple times — uses `mkdir -p`, `npm install`, conditional `.env` copy, and Playwright browser install.

## Key Design Decisions
- **Monorepo** — client, server, and tests co-located for unified CI
- **Playwright** — one tool for component, integration, and E2E tests
- **Jest + Supertest** — isolated backend testing without MongoDB
- **Vite** — fast builds and hot-reload over CRA
- **Webhook feature removed** — initially had GitHub webhook support, removed to simplify scope

## How to Run
```bash
# Setup
git clone https://github.com/akashg7/shopsmart.git && cd shopsmart
bash scripts/setup.sh

# Dev servers
cd server && npm run dev    # Backend :5001
cd client && npm run dev    # Frontend :5173

# Tests
npm run test                # All Playwright tests
cd server && npm test       # Backend unit tests

# Docker
docker-compose up --build   # Both services
```

## GitHub Secrets Required
| Secret | Purpose |
|--------|---------|
| `MONGODB_URI` | MongoDB connection string for CI |
| `EC2_HOST` / `EC2_USER` / `EC2_SSH_KEY` | EC2 deployment via SSH |
