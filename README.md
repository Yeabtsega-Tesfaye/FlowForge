<div align="center">
  <img src="./public/favicon.svg" width="88" height="88" alt="FlowForge logo" />

  <h1>FlowForge</h1>
  <p><strong>A modern full-stack productivity platform that combines intelligent task management, AI assistance, analytics, and focus tools into one beautifully designed workspace.</strong></p>

  <p>
    <a href="https://flow-forge-sepia.vercel.app/">Live Demo</a> ·
    <a href="https://github.com/Yeabtsega-Tesfaye/FlowForge/issues">Report Bug</a> ·
    <a href="https://github.com/Yeabtsega-Tesfaye/FlowForge/issues">Request Feature</a>
  </p>

  <br />

<br />

  <img src="https://img.shields.io/badge/React-19-3b82f6?style=flat-square&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-7-7c3aed?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind-4-0ea5e9?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Zustand-State-1D9E75?style=flat-square" alt="Zustand" />
  <img src="https://img.shields.io/badge/Node-20-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node" />
  <img src="https://img.shields.io/badge/Express-API-000000?style=flat-square&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Postgres-16-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Gemini-AI-9b5de5?style=flat-square&logo=googlegemini&logoColor=white" alt="Gemini" />
  <img src="https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Neon-DB-00e599?style=flat-square&logo=neon&logoColor=black" alt="Neon" />
  <img src="https://img.shields.io/badge/Render-Cloud-46E3B7?style=flat-square&logo=render&logoColor=white" alt="Render" />
  <img src="https://img.shields.io/badge/Vercel-Deploy-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="MIT" />
</div>

<br />

<div align="center">
  <img src="./public/screenshots/landing.png" width="100%" alt="FlowForge dashboard" />
  <img src="./public/screenshots/dashboard.png" width="100%" alt="FlowForge dashboard" />
</div>

<br />

## About

FlowForge is a full-stack productivity SaaS I built solo over roughly a month. The goal was to close the gap between tutorials and production-grade software — not just learning React, but building a real application with a backend, a database, auth, a consistent design system, and architecture decisions that hold up as the codebase grows.

It ships with a full Express + PostgreSQL backend (complete with JWT auth, Prisma migrations, and dedicated controllers for tasks, analytics, notifications, and activity tracking), a React frontend of 70+ components organized by feature, and 10 Zustand stores managing distinct slices of application state.

The frontend is fully wired and functional. The backend API is complete and deployed on Render, with Neon (serverless Postgres) as the database. Live API integration is in active progress.

<br />

## Why I Built FlowForge

I built FlowForge to challenge myself to design, architect, and deploy a production-style full-stack application from scratch. Rather than focusing only on features, I wanted to practice writing maintainable code, building reusable components, managing application state, designing REST APIs, working with relational databases, handling authentication, integrating AI, and deploying a complete application to the cloud.

<br />

## Features

<table>
<tr>
<td width="50%" valign="top">

**Dashboard** — The home view. Animated stat cards, a weekly productivity chart via Recharts, a live activity feed, quick-action shortcuts, and a "Today's Focus" widget that surfaces your most urgent tasks.

**Tasks** — Full task lifecycle management. Create tasks with priority levels, status workflows (todo → in-progress → done), and due dates. TaskDetailsModal gives a per-task deep-dive. Filter bar lets you slice by status and priority.

**Analytics** — Eight dedicated chart components: area chart, bar chart, donut chart, progress ring, priority breakdown, upcoming deadlines, insights card, and stat cards. Derived patterns like weekend drop-off and peak focus days. Built entirely with Recharts.

**Focus Mode** — Full-screen Pomodoro timer. One task at a time, ambient breathing glow, session tracking. Completing a session writes back to the real task list — it's not decorative, it's wired.

**AI Assistant** — Chat interface designed to be a productivity co-pilot. Full message bubble system, typing indicator, empty state. AI integration in progress.

**Notifications** — A portal-based NotificationPanel that escapes the topbar stacking context. Per-user notification isolation. Bell icon with unread count in the topbar.

**Command Palette** — `⌘K` / `Ctrl+K` from anywhere in the app. Keyboard-first navigation to every route and action.

**Search** — `SearchModal` with fuzzy search and full keyboard navigation (arrow keys, Enter, Escape).

