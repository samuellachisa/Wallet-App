# Wallet App

A mobile-first wallet UI built for a front-end exercise: a **transactions list** with a small dashboard and a **transaction detail** receipt screen. Data is loaded from a local JSON file; there is no backend.

## Tech stack

- [React](https://react.dev/) 19 and [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for dev server and production builds
- [Tailwind CSS](https://tailwindcss.com/) v4 (`@tailwindcss/vite`)
- [React Router](https://reactrouter.com/) for client-side routing
- [Font Awesome](https://fontawesome.com/) (React + solid + brand icons)
- [Vitest](https://vitest.dev/) for unit tests

Package manager: **pnpm**.

## Prerequisites

- [Node.js](https://nodejs.org/) (current LTS is fine)
- [pnpm](https://pnpm.io/installation) (`npm install -g pnpm` or Corepack)

## Getting started

```bash
pnpm install
pnpm dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Other commands

| Command | Purpose |
|--------|---------|
| `pnpm dev` | Development server with HMR |
| `pnpm run build` | Typecheck and production build to `dist/` |
| `pnpm preview` | Serve the production build locally |
| `pnpm lint` | ESLint |
| `pnpm run typecheck` | `tsc -b` only |
| `pnpm test` | Vitest (run once) |

## App behavior

- **Layout:** Single-column mobile shell (max width ~390px) on a light gray page background.
- **Routes:**
  - `/` — dashboard (card balance, available credit, daily points, “no payment due”) and the **latest transactions** from JSON (sample data matches the Apple Wallet–style reference).
  - `/transactions/:id` — receipt-style detail for one transaction.
- **Data:** [`src/data/wallet.json`](src/data/wallet.json) is the source of truth. Types live in [`src/types/wallet.ts`](src/types/wallet.ts) and the typed export is [`src/data/wallet.ts`](src/data/wallet.ts).
- **Optional `referenceDate`:** When set on the wallet object in JSON, the app uses it as “today” for relative dates and daily points so the UI stays predictable for demos.
- **Optional `dailyPointsDisplay`:** When set, the list shows that string for Daily Points (e.g. to match a screenshot); otherwise the seasonal formula value is shown with K-formatting.

Business rules (pending prefix, authorized user before date, payment `+` amounts, seasonal daily points, K-style point formatting, icon tiles with hashed dark backgrounds) are implemented in [`src/lib/`](src/lib/) with tests beside the pure helpers.

## Project structure

```
src/
├── App.tsx                 # Route definitions
├── main.tsx                # Entry + BrowserRouter
├── index.css               # Tailwind import + global background
├── components/             # UI (mobile shell, list, detail)
├── data/                   # wallet.json + typed re-export
├── lib/                    # Pure logic + *.test.ts
└── types/                  # Shared TypeScript types
```

## Customizing content

Edit **`src/data/wallet.json`** (and keep the shape aligned with `WalletData` in `src/types/wallet.ts`). Rebuild or refresh the dev server to see changes.



## License

Private project (`"private": true` in `package.json`).
