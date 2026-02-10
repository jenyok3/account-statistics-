# Dashboard Overview Application

## Overview
A full-stack web application built with Express + Vite that displays a dashboard with account statistics. The app shows real-time system metrics and account status information.

## Recent Changes
- 2026-02-10: Completed project import to Replit environment, provisioned PostgreSQL database, installed dependencies.

## User Preferences
- No specific preferences documented yet.

## Project Architecture

### Tech Stack
- **Frontend**: React 18, Vite, TailwindCSS, Shadcn UI, Wouter (routing), TanStack React Query
- **Backend**: Express 5, TypeScript (tsx), Node.js
- **Database**: PostgreSQL (Neon-backed via Replit), Drizzle ORM
- **Build**: esbuild via custom build script

### Project Structure
```
client/           - React frontend
  src/
    pages/        - Page components
    components/   - UI components
    lib/          - Utilities (queryClient, etc.)
    hooks/        - Custom hooks
shared/
  schema.ts       - Drizzle schema + Zod validation types
server/
  index.ts        - Express server entry point
  routes.ts       - API routes
  storage.ts      - Database storage interface (IStorage)
  db.ts           - Database connection
  vite.ts         - Vite dev server integration
  static.ts       - Static file serving for production
script/
  build.ts        - Production build script
```

### Data Model
- **users** table: id (serial PK), username (text), status (active/blocked), createdAt (timestamp)
- **AccountStats** interface: total, active, blocked counts

### Key Commands
- `npm run dev` - Start development server (port 5000)
- `npm run build` - Production build
- `npm run db:push` - Push schema changes to database
