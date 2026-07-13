"use client";

import s from './page.module.css';

type SocialDetailKey = 'youtube' | 'facebook' | 'instagram' | 'tiktok';

const copy = {
  en: {
    badge: 'Official links',
    title: 'DolphinBoo everywhere.',
    subtitle: 'Official social links from DolphinBoo.',
    socialLabel: 'Social media',
    socialEyebrow: 'Social',
    footerRights: 'All rights reserved.',
    footerMadeBy: 'Made by',
    socialDetails: {
      youtube: 'Watch the latest DolphinBoo videos',
      facebook: 'Follow updates and community posts',
      instagram: 'See photos, reels, and behind-the-scenes drops',
      tiktok: 'Catch short clips and trending moments',
    },
  },
  th: {
    badge: 'ลิงก์ทางการ',
    title: 'ติดตาม DolphinBoo ได้ทุกที่',
    subtitle: 'รวมโซเชียลทางการของ DolphinBoo ไว้ที่นี่',
    socialLabel: 'โซเชียลมีเดีย',
    socialEyebrow: 'โซเชียล',
    footerRights: 'สงวนลิขสิทธิ์',
    footerMadeBy: 'สร้างโดย',
    socialDetails: {
      youtube: 'ไปดูคลิปใหม่ล่าสุดของ DolphinBoo',
      facebook: 'อัปเดตข่าวสารและโพสต์ต่าง ๆ ได้ที่นี่',
      instagram: 'รวมรูป รีล และโมเมนต์เบื้องหลัง',
      tiktok: 'ดูคลิปสั้นสนุก ๆ และช่วงไวรัลล่าสุด',
    },
  },
} as const;

const socialLinks: Array<{
  href: string;
  title: string;
  detailKey: SocialDetailKey;
}> = [
  {
    href: 'https://www.youtube.com/@Dolphinboo',
    title: 'YouTube',
    detailKey: 'youtube',
  },
  {
    href: 'https://www.facebook.com/share/1EPdU89SY7/?mibextid=wwXIfr',
    title: 'Facebook',
    detailKey: 'facebook',
  },
  {
    href: 'https://www.instagram.com/merxleah',
    title: 'Instagram',
    detailKey: 'instagram',
  },
  {
    href: 'https://www.tiktok.com/@dolphinboox',
    title: 'TikTok',
    detailKey: 'tiktok',
  },
];

export default function HomePage() {
  const text = copy.en;

  return (
    <main className={s.pageShell}>
      <div className={s.backdropTop} />
      <div className={s.backdropBottom} />
      <div className={s.backdropGrid} />
      <div className={s.cosmicLayer} aria-hidden="true">
        <span className={`${s.star} ${s.starOne}`}>✨</span>
        <span className={`${s.star} ${s.starTwo}`}>⭐</span>
        <span className={`${s.star} ${s.starThree}`}>🌟</span>
        <span className={`${s.star} ${s.starFour}`}>✨</span>
        <span className={`${s.star} ${s.starFive}`}>⭐</span>
        <span className={`${s.star} ${s.starSix}`}>🌟</span>

        <span className={`${s.ship} ${s.shipOne}`}>🛸</span>
        <span className={`${s.ship} ${s.shipTwo}`}>👽</span>
        <span className={`${s.ship} ${s.shipThree}`}>🛸</span>

        <span className={`${s.pyramid} ${s.pyramidOne}`}>🔺</span>
        <span className={`${s.pyramid} ${s.pyramidTwo}`}>🔺</span>
        <span className={`${s.pyramid} ${s.pyramidThree}`}>🔺</span>
      </div>

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
            <span className={s.metaPill}>{text.badge}</span>
          </div>
          <h1 className={s.title}>{text.title}</h1>
          <p className={s.subtitle}>{text.subtitle}</p>
        </div>

        <div className={s.linksGroup}>
          <p className={s.groupLabel}>{text.socialLabel}</p>
          <div className={s.linksList}>
            {socialLinks.map((link) => (
              <a key={link.title} href={link.href} className={s.linkButton} target="_blank" rel="noreferrer">
                <span className={s.linkCopy}>
                  <span className={s.linkEyebrow}>{text.socialEyebrow}</span>
                  <span className={s.linkTitle}>{link.title}</span>
                  <span className={s.linkDetail}>{text.socialDetails[link.detailKey]}</span>
                </span>
                <span className={s.linkArrow} aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>

      </section>

      <footer className={s.footer}>
        <p>© {new Date().getFullYear()} DolphinBoo. {text.footerRights}</p>
        <p>
          <a href="/privacy">Privacy</a>
        </p>
        <p>
          {text.footerMadeBy} <a href="https://www.code-werx.com/" target="_blank" rel="noreferrer">Code Werx</a> ❤️
        </p>
      </footer>
    </main>
  );
}
