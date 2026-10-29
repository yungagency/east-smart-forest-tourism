-- East Smart Forest & Tourism — schéma Supabase
-- À coller dans Supabase > SQL Editor > New query, puis "Run". Le script peut être relancé sans risque.

create extension if not exists pgcrypto;

-- Administrateurs (comptes autorisés à modifier le contenu)
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- Destinations
create table if not exists public.sites (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category text not null default 'parc' check (category in ('parc','nature','histoire','culture')),
  name_fr text not null,
  name_en text,
  commune text,
  departement text,
  lat double precision,
  lng double precision,
  coords_approx boolean not null default true,
  summary_fr text, summary_en text,
  description_fr text, description_en text,
  access_fr text, access_en text,
  image_url text,
  image_credit text,
  image_source text,
  sources text[] not null default '{}',
  status text not null default 'a_verifier' check (status in ('a_verifier','verifie')),
  limited boolean not null default false,
  featured boolean not null default false,
  published boolean not null default true,
  sort integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Colonnes ajoutées après la première version (sans effet si elles existent déjà)
alter table public.sites add column if not exists image_credit text;
alter table public.sites add column if not exists image_source text;
alter table public.sites add column if not exists limited boolean not null default false;

-- Pistes d'investissement
create table if not exists public.opportunities (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  sector text,
  title_fr text not null,
  title_en text,
  location text,
  summary_fr text, summary_en text,
  sources text[] not null default '{}',
  status text not null default 'a_valider' check (status in ('a_valider','validee')),
  published boolean not null default true,
  sort integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Messages du formulaire de contact
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 160),
  organization text check (organization is null or char_length(organization) <= 160),
  subject text not null default 'autre' check (subject in ('partenariat','investissement','contenu','autre')),
  message text not null check (char_length(message) between 1 and 4000),
  created_at timestamptz not null default now()
);

-- updated_at automatique
create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;
drop trigger if exists sites_touch on public.sites;
create trigger sites_touch before update on public.sites for each row execute function public.touch_updated_at();
drop trigger if exists opps_touch on public.opportunities;
create trigger opps_touch before update on public.opportunities for each row execute function public.touch_updated_at();

-- Sécurité (RLS)
alter table public.admins enable row level security;
alter table public.sites enable row level security;
alter table public.opportunities enable row level security;
alter table public.messages enable row level security;

drop policy if exists "admins read self" on public.admins;
create policy "admins read self" on public.admins for select to authenticated using (user_id = auth.uid());

drop policy if exists "sites public read" on public.sites;
create policy "sites public read" on public.sites for select using (published or public.is_admin());
drop policy if exists "sites admin write" on public.sites;
create policy "sites admin write" on public.sites for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "opps public read" on public.opportunities;
create policy "opps public read" on public.opportunities for select using (published or public.is_admin());
drop policy if exists "opps admin write" on public.opportunities;
create policy "opps admin write" on public.opportunities for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "messages public insert" on public.messages;
create policy "messages public insert" on public.messages for insert to anon, authenticated with check (true);
drop policy if exists "messages admin read" on public.messages;
create policy "messages admin read" on public.messages for select to authenticated using (public.is_admin());
drop policy if exists "messages admin delete" on public.messages;
create policy "messages admin delete" on public.messages for delete to authenticated using (public.is_admin());

-- Stockage des photos (bucket public "media", écriture réservée aux admins)
insert into storage.buckets (id, name, public) values ('media', 'media', true)
on conflict (id) do update set public = true;

drop policy if exists "media admin insert" on storage.objects;
create policy "media admin insert" on storage.objects for insert to authenticated
  with check (bucket_id = 'media' and public.is_admin());
drop policy if exists "media admin update" on storage.objects;
create policy "media admin update" on storage.objects for update to authenticated
  using (bucket_id = 'media' and public.is_admin());
drop policy if exists "media admin delete" on storage.objects;
create policy "media admin delete" on storage.objects for delete to authenticated
  using (bucket_id = 'media' and public.is_admin());


-- ===== Demandes publiques (formulaires du site) =====
create table if not exists public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  target_ref text, target_label text,
  name text not null check (char_length(name) between 1 and 120),
  phone text not null check (char_length(phone) between 3 and 40),
  email text check (email is null or char_length(email) <= 160),
  arrival date, departure date,
  people int check (people is null or people between 1 and 200),
  message text check (message is null or char_length(message) <= 3000),
  lang text, status text not null default 'nouvelle'
);
create table if not exists public.provider_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  business text not null check (char_length(business) between 1 and 160),
  kind text, town text, contact text,
  phone text not null check (char_length(phone) between 3 and 40),
  email text, description text check (description is null or char_length(description) <= 3000),
  website text, consent boolean not null default false,
  lang text, status text not null default 'a_verifier'
);
create table if not exists public.proposals (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  kind text not null check (kind in ('project','land','partner','local')),
  name text not null check (char_length(name) between 1 and 120),
  organization text, phone text not null check (char_length(phone) between 3 and 40),
  email text, location text, area text, has_documents boolean not null default false,
  message text not null check (char_length(message) between 1 and 4000),
  lang text, status text not null default 'a_examiner'
);
alter table public.booking_requests enable row level security;
alter table public.provider_applications enable row level security;
alter table public.proposals enable row level security;
do $$
declare t text;
begin
  foreach t in array array['booking_requests','provider_applications','proposals'] loop
    execute format('drop policy if exists "%1$s public insert" on public.%1$s', t);
    execute format('create policy "%1$s public insert" on public.%1$s for insert to anon, authenticated with check (true)', t);
    execute format('drop policy if exists "%1$s admin read" on public.%1$s', t);
    execute format('create policy "%1$s admin read" on public.%1$s for select to authenticated using (public.is_admin())', t);
    execute format('drop policy if exists "%1$s admin delete" on public.%1$s', t);
    execute format('create policy "%1$s admin delete" on public.%1$s for delete to authenticated using (public.is_admin())', t);
  end loop;
end $$;

-- ÉTAPE FINALE (après avoir créé votre compte dans Authentication > Users) :
-- insert into public.admins (user_id) select id from auth.users where email = 'VOTRE_EMAIL';
