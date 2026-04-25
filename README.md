# DolphinBoo

Mobile-first creator community app. Fans view posts, vote on future topics, and subscribe for exclusive content and daily voting.

---

## Monorepo Structure

```
dolphinboo/
├── apps/
│   ├── mobile/       # Expo React Native (iOS + Android)
│   ├── web/          # Next.js public landing page  (port 3002)
│   └── admin/        # Next.js creator dashboard    (port 3001)
├── packages/
│   ├── types/        # Shared TypeScript types
│   ├── lib/          # Supabase client + helpers
│   └── ui/           # Shared constants / copy
├── supabase/
│   ├── migrations/   # SQL schema
│   └── functions/    # Edge Functions (cast-vote)
└── docs/
    REQUIREMENTS.md · FLOWS.md · DATABASE.md · ROADMAP.md · ARCHITECTURE.md
```

---

## Prerequisites

| Tool | Version |
|---|---|
| Node.js | ≥ 18 |
| npm | ≥ 9 (workspaces support) |
| Expo CLI | `npm install -g expo-cli` |
| Supabase CLI | `brew install supabase/tap/supabase` |
| Xcode (iOS) | ≥ 15 |
| Android Studio | latest |

---

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/your-org/dolphinboo.git
cd dolphinboo
npm install
```

### 2. Configure environment variables

```bash
# Mobile app
cp apps/mobile/.env.example apps/mobile/.env

# Admin dashboard
cp apps/admin/.env.example apps/admin/.env.local

# Web (optional for now)
cp .env.example .env.local
```

Fill in your **Supabase URL** and **Anon Key** in each file.  
Find them at: https://supabase.com/dashboard → Project Settings → API

### 3. Set up Supabase

```bash
# Option A: Supabase cloud project (recommended)
# 1. Create project at https://supabase.com
# 2. Open the SQL editor and run:
#    supabase/migrations/001_initial_schema.sql

# Option B: Local Supabase (requires Docker)
supabase start
supabase db push
```

After the schema is applied, manually insert an admin user:

```sql
-- Run in Supabase SQL editor after creating your admin account
insert into public.admin_users (id, role)
values ('<your-auth-user-uuid>', 'admin');
```

### 4. Deploy the Edge Function

```bash
supabase functions deploy cast-vote
```

### 5. Run the apps

```bash
# Mobile
npm run mobile
# → scan QR code with Expo Go app

# Admin dashboard
npm run admin
# → open http://localhost:3001

# Web (optional)
npm run web
# → open http://localhost:3002
```

---

## Environment Variables Reference

### `apps/mobile/.env`

| Variable | Required | Description |
|---|---|---|
| `EXPO_PUBLIC_SUPABASE_URL` | ✅ | Supabase project URL |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anon (public) key |
| `EXPO_PUBLIC_REVENUECAT_API_KEY_IOS` | Phase 5 | RevenueCat iOS API key |
| `EXPO_PUBLIC_REVENUECAT_API_KEY_ANDROID` | Phase 5 | RevenueCat Android API key |

### `apps/admin/.env.local`

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anon (public) key |
| `SUPABASE_SERVICE_ROLE_KEY` | Phase 5 | Service role key (server only) |

---

## Key Integration TODOs

Search the codebase for `// TODO:` to find all pending integration points.

| Integration | File | Phase |
|---|---|---|
| RevenueCat paywall | `apps/mobile/app/(tabs)/settings.tsx` | 5 |
| RevenueCat restore | `apps/mobile/app/(tabs)/settings.tsx` | 5 |
| RevenueCat on LockedContent | `apps/mobile/src/components/LockedContent.tsx` | 5 |
| AdMob BannerAd | `apps/mobile/src/components/AdBanner.tsx` | 5 |
| RevenueCat webhook fn | `supabase/functions/` (new) | 5 |
| App Store links | `apps/web/src/app/page.tsx` | 6 |

---

## Useful Commands

```bash
# Type-check all packages
npm run type-check

# Deploy a Supabase Edge Function
supabase functions deploy cast-vote

# Tail Edge Function logs
supabase functions logs cast-vote --scroll

# Open Supabase local studio
supabase studio
```

---

## Docs

| File | Contents |
|---|---|
| [ARCHITECTURE.md](ARCHITECTURE.md) | Full tech stack + structure overview |
| [REQUIREMENTS.md](REQUIREMENTS.md) | MVP scope, user roles, functional + non-functional requirements |
| [FLOWS.md](FLOWS.md) | All user flows described step by step |
| [DATABASE.md](DATABASE.md) | Schema, RLS policies, indexes, vote-limit algorithm |
| [ROADMAP.md](ROADMAP.md) | Phased implementation checklist |
