import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DolphinBoo',
  description: 'A creator community app.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
