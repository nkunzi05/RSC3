# Realify Construction — Website

Single-page Next.js 15 + Tailwind CSS site for Realify Construction, in partnership with Realify Investments.

## Edit content
**Everything lives in `src/data/site.ts`**: text, contact details, services, projects, testimonials, stats, images and form options.
Search that file for `[PLACEHOLDER]` to find what still needs real information
(owner name, years, flagship project, stats, testimonials, email, domain).

- **Photos:** swap the Unsplash URLs for your own. Put files in `/public/images/` and use paths like `/images/home-1.jpg`.
- **Accent colour:** change `accent` in `tailwind.config.ts` (terracotta `#A8674A` by default; dusty blue `#6B7F8E` is the alternative).
- **Quote form:** by default it opens the visitor's email app with the message pre-filled. To receive submissions directly, create a free form at formspree.io and paste its URL into `form.endpoint`.

## Run locally
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Deploy to Vercel
Push this folder to a GitHub repo → vercel.com → **Add New Project** → import the repo → Deploy (no settings needed).
Then set your real domain in `site.url` so SEO/Open Graph links are correct.
