# DolphinBoo — Monorepo Architecture & Scaffold

> Mobile-first creator community app where fans view posts, vote on future topics, and subscribe for more voting access and exclusive content.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Monorepo | Native workspaces (npm/pnpm) |
| Mobile | Expo React Native |
| Web/Admin | Next.js |
| Language | TypeScript (everywhere) |
| Database/Auth/Storage | Supabase |
| Auth method | Supabase Anonymous Auth |
| Subscriptions | RevenueCat |
| Ads | AdMob (free users only) |
| Styling | Tailwind CSS / NativeWind |

---

## Monorepo Structure

```
dolphinboo/
├── apps/
│   ├── mobile/          # Expo React Native app
│   ├── web/             # Next.js public web
│   └── admin/           # Next.js admin dashboard
├── packages/
│   ├── types/           # Shared TypeScript types
│   ├── lib/             # Supabase client helpers, utils
│   └── ui/              # Shared UI components
├── supabase/
│   ├── migrations/      # SQL migration files
│   └── functions/       # Supabase Edge Functions
├── ARCHITECTURE.md
├── REQUIREMENTS.md
├── FLOWS.md
├── DATABASE.md
├── ROADMAP.md
└── README.md
```

---

## Core Product Rules

### Free Users
- View free daily posts
- See ads (AdMob)
- Vote 1 time per week
- View limited/locked content previews

### Subscribers (DolphinBoo+)
- Vote 1 time per day
- View exclusive posts
- No ads
- Premium push notifications *(future)*

### Admin / Creator
- Create, edit, delete posts
- Mark posts as `free` or `exclusive`
- Create, open, and close voting topics
- View vote results
- Manage basic content

---

## Authentication

- No email/password required for MVP
- Use **Supabase Anonymous Auth**
- Store `user_id` from Supabase `auth.users`
- Enforce vote limits **server-side** (Edge Functions)
- Never trust client-side checks alone

---

## Revenue Model

| User | Monetization |
|---|---|
| Free | AdMob ads |
| Subscriber | $1.99/month — DolphinBoo+ |

- **RevenueCat** handles mobile subscription logic
- Backend stores `subscription_status` / `entitlement` on the `profiles` table
- RevenueCat webhook updates entitlement on the backend *(Phase 5)*
- Subscribers never see ads

---

## Database Tables

### `profiles`
| Column | Type | Notes |
|---|---|---|
| id | UUID | references `auth.users` |
| is_anonymous | boolean | |
| subscription_status | text | `free` \| `active` |
| entitlement | text | nullable |
| created_at | timestamp | |

### `posts`
| Column | Type | Notes |
|---|---|---|
| id | UUID | primary key |
| title | text | |
| body | text | |
| media_url | text | nullable |
| visibility | text | `free` \| `exclusive` |
| published | boolean | |
| created_at | timestamp | |

### `topics`
| Column | Type | Notes |
|---|---|---|
| id | UUID | primary key |
| title | text | |
| description | text | nullable |
| status | text | `active` \| `closed` |
| created_at | timestamp | |

### `votes`
| Column | Type | Notes |
|---|---|---|
| id | UUID | primary key |
| user_id | UUID | references `auth.users` |
| topic_id | UUID | references `topics` |
| created_at | timestamp | |

### `admin_users`
| Column | Type | Notes |
|---|---|---|
| id | UUID | references `auth.users` |
| role | text | |

---

## Voting Rules

| User Type | Vote Frequency |
|---|---|
| Free | 1 vote per 7 days |
| Subscriber | 1 vote per 24 hours |

**Backend must validate:**
1. User exists
2. Topic is `active`
3. User has not exceeded their allowed voting window

**Error codes returned:**
- `VOTE_LIMIT_REACHED`
- `TOPIC_CLOSED`
- `UNAUTHORIZED`

---

## Mobile Screens

### 1. Home Feed
- Shows free posts
- Shows exclusive posts with locked preview for free users
- Shows ads for free users

### 2. Vote Screen
- Lists active topics
- Shows user voting status
- Allows vote if eligible
- Shows upgrade CTA if vote limit reached

### 3. Exclusive Screen
- Subscribers see full content
- Free users see locked previews and upgrade CTA

### 4. Settings Screen
- Subscription status
- Restore purchases
- Basic app info

---

## Admin Dashboard

### Pages
1. **Login** — Admin authentication
2. **Posts Management**
   - Create / edit / delete posts
   - Upload media
   - Set visibility (`free` / `exclusive`)
3. **Topics Management**
   - Create / edit / close topics
   - View vote counts per topic
4. **Basic Analytics**
   - Total votes
   - Active topics
   - Subscriber count *(placeholder)*

---

## Documents to Generate

| File | Contents |
|---|---|
| `REQUIREMENTS.md` | Product overview, MVP scope, user roles, functional/non-functional requirements, monetization rules, security requirements, out-of-scope items |
| `FLOWS.md` | Free user flow, subscriber flow, voting flow, locked content flow, admin posting flow, admin topic creation flow, subscription upgrade flow |
| `DATABASE.md` | Tables, relationships, RLS policy plan, indexes, vote-limit enforcement approach |
| `ROADMAP.md` | Phased implementation plan (Phases 1–6) |

---

## Implementation Phases (Roadmap Summary)

| Phase | Focus |
|---|---|
| 1 | Scaffold monorepo |
| 2 | Supabase schema + anonymous auth |
| 3 | Mobile app MVP |
| 4 | Admin dashboard |
| 5 | RevenueCat + AdMob integration |
| 6 | Polish + launch |

---

## Implementation Guidelines

- **TypeScript** everywhere, no exceptions
- Shared types live in `packages/types`
- Supabase client helpers live in `packages/lib`
- **Never hardcode secrets** — use environment variables (`.env.local`, Supabase secrets)
- Keep code clean, modular, and readable
- Add `// TODO:` comments wherever RevenueCat, AdMob, or push notification credentials are needed
- README must include full setup instructions

---

## MVP Priority Order

1. Anonymous auth (Supabase)
2. Posts — free and exclusive visibility
3. Voting — with server-side rate limiting
4. Admin — post and topic management
5. Subscription gating (RevenueCat)
6. Ads for free users (AdMob)

> Keep it simple, scalable, and shippable. Do not over-engineer the MVP.
