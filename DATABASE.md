# DolphinBoo — Database Plan

---

## 1. Tables

### `profiles`
Extends `auth.users`. Created automatically via trigger on new user sign-up.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | uuid | PK, FK → auth.users | |
| is_anonymous | boolean | NOT NULL, default true | Set from auth metadata |
| subscription_status | text | NOT NULL, default 'free', check in ('free','active') | Updated by RevenueCat webhook |
| entitlement | text | nullable | RevenueCat entitlement string |
| created_at | timestamptz | NOT NULL, default now() | |

### `posts`
Creator-managed content, visible to users based on `visibility` and `published`.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | uuid | PK, default uuid_generate_v4() | |
| title | text | NOT NULL | |
| body | text | NOT NULL | |
| media_url | text | nullable | URL to Supabase Storage asset |
| visibility | text | NOT NULL, check in ('free','exclusive') | |
| published | boolean | NOT NULL, default false | Draft until published |
| created_at | timestamptz | NOT NULL, default now() | |

### `topics`
Voting topics created and managed by the admin.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | uuid | PK, default uuid_generate_v4() | |
| title | text | NOT NULL | |
| description | text | nullable | |
| status | text | NOT NULL, check in ('active','closed') | |
| created_at | timestamptz | NOT NULL, default now() | |

### `votes`
One row per vote cast. Inserts handled only through the `cast-vote` edge function.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | uuid | PK, default uuid_generate_v4() | |
| user_id | uuid | NOT NULL, FK → auth.users | |
| topic_id | uuid | NOT NULL, FK → topics | |
| created_at | timestamptz | NOT NULL, default now() | Used for rate-limit window calculation |

### `admin_users`
Controls admin dashboard access. Must be manually populated for each admin.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | uuid | PK, FK → auth.users | |
| role | text | NOT NULL, default 'admin' | Reserved for future role expansion |

---

## 2. Relationships

```
auth.users (1) ──── (1) profiles
auth.users (1) ──── (0..1) admin_users
auth.users (1) ──── (*) votes
topics     (1) ──── (*) votes
```

---

## 3. RLS Policy Plan

| Table | Operation | Policy |
|---|---|---|
| profiles | SELECT | `auth.uid() = id` |
| profiles | UPDATE | `auth.uid() = id` |
| posts | SELECT | Free published: public. Exclusive published: subscription_status = 'active'. |
| posts | ALL | User is in admin_users |
| topics | SELECT | status = 'active' (public) |
| topics | ALL | User is in admin_users |
| votes | SELECT | `auth.uid() = user_id` |
| votes | INSERT | Via edge function only (service role or JWT-verified) |
| admin_users | SELECT | User is in admin_users |

> All tables have RLS enabled. No policy = no access by default.

---

## 4. Indexes

| Table | Column(s) | Reason |
|---|---|---|
| votes | user_id | Rate-limit lookup per user |
| votes | topic_id | Count votes per topic |
| votes | created_at | Window query (`gte created_at`) |
| posts | visibility | Filter free vs exclusive |
| posts | published | Filter published posts |
| topics | status | Filter active topics |

---

## 5. Vote-Limit Enforcement Approach

Vote limiting is enforced entirely in the `cast-vote` Supabase Edge Function.  
Client-side checks are purely cosmetic (show/hide CTA, update button state).

### Algorithm (inside edge function)

```
1. Verify JWT → get user.id
2. Fetch topic → assert status = 'active'
3. Fetch profiles WHERE id = user.id → get subscription_status
4. Compute windowMs:
     subscriber → 24 * 60 * 60 * 1000 ms (24h)
     free       →  7 * 24 * 60 * 60 * 1000 ms (7d)
5. windowStart = now() - windowMs
6. Query votes WHERE user_id = user.id AND created_at >= windowStart LIMIT 1
7. If row found:
     next_eligible_at = row.created_at + windowMs
     return { success: false, error: 'VOTE_LIMIT_REACHED', next_eligible_at }
8. If no row:
     INSERT into votes { user_id, topic_id }
     return { success: true }
```

### Error codes

| Code | HTTP Status | Meaning |
|---|---|---|
| `UNAUTHORIZED` | 401 | Missing or invalid JWT |
| `TOPIC_NOT_FOUND` | 404 | No topic with given ID |
| `TOPIC_CLOSED` | 403 | Topic status is not 'active' |
| `VOTE_LIMIT_REACHED` | 429 | User voted within the allowed window |
| `VOTE_FAILED` | 500 | DB insert error |
| `SERVER_ERROR` | 500 | Unexpected exception |

---

## 6. Notes on Subscription Updates

When a user subscribes via RevenueCat (Phase 5), a webhook will call a Supabase Edge Function that updates `profiles.subscription_status = 'active'` and optionally sets `entitlement`. The mobile app relies on the live `profiles` row — no local state is persisted beyond the session.
