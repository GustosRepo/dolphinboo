-- ============================================================
-- DolphinBoo — Initial Schema
-- Migration: 001_initial_schema.sql
-- ============================================================

-- Extensions
create extension if not exists "uuid-ossp";

-- ────────────────────────────────────────────────────────────
-- profiles
-- Auto-populated via trigger on auth.users insert
-- ────────────────────────────────────────────────────────────
create table public.profiles (
  id                  uuid references auth.users(id) on delete cascade primary key,
  is_anonymous        boolean       not null default true,
  subscription_status text          not null default 'free'
                        check (subscription_status in ('free', 'active')),
  entitlement         text,
  created_at          timestamptz   not null default now()
);

-- ────────────────────────────────────────────────────────────
-- posts
-- ────────────────────────────────────────────────────────────
create table public.posts (
  id         uuid          default uuid_generate_v4() primary key,
  title      text          not null,
  body       text          not null,
  media_url  text,
  visibility text          not null default 'free'
               check (visibility in ('free', 'exclusive')),
  published  boolean       not null default false,
  created_at timestamptz   not null default now()
);

-- ────────────────────────────────────────────────────────────
-- topics
-- ────────────────────────────────────────────────────────────
create table public.topics (
  id          uuid        default uuid_generate_v4() primary key,
  title       text        not null,
  description text,
  status      text        not null default 'active'
                check (status in ('active', 'closed')),
  created_at  timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────
-- votes
-- Inserts handled exclusively via the cast-vote edge function
-- ────────────────────────────────────────────────────────────
create table public.votes (
  id         uuid        default uuid_generate_v4() primary key,
  user_id    uuid        references auth.users(id) on delete cascade not null,
  topic_id   uuid        references public.topics(id) on delete cascade not null,
  created_at timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────
-- admin_users
-- ────────────────────────────────────────────────────────────
create table public.admin_users (
  id   uuid references auth.users(id) on delete cascade primary key,
  role text not null default 'admin'
);

-- ────────────────────────────────────────────────────────────
-- Indexes
-- ────────────────────────────────────────────────────────────
create index votes_user_id_idx     on public.votes(user_id);
create index votes_topic_id_idx    on public.votes(topic_id);
create index votes_created_at_idx  on public.votes(created_at);
create index posts_visibility_idx  on public.posts(visibility);
create index posts_published_idx   on public.posts(published);
create index topics_status_idx     on public.topics(status);

-- ────────────────────────────────────────────────────────────
-- Row Level Security
-- ────────────────────────────────────────────────────────────
alter table public.profiles    enable row level security;
alter table public.posts       enable row level security;
alter table public.topics      enable row level security;
alter table public.votes       enable row level security;
alter table public.admin_users enable row level security;

-- profiles: users can read and update only their own row
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- posts: free published posts are public
create policy "Anyone can view free published posts"
  on public.posts for select
  using (published = true and visibility = 'free');

-- posts: exclusive posts require active subscription
create policy "Subscribers can view exclusive posts"
  on public.posts for select
  using (
    published = true
    and visibility = 'exclusive'
    and exists (
      select 1 from public.profiles
      where id = auth.uid()
        and subscription_status = 'active'
    )
  );

-- posts: admins can do everything
create policy "Admins can manage posts"
  on public.posts for all
  using (exists (select 1 from public.admin_users where id = auth.uid()));

-- topics: anyone can view active topics
create policy "Anyone can view active topics"
  on public.topics for select
  using (status = 'active');

create policy "Admins can manage topics"
  on public.topics for all
  using (exists (select 1 from public.admin_users where id = auth.uid()));

-- votes: users can only see their own votes; inserts go through edge function
create policy "Users can view own votes"
  on public.votes for select
  using (auth.uid() = user_id);

-- admin_users: only admins can read the table
create policy "Admins can view admin_users"
  on public.admin_users for select
  using (exists (select 1 from public.admin_users where id = auth.uid()));

-- ────────────────────────────────────────────────────────────
-- Trigger: auto-create profile on new user sign-up
-- ────────────────────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, is_anonymous)
  values (
    new.id,
    coalesce((new.raw_user_meta_data->>'is_anonymous')::boolean, true)
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