**Settings** — Four sections (Profile, Notifications, Integrations, Danger Zone) in a clean sub-nav layout. DiceBear avatar picker with persistent `avatarSeed` storage.

**Collapsible Sidebar** — Click to collapse, hover to preview. State persists across sessions via Zustand's localStorage persistence layer.

</td>
</tr>
</table>

<br />

<summary><strong>See more screenshots</strong></summary>
<br />

<img src="./public/screenshots/analytics.png" width="100%" alt="Analytics" />
<br /><br />
<img src="./public/screenshots/tasks.png" width="100%" alt="Tasks" />
<br /><br />
<img src="./public/screenshots/focusMode.png" width="100%" alt="Focus Mode" />

<br />

## Architecture

The design constraint that shaped everything: **components never touch data directly.** Every read goes through a service in `src/services/`. When the backend finishes wiring, only the service files change. Nothing else in the 70+ component tree needs to know.

State is split across 10 purpose-built Zustand stores rather than one monolith, each covering its own concern with selective localStorage persistence where needed.

```
                    ┌─────────────────────────────┐
                    │           Browser            │
                    └──────────────┬──────────────┘
                                   │
                    ┌──────────────▼──────────────┐
                    │     React 19 + Vite 7        │
                    │   70+ components · 9 pages   │
                    └──────────────┬──────────────┘
                                   │
                    ┌──────────────▼──────────────┐
                    │       Zustand (10 stores)    │
                    │  auth · tasks · focus · ui   │
                    └──────────────┬──────────────┘
                                   │
                    ┌──────────────▼──────────────┐
                    │        Service Layer         │
                    │  task · analytics · auth ·   │
                    │   notification · activity    │
                    └──────────────┬──────────────┘
                                   │  REST / JSON
                    ┌──────────────▼──────────────┐
                    │       Express API            │
                    │  6 controllers · JWT auth    │
                    └──────────────┬──────────────┘
                                   │
                    ┌──────────────▼──────────────┐
                    │         Prisma ORM           │
                    │   schema · migrations · v6   │
                    └──────────────┬──────────────┘
                                   │
                    ┌──────────────▼──────────────┐
                    │     PostgreSQL (Neon)        │
                    │    serverless · cloud        │
                    └─────────────────────────────┘
```

The design constraint that shaped everything: **components never touch data directly.** Every read — tasks, analytics, notifications, activity — goes through a service in `src/services/`. When the backend finishes wiring, only the service files change. Nothing else in the 70+ component tree needs to know.

State is split across 10 purpose-built Zustand stores rather than one monolith, each covering its own concern with selective localStorage persistence where needed.

```
FlowForge/
│
├── src/                         # React frontend
│   ├── components/              # 70+ components, organized by feature
│   │   ├── ai/                  # AIChatInput, AIMessageBubble, AITypingIndicator, AIEmptyState
│   │   ├── analytics/           # 8 chart + stat components (Recharts)
│   │   ├── dashboard/           # ActivityFeed, ChartCard, StatCard, FlowScore, Topbar, Sidebar...
│   │   ├── focus/               # FocusTimer, TaskPicker
│   │   ├── notifications/       # NotificationPanel (portal-based)
│   │   ├── settings/            # ProfileSection, NotificationsSection, IntegrationsSection, DangerSection
│   │   ├── tasks/               # TaskCard, TaskModal, TaskDetailsModal, TaskFilterBar
│   │   └── ui/                  # 16 primitives: Button, Card, GlassCard, Badge, Toast,
│   │                            #   CommandPalette, SearchModal, AmbientBackground, Avatar,
│   │                            #   AvatarPicker, Skeleton, Loader, Pill, Input, PageHeader...
│   │
│   ├── pages/                   # 9 route-level views
│   ├── layouts/                 # DashboardLayout, PublicLayout
│   ├── services/                # Data access layer — swaps mock → live API seamlessly
│   │   ├── taskService.js
│   │   ├── analyticsService.js
│   │   ├── activityService.js
│   │   ├── notificationService.js
│   │   └── authService.js
│   ├── store/                   # 10 Zustand stores
│   │   ├── authStore.js         # Auth state + JWT persistence
│   │   ├── taskStore.jsx        # Task CRUD + filter state
│   │   ├── focusStore.jsx       # Pomodoro timer state
│   │   ├── notificationStore.jsx
│   │   ├── notificationPanelStore.js
│   │   ├── sidebarStore.jsx     # Collapse state (persisted)
│   │   ├── commandPaletteStore.js
│   │   ├── searchModalStore.js
│   │   ├── taskModalStore.js
│   │   └── toastStore.js
│   ├── hooks/                   # useUserInit — hydrates user on mount
│   ├── lib/                     # api.js — Axios instance with auth interceptors
│   └── routes/                  # AppRoutes with ProtectedRoute wrapper
│
└── server/                      # Express + Prisma backend
    ├── src/
    │   ├── controllers/         # authController, taskController, analyticsController,
    │   │                        # activityController, notificationController, aiController
    │   ├── routes/              # auth, tasks, analytics, activity, notifications, ai
    │   ├── middleware/          # JWT auth, error handler
    │   └── lib/                 # Prisma client singleton
    └── prisma/
        ├── schema.prisma        # Full data model
        └── migrations/          # Versioned SQL migrations
```

