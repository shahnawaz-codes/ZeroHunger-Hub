# Full-Stack Boilerplate

**Next.js 14 (App Router) · Express.js · MongoDB · JWT · Tailwind CSS**

---

## Project Structure

```
boilerplate/
├── backend/                        # Express + MongoDB API
│   ├── src/
│   │   ├── app.js                  # Express app (middleware + routes)
│   │   ├── server.js               # Entry point — connects DB then starts server
│   │   ├── config/
│   │   │   └── db.js               # Mongoose connection
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js  # protect() + restrictTo() guards
│   │   │   └── error.middleware.js # notFound + global errorHandler
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.routes.js      # POST /api/auth/register, /login
│   │   │   │   ├── auth.controller.js  # Thin handler layer
│   │   │   │   └── auth.service.js     # Business logic (register/login)
│   │   │   └── user/
│   │   │       ├── user.model.js       # Mongoose schema + bcrypt hooks
│   │   │       ├── user.routes.js      # GET/PATCH /api/users/me
│   │   │       ├── user.controller.js
│   │   │       └── user.service.js
│   │   └── utils/
│   │       ├── asyncHandler.js     # Wraps async controllers, forwards errors
│   │       ├── AppError.js         # Operational error class
│   │       └── jwt.js              # signToken / verifyToken helpers
│   ├── .env.example
│   └── package.json
│
└── frontend/                       # Next.js 14 App Router
    └── src/
        ├── app/
        │   ├── layout.tsx          # Root layout + <Toaster />
        │   ├── page.tsx            # Public home page
        │   ├── globals.css
        │   ├── login/page.tsx      # Login form (RHF + Zod)
        │   ├── register/page.tsx   # Register form (RHF + Zod)
        │   └── dashboard/page.tsx  # Protected dashboard
        ├── middleware.ts           # Next.js edge middleware (route protection)
        ├── components/
        │   ├── AuthCard.tsx        # Shared auth page wrapper
        │   └── ui/
        │       ├── Button.tsx      # Variants: primary/secondary/ghost/danger
        │       ├── Input.tsx       # Label + error message support
        │       ├── Loader.tsx      # Loader2 icon + PageLoader
        │       ├── Toast.ts        # showToast helper (react-hot-toast)
        │       └── index.ts        # Barrel export
        ├── hooks/
        │   └── useAuth.ts          # login / register / logout + user state
        ├── lib/
        │   ├── axios.ts            # Axios instance with JWT interceptors
        │   └── validations.ts      # Zod schemas + inferred TypeScript types
        └── modules/
            └── auth/
                ├── auth.service.ts # API calls: login / register
                └── auth.types.ts   # User + AuthResponse interfaces
```

---

## How It All Connects

```
Browser → Next.js Middleware (token cookie check)
       → Page Component → useAuth hook
       → authService → Axios instance (attaches Bearer token)
       → Express API → auth.middleware (protect) → Controller
       → Service (business logic) → Mongoose Model → MongoDB
```

| Layer | Responsibility |
|---|---|
| **Next.js Middleware** | Redirects unauthenticated requests to `/login` at the edge |
| **`useAuth` hook** | Single source of truth for auth state; persists token to localStorage + cookie |
| **Axios instance** | Auto-attaches `Authorization: Bearer <token>`; auto-redirects on 401 |
| **Express `protect`** | Verifies JWT, attaches `req.user` to every protected route |
| **asyncHandler** | Wraps async controllers so thrown errors reach `errorHandler` automatically |
| **Global errorHandler** | Normalises Mongoose / JWT / operational errors into consistent JSON responses |

---

## Quick Start

### 1. Backend

```bash
cd backend
cp .env.example .env          # fill in MONGODB_URI + JWT_SECRET
npm install
npm run dev                   # http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev                   # http://localhost:3000
```

---

## API Reference

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/api/health` | ✗ | Server health check |
| `POST` | `/api/auth/register` | ✗ | Register new user |
| `POST` | `/api/auth/login` | ✗ | Login + receive JWT |
| `GET` | `/api/users/me` | ✓ | Get current user |
| `PATCH` | `/api/users/me` | ✓ | Update profile |

---

## Extending the Boilerplate

- **New backend module** → add a folder under `src/modules/`, wire up routes in `app.js`
- **New protected frontend page** → create under `src/app/`, no extra config needed (middleware covers all non-public routes)
- **Role-based access** → use `restrictTo('admin')` after `protect` in any route
- **New form** → define a Zod schema in `lib/validations.ts`, use with `useForm` + `zodResolver`
