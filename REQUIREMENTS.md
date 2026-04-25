# DolphinBoo — Requirements

## 1. Product Overview

DolphinBoo is a mobile-first creator community app where fans can view posts, vote on future content topics, and subscribe for enhanced access and exclusive content. The creator controls all content from an admin dashboard.

---

## 2. MVP Scope

The MVP focuses on four core capabilities:

1. **Anonymous auth** — frictionless onboarding, no sign-up required
2. **Posts** — free and exclusive content, gated by subscription
3. **Voting** — fans vote on future topics; rate-limited server-side
4. **Admin** — creator manages posts, topics, and views basic stats

---

## 3. User Roles

| Role | Description |
|---|---|
| Anonymous (free) | Signed in automatically via Supabase anonymous auth |
| Subscriber | Paid DolphinBoo+ member via RevenueCat |
| Admin / Creator | Full content and topic management |

---

## 4. Functional Requirements

### 4.1 Authentication
- FR-01: App must sign users in anonymously on first launch using Supabase Anonymous Auth.
- FR-02: A `profiles` row must be created automatically via DB trigger on user creation.
- FR-03: No email, password, or social login is required for MVP.

### 4.2 Posts
- FR-04: Free users can view all posts with `visibility = 'free'` and `published = true`.
- FR-05: Free users see a locked preview for `visibility = 'exclusive'` posts with an upgrade CTA.
- FR-06: Subscribers can view all published posts regardless of visibility.
- FR-07: Admin can create, edit, delete, and toggle publish status on posts.
- FR-08: Admin can set post visibility to `free` or `exclusive`.

### 4.3 Voting
- FR-09: Any authenticated user can vote on an active topic.
- FR-10: Free users are limited to 1 vote every 7 days (across all topics).
- FR-11: Subscribers are limited to 1 vote every 24 hours (across all topics).
- FR-12: Vote limits must be enforced server-side via the `cast-vote` edge function.
- FR-13: The edge function must return structured errors: `VOTE_LIMIT_REACHED`, `TOPIC_CLOSED`, `UNAUTHORIZED`.
- FR-14: The mobile app must display the `next_eligible_at` date when the limit is reached.

### 4.4 Subscriptions
- FR-15: Subscription management is handled by RevenueCat on mobile.
- FR-16: The single subscription product is **DolphinBoo+** at $1.99/month.
- FR-17: On successful purchase, `profiles.subscription_status` must be updated to `'active'`.
- FR-18: Subscribers must not see ads.
- FR-19: Restore Purchases must be available in the Settings screen.

### 4.5 Ads
- FR-20: Free users must see an AdMob banner ad on the home feed.
- FR-21: Subscribers must not see any ads.

### 4.6 Admin Dashboard
- FR-22: Admin can log in (Supabase auth, admin_users table).
- FR-23: Admin can create/edit/delete posts with title, body, media URL, visibility, and published status.
- FR-24: Admin can create topics, open, and close them.
- FR-25: Admin can view total vote counts per topic.
- FR-26: Admin can view aggregate stats: total votes, active topics, subscriber count.

---

## 5. Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR-01 | Server-side vote enforcement — client checks are UI-only |
| NFR-02 | No secrets hardcoded — all credentials via environment variables |
| NFR-03 | TypeScript strict mode enabled across all packages and apps |
| NFR-04 | RLS policies enabled on all Supabase tables |
| NFR-05 | Mobile app must function on iOS and Android |
| NFR-06 | Admin dashboard must work on desktop browsers |
| NFR-07 | Shared types (`@dolphinboo/types`) must be the single source of truth for DB shapes |

---

## 6. Monetization Rules

| Rule | Detail |
|---|---|
| Price | $1.99/month |
| Product ID | `dolphinboo_plus_monthly` (set in RevenueCat + App/Play Store) |
| Entitlement | `premium` (configure in RevenueCat dashboard) |
| Ad network | Google AdMob |
| Ad visibility | Free users only |
| Subscription gating | Exclusive posts + daily votes + no ads |

---

## 7. Security Requirements

- SR-01: Vote rate-limiting enforced exclusively in the `cast-vote` Supabase Edge Function.
- SR-02: RLS policies prevent users from reading or writing other users' data.
- SR-03: The `admin_users` table controls admin access; only rows in this table grant admin privileges.
- SR-04: Service role key must never be exposed to the client or committed to source control.
- SR-05: All environment variables follow the `NEXT_PUBLIC_` / `EXPO_PUBLIC_` convention and are documented in `.env.example`.
- SR-06: The `cast-vote` function verifies the JWT (`verify_jwt = true` in `config.toml`).

---

## 8. Out of Scope (MVP)

- Push notifications
- Social login (Apple, Google)
- Comments or replies on posts
- Creator analytics beyond vote counts and subscriber count
- In-app media upload (admin MVP uses URL input)
- Web version of the fan-facing app (mobile-first)
- Annual subscription pricing
- Multi-creator / multi-tenant support
