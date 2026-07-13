import Link from 'next/link';
import s from './privacy.module.css';

export default function PrivacyPage() {
  return (
    <main className={s.page}>
      <section className={s.card}>
        <h1 className={s.title}>Privacy Policy</h1>
        <p className={s.updated}>Last updated: July 13, 2026</p>

        <p>
          DolphinBoo Links is a links-only page. We do not collect personal data, do not run analytics,
          do not use advertising trackers, and do not use login or account systems on this page.
        </p>

        <h2>What We Collect</h2>
        <p>We do not intentionally collect personal information through this website.</p>

        <h2>Cookies and Tracking</h2>
        <p>We do not use cookies for analytics, advertising, or profiling on this website.</p>

        <h2>Third-Party Links</h2>
        <p>
          This site links to third-party platforms (for example YouTube, Facebook, Instagram, and TikTok).
          When you leave this site, those services handle data according to their own privacy policies.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          If this site ever starts collecting data or using analytics/cookies, this policy will be updated.
        </p>

        <p className={s.backLinkWrap}>
          <Link href="/" className={s.backLink}>Back to links</Link>
        </p>
      </section>
    </main>
  );
}
