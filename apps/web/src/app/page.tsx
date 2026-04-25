import s from './page.module.css';

const features = [
  {
    emoji: '🗳️',
    title: 'Vote on What Comes Next',
    body: 'Have a real say in future content. Every vote shapes what gets made.',
  },
  {
    emoji: '🔒',
    title: 'Exclusive Content',
    body: 'Subscribers unlock posts, behind-the-scenes moments, and early access.',
  },
  {
    emoji: '🚫',
    title: 'Ad-Free Experience',
    body: 'DolphinBoo+ members never see an ad. Clean, distraction-free browsing.',
  },
  {
    emoji: '⚡',
    title: 'Daily Voting Access',
    body: 'Free users vote once a week. Subscribers vote every single day.',
  },
];

const freePerks = [
  'View free daily posts',
  'Vote once per week',
  'Access to community',
];

const premiumPerks = [
  'Everything in Free',
  'Vote every day',
  'Exclusive members-only content',
  'Zero ads',
  'Support the creator directly',
];

export default function HomePage() {
  return (
    <div>

      {/* ── Nav ─────────────────────────────────────────────── */}
      <nav className={s.nav}>
        <div className={s.navInner}>
          <div className={s.navLogo}>
            <img src="/images/dolphineboomainlogo.png" alt="DolphinBoo" />
            <span>DolphinBoo</span>
          </div>
          <div className={s.navLinks}>
            <a href="#features" className={s.navLink}>Features</a>
            <a href="#pricing" className={s.navLink}>Pricing</a>
            <a href="#download" className={s.navCta}>Download</a>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className={s.hero}>
        <div className={s.heroInner}>
          <img src="/images/dolphineboomainlogo.png" alt="DolphinBoo logo" className={s.heroLogo} />
          <h1 className={s.heroTitle}>
            Your community,<br />
            <span>your content.</span>
          </h1>
          <p className={s.heroSub}>
            Vote on future posts, access exclusive content, and support your favorite creator — all in one app.
          </p>
          {/* TODO: Replace href="#" with real App Store / Play Store URLs */}
          <div id="download" className={s.heroBtns}>
            <a href="#" className={s.btnDark}>🍎 Download on the App Store</a>
            <a href="#" className={s.btnOutline}>▶ Get it on Google Play</a>
          </div>
          <img
            src="/images/dolphineboobanner.png"
            alt="DolphinBoo app"
            className={s.heroBanner}
          />
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────── */}
      <section id="features" className={s.features}>
        <div className={s.sectionInner}>
          <div className={s.sectionHead}>
            <h2 className={s.sectionTitle}>Built for real fans</h2>
            <p className={s.sectionSub}>
              DolphinBoo gives you more than just content — it gives you a voice.
            </p>
          </div>
          <div className={s.featureGrid}>
            {features.map((f) => (
              <div key={f.title} className={s.featureCard}>
                <div className={s.featureEmoji}>{f.emoji}</div>
                <h3 className={s.featureTitle}>{f.title}</h3>
                <p className={s.featureBody}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ─────────────────────────────────────────── */}
      <section id="pricing" className={s.pricing}>
        <div className={s.sectionInner}>
          <div className={s.sectionHead}>
            <h2 className={s.sectionTitle}>Simple pricing</h2>
            <p className={s.sectionSub}>Free forever, or go Plus for the full experience.</p>
          </div>
          <div className={s.pricingGrid}>

            {/* Free */}
            <div className={s.pricingCard}>
              <p className={s.pricingLabel}>Free</p>
              <p className={s.pricingPrice}>$0</p>
              <p className={s.pricingPeriod}>forever</p>
              <ul className={s.perkList}>
                {freePerks.map((p) => (
                  <li key={p} className={s.perkItem}>
                    <span className={s.perkCheck}>✓</span> {p}
                  </li>
                ))}
              </ul>
              <a href="#download" className={s.btnPricingFree}>Download Free</a>
            </div>

            {/* DolphinBoo+ */}
            <div className={s.pricingCardPremium}>
              <p className={`${s.pricingLabel} ${s.pricingLabelPremium}`}>DolphinBoo+</p>
              <p className={s.pricingPricePremium}>$1.99</p>
              <p className={s.pricingPeriodPremium}>per month</p>
              <ul className={s.perkList}>
                {premiumPerks.map((p) => (
                  <li key={p} className={s.perkItemPremium}>
                    <span className={s.perkStar}>✦</span> {p}
                  </li>
                ))}
              </ul>
              <a href="#download" className={s.btnPricingPremium}>Get DolphinBoo+</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────── */}
      <section className={s.cta}>
        <img src="/images/dolphineboomainlogo.png" alt="DolphinBoo" className={s.ctaLogo} />
        <h2 className={s.ctaTitle}>Ready to dive in?</h2>
        <p className={s.ctaSub}>No sign-up required. Open the app and you&apos;re in.</p>
        {/* TODO: Replace href="#" with real App Store / Play Store URLs */}
        <div className={s.ctaBtns}>
          <a href="#" className={s.btnCtaWhite}>🍎 App Store</a>
          <a href="#" className={s.btnCtaDark}>▶ Google Play</a>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className={s.footer}>
        <p className={s.footerText}>© {new Date().getFullYear()} DolphinBoo. All rights reserved.</p>
      </footer>

    </div>
  );
}
