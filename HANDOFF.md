# In Development — Developer Handoff

**Last updated:** 2026-05-20
**Stack:** Next.js 16 · TypeScript (strict) · Tailwind CSS v4 · Radix UI
**Deployed target:** Vercel (no server, no env vars required in v1)
**Entry point:** `/in-development` (root `/` redirects here)

---

## What this is

A single-page product roadmap view answering one question: **what are we building right now and why?** The page groups features by product, surfaces their build status, the ARR from customers who requested the feature, and which customers asked for it. Clicking any feature opens a detail drawer with the full update, spec link, and requesting customer list.

v1 is **read-only, mock-data only**. No authentication, no live integrations. The data shape is intentionally structured to match what the Google Sheets "Now" tab will eventually provide.

---

## Running locally

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build check
pnpm exec tsc --noEmit   # type check only
```

No `.env` file needed.

---

## File structure

```
app/
├── globals.css                      # Tailwind import + CSS custom properties
├── layout.tsx                       # Root layout — antialiased, system font
├── page.tsx                         # Redirects / → /in-development
└── in-development/
    ├── page.tsx                     # Client component — manages filter + sheet state
    ├── loading.tsx                  # Skeleton matching page layout
    └── _components/
        ├── page-header.tsx          # Title, subtitle, summary stats (products · features · ARR)
        ├── filter-bar.tsx           # Product pills + Active/All status toggle
        ├── product-section.tsx      # Product heading + 2-col feature grid
        ├── feature-card.tsx         # Card with hover chevron + click trigger
        └── feature-detail-sheet.tsx # Radix Sheet drawer with full feature details

lib/
├── types.ts                         # All TypeScript interfaces (canonical)
├── mock-data/
│   └── in-development.ts            # InDevelopmentView fixture (3 products, 7 features)
└── utils/
    ├── cn.ts                        # clsx + tailwind-merge helper
    └── format.ts                    # formatARR, formatARRCompact, formatDate

components/
└── ui/
    ├── badge.tsx                    # Inline badge with status variants
    ├── button.tsx                   # Button with default/ghost/outline variants
    └── sheet.tsx                    # Right-side drawer built on @radix-ui/react-dialog
```

---

## Data layer

### Canonical types — `lib/types.ts`

```ts
InDevelopmentView
  ├── Product[]
  │   ├── name: string          // "ACRM" | "Tivian" | "DAW" | …
  │   └── Feature[]
  │       ├── featureName: string
  │       ├── oneLineSummary: string
  │       ├── status: FeatureStatus
  │       ├── type: FeatureType
  │       ├── ownership: string
  │       ├── arr: number
  │       ├── requestingCustomers: RequestingCustomer[]
  │       ├── specsUrl?: string
  │       ├── latestUpdate?: string
  │       └── marketingMaterialsUrl?: string
  └── lastUpdated: string        // ISO date
