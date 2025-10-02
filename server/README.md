# Server

A lightweight API server built with Hono and Bun.

## Features

- Built with [Hono](https://hono.dev/) - Fast, lightweight web framework
- TypeScript support
- CORS enabled for local development
- Request logging
- Health check endpoint
- Example CRUD API endpoints

## Getting Started

### Development

```bash
bun run dev
```

Server will start on http://localhost:4000

### Build

```bash
bun run build
```

### Production

```bash
bun run start
```

## API Endpoints

### Health Check

```
GET /health
```

### Example API

```
GET    /api/items      - Get all items
GET    /api/items/:id  - Get single item
POST   /api/items      - Create item
PUT    /api/items/:id  - Update item
DELETE /api/items/:id  - Delete item
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```
PORT=4000
NODE_ENV=development
```

## Project Structure

```
server/
├── src/
│   ├── index.ts       # Main entry point
│   └── routes/
│       └── api.ts     # API routes
├── package.json
├── tsconfig.json
└── README.md
```
