# 🔐 SECURITY_SETUP.md — Manual Supabase & Deployment Hardening

This document lists every security change that **must be applied manually** on the
Supabase dashboard / Vercel side. The app-side (frontend + edge function) hardening
is already implemented in code. These steps are intentionally **not** executed
automatically — you approve and apply them yourself.

> Why: RLS policies, storage policies, and secret env vars cannot be safely
> provisioned from a browser-only app. They are one-time infrastructure steps.

---

## 1. Environment Variables (Vercel / local `.env`)

Ensure these exist and are **never** committed to git:

| Variable | Purpose | Where |
|---|---|---|
| `VITE_SUPABASE_URL` | Public Supabase project URL | Vercel + `.env` |
| `VITE_SUPABASE_ANON_KEY` | Public anon key (safe to ship in the client) | Vercel + `.env` |
| `VITE_FACULTY_EMAILS` | Comma-separated allow-list of faculty emails | Vercel + `.env` |
| `OPENROUTER_API_KEY` | Server-side secret — **never** exposed to the client | Supabase Edge Function secrets |

⚠️ The `OPENROUTER_API_KEY` must exist **only** in the Supabase Dashboard →
Edge Functions → Secrets (or `supabase secrets set`). If it is also in a
client-visible `.env`, remove it immediately.

## 2. AI Edge Function Rate Limit (recommended)

The edge function now includes an in-memory per-IP rate limit (12 req/min) as a
first line of defense. For stronger protection against distributed abuse, enable
the **Supabase API Gateway rate limit** for the `ai-assistant` function:

Dashboard → Edge Functions → `ai-assistant` → Rate Limits →
`POST /ai-assistant` → 30 requests / 60 seconds.

This caps your OpenRouter spend per key.

## 3. Run the SQL Migration

Open **Supabase Dashboard → SQL Editor** and run the contents of
[`supabase/security/SUPABASE_SECURITY.sql`](./supabase/security/SUPABASE_SECURITY.sql).
It is idempotent (safe to re-run). It:

- Enables RLS + **revokes direct table grants** so only RLS-governed paths work.
- Adds a **`is_admin()` security-definer function** so one policy expression
  drives admin checks everywhere (owner email or faculty allow-list or
  `profiles.role`).
- Protects **`profiles`**: no user can insert/update their own role (prevents
  privilege escalation). The owner is bootstrapped by a trigger; faculty can be
  created only through the owner flow.
- Adds INSERT policies for **`notes_comments`**, **`unit_feedback`**, **`jobs`**,
  **`materials`** with input validation (`text[]` like-vote allow-lists, length
  caps) so malformed or malicious payloads are rejected by the database too.
- Makes comment/feedback **likes idempotent** (no double-count race).
- Hardens **Storage buckets** (`pdfs`, `notes-images`, `company-logos`): public
  read, authenticated write only, size limits (20MB / 5MB / 2MB), image-only
  content types.

> If your tables already exist with data, the migration is fully backward
> compatible — it only adds policies and a function, never drops data.

## 4. Storage Bucket Limits (manual fallback)

If you prefer the Dashboard UI instead of SQL:

1. Storage → `pdfs` → Settings → **Max file size: 20 MB**, MIME type `application/pdf`
2. Storage → `notes-images` → **Max file size: 5 MB**, MIME types `image/*`
3. Storage → `company-logos` → **Max file size: 2 MB**, MIME types `image/*`

## 5. Authentication Settings (optional but recommended)

Dashboard → Authentication → Providers:

- Consider **disabling new sign-ups** if you do not want self-registration
  (`Settings → Authentication → Email → Allow new users to sign up = off`).
  The site currently creates faculty accounts only via the owner flow, and
  students do not need accounts.

## 6. Post-Deploy Checks

- [ ] `npm run build` passes
- [ ] Admin login still works (owner + faculty)
- [ ] Uploading a PDF / image / job logo works
- [ ] Anonymous comment + like works without double-count
- [ ] Quiz + AI tools show a friendly message when rate-limited
- [ ] Light and Dark mode unaffected

---

## Summary of what was already hardened in code

| Area | Change |
|---|---|
| Edge function | Input sanitization (prompt-injection resistance), type/difficulty whitelist, 8KB body cap, 12 req/min/IP rate limit, generic error responses, method check |
| Uploads | MIME **and** extension whitelists, forced safe extensions on stored filenames, strict size caps (PDF 20MB / image 5MB / logo 2MB), empty-file rejection |
| Inputs | Rating clamping, text normalization, URL scheme validation on all external links |
| AI tools | Friendly 429 / 413 / 5xx messages instead of silent failures |
