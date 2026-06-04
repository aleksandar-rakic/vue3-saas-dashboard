# Vue 3 SaaS Dashboard

> Production-ready SaaS admin dashboard starter — Vue 3, TypeScript, Pinia, Tailwind CSS, Chart.js, dark mode.

[![CI](https://github.com/aleksandar-rakic/vue3-saas-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/aleksandar-rakic/vue3-saas-dashboard/actions/workflows/ci.yml)
[![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white)](https://vuejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

## Features

- **Vue 3** Composition API + `<script setup>` throughout
- **TypeScript** strict mode — no `any`
- **Pinia** with `pinia-plugin-persistedstate` for auth token persistence
- **Vue Router 4** with navigation guards (auth, guest, admin)
- **Tailwind CSS** with dark mode (`class` strategy)
- **Chart.js** via `vue-chartjs` for analytics
- **Axios** with request/response interceptors (auto-logout on 401)
- **@vueuse/core** composables
- **Headless UI** for accessible modals, dropdowns, transitions
- **Heroicons** for consistent iconography
- **ESLint + Prettier** enforced in CI
- **Docker** multi-stage build → NGINX with caching headers

## Project Structure

```
src/
├── components/
│   ├── ui/             # Reusable: StatsCard, Badge, Button, Modal...
│   ├── layout/         # Sidebar, Navbar, Header
│   └── charts/         # RevenueChart, UsersChart
├── composables/
│   └── useApi.ts       # Axios instance with auth interceptors
├── layouts/
│   └── AppLayout.vue   # Authenticated shell (sidebar + main)
├── pages/
│   ├── auth/           # LoginPage.vue
│   └── dashboard/      # Overview, Analytics, Settings
├── router/             # Route definitions + navigation guards
├── stores/
│   └── auth.ts         # Pinia auth store with persistence
└── types/              # Shared TypeScript interfaces
```

## Getting Started

```bash
# Install
npm install

# Configure
cp .env.example .env

# Dev server (http://localhost:3000)
npm run dev

# Type check
npm run type-check

# Lint
npm run lint

# Production build
npm run build
```

## Docker

```bash
# Build
docker build -t vue3-saas-dashboard .

# Run
docker run -p 80:80 vue3-saas-dashboard
```

NGINX serves the SPA with:
- Proper `try_files` for client-side routing
- 1-year cache for hashed static assets
- gzip compression

## Auth Flow

```
Login (email + password)
       │
       ▼
POST /api/auth/login → { token, user }
       │
       ├── token stored in Pinia (persisted to localStorage)
       ├── user stored in Pinia (persisted to localStorage)
       └── redirect to /dashboard

Route guard checks:
  requiresAuth  → redirect to /login if not authenticated
  requiresGuest → redirect to /dashboard if already authenticated
  requiresAdmin → redirect to /dashboard if not admin

Axios interceptor:
  401 response → auto logout + redirect to /login
```

## CI/CD Pipeline

```
push to main / PR
       │
       ├── ESLint + Prettier check
       ├── TypeScript strict type check (vue-tsc)
       ├── Vite build (fails on type errors)
       └── Docker build → GHCR push (main only)
```

## License

MIT © [Aleksandar Rakić](https://github.com/aleksandar-rakic)
