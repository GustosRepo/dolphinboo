import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DolphinBoo Admin',
  description: 'Creator dashboard for DolphinBoo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-6">
          <span className="font-bold text-gray-900">🐬 DolphinBoo Admin</span>
          <a href="/" className="text-sm text-gray-600 hover:text-gray-900">
            Dashboard
          </a>
          <a href="/posts" className="text-sm text-gray-600 hover:text-gray-900">
            Posts
          </a>
          <a href="/topics" className="text-sm text-gray-600 hover:text-gray-900">
            Topics
          </a>
          <a href="/analytics" className="text-sm text-gray-600 hover:text-gray-900">
            Analytics
          </a>
        </nav>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
