# Sundew Pest Control & Fumigation

Website for a government-accredited pest control and fumigation company in Tamil Nadu.

## Features
- Five public pages: Home, Services, Reviews, Appointment status, Contact
- Contact form that saves enquiries to a database
- Admin dashboard (login protected) to manage enquiries and moderate reviews
- Appointment status lookup by phone number
- Spam protection, SEO metadata, sitemap and robots

## Tech stack
Next.js (App Router) · React · Tailwind CSS · Supabase (Postgres + Auth) · Vercel

## Run locally
1. `npm install`
2. Create `.env.local` with:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL`
3. `npm run dev`