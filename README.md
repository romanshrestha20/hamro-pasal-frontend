

## Hamro Pasal Frontend

Modern storefront for the Hamro Pasal platform. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4. Provides authentication, shopping, checkout, and profile management experiences on top of the Hamro Pasal REST API.

---

### Contents

- Overview
- Features
- Tech Stack
- Project Structure
- Getting Started
- Scripts
- Environment
- Architecture & Conventions
- Styling & Theming
- Accessibility & Performance
- Testing
- Deployment
- Troubleshooting
- Contributing
- License

---

### Overview

- Next.js App Router with a mix of server and client components
- Data validation via Zod and react-hook-form
- OAuth (Google) and credential-based flows backed by backend JWT sessions
- Shopping cart, checkout, orders, favorites, and profile image upload flows
- Responsive UI with shared components and contextual state

---

### Features

- App Router layout with route groups for auth, store, checkout, dashboard, and profile
- Typed API helpers and route constants to avoid magic strings
- Google OAuth via @react-oauth/google; backend issues HTTP-only cookies
- Cart, checkout, and order review components (see ORDER_FLOW_ARCHITECTURE.md)
- Product search, filtering, pagination, and favorites
- Profile management with image upload + preview
- Toast notifications, skeleton states, and optimistic-ish UI feedback
- React Compiler enabled for performance

---

### Tech Stack

| Area | Technologies |
| --- | --- |
| Framework | Next.js 16, React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4, tailwind-merge, tailwindcss-animate |
| UI / UX | Radix primitives, framer-motion, lucide-react, react-hot-toast |
| Forms & Validation | react-hook-form, @hookform/resolvers, Zod |
| Auth | @react-oauth/google; backend JWT session cookies |
| HTTP | axios client with typed helpers |
| Tooling | ESLint 9, Prettier, React Compiler, TypeScript 5 |

---

### Project Structure

```
frontend/
├── src/
│   ├── app/                 # App Router routes and layouts
│   │   ├── (auth)/          # Sign-in/up, OAuth
│   │   ├── (store)/         # Storefront pages
│   │   ├── cart/, checkout/ # Cart and checkout flow
│   │   ├── orders/, dashboard/ # Order history and account area
│   │   └── profile/         # Profile management
│   ├── components/          # UI building blocks (auth, cart, product, layout, ui, user, etc.)
│   ├── config/              # Environment loaders and OAuth config
│   ├── context/             # React Context providers (Auth, Cart, Favorite, Order, Payment, Product, Review, User, Image)
│   ├── hooks/               # Custom hooks (auth, pagination, uploads, theme, forms)
│   ├── lib/                 # API routes, axios helpers, types, validation utilities
│   └── styles/              # Global styles
└── package.json
```

Checkout-specific component guidance lives in ORDER_FLOW_ARCHITECTURE.md.

---

### Getting Started

Prerequisites
- Node.js 18+
- npm (ships with Node) or yarn
- Running Hamro Pasal backend API (default: http://localhost:5000)

Setup
```bash
git clone https://github.com/romanshrestha20/hamro-pasal-frontend.git
cd hamro-pasal/frontend
npm install

# Configure environment
cat > .env.local <<'EOF'
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
EOF

npm run dev
# App runs at http://localhost:3000
```

---

### Scripts

- npm run dev — start Next.js in development
- npm run build — create production build
- npm run start — serve the production build
- npm run lint — run ESLint

---

### Environment

Create `.env.local` in `frontend/`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

- `NEXT_PUBLIC_API_URL` must point to the backend API root.
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` must match the OAuth client configured in the backend; the app will throw at startup if it is missing (see src/config/env.ts).

Image domains allowed in next.config.ts: Render uploads (`hamro-pasal-xdjr.onrender.com/uploads/**`), Cloudinary, Unsplash, cdn.dummyjson.com, i.dummyjson.com.

---

### Architecture & Conventions

- Routing: Next.js App Router with layouts and route groups; favor server components when data can be fetched on the server.
- Data fetching: axios helpers and route constants live in `src/lib`; avoid hardcoded URLs.
- State management: React Context providers for Auth, Cart, Favorite, Order, Payment, Product, Review, User, and Image; wrap pages with the relevant providers.
- Forms: react-hook-form with Zod schemas; keep frontend schemas aligned with backend validation.
- Auth: Google OAuth handled via @react-oauth/google; backend sets HTTP-only cookies for sessions.
- File uploads: profile images handled via upload + preview hooks; ensure API accepts multipart/form-data.
- Error handling: surface user-friendly toasts; rely on backend error messages where possible.

---

### Styling & Theming

- Tailwind CSS 4 with utility-first approach; `tailwind-merge` to resolve class conflicts.
- Radix UI primitives for accessible base components.
- Motion via framer-motion; keep animations subtle and purposeful.
- Global styles live in `src/styles/globals.css` and `src/app/globals.css`.

---

### Accessibility & Performance

- Radix primitives and ARIA-conscious components; ensure form controls have labels.
- Next.js Image for remote assets; remotePatterns defined in next.config.ts.
- React Compiler enabled; prefer memo-friendly patterns and avoid unnecessary client components.

---

### Testing

Frontend tests are not yet wired. Recommended stack when adding them:
- React Testing Library for components
- MSW for API mocking
- Jest or Vitest as the test runner
Expose scripts as `npm test` and `npm run test:watch` when ready.

---

### Deployment

- Vercel recommended for Next.js. Set `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_GOOGLE_CLIENT_ID` in project settings.
- Ensure backend CORS allows the deployed origin and that cookies are permitted (credentials, same-site config).
- Remote images must align with `remotePatterns` in `next.config.ts`.

---

### Troubleshooting

- Missing Google client ID throws at startup (see src/config/env.ts).
- OAuth popup blocked: ensure COOP header is set (Cross-Origin-Opener-Policy is configured in next.config.ts) and popups are allowed.
- 401 responses: confirm backend is reachable at `NEXT_PUBLIC_API_URL` and sends/accepts cookies.
- Broken images: confirm the domain is listed in `remotePatterns`.

---

### Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/my-change`
3. Commit: `git commit -m "Add my change"`
4. Push: `git push origin feature/my-change`
5. Open a Pull Request

---

### License

ISC License. See LICENSE in the repository root.