<br />

## Stack

| Layer | Component | Technical Specification | Brand |
| :--- | :--- | :--- | :---: |
| **Core Client UI** | **React 19 & Vite 7** | High-performance client runtime leveraging functional hooks and optimization rules, built via instant HMR compilation. | <img src="https://img.shields.io/badge/-React-3b82f6?style=flat-square&logo=react&logoColor=white" Alt="React" /> |
| **Design System** | **Tailwind CSS v4** | Variable-first modern CSS compiler powering bespoke layout aesthetics like dark glassmorphism. | <img src="https://img.shields.io/badge/-Tailwind-0ea5e9?style=flat-square&logo=tailwindcss&logoColor=white" Alt="Tailwind" /> |
| **Motion Physics** | **Framer Motion** | Controls layout-morphing transitions across navigation components, stateful sidebars, and breathing background glowing loops. | <img src="https://img.shields.io/badge/-Framer__Motion-black?style=flat-square&logo=framer&logoColor=white" Alt="Framer Motion" /> |
| **State Engine** | **Zustand** | Distributed Flux pattern splitting operational domains into **10 hyper-focused atomic data stores** with custom persistence rules. | <img src="https://img.shields.io/badge/-Zustand-1D9E75?style=flat-square" Alt="Zustand" /> |
| **Data Visualization**| **Recharts** | Specialized mathematical presentation nodes parsing task history to deliver interactive dashboard metric grids. | <img src="https://img.shields.io/badge/-Recharts-22c55e?style=flat-square" Alt="Recharts" /> |
| **Client Routing** | **React Router v7** | Complex nested navigation guards protecting discrete route-level layouts (`DashboardLayout` vs `PublicLayout`). | <img src="https://img.shields.io/badge/-React__Router-CA4245?style=flat-square&logo=react-router&logoColor=white" Alt="React Router" /> |
| **API Architecture** | **Node.js & Express.js**| Event-driven, highly optimized HTTP gateway routing asynchronous endpoints with clean separation across controller files. | <img src="https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" Alt="Node.js" /> |
| **Data Mapping** | **Prisma ORM v6** | Fully declarative database modeling mapping complex relationships, compound lookups, and tracking migrations. | <img src="https://img.shields.io/badge/-Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white" Alt="Prisma" /> |
| **Data Storage** | **PostgreSQL (Neon)** | Serverless, cloud-native relational pool optimized for swift transactional consistency and fast processing metrics. | <img src="https://img.shields.io/badge/-PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" Alt="PostgreSQL" /> |
| **Authentication** | **JWT System** | Robust secure access token implementation strategy utilizing state-of-the-art **HTTP-only cookies** for full XSS protection. | <img src="https://img.shields.io/badge/-JWT-black?style=flat-square&logo=jsonwebtokens&logoColor=white" Alt="JWT" /> |
| **Generative AI** | **Google Gemini API** | Contextual system messaging integration layer generating customized developer productivity recommendations. | <img src="https://img.shields.io/badge/-Gemini-9b5de5?style=flat-square&logo=googlegemini&logoColor=white" Alt="Gemini AI" /> |
| **Visual Assets** | **DiceBear Notionists**| Procedural SVG dynamic avatar generator providing signature styling inside profile configurations. | <img src="https://img.shields.io/badge/-DiceBear-ff69b4?style=flat-square" Alt="DiceBear" /> |
| **Client Pipeline** | **Vercel** | Automated continuous build optimization hosting edge client assets. | <img src="https://img.shields.io/badge/-Vercel-000000?style=flat-square&logo=vercel&logoColor=white" Alt="Vercel" /> |
| **Server Gateway** | **Render** | Managed cloud infrastructure computing background server runtimes and processing secure server requests. | <img src="https://img.shields.io/badge/-Render-46E3B7?style=flat-square&logo=render&logoColor=white" Alt="Render" /> |

