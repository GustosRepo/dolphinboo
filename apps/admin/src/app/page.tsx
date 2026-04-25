import Link from 'next/link';

const cards = [
  { href: '/posts', label: 'Posts', description: 'Create, edit, and publish content' },
  { href: '/topics', label: 'Topics', description: 'Manage voting topics and view results' },
  { href: '/analytics', label: 'Analytics', description: 'Votes, subscribers, and activity' },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-sm text-gray-500 mb-6">Welcome back, creator.</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map(({ href, label, description }) => (
          <Link
            key={href}
            href={href}
            className="block p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-sm transition"
          >
            <p className="text-xl font-semibold text-gray-900">{label}</p>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