```

Key types:

| Type | Values |
|---|---|
| `FeatureStatus` | `"In Progress"` · `"Not Started"` · `"Completed"` · `"Planning Done"` · `"Partial"` |
| `FeatureType` | `"Commitment"` · `"Stretch Goal"` |
| `RequestingCustomer` | `{ name: string; notionSlug?: string }` — `notionSlug` reserved for v2 |

### Mock data — `lib/mock-data/in-development.ts`

One `InDevelopmentView` object with 3 products and 7 features covering all 5 status values. The page loads this directly from `page.tsx`.

### Utility functions — `lib/utils/format.ts`

```ts
formatARR(n: number): string          // 3190403 → "$3,190,403"  (used in detail sheet)
formatARRCompact(n: number): string   // 3190403 → "$3.2M"       (used in feature cards)
formatDate(iso, style?)               // "2026-05-14" → "May 14" | "May 14, 2026"
```

---

## Component reference

### `PageHeader`

**Props:** `{ data: InDevelopmentView }`

Title, subtitle, and summary stats row: product count · feature count · total ARR (computed from all features) · last updated date.

### `FilterBar`

**Props:** `{ products, selectedProduct, onProductChange, statusFilter, onStatusFilterChange }`

Two controls in a row:
- **Product pills** (left): "All" + one pill per product. Active pill is filled. `active:scale-[0.96]` press animation.
- **Active / All toggle** (right): segmented control. "Active" shows `In Progress + Planning Done + Partial` only. "All" shows everything.

Filter state lives in `page.tsx` and is passed down.

### `ProductSection`

**Props:** `{ product: Product, onFeatureClick: (feature: Feature) => void }`

Product name + feature count heading with a horizontal rule, then a 2-col grid (`grid-cols-2`) that collapses to 1 col at `max-[640px]`.

### `FeatureCard`

**Props:** `{ feature: Feature, onClick: (feature: Feature) => void }`

The main interaction unit. A `<button>` element with:
- Top row: status badge + type badge (left) · compact ARR + contextual chevron (right)
- Feature name (`text-[15px] font-medium`)
- One-line summary (`text-[13px] text-neutral-500`)
- Customer chips: first 3 names, then `+N more` pill
- Owner label at bottom

**Contextual chevron:** Animates in on hover using `opacity + scale + blur` (from `0/0.25/4px` to `1/1/0`), `cubic-bezier(0.2, 0, 0, 1)`, 200ms.

**Press animation:** `active:scale-[0.99]`

**Shadow:** `--shadow-card` at rest, `--shadow-card-hover` on mouse enter (inline style swap via `onMouseEnter`/`onMouseLeave`).

### `FeatureDetailSheet`

**Props:** `{ feature: Feature | null, open: boolean, onOpenChange }`

Radix `Dialog` rendered as a right-side sheet (`max-w-md`). Content:
1. Feature name (SheetTitle)
2. Status badge + Type badge
3. ARR — large, tabular-nums (`text-[28px]`)
4. Ownership
5. Requesting customers — full list as rounded-full chips; note about Notion linking in v2
6. Latest update — paragraph text
7. Spec link → external (only when `specsUrl` set)
8. Marketing materials → external (only when `marketingMaterialsUrl` set)

The `feature` prop is nullable — sheet renders nothing when closed (avoids flash of stale content).

---

## Design system

Identical to `customer-view`. See that project's HANDOFF.md for full design token documentation. Summary:

### Card elevation

```css
--shadow-card: 0px 0px 0px 1px rgba(0,0,0,0.06),
               0px 1px 2px -1px rgba(0,0,0,0.06),
               0px 2px 4px 0px rgba(0,0,0,0.04);
