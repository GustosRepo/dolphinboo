import s from './page.module.css';

const socialLinks = [
  {
    href: 'https://www.youtube.com/@Dolphinboo',
    eyebrow: 'Social',
    title: 'YouTube',
    detail: 'Watch the latest DolphinBoo videos',
  },
  {
    href: 'https://www.facebook.com/share/1EPdU89SY7/?mibextid=wwXIfr',
    eyebrow: 'Social',
    title: 'Facebook',
    detail: 'Follow updates and community posts',
  },
  {
    href: 'https://www.instagram.com/merxleah',
    eyebrow: 'Social',
    title: 'Instagram',
    detail: 'See photos, reels, and behind-the-scenes drops',
  },
  {
    href: 'https://www.tiktok.com/@dolphinboox',
    eyebrow: 'Social',
    title: 'TikTok',
    detail: 'Catch short clips and trending moments',
  },
];

const comingSoonLinks = [
  {
    href: '#',
    eyebrow: 'Coming soon',
    title: 'Merch',
    detail: 'DolphinBoo gear and creator favorites are on the way',
  },
  {
    href: '#',
    eyebrow: 'Coming soon',
    title: 'App access',
    detail: 'Downloads, community voting, and free daily posts',
  },
  {
    href: '#',
    eyebrow: 'Coming soon',
    title: 'DolphinBoo+',
    detail: 'Exclusive content, daily voting, and ad-free perks',
  },
];

export default function HomePage() {
  return (
    <main className={s.pageShell}>
      <div className={s.backdropTop} />
      <div className={s.backdropBottom} />
      <div className={s.backdropGrid} />

      <section className={s.linktreeCard}>
        <div className={s.heroFrame}>
          <img
            src="/images/dolphineboobanner.png"
            alt="DolphinBoo hero"
            className={s.heroImage}
          />
        </div>

        <div className={s.profileBlock}>
          <div className={s.metaRow}>
            <span className={s.metaPill}>Official links</span>
          </div>
          <h1 className={s.title}>Find DolphinBoo everywhere.</h1>
          <p className={s.subtitle}>
            Official social links now, with merch and more coming soon.
          </p>
        </div>

        <div className={s.linksGroup}>
          <p className={s.groupLabel}>Social media</p>
          <div className={s.linksList}>
            {socialLinks.map((link) => (
              <a key={link.title} href={link.href} className={s.linkButton} target="_blank" rel="noreferrer">
                <span className={s.linkCopy}>
                  <span className={s.linkEyebrow}>{link.eyebrow}</span>
                  <span className={s.linkTitle}>{link.title}</span>
                  <span className={s.linkDetail}>{link.detail}</span>
                </span>
                <span className={s.linkArrow} aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>

        <div className={s.linksGroup}>
          <p className={s.groupLabel}>Coming soon</p>
          <div className={s.linksList}>
            {comingSoonLinks.map((link) => (
              <div key={link.title} className={`${s.linkButton} ${s.linkButtonMuted}`}>
                <span className={s.linkCopy}>
                  <span className={s.linkEyebrow}>{link.eyebrow}</span>
                  <span className={s.linkTitle}>{link.title}</span>
                  <span className={s.linkDetail}>{link.detail}</span>
                </span>
                <span className={s.linkArrow} aria-hidden="true">•</span>
              </div>
            ))}
          </div>
        </div>

      </section>

      <footer className={s.footer}>
        <p>© {new Date().getFullYear()} DolphinBoo. All rights reserved.</p>
        <p>
          Made by <a href="https://www.code-werx.com/" target="_blank" rel="noreferrer">Code Werx</a> ❤️
        </p>
      </footer>
    </main>
  );
}
