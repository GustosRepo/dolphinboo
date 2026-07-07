"use client";

import { useState } from 'react';
import s from './page.module.css';

type Locale = 'en' | 'th';
type SocialDetailKey = 'youtube' | 'facebook' | 'instagram' | 'tiktok';
type ComingSoonDetailKey = 'merch' | 'app' | 'plus';

const copy = {
  en: {
    badge: 'Official links',
    title: 'Find DolphinBoo everywhere.',
    subtitle: 'Official social links now, with merch and more coming soon.',
    socialLabel: 'Social media',
    comingSoonLabel: 'Coming soon',
    socialEyebrow: 'Social',
    comingSoonEyebrow: 'Coming soon',
    footerRights: 'All rights reserved.',
    footerMadeBy: 'Made by',
    socialDetails: {
      youtube: 'Watch the latest DolphinBoo videos',
      facebook: 'Follow updates and community posts',
      instagram: 'See photos, reels, and behind-the-scenes drops',
      tiktok: 'Catch short clips and trending moments',
    },
    comingSoonDetails: {
      merch: 'DolphinBoo gear and creator favorites are on the way',
      app: 'Downloads, community voting, and free daily posts',
      plus: 'Exclusive content, daily voting, and ad-free perks',
    },
  },
  th: {
    badge: 'ลิงก์ทางการ',
    title: 'ติดตาม DolphinBoo ได้ทุกที่',
    subtitle: 'รวมโซเชียลทางการไว้ให้แล้ว ส่วน merch กับอย่างอื่น เดี๋ยวมาเพิ่มอีก',
    socialLabel: 'โซเชียลมีเดีย',
    comingSoonLabel: 'เร็ว ๆ นี้',
    socialEyebrow: 'โซเชียล',
    comingSoonEyebrow: 'เร็ว ๆ นี้',
    footerRights: 'สงวนลิขสิทธิ์',
    footerMadeBy: 'สร้างโดย',
    socialDetails: {
      youtube: 'ไปดูคลิปใหม่ล่าสุดของ DolphinBoo',
      facebook: 'อัปเดตข่าวสารและโพสต์ต่าง ๆ ได้ที่นี่',
      instagram: 'รวมรูป รีล และโมเมนต์เบื้องหลัง',
      tiktok: 'ดูคลิปสั้นสนุก ๆ และช่วงไวรัลล่าสุด',
    },
    comingSoonDetails: {
      merch: 'merch ของ DolphinBoo กับไอเท็มน่ารัก ๆ กำลังมา',
      app: 'แอปสำหรับดูโพสต์ โหวตคอนเทนต์ และตามอัปเดตรายวัน',
      plus: 'คอนเทนต์พิเศษ โหวตได้บ่อยขึ้น และดูแบบไม่มีโฆษณา',
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

const comingSoonLinks: Array<{
  href: string;
  title: string;
  detailKey: ComingSoonDetailKey;
}> = [
  {
    href: '#',
    title: 'Merch',
    detailKey: 'merch',
  },
  {
    href: '#',
    title: 'App access',
    detailKey: 'app',
  },
  {
    href: '#',
    title: 'DolphinBoo+',
    detailKey: 'plus',
  },
];

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>('en');
  const text = copy[locale];

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
            <span className={s.metaPill}>{text.badge}</span>
            <div className={s.localeSwitch} role="group" aria-label="Language switcher">
              <button
                type="button"
                className={`${s.localeButton} ${locale === 'en' ? s.localeButtonActive : ''}`}
                onClick={() => setLocale('en')}
              >
                EN
              </button>
              <button
                type="button"
                className={`${s.localeButton} ${locale === 'th' ? s.localeButtonActive : ''}`}
                onClick={() => setLocale('th')}
              >
                TH
              </button>
            </div>
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

        <div className={s.linksGroup}>
          <p className={s.groupLabel}>{text.comingSoonLabel}</p>
          <div className={s.linksList}>
            {comingSoonLinks.map((link) => (
              <div key={link.title} className={`${s.linkButton} ${s.linkButtonMuted}`}>
                <span className={s.linkCopy}>
                  <span className={s.linkEyebrow}>{text.comingSoonEyebrow}</span>
                  <span className={s.linkTitle}>{link.title}</span>
                  <span className={s.linkDetail}>{text.comingSoonDetails[link.detailKey]}</span>
                </span>
                <span className={s.linkArrow} aria-hidden="true">•</span>
              </div>
            ))}
          </div>
        </div>

      </section>

      <footer className={s.footer}>
        <p>© {new Date().getFullYear()} DolphinBoo. {text.footerRights}</p>
        <p>
          {text.footerMadeBy} <a href="https://www.code-werx.com/" target="_blank" rel="noreferrer">Code Werx</a> ❤️
        </p>
      </footer>
    </main>
  );
}
