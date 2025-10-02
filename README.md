# Mistischade Monorepo

A modern monorepo setup with a React frontend and Hono backend, powered by Bun.

## Project Structure

```
.
├── client/          # React + TypeScript + Vite frontend
├── server/          # Hono + TypeScript backend API
├── package.json     # Root workspace configuration
└── README.md
```

## Tech Stack

### Client
- React 19
- TypeScript
- Vite 7
- Tailwind CSS 4
- Vike (SSR framework)
- SWR (data fetching)
- Ky (HTTP client)
- Vitest & Playwright (testing)

### Server
- Hono (lightweight web framework)
- TypeScript
- Bun runtime
- Drizzle ORM
- PostgreSQL (via Neon)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) v1.2.18 or higher

### Installation

```bash
# Install all dependencies for both client and server
bun install
```

### Development

Run both client and server in development mode:

```bash
# Run all workspaces
bun run dev

# Or run individually:
bun run dev:client    # Start client on http://localhost:3000
bun run dev:server    # Start server on http://localhost:4000
```

### Building

```bash
# Build all workspaces
bun run build

# Or build individually:
bun run build:client
bun run build:server
```

### Testing

```bash
# Run unit tests (client)
bun run test:unit

# Run e2e tests (client)
bun run test:e2e

# Run all tests
bun run test:all
```

### Linting & Formatting

```bash
# Lint all workspaces
bun run lint

# Format all workspaces
bun run format
```

## Workspace Commands

The monorepo uses Bun workspaces. You can run commands in specific workspaces:

```bash
# Run a command in a specific workspace
bun run --filter @mistischade/client <command>
bun run --filter @mistischade/server <command>

# Examples:
bun run --filter @mistischade/client dev
bun run --filter @mistischade/server check:types
```

## Environment Variables

### Client

Create `client/.env.local`:

```env
# See client/.env.example for available variables
```

### Server

Create `server/.env.local`:

```env
PORT=4000
NODE_ENV=development
DATABASE_URL=your_database_url
```

## API Endpoints

The server provides the following endpoints:

- `GET /health` - Health check
- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get single item
- `POST /api/items` - Create item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

## Documentation

- [Client README](./client/README.md) - Client-specific documentation
- [Server README](./server/README.md) - Server-specific documentation

## License

Private
