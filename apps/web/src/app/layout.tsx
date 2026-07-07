import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DolphinBoo — Creator Community',
  description:
    'Vote on future content, unlock exclusive posts, and support your favorite creator with DolphinBoo+.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🐬</text></svg>',
  },
  openGraph: {
    title: 'DolphinBoo',
    description: 'Creator community app. Vote. Subscribe. Enjoy.',
    images: ['/images/dolphineboobanner.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-gray-900 font-sans antialiased">{children}</body>
    </html>
  );
}
