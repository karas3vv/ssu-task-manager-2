# TaskFlow

TaskFlow is a task-manager project built with Next.js, TypeScript, FSD architecture, MobX and axios. The app demonstrates public SSR pages, protected dashboard pages, client-side state management, typed API routes, i18n, metadata/SEO setup and theme switching.

## Stack

- Next.js App Router
- TypeScript
- React
- MobX / mobx-react-lite
- axios
- next-intl
- CSS in global layout styles

## Features

- Public landing page
- Login and registration pages
- Protected dashboard area through middleware
- Personal profile editing
- Task creation, editing and status updates
- Calendar view with task deadlines
- Project list
- Team management for owner role
- Analytics page
- Settings page with theme switching
- RU/EN locale structure
- Metadata, OpenGraph, manifest, robots.txt, sitemap.xml and SchemaOrg
- Mock API routes for backend-like behavior

## Architecture

The project follows FSD-style layering with Next.js App Router:

```text
app/        Next.js routes, layouts, API routes, metadata files
entities/   Business entities and shared model types
features/   User-facing feature logic and components
shared/     API client, config, providers, stores, SEO helpers, UI primitives
widgets/    Larger page blocks and composed UI sections
i18n/       next-intl request config and messages
```

Path aliases are configured in `tsconfig.json`:

```text
@app/*
@entities/*
@features/*
@i18n/*
@shared/*
@widgets/*
```

## Pages

Public pages:

```text
/ru
/en
/ru/auth/login
/ru/auth/register
```

Protected dashboard pages:

```text
/ru/dashboard
/ru/dashboard/tasks
/ru/dashboard/projects
/ru/dashboard/calendar
/ru/dashboard/analytics
/ru/dashboard/team
/ru/dashboard/settings
```

Dashboard pages are placed inside the `(dashboard)` route group and use a shared dashboard layout.

## Demo Auth

The login form already contains demo credentials:

```text
email: demo@taskflow.local
password: password
```

The demo user has the `owner` role, so team management is available on the Team page.

## API Routes

The project uses typed Next.js API routes as a mock backend:

```text
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/logout

GET    /api/profile
PATCH  /api/profile

GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/[id]
PATCH  /api/tasks/[id]
DELETE /api/tasks/[id]

GET    /api/projects
POST   /api/projects
PUT    /api/projects/[id]
PATCH  /api/projects/[id]
DELETE /api/projects/[id]

GET    /api/team
POST   /api/team
PATCH  /api/team/[id]
DELETE /api/team/[id]

GET    /api/stats
```

All API calls from the client are made through the typed axios client in `shared/api`.

## MobX Stores

The app uses a root store pattern:

```text
RootStore
AuthStore
TaskStore
ProjectStore
DashboardStore
TeamStore
ThemeStore
```

`RootStore` collects all stores and is provided through `StoreProvider`.

## SEO

Implemented SEO-related files and helpers:

- Metadata per page through `generateMetadata`
- OpenGraph markup
- `app/manifest.ts`
- `app/robots.ts`
- `app/sitemap.ts`
- Icon routes
- SchemaOrg JSON-LD through `next/script`

## i18n

The project uses `[locale]` routing and `next-intl`.

Supported locales:

```text
ru
en
```

Main files:

```text
i18n/messages.ts
i18n/request.ts
middleware.ts
shared/config/i18n.ts
```

## Theme

The theme is detected from the user's browser preference and can be switched manually on the Settings page.

## Getting Started

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000/ru
```

Build production version:

```bash
npm run build
```

Run production server:

```bash
npm run start
```

Type-check the project:

```bash
npm run test
```

## Notes

The backend is implemented as in-memory mock API routes. Data created during runtime is available while the Next.js server is running. After a full server restart, the mock data returns to its initial state.

## Available Scripts

```bash
npm run dev     # start development server
npm run build   # build production bundle
npm run start   # start production server after build
npm run test    # run TypeScript check
```
