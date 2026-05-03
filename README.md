# ShopSmart

ShopSmart is a full-stack MERN e-commerce application extended with robust DevOps practices, including automated testing, CI/CD pipelines, linting, and automated dependency management.

## Architecture
The project follows a standard three-tier architecture:
- **Frontend (Client)**: A React application built with Vite (`/client`), handling the user interface for browsing products, searching, and pagination.
- **Backend (Server)**: A Node.js and Express API (`/server`) that serves as the integration layer between the frontend and the database. It handles routing, middleware, and business logic.
- **Database**: MongoDB (via Mongoose) stores product data. Initial product data is seeded from dummyjson.

## Folder Structure
- `server/`: Contains the backend logic.
  - `controllers/`: Handles business logic for routes (e.g., fetching products).
  - `routes/`: Defines API endpoints and maps them to controllers.
  - `models/`: Mongoose schemas (e.g., `Product`).
  - `tests/`: Jest-based backend unit tests.
- `client/`: Contains the React/Vite frontend source code, components, and styling.
- `tests/`: Contains the Playwright testing suites (Unit, Integration, E2E).
- `.github/`: Contains CI/CD configuration files (GitHub Actions workflows, Dependabot).
- `scripts/`: Idempotent setup and deployment scripts.

## API Endpoints
- `GET /api/products` - Fetch all products with pagination (`?page=1&limit=30`).
- `GET /api/products/search` - Search products by keyword (`?q=laptop`).
- `GET /api/products/:id` - Fetch single product details.
- `POST /api/products/add` - Add a new product.
- `GET /api/health` - Basic health check endpoint.

## Testing Pyramid
We have implemented a comprehensive testing pyramid:
1. **Unit Tests**: 
   - **Backend** (`server/tests/`): Jest + Supertest tests for API endpoints.
   - **Frontend Components** (`tests/unit/`): Uses `@playwright/experimental-ct-react` to test individual React UI components (like `ProductCard` and `ProductsPage`) in isolation.
   - **Frontend Vitest** (`client/src/App.test.jsx`): Vitest-based component rendering tests.
2. **Integration Tests (`tests/integration/`)**: Evaluates the frontend interacting directly with the backend API to guarantee proper communication across system boundaries (e.g., fetching products, searching endpoints).
3. **End-to-End Tests (`tests/e2e/`)**: Replicates full real user scenarios. The `searchFlow.spec.ts` test navigates the application imitating user activity, covering loading the page, searching, and seeing populated grid items.

## CI/CD Pipeline
The Continuous Integration and Continuous Deployment pipeline runs via **GitHub Actions** (`.github/workflows/ci-cd.yml`) on every `push` and `pull_request` to `main`.

### Pipeline Stages:
1. **Test Phase:** 
   - Installs all dependencies.
   - Runs backend unit tests (Jest) generating JUnit test reports.
   - Runs frontend integration and E2E tests (Playwright) generating test reports.
2. **Provision Infrastructure (Terraform):** 
   - Provisions an S3 bucket (versioned, encrypted, public access blocked) for Terraform state.
   - Provisions an ECR repository.
   - Provisions an ECS Fargate cluster, Task Definition, and Service.
3. **Build & Push to ECR:** 
   - Builds a multi-stage Docker image (Stage 1: build React frontend, Stage 2: serve via Express backend).
   - Pushes the built image to AWS ECR.
4. **Deploy to ECS Fargate:** 
   - Triggers an ECS service update to deploy the new container image.

## Dependabot
Automated dependency management via `.github/dependabot.yml`:
- Checks npm packages weekly for `/`, `/client`, `/server`.
- Checks GitHub Actions versions weekly.

## Idempotent Scripts
The `scripts/setup.sh` script is designed to be run multiple times safely:
- Uses `mkdir -p` instead of `mkdir`.
- Uses `npm install` (naturally idempotent).
- Uses conditional checks before copying `.env` files.

## Design Decisions
- **Monorepo structure**: Client, Server, and Tests are co-located for easy development and CI.
- **Playwright for full testing pyramid**: Playwright handles component tests, integration tests, and E2E tests — one tool, three testing layers.
- **Jest + Supertest for backend**: Allows isolated API testing without a running MongoDB instance.
- **Vite**: Chosen for fast build and hot-reload during frontend development.
- **MongoDB + Mongoose**: Schema-driven NoSQL for flexible product data.

## Challenges
- **CI environment consistency**: Ensuring the CI pipeline matches local development (Node 18, MongoDB access, Playwright browser installation).
- **Test isolation**: Backend Jest tests use Supertest on the Express `app` module without connecting to the database, keeping unit tests fast and independent.
- **Monorepo dependency management**: Three separate `package.json` files (root, client, server) require careful `cache-dependency-path` configuration in GitHub Actions.

## GitHub Secrets Required
The following secrets must be configured in the GitHub repository settings:

| Secret | Purpose |
|--------|---------|
| `MONGODB_URI` | MongoDB connection string |
| `AWS_ACCESS_KEY_ID` | AWS API Access Key |
| `AWS_SECRET_ACCESS_KEY` | AWS API Secret Key |
| `AWS_SESSION_TOKEN` | AWS Lab Session Token |
| `AWS_REGION` | AWS Region (default: us-east-1) |

## Getting Started

```bash
# Clone the repo
git clone <repo-url>
cd shopsmart

# Run the idempotent setup script
chmod +x scripts/setup.sh
bash scripts/setup.sh

# Start development servers
cd server && npm run dev   # Backend on :5001
cd client && npm run dev   # Frontend on :5173

# Run all tests
npm run test
```
