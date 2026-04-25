# DolphinBoo — Implementation Roadmap

---

## Phase 1 — Scaffold Monorepo ✅
**Goal:** Establish project structure, shared types, and Supabase client helpers.

- [x] Root `package.json` with npm workspaces (`apps/*`, `packages/*`)
- [x] Base `tsconfig.base.json`
- [x] `.gitignore`, `.env.example`
- [x] `packages/types` — all shared TypeScript interfaces and types
- [x] `packages/lib` — Supabase client, `auth.ts`, `posts.ts`, `topics.ts`
- [x] `packages/ui` — shared copy/constants shell
- [x] `apps/mobile` — Expo Router scaffold (4 tabs + hooks + components)
- [x] `apps/admin` — Next.js App Router dashboard (posts, topics, analytics)
- [x] `apps/web` — Next.js coming-soon page
- [x] `supabase/migrations/001_initial_schema.sql`
- [x] `supabase/functions/cast-vote/index.ts`
- [x] `supabase/config.toml`
- [x] `REQUIREMENTS.md`, `FLOWS.md`, `DATABASE.md`, `ROADMAP.md`

---

## Phase 2 — Supabase Schema + Auth
**Goal:** Live database, working anonymous auth, profile creation.

- [ ] Create Supabase project at https://supabase.com
- [ ] Run `supabase/migrations/001_initial_schema.sql` against the project
- [ ] Verify `on_auth_user_created` trigger creates profiles correctly
- [ ] Copy Supabase URL + anon key into `.env.local` files
- [ ] Test anonymous sign-in end-to-end in the mobile app
- [ ] Manually insert a row into `admin_users` for the creator account
- [ ] Verify RLS policies block unauthenticated access to exclusive posts

---

## Phase 3 — Mobile App MVP
**Goal:** Working home feed, vote screen, and exclusive/locked screen.

- [ ] Run `npm install` in monorepo root
- [ ] Confirm Expo app boots: `npm run mobile`
- [ ] Home feed loads free posts from Supabase
- [ ] Exclusive tab shows locked CTA for free users
- [ ] Vote screen lists active topics and calls `cast-vote` edge function
- [ ] Rate-limit errors display correct messages and `next_eligible_at`
- [ ] Settings screen shows subscription status (free / active)
- [ ] Test on iOS simulator and Android emulator

---

## Phase 4 — Admin Dashboard
**Goal:** Creator can manage all content from the web dashboard.

- [ ] Run admin app: `npm run admin`
- [ ] Admin can create, publish, and delete posts
- [ ] Admin can toggle post visibility (free / exclusive)
- [ ] Admin can create, close, and reopen topics
- [ ] Vote counts display correctly on topics list
- [ ] Analytics page shows real numbers from Supabase
- [ ] Basic auth guard: redirect to login if not in `admin_users`

---

## Phase 5 — RevenueCat + AdMob
**Goal:** Real subscription purchases and ads for free users.

### RevenueCat
- [ ] Create RevenueCat account and project
- [ ] Add iOS and Android apps in RevenueCat dashboard
- [ ] Create `dolphinboo_plus_monthly` product in App Store Connect and Play Console
- [ ] Create `premium` entitlement in RevenueCat
- [ ] Install `react-native-purchases`: `npx expo install react-native-purchases`
- [ ] Configure API keys in `.env` (`EXPO_PUBLIC_REVENUECAT_API_KEY_IOS`, `_ANDROID`)
- [ ] Initialize RevenueCat in `app/_layout.tsx`
- [ ] Wire Settings screen "Upgrade" button to RevenueCat paywall
- [ ] Wire Settings screen "Restore Purchases" to `Purchases.restorePurchases()`
- [ ] Build Supabase Edge Function to receive RevenueCat webhooks
- [ ] Webhook updates `profiles.subscription_status` on purchase/renewal/cancellation
- [ ] Test full purchase flow in sandbox environment

### AdMob
- [ ] Create AdMob account and app entries (iOS + Android)
- [ ] Install `react-native-google-mobile-ads`
- [ ] Add app IDs to `app.json` plugins
- [ ] Replace `AdBanner` placeholder with real `BannerAd` component
- [ ] Use test ad unit IDs during development
- [ ] Verify ads hide for subscribers

---

## Phase 6 — Polish + Launch
**Goal:** App Store / Play Store submission ready.

- [ ] Add real app icon and splash screen assets
- [ ] Set final bundle identifiers (`com.dolphinboo.app`)
- [ ] Configure Expo EAS Build (`eas.json`)
- [ ] Run `eas build --platform all` and test on real devices
- [ ] Submit to TestFlight and Google Play Internal Testing
- [ ] Update `apps/web` landing page with App Store / Play Store links
- [ ] Write App Store description and select screenshots
- [ ] Submit for App Store and Play Store review
- [ ] Post-launch: monitor Supabase logs and RevenueCat dashboard

---

## Upcoming / Post-MVP
- Push notifications for subscribers (Expo Notifications + Supabase webhooks)
- Media upload in admin (Supabase Storage integration)
- Annual subscription option
- Post comments or fan reactions
- Creator analytics dashboard (vote trends over time)
