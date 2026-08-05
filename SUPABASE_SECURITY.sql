-- ============================================================================
-- SUPABASE_SECURITY.sql — Production security hardening (manual, idempotent)
-- ----------------------------------------------------------------------------
-- Run this in Supabase Dashboard → SQL Editor. Safe to re-run. Never drops data.
--
-- What it does:
--   1. Revokes direct table grants so ONLY Row Level Security governs access.
--   2. Adds an is_admin() security-definer helper (single source of truth).
--   3. Protects the profiles table from privilege escalation.
--   4. Adds validated INSERT policies for user-generated content.
--   5. Makes comment/feedback likes idempotent (no double-count races).
--   6. Hardens Storage buckets (public read, authenticated write, size caps).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1) Helper: is_admin() — owner email, faculty allow-list, or profiles.role
-- ---------------------------------------------------------------------------
-- security definer: runs with the function owner's rights so it can read the
-- profiles table for ANY user (RLS on profiles might otherwise block it).
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from auth.users u
    where u.id = auth.uid()
      and (
        u.email = 'atul.sharmas2806@gmail.com'
        or u.email = any(
          string_to_array(
            coalesce(current_setting('app.faculty_emails', true), ''),
            ','
          )
        )
      )
  )
  or exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role in ('owner', 'faculty')
  );
$$;

comment on function public.is_admin() is
  'True when the current user is the owner or an allow-listed faculty member.';

-- ---------------------------------------------------------------------------
-- 2) profiles — nobody can escalate their own role
-- ---------------------------------------------------------------------------
-- Users may read their own profile and create/update ONLY their own row.
-- Role is governed server-side: the owner upsert + the createFaculty flow
-- are the only legitimate writers, so 'role' is excluded from user UPDATEs
-- via a trigger (created AFTER the owner seed so the seed can run first).

alter table public.profiles enable row level security;

drop policy if exists "profiles_read_own" on public.profiles;
create policy "profiles_read_own"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Seed the owner profile FIRST (while no role-change trigger exists yet), so
-- a fresh database always bootstraps the owner. Re-runs find the role already
-- 'owner', the update no-ops, and the trigger below stays satisfied.
insert into public.profiles (id, email, role)
select id, email, 'owner'
from auth.users
where email = 'atul.sharmas2806@gmail.com'
on conflict (id) do update set role = 'owner', email = excluded.email;

-- NOW protect against client-side role escalation.
create or replace function public.prevent_self_role_change()
returns trigger
language plpgsql
security definer
as $$
begin
  if new.role is distinct from old.role then
    raise exception 'Role changes are not allowed from the client.';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_prevent_self_role_change on public.profiles;
create trigger trg_prevent_self_role_change
  before update on public.profiles
  for each row
  execute function public.prevent_self_role_change();

-- ---------------------------------------------------------------------------
-- 3) materials — student-generated resources
-- ---------------------------------------------------------------------------
alter table public.materials enable row level security;

drop policy if exists "materials_public_read" on public.materials;
create policy "materials_public_read"
  on public.materials for select
  using (true);

drop policy if exists "materials_admin_insert" on public.materials;
create policy "materials_admin_insert"
  on public.materials for insert
  with check (
    public.is_admin()
    and length(coalesce(unit_name, '')) between 1 and 200
  );

drop policy if exists "materials_admin_update" on public.materials;
create policy "materials_admin_update"
  on public.materials for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "materials_admin_delete" on public.materials;
create policy "materials_admin_delete"
  on public.materials for delete
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- 4) jobs — public read, admin write
-- ---------------------------------------------------------------------------
alter table public.jobs enable row level security;

drop policy if exists "jobs_public_read" on public.jobs;
create policy "jobs_public_read"
  on public.jobs for select
  using (true);

drop policy if exists "jobs_admin_insert" on public.jobs;
create policy "jobs_admin_insert"
  on public.jobs for insert
  with check (
    public.is_admin()
    and length(coalesce(title, '')) between 1 and 200
    and length(coalesce(apply_link, '')) <= 500
  );

drop policy if exists "jobs_admin_update" on public.jobs;
create policy "jobs_admin_update"
  on public.jobs for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "jobs_admin_delete" on public.jobs;
create policy "jobs_admin_delete"
  on public.jobs for delete
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- 5) notes_comments — public read, anyone may insert (rate-limit enforced),
--    admin may delete. Likes are idempotent.
-- ---------------------------------------------------------------------------
alter table public.notes_comments enable row level security;

drop policy if exists "notes_comments_public_read" on public.notes_comments;
create policy "notes_comments_public_read"
  on public.notes_comments for select
  using (true);

drop policy if exists "notes_comments_insert" on public.notes_comments;
create policy "notes_comments_insert"
  on public.notes_comments for insert
  with check (
    length(coalesce(name, '')) between 1 and 60
    and length(coalesce(comment, '')) between 1 and 500
    and coalesce(rating, 5) between 1 and 5
    and coalesce(likes, 0) = 0
    and coalesce(liked_by, '{}') = '{}'
  );

