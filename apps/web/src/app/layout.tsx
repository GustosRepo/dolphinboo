import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3002';

export const metadata: Metadata = {
  title: 'DolphinBoo — Creator Community',
  description:
    'Vote on future content, unlock exclusive posts, and support your favorite creator with DolphinBoo+.',
  metadataBase: new URL(siteUrl),
  applicationName: 'DolphinBoo',
  keywords: [
    'DolphinBoo',
    'creator community',
    'exclusive content',
    'fan links',
    'social links',
    'creator app',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🐬</text></svg>',
  },
  openGraph: {
    title: 'DolphinBoo — Official Links',
    description: 'Official DolphinBoo social links, upcoming merch, and more creator drops.',
    url: '/',
    siteName: 'DolphinBoo',
    type: 'website',
    locale: 'en_US',
    images: ['/images/dolphineboobanner.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DolphinBoo — Official Links',
    description: 'Official DolphinBoo social links, upcoming merch, and more creator drops.',
    images: ['/images/dolphineboobanner.png'],
  },
  category: 'entertainment',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className="bg-white text-gray-900 font-sans antialiased">{children}</body>
    </html>
  );
}
