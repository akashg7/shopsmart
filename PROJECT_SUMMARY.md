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

**CI/CD Pipeline (`ci-cd.yml`)** — Runs on every push/PR to main:
1. **Test Phase:** Installs dependencies, runs backend unit tests (with JUnit reports), and runs Playwright tests. Uploads reports as artifacts.
2. **Terraform Phase:** Initializes, validates, plans, and applies infrastructure changes (S3, ECR, ECS Fargate cluster, and service).
3. **Build & Push Phase:** Builds the multi-stage Docker image and pushes it to the Amazon ECR repository.
4. **Deploy Phase:** Forces a new deployment of the ECS service to pull the latest image.

## Containerization
- **Dockerfiles:** Separate for `client/` (node:18-alpine, port 5173) and `server/` (node:18-alpine, port 5001)
- **Docker Compose:** Orchestrates both services with volume mounts for live reload

## Deployment
- **AWS ECS Fargate:** Automated deployment via GitHub Actions. Container runs on AWS Fargate with a public IP on port 3000.
- **Render.com** (`render.yaml`): Kept for optional alternative deployment.

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
| `MONGODB_URI` | MongoDB connection string |
| `AWS_ACCESS_KEY_ID` | AWS API Access Key |
| `AWS_SECRET_ACCESS_KEY` | AWS API Secret Key |
| `AWS_SESSION_TOKEN` | AWS Lab Session Token |
| `AWS_REGION` | AWS Region (default: us-east-1) |
