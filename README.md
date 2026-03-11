# Shivoham Crane Services — Website

Professional crane rental and heavy lifting services website for **Shivoham Crane Services**, a Mumbai-based company serving clients across India.

## Architecture

```
shivoham-crane/
├── frontend/          → Next.js 14 + React + TailwindCSS + Framer Motion
├── backend/           → Express + TypeScript + Prisma ORM
├── database/          → SQL migrations and seed files
├── infra/             → Docker Compose, Dockerfiles, Nginx config
└── logo/              → Brand logo assets
```

## Tech Stack

| Layer     | Technology                         |
| --------- | ---------------------------------- |
| Frontend  | Next.js 14 (App Router), React 18, TailwindCSS, Framer Motion |
| Backend   | Node.js, Express, TypeScript       |
| Database  | PostgreSQL 15 + Prisma ORM         |
| Forms     | react-hook-form + Zod validation   |
| Email     | Nodemailer (SMTP)                  |
| Infra     | Docker Compose, Nginx              |

## Pages (9 Total)

1. **Home** — Hero, trust bars, service snapshot, fleet preview, industries, testimonials, CTA
2. **About Us** — Company story, mission/vision/values, team promise
3. **Services** — Overview of all 8 services with links to detail pages
4. **Service Detail** — Dynamic route (`/services/[slug]`) with features, CTA, sidebar
5. **Fleet & Equipment** — Full crane fleet showcase with specs
6. **Projects & Gallery** — Portfolio of completed projects
7. **Industries We Serve** — 8 industry categories
8. **Safety & Compliance** — Safety framework, certifications, operator training
9. **Contact / Request Quote** — Full quote form with file upload, validation, FAQ

## Quick Start (Local Development)

### Prerequisites
- Node.js 20+
- PostgreSQL 15+ (or Docker)
- npm or yarn

### 1. Database

**Option A: Docker (recommended)**
```bash
cd infra
docker compose up db -d
```

**Option B: Local PostgreSQL**
```bash
createdb shivoham_crane
psql -d shivoham_crane -f database/001_init.sql
psql -d shivoham_crane -f database/002_seed.sql
```

### 2. Backend

```bash
cd backend
cp .env.example .env  # Edit with your values
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev            # Runs on http://localhost:4000
```

### 3. Frontend

```bash
cd frontend
cp .env.example .env  # Edit if needed
npm install
npm run dev            # Runs on http://localhost:3000
```

### 4. Full Stack (Docker)

```bash
cd infra
docker compose up --build
```
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- PostgreSQL: localhost:5432

## Environment Variables

### Backend (`backend/.env`)
| Variable              | Description                    | Default                          |
| --------------------- | ------------------------------ | -------------------------------- |
| PORT                  | Server port                    | 4000                             |
| DATABASE_URL          | PostgreSQL connection string   | postgresql://postgres:postgres@localhost:5432/shivoham_crane |
| FRONTEND_URL          | CORS origin                    | http://localhost:3000             |
| ADMIN_API_TOKEN       | Bearer token for admin API     | change-me                        |
| SMTP_HOST             | SMTP server                    | smtp.gmail.com                   |
| SMTP_PORT             | SMTP port                      | 587                              |
| SMTP_USER             | SMTP username                  | —                                |
| SMTP_PASS             | SMTP password                  | —                                |
| NOTIFICATION_EMAIL    | Where to send lead alerts      | info@shivohamcrane.com           |

### Frontend (`frontend/.env`)
| Variable                      | Description              | Default                   |
| ----------------------------- | ------------------------ | ------------------------- |
| NEXT_PUBLIC_API_URL            | Backend API URL          | http://localhost:4000/api |
| NEXT_PUBLIC_WHATSAPP_NUMBER    | WhatsApp number          | 919876543210              |
| NEXT_PUBLIC_PHONE              | Display phone            | +91-98765-43210           |
| NEXT_PUBLIC_EMAIL              | Display email            | info@shivohamcrane.com    |
| NEXT_PUBLIC_GA_ID              | Google Analytics 4 ID    | —                         |
| NEXT_PUBLIC_META_PIXEL_ID      | Meta Pixel ID            | —                         |

## API Endpoints

| Method | Endpoint              | Auth    | Description               |
| ------ | --------------------- | ------- | ------------------------- |
| GET    | /api/health           | Public  | Health check              |
| POST   | /api/leads            | Public  | Submit quote request      |
| GET    | /api/admin/leads      | Bearer  | List all leads            |
| GET    | /api/admin/leads/:id  | Bearer  | Get single lead           |
| GET    | /api/admin/stats      | Bearer  | Dashboard stats           |

## Build & Deploy

```bash
# Build frontend
cd frontend && npm run build

# Build backend
cd backend && npm run build

# Docker production
cd infra && docker compose -f docker-compose.yml up --build -d
```

## Key Features

- **SEO**: Schema.org structured data, meta tags, semantic HTML, Next.js SSG
- **Performance**: Optimized images, font loading, minimal JS, gzip
- **Accessibility**: WCAG-friendly colors, ARIA labels, keyboard navigation
- **Security**: Helmet, CORS, rate limiting, input validation, honeypot
- **Lead Gen**: Quote form → DB → email notification → WhatsApp deep link
- **Responsive**: Mobile-first, tested across breakpoints (320px to 4K)

## Theme Colors (from logo)

| Color        | Hex       | Usage                    |
| ------------ | --------- | ------------------------ |
| Dark Green   | `#142f2a` | Primary / backgrounds    |
| Gold         | `#ba8d32` | Accent / CTAs / headings |
| Off-white    | `#f7f7f7` | Page backgrounds         |

## Testing

```bash
cd backend
npm test  # Runs Zod validation tests
```

## License

Proprietary — Shivoham Crane Services
