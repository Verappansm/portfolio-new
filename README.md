# Portfolio — Verappan S M

Personal portfolio built with Next.js 16 App Router. Features live stats pulled daily from GitHub, LeetCode, Monkeytype, and Medium; an interactive location map; a blog, poetry collection, and quotes — alongside work experience, projects, and research.

## Sections

- **Home** — animated hero, role carousel, live stats (GitHub contributions, LeetCode, Monkeytype WPM, Medium articles), research highlights
- **Experience** — work history and positions of responsibility via an animated timeline
- **Projects** — uniform grid of 11 projects with GitHub and live links
- **About** — persona tabs (Software Developer / Business Analyst / AI Engineer) with per-role tech stack and certifications
- **More** — blog (individual post pages), poems (book-flip UI), quotes (constellation grid)

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, `tailwind-merge`, `class-variance-authority`
- **Animation**: Framer Motion, GSAP (`@gsap/react`)
- **Map**: Leaflet.js via `react-leaflet` (OpenStreetMap + CartoDB tiles, no API key required)
- **UI**: Radix UI, `lucide-react`, custom Aceternity-style component library (`components/ui/`) — bento grid, timeline, glowing effects, dot background, floating navbar
- **Theming**: `next-themes` (dark / light / system)

## Live Stats

Stats are fetched server-side once per day via Next.js ISR (`revalidate: 86400`):

| Source | Data |
|---|---|
| GitHub (jogruber API) | Last-year contributions, all-time total, heatmap |
| LeetCode (leetcode-stats-api) | Problems solved, ranking |
| Monkeytype (official API) | Best 30s WPM, accuracy |
| Medium (RSS feed) | Article count, latest post |

### Environment Variables

Create `.env.local` in the project root:

```
MONKEYTYPE_APE_KEY=your_ape_key_here
```

Add the same variable in Vercel project settings → Environment Variables for production.

## Project Structure

```
app/
  page.tsx                  Home (server component — fetches live stats)
  layout.tsx                Root layout with navbar
  more/
    page.tsx                More landing (blog / poems / quotes cards)
    blog/page.tsx           Blog listing
    blog/[slug]/page.tsx    Individual blog post
    poems/page.tsx          Poems (book-flip interaction)
    quotes/page.tsx         Quotes (constellation + marquee)
components/
  home-client.tsx           Main client component (all home page sections)
  navbar.tsx                Floating navbar with logo and name images
  footer.tsx                Footer with map modal, socials, scroll-to-top
  map-modal.tsx             Interactive location map modal (Leaflet)
  leaflet-map.tsx           Leaflet map with custom emoji markers
  scroll-to-top-button.tsx  Footer scroll-to-top button
  ui/                       Reusable animated UI components
lib/
  data.ts                   Profile, experience, projects, tech stack, research
  more-data.ts              Blog articles, poems, quotes
  stats-server.ts           Server-side daily stats fetcher
  utils.ts                  Shared utilities
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Add `MONKEYTYPE_APE_KEY` to `.env.local` for live typing stats.

```bash
npm run build
npm run start
```
