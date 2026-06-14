# SentinelOps

Inventory Intelligence & Platform Health Command Center built with TanStack Start, TanStack Router, React 19, TypeScript, Tailwind CSS, Shadcn UI patterns, and Radix UI primitives.

## Overview

SentinelOps is a fullstack operational dashboard for Shopify inventory, TikTok inventory, sync health, and alert triage. It is intentionally implemented as a SaaS command center rather than a marketing dashboard: the page prioritizes resilient data loading, partial rendering, typed boundaries, and operational states.

## Architecture

- `src/routes` contains TanStack Router file routes and the REST endpoints.
- `src/components` is grouped by ownership: `layout`, `dashboard`, `inventory`, `alerts`, `platform`, `shared`, and `ui`.
- `src/services/mockApi.ts` owns the typed mock platform simulations and domain mapping helpers.
- `src/types` contains shared inventory, platform, KPI, and alert contracts.
- `src/server` contains HTTP response helpers for API routes.

## Streaming Strategy

The dashboard route starts TikTok and Shopify work independently:

```ts
const tiktokPromise = fetchTikTokData()
const shopify = await fetchShopifyData()
```

Both calls go through the REST endpoints (`/shopify_data` and `/tiktok_data`). Shopify is the only awaited dependency for initial route rendering. TikTok is passed to React as a promise and consumed behind Suspense boundaries. The app never uses `Promise.all()` for page rendering, so a slow or failed TikTok request cannot block Shopify inventory.

## Suspense Strategy

React 19 `use()` consumes the TikTok promise inside focused async sections:

- header TikTok status
- sync issue KPI
- TikTok platform health card
- inventory comparison table
- alerts feed

Each section has a production-style fallback. The inventory table fallback still shows live Shopify stock with TikTok columns marked pending.

## Error Handling Strategy

TikTok rendering is wrapped by resettable error boundaries. If TikTok fails, the page shows `Unable to load TikTok inventory` with a retry action while Shopify cards, inventory, and alerts remain functional. Retry creates a new `/tiktok_data` request and resets the affected boundaries.

## API Simulation

`GET /shopify_data`

- always succeeds
- waits 200ms
- returns platform status and inventory

`GET /tiktok_data`

- waits 5000ms
- has a 50% chance to return inventory
- has a 50% chance to return a 500 error

For deterministic demos, `/tiktok_data?mode=success` and `/tiktok_data?mode=error` are also supported.

## Test Product Catalog

Use these products and SKUs to test inventory search, sorting, risk states, and Shopify/TikTok mismatch behavior:

| Product | SKU | Shopify Stock | TikTok Stock |
| --- | --- | ---: | ---: |
| Apex Utility Jacket | `APX-JKT-BLK-M` | 124 | 124 |
| Northline Tech Pack | `NRD-PCK-GRY-18` | 19 | 23 |
| CoreFlex Training Tee | `CRF-TEE-WHT-L` | 211 | 211 |
| Signal Trail Sneaker | `SIG-SNK-OLV-10` | 8 | 0 |
| Vault Thermal Bottle | `VLT-BTL-STL-32` | 57 | 52 |
| Harbor Shell Hoodie | `HRB-HDY-NVY-S` | 43 | 43 |
| Axis Compression Short | `AXS-SRT-BLK-L` | 76 | 71 |
| Meridian Canvas Tote | `MRD-TOT-CRM-OS` | 5 | 5 |
| Summit Recovery Slide | `SMT-SLD-BNE-09` | 34 | 29 |
| Forge Performance Jogger | `FRG-JGR-CHR-M` | 92 | 92 |
| Pulse Reflective Cap | `PLS-CAP-BLK-OS` | 14 | 18 |
| Lumen Grip Sock | `LMN-SCK-WHT-M` | 187 | 187 |
| Vector Rain Shell | `VCT-SHL-SGE-L` | 27 | 39 |
| Orbit Crossbody Sling | `ORB-SLG-ONY-OS` | 68 | 64 |
| Terra Training Mat | `TRR-MAT-GRN-72` | 11 | 9 |
| Beacon Insulated Vest | `BCN-VST-RST-M` | 153 | 153 |

## Installation

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev        # local development
npm run build      # production build plus TypeScript check
npm run preview    # preview built app
npm run typecheck  # TypeScript only
```

## Docker

Run the full production build with one command:

```bash
docker compose up --build
```

The app will be available at `http://localhost:3000`.