<br />

## Highlights

| | |
|---|---|
| 1 | Glassmorphism design system with ambient background variants per route |
| 2 | Responsive across desktop, tablet, and mobile |
| 3 | Real-time dashboard with 8 Recharts analytics components |
| 4 | JWT authentication with protected routes and auth middleware |
| 5 | AI productivity assistant powered by Gemini *(integration in progress)* |
| 6 | Activity tracking, event log, and portal-based notifications |
| 7 | Focus mode with Pomodoro timer — sessions write back to the real task list |
| 8 | Persistent global state across 10 Zustand stores |
| 9 | Production deployment on Vercel + Render + Neon |

<br />


## Engineering decisions worth noting

**Service layer as API boundary.** The service layer isn't just organization — it's the seam between mock data and live APIs. `taskService.js` today calls a local store; tomorrow it calls `/api/tasks`. No component changes.

**Portal-based notifications.** `NotificationPanel` renders into a React portal to escape the topbar's stacking context. Solved a real z-index problem with the right tool instead of hacking `z-index` values.

**Per-concern stores.** Splitting state into 10 stores (auth, tasks, sidebar, focus, toasts, notifications, etc.) rather than one global store means components only subscribe to what they actually need. `sidebarStore` re-rendering never touches `taskStore`.

**ActivityLog as a real system.** Task lifecycle events (created, completed, status changed) are tracked in the backend and surfaced in the dashboard's activity feed. It's not a placeholder — it's a real event log.

**Prisma 6 over 7.** Prisma 7 broke the Neon adapter compatibility chain during development. Pinned to Prisma 6 rather than fighting an unstable dependency.

<br />

## Getting started

```bash
# Clone the repo
git clone https://github.com/Yeabtsega-Tesfaye/FlowForge.git
cd FlowForge

# Install frontend dependencies
npm install
npm run dev
# → http://localhost:5173

# Backend (separate terminal)
cd server
npm install
# Add a .env with DATABASE_URL and JWT_SECRET
npx prisma migrate dev
node src/index.js
```


<br />

## Roadmap

- [x] Frontend architecture and design system
- [x] Dashboard, Analytics, Tasks, Focus Mode, Settings, AI Assistant UI
- [x] Command Palette + Search Modal
- [x] Notifications (portal-based, per-user isolated)
- [x] Responsive layout (mobile → desktop)
- [x] Express + PostgreSQL backend
- [x] JWT authentication (controllers + middleware)
- [x] Activity log system
- [x] Prisma schema + migrations
- [X] Live API integration (frontend ↔ backend)
- [X] Real AI integration (AI Assistant page)
- [X] Production deployment
- [ ] Subtasks like part of a task
- [ ] Collaburation like reate task to be done by more than one person
- [ ] OAuth Login
- [ ] Calendar Integration
- [ ] Teams & Collaboration
- [ ] Email Notifications
- [ ] Offline Support
- [ ] PWA

<br />


## Project stats

- **123 files** across **30 directories**
- **70+ React components** organized by feature domain
- **10 Zustand stores** with selective persistence
- **6 backend controllers** (auth, tasks, analytics, activity, notifications, AI)
- **8 Recharts components** on the Analytics page
- **~1 month** of solo development

<br />

## Author

**Yeabtsega Tesfaye**
[GitHub](https://github.com/Yeabtsega-Tesfaye) · [Portfolio](https://yeab-tsega.netlify.app)

<br />

<div align="center">
<sub>MIT License</sub>
</div>
