# ShopSmart

ShopSmart is a full-stack MERN e-commerce application extended with robust DevOps practices, including automated testing, CI/CD pipelines, and GitHub Webhooks.

## Architecture
The project follows a standard three-tier architecture:
- **Frontend (Client)**: A React application built with Vite (`/client`), handling the user interface for browsing products, searching, and pagination.
- **Backend (Server)**: A Node.js and Express API (`/server`) that serves as the integration layer between the frontend and the database. It handles routing, middleware, business logic, and webhook processing.
- **Database**: MongoDB (via Mongoose) stores product data. Initial product data is seeded from dummyjson.

## Folder Structure
- `server/`: Contains the backend logic.
  - `controllers/`: Handles business logic for routes (e.g., fetching products, processing webhooks).
  - `routes/`: Defines API endpoints and maps them to controllers.
  - `models/`: Mongoose schemas (e.g., `Product`).
  - `middleware/`: Custom Express middleware, specifically the GitHub Webhook Signature Verification (`githubWebhookAuth.js`).
- `client/`: Contains the React/Vite frontend source code, components, and styling.
- `tests/`: Contains the Playwright testing suites (Unit, Integration, E2E).
- `.github/`: Contains CI/CD configuration files (GitHub Actions workflows).

## API Endpoints
- `GET /api/products` - Fetch all products with pagination (`?page=1&limit=30`).
- `GET /api/products/search` - Search products by keyword (`?q=laptop`).
- `GET /api/products/:id` - Fetch single product details.
- `POST /api/products/add` - Add a new product.
- `GET /api/health` - Basic health check endpoint.
- `POST /api/webhooks/github` - Dedicated webhook route for GitHub events.

## GitHub Webhooks Integration
The ShopSmart backend includes a secure GitHub webhook receiver designed for `push` events.

- **Endpoint**: `POST /api/webhooks/github`
- **Security Check**: The backend validates the `X-Hub-Signature-256` HTTP header provided by GitHub. It computes an HMAC SHA256 hash using the pre-shared secret `WEBHOOK_SECRET` stored in the `.env` file and compares it to the incoming request payload in raw buffer format to prevent forgery.
- **Logging**: Upon a successful validation of a `push` event, it securely logs the Repository name, Branch, Pusher name, and Commit message.

## Testing Pyramid
We have implemented a testing pyramid using **Playwright**:
1. **Unit Tests (`tests/unit/`)**: Uses `@playwright/experimental-ct-react` to test individual React UI components (like `ProductCard` and `ProductsPage`) in isolation to ensure fundamental rendering and component state logic.
2. **Integration Tests (`tests/integration/`)**: Evaluates the frontend interacting directly with the backend API to guarantee proper communication across system boundaries (e.g., fetching products, searching endpoints).
3. **End-to-End Tests (`tests/e2e/`)**: Replicates full real user scenarios. The `searchFlow.spec.ts` test navigates the application imitating user activity, covering loading the page, searching, and seeing populated grid items.

## CI/CD Pipeline
The Continuous Integration and Continuous Deployment pipeline runs securely via **GitHub Actions** (`.github/workflows/main.yml`) on every `push` and `pull_request` to verify the codebase's integrity before deployment.
- **CI**: The pipeline provisions a Node environment, installs backend, frontend, and root-level testing dependencies, performs build checks for both the Vite client and Express server, installs Playwright browsers, and runs the entire Playwright Testing Pyramid (`npm run test`) to prevent regressions.
- **CD**: Deployment is configured using Render (`render.yaml`). The backend deploys as a standalone Web Service and the frontend builds as a Static Site, which securely retrieves the backend URL via injected environment variables automatically.