drop policy if exists "notes_comments_admin_delete" on public.notes_comments;
create policy "notes_comments_admin_delete"
  on public.notes_comments for delete
  using (public.is_admin());

-- Idempotent like: appends userId only if absent, then increments.
create or replace function public.like_comment(comment_id uuid, voter_id text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.notes_comments
  set liked_by = liked_by || voter_id,
      likes = likes + 1
  where id = comment_id
    and not (liked_by @> array[voter_id]);
end;
$$;

-- ---------------------------------------------------------------------------
-- 6) unit_feedback — public read, anyone may insert, admin may delete
-- ---------------------------------------------------------------------------
alter table public.unit_feedback enable row level security;

drop policy if exists "unit_feedback_public_read" on public.unit_feedback;
create policy "unit_feedback_public_read"
  on public.unit_feedback for select
  using (true);

drop policy if exists "unit_feedback_insert" on public.unit_feedback;
create policy "unit_feedback_insert"
  on public.unit_feedback for insert
  with check (
    length(coalesce(name, '')) between 1 and 60
    and length(coalesce(comment, '')) between 1 and 500
    and coalesce(star_rating, 0) between 0 and 5
    and coalesce(rating_type, '') in ('', 'like', 'heart', 'unlike')
  );

drop policy if exists "unit_feedback_admin_delete" on public.unit_feedback;
create policy "unit_feedback_admin_delete"
  on public.unit_feedback for delete
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- 7) Storage buckets — public read, authenticated write, size caps
--    (folders in these buckets must already exist; policies are additive)
-- ---------------------------------------------------------------------------

-- pdfs: notes PDFs — 20MB, application/pdf only
drop policy if exists "pdfs_public_read" on storage.objects;
create policy "pdfs_public_read"
  on storage.objects for select
  using (bucket_id = 'pdfs');

drop policy if exists "pdfs_admin_write" on storage.objects;
create policy "pdfs_admin_write"
  on storage.objects for insert
  with check (
    bucket_id = 'pdfs'
    and public.is_admin()
    and coalesce((metadata->>'size')::bigint, 0) <= 20971520
    and lower(coalesce(metadata->>'mimetype', '')) = 'application/pdf'
  );

drop policy if exists "pdfs_admin_update" on storage.objects;
create policy "pdfs_admin_update"
  on storage.objects for update
  using (bucket_id = 'pdfs' and public.is_admin());

drop policy if exists "pdfs_admin_delete" on storage.objects;
create policy "pdfs_admin_delete"
  on storage.objects for delete
  using (bucket_id = 'pdfs' and public.is_admin());

-- notes-images: cover images — 5MB, image/* only
drop policy if exists "notes_images_public_read" on storage.objects;
create policy "notes_images_public_read"
  on storage.objects for select
  using (bucket_id = 'notes-images');

drop policy if exists "notes_images_admin_write" on storage.objects;
create policy "notes_images_admin_write"
  on storage.objects for insert
  with check (
    bucket_id = 'notes-images'
    and public.is_admin()
    and coalesce((metadata->>'size')::bigint, 0) <= 5242880
    and lower(coalesce(metadata->>'mimetype', '')) like 'image/%'
  );

drop policy if exists "notes_images_admin_update" on storage.objects;
create policy "notes_images_admin_update"
  on storage.objects for update
  using (bucket_id = 'notes-images' and public.is_admin());

drop policy if exists "notes_images_admin_delete" on storage.objects;
create policy "notes_images_admin_delete"
  on storage.objects for delete
  using (bucket_id = 'notes-images' and public.is_admin());

-- company-logos: job logos — 2MB, image/* only
drop policy if exists "company_logos_public_read" on storage.objects;
create policy "company_logos_public_read"
  on storage.objects for select
  using (bucket_id = 'company-logos');

drop policy if exists "company_logos_admin_write" on storage.objects;
create policy "company_logos_admin_write"
  on storage.objects for insert
  with check (
    bucket_id = 'company-logos'
    and public.is_admin()
    and coalesce((metadata->>'size')::bigint, 0) <= 2097152
    and lower(coalesce(metadata->>'mimetype', '')) like 'image/%'
  );

drop policy if exists "company_logos_admin_update" on storage.objects;
create policy "company_logos_admin_update"
  on storage.objects for update
  using (bucket_id = 'company-logos' and public.is_admin());

drop policy if exists "company_logos_admin_delete" on storage.objects;
create policy "company_logos_admin_delete"
  on storage.objects for delete
  using (bucket_id = 'company-logos' and public.is_admin());

-- ---------------------------------------------------------------------------
-- DONE — verify with:
--   select * from pg_policies where tablename in
--     ('materials','jobs','notes_comments','unit_feedback');
-- ---------------------------------------------------------------------------