--shadow-card-hover: /* slightly stronger */
```

Apply with `style={{ boxShadow: "var(--shadow-card)" }}`. Hover state swapped via `onMouseEnter`/`onMouseLeave` because Tailwind v4 doesn't directly support CSS custom property group-hover.

### Status badge colors

| Status | Variant | Light | Dark |
|---|---|---|---|
| In Progress | `product` | `bg-[#E6F1FB] text-[#0C447C]` | `bg-[#0C2744] text-[#90C4F5]` |
| Not Started | `neutral` | `bg-neutral-100 text-neutral-700` | `bg-neutral-800 text-neutral-300` |
| Completed | `success` | `bg-[#EAF3DE] text-[#27500A]` | `bg-[#173404] text-[#C0DD97]` |
| Planning Done | `warn` | `bg-[#FAEEDA] text-[#633806]` | `bg-[#3D2200] text-[#F5C97A]` |
| Partial | `warn` | same | same |

Type badge: `Commitment` → `neutral`, `Stretch Goal` → `product` (blue).

### Border radius (concentric)

| Context | Outer | Inner |
|---|---|---|
| Feature cards | `rounded-2xl` (16px) | — |
| Customer chips inside card | — | `rounded-full` |
| Filter toggle outer | `rounded-lg` (8px) | `rounded-md` (6px) pills |

### Motion

- Easing: `cubic-bezier(0.25, 1, 0.5, 1)` for color/bg transitions
- Easing: `cubic-bezier(0.2, 0, 0, 1)` for chevron enter/exit
- Duration: 150ms color; 200ms transform/opacity/filter
- `prefers-reduced-motion`: all durations collapse to `0.01ms`

### Typography

- Font: system sans (no web font)
- `text-wrap: balance` on all headings
- `text-wrap: pretty` on paragraphs
- `tabular-nums` on ARR and numeric stats

### Accessibility

- Product pills and status toggle have `role="group"` / `aria-label`
- Feature cards are `<button>` with `onKeyDown` (Enter/Space)
- Feature cards have descriptive `aria-label`
- Chevron is `aria-hidden="true"`
- External links: `target="_blank" rel="noopener noreferrer"`
- Dark mode: `dark:` variants throughout
- Responsive: 2-col grid collapses to 1 col at `max-[640px]`

---

## Integrating into JigTree Operations Hub

This standalone app is a reference implementation. To integrate into the Ops Hub:

1. Copy `lib/types.ts` → merge or replace types in the Ops Hub's type system
2. Copy `lib/mock-data/in-development.ts` → place in Ops Hub's data directory
3. Copy `lib/utils/format.ts` (or add `formatARRCompact` to the existing utils)
4. Copy `components/ui/badge.tsx`, `button.tsx`, `sheet.tsx` → only if not already present
5. Copy `app/in-development/_components/*` → place under the Ops Hub's "In Development" route
6. Wire the page to the Ops Hub's route and left-nav entry under **PRODUCT → In Development**
7. Style adjustments: the Ops Hub uses a dark sidebar — the content area should accept light-mode cards as-is; adjust `globals.css` shadow tokens if the Ops Hub has its own

---

## Extending to real data

### Replacing mock data with the Google Sheet

```
lib/mock-data/in-development.ts
  → lib/google-sheets/in-development.ts   fetches from Sheets API v4
```

The `page.tsx` is the only place that loads data. Swap the import:

```ts
// page.tsx — today
import { inDevelopmentData } from "@/lib/mock-data/in-development";

// page.tsx — v2
import { getInDevelopmentData } from "@/lib/google-sheets/in-development";

const data = await getInDevelopmentData();
```

### Google Sheets API v4

```
GET https://sheets.googleapis.com/v4/spreadsheets/{SHEET_ID}/values/Now!A:L
```

Auth: service account with read-only access to the spreadsheet (env var: `GOOGLE_SERVICE_ACCOUNT_JSON`).

### Column mapping — "Now" tab

| Column | Field | Notes |
|---|---|---|
| A | `product.name` | Groups features by product |
| B | `feature.featureName` | — |
| C | `feature.type` | `"Commitment"` or `"Stretch Goal"` |
| D | `feature.ownership` | Team or project lead |
| E | `feature.oneLineSummary` | — |
| F | `feature.requestingCustomers` | Comma-separated names → split to `RequestingCustomer[]` |
| G | `feature.arr` | Parse numeric from string (remove `$`, commas) |
| H | `feature.specsUrl` | Link to spec doc |
| I | `feature.latestUpdate` | Free text |
| J | `feature.marketingMaterialsUrl` | Link |
| K | `feature.prioritization` | "Now" for this tab — not currently exposed in UI |
| L | `feature.status` | Must match `FeatureStatus` union |

### Notion customer linking (v2)

`RequestingCustomer.notionSlug` is reserved. In v2:
1. Match `name` against a Notion customer DB lookup (fuzzy or exact)
2. Populate `notionSlug` with the customer's slug
3. In `FeatureCard` and `FeatureDetailSheet`, render customer chips as links pointing to the customer-view app: `/customers/{notionSlug}/...`

---

## What is NOT built in v1

- Authentication / access control
- Live Google Sheets integration
- Editing (status, ARR, update text are read-only)
- Notion customer linking (chips are display-only)
- Search within features
- Sorting options (by ARR, status, etc.)
- Pagination
- Analytics events
- Tests
