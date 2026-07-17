# Benchmark Surveying Co. — website + CMS

A Next.js site with:
- Public site that reads all its text (hero, services, process steps, stats, contact info) from a database
- `/admin` — a password-protected page where you edit that content yourself, no code required
- A contact form that saves submissions to the database, visible in `/admin`

You're starting from scratch, so below are **all the steps**, in order, to get this live on the
internet with your own domain. It uses two free services: **Supabase** (database) and **Vercel**
(hosting). Total cost to start: $0, plus whatever you pay to register a domain (~$10–15/year).

---

## 1. Create the database (Supabase)

1. Go to https://supabase.com and sign up (free).
2. Click **New project**. Pick any name/region, set a database password (save it somewhere), and wait ~2 minutes for it to provision.
3. In your new project, go to **SQL Editor → New query**, paste in the entire contents of
   `supabase/schema.sql` from this project, and click **Run**. This creates two tables:
   - `site_content` — one row holding all your editable text as JSON
   - `leads` — contact form submissions
4. Go to **Project Settings → API**. You'll need two values from this page in step 3 below:
   - **Project URL**
   - **service_role key** (click "Reveal" — keep this secret, never put it in frontend code)

## 2. Push this code to GitHub

1. Create a new empty repository on https://github.com (e.g. `benchmark-surveying-site`).
2. From inside this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

## 3. Deploy to Vercel

1. Go to https://vercel.com and sign up with your GitHub account (free).
2. Click **Add New → Project**, select the repo you just pushed.
3. Before deploying, open **Environment Variables** and add:

   | Name | Value |
   |---|---|
   | `SUPABASE_URL` | your Supabase Project URL from step 1 |
   | `SUPABASE_SERVICE_ROLE_KEY` | your Supabase service_role key from step 1 |
   | `ADMIN_PASSWORD` | a password you choose, for logging into `/admin` |
   | `SESSION_SECRET` | a long random string — generate one at https://generate-secret.vercel.app/32 or run `openssl rand -hex 32` locally |

4. Click **Deploy**. After ~1 minute you'll get a live URL like `benchmark-surveying-site.vercel.app`.
5. Visit `/admin` on that URL, log in with your `ADMIN_PASSWORD`, and edit the content — it's
   currently filled with placeholder text and needs your real business details.

## 4. Connect your domain

1. Buy a domain if you don't have one — Namecheap, Google Domains/Squarespace, or Cloudflare
   Registrar are all straightforward and inexpensive.
2. In your Vercel project, go to **Settings → Domains**, add your domain.
3. Vercel will show you 1–2 DNS records to add. Go to your domain registrar's DNS settings and add
   them exactly as shown. This usually takes a few minutes to a few hours to take effect.

That's it — your site is live at your own domain, backed by a real database, editable by you
without touching code.

---

## Running it locally (optional, for making further changes)

```bash
npm install
cp .env.example .env.local   # then fill in the same values as in step 3 above
npm run dev
```
Visit http://localhost:3000 for the site and http://localhost:3000/admin for the CMS.

## Project structure

```
app/
  page.js              → public homepage (fetches content from Supabase)
  admin/                → CMS: login page + editor
  api/contact/          → contact form endpoint
  api/admin/            → login/logout + content read-write + leads list
components/
  Site.js               → renders the public page from CMS content
  ContactForm.js
  admin/Editor.js        → the CMS editing UI
lib/
  supabase.js            → database helpers
  authToken.js            → signs/verifies the admin login cookie
supabase/schema.sql      → run once in Supabase to create tables + seed content
```

## Notes on the admin login

This uses a single shared password (`ADMIN_PASSWORD`) rather than individual user accounts —
appropriate for a small business site with one or two people editing it. If you later want
separate logins per staff member, or things like password reset, that's a bigger change (e.g.
swapping in Supabase Auth or NextAuth) — worth doing if the team editing the site grows.

## Sending email notifications for new leads

Right now, contact form submissions are saved to the `leads` table and visible in `/admin`, but no
email is sent automatically. If you want an email the moment someone submits the form, the
easiest option is adding [Resend](https://resend.com) (free tier, a few lines of code in
`app/api/contact/route.js`) — ask me and I can wire that in.
