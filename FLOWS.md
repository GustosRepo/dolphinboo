# DolphinBoo — User Flows

---

## 1. Free User Flow

```
App Launch
  └─► signInAnonymously() called in RootLayout
        └─► Supabase creates auth.users row
              └─► DB trigger creates profiles row (is_anonymous=true, subscription_status='free')
                    └─► Home Feed loads
                          ├─► Free posts visible
                          ├─► Exclusive posts show locked preview + upgrade CTA
                          └─► AdBanner rendered at bottom of feed
```

---

## 2. Subscriber Flow

```
User opens Settings
  └─► Taps "Upgrade to DolphinBoo+ · $1.99/mo"
        └─► RevenueCat paywall presented [Phase 5]
              └─► Purchase completed
                    └─► RevenueCat webhook → Supabase Edge Function
                          └─► profiles.subscription_status updated to 'active'
                                ├─► Exclusive tab unlocks — all exclusive posts visible
                                ├─► AdBanner no longer rendered
                                └─► Vote frequency increases to 1/day
```

---

## 3. Voting Flow

### 3a. Eligible Vote
```
User opens Vote tab
  └─► getActiveTopics() fetches active topics
        └─► User taps "Vote" on a topic
              └─► POST /functions/v1/cast-vote  { topic_id }
                    ├─► Edge function verifies JWT
                    ├─► Checks topic.status === 'active'
                    ├─► Loads profile.subscription_status
                    ├─► Calculates vote window (7d free / 24h subscriber)
                    ├─► Queries recent votes — none found in window
                    ├─► Inserts vote row
                    └─► Returns { success: true }
                          └─► Alert "Voted!" shown, vote count incremented in UI
```

### 3b. Vote Limit Reached
```
User taps "Vote"
  └─► Edge function finds recent vote within window
        └─► Returns { success: false, error: 'VOTE_LIMIT_REACHED', next_eligible_at }
              └─► Alert shown: "You can vote again on [date]. Upgrade to vote daily."
```

### 3c. Topic Closed
```
User taps "Vote"
  └─► Edge function finds topic.status === 'closed'
        └─► Returns { success: false, error: 'TOPIC_CLOSED' }
              └─► Alert shown: "This topic is no longer accepting votes."
```

---

## 4. Locked Content Flow

```
Free user opens Exclusive tab
  └─► useProfile() returns subscription_status = 'free'
        └─► LockedContent component rendered
              ├─► Lock icon displayed
              ├─► "Unlock DolphinBoo+" headline shown
              └─► Taps "DolphinBoo+ · $1.99/month"
                    └─► RevenueCat paywall presented [Phase 5]
```

---

## 5. Admin — Create Post Flow

```
Admin opens Posts page (/posts)
  └─► Fills in title, body, visibility (free | exclusive), published toggle
        └─► Submits form
              └─► supabase.from('posts').insert(form)
                    └─► Row created in posts table
                          └─► Post list refreshes
                                └─► New post appears with correct visibility badge
```

---

## 6. Admin — Create and Close Topic Flow

```
Admin opens Topics page (/topics)

  CREATE:
  └─► Fills in title + optional description
        └─► Submits form
              └─► supabase.from('topics').insert({ ...form, status: 'active' })
                    └─► Topic appears in list as "active"
                          └─► Mobile Vote tab now shows new topic

  CLOSE:
  └─► Admin clicks "Close" on an active topic
        └─► supabase.from('topics').update({ status: 'closed' })
              └─► Topic badge changes to "closed"
                    └─► Mobile vote requests return TOPIC_CLOSED error
```

---

## 7. Subscription Upgrade Flow (Full)

```
Entry points:
  A. Settings screen → "Upgrade" button
  B. Exclusive tab → LockedContent → "DolphinBoo+" button
  C. Vote screen → rate limit alert CTA

  └─► RevenueCat paywall displayed [Phase 5]
        ├─► User cancels → back to current screen
        └─► User completes purchase
              └─► RevenueCat sends webhook to Supabase function [Phase 5]
                    └─► Function updates profiles.subscription_status = 'active'
                          └─► useProfile() re-fetches → UI unlocks subscriber features
                                ├─► Exclusive content visible
                                ├─► Ads hidden
                                └─► Vote window reduced to 24 hours
```
