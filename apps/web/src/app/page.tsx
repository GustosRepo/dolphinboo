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
    <div className="min-h-screen">

      {/* ── Nav ───────────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/images/dolphineboomainlogo.png" alt="DolphinBoo" className="w-8 h-8 object-contain" />
            <span className="font-bold text-gray-900 text-lg">DolphinBoo</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-sm text-gray-500 hover:text-gray-900 transition hidden sm:block">Features</a>
            <a href="#pricing" className="text-sm text-gray-500 hover:text-gray-900 transition hidden sm:block">Pricing</a>
            <a
              href="#download"
              className="bg-dolphin-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-dolphin-700 transition"
            >
              Download
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 px-6 text-center bg-gradient-to-b from-dolphin-50 to-white">
        <div className="max-w-3xl mx-auto">
          <img
            src="/images/dolphineboomainlogo.png"
            alt="DolphinBoo logo"
            className="w-24 h-24 object-contain mx-auto mb-6"
          />
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 leading-tight mb-4">
            Your community,<br />
            <span className="text-dolphin-600">your content.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-xl mx-auto mb-8">
            Vote on future posts, access exclusive content, and support your favorite creator — all in one app.
          </p>
          {/* TODO: Replace hrefs with real App Store / Play Store URLs */}
          <div id="download" className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-gray-700 transition"
            >
              {/* TODO: Add App Store SVG icon */}
              <span>🍎</span> Download on the App Store
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-semibold px-6 py-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition"
            >
              {/* TODO: Add Google Play SVG icon */}
              <span>▶</span> Get it on Google Play
            </a>
          </div>
        </div>

        {/* Banner image */}
        <div className="max-w-4xl mx-auto mt-16">
          <img
            src="/images/dolphineboobanner.png"
            alt="DolphinBoo app banner"
            className="w-full rounded-2xl shadow-2xl border border-gray-100"
          />
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────── */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">Built for real fans</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              DolphinBoo gives you more than just content — it gives you a voice.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl border border-gray-100 hover:border-dolphin-200 hover:shadow-md transition"
              >
                <div className="text-3xl mb-3">{f.emoji}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-6 bg-gradient-to-b from-white to-dolphin-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">Simple pricing</h2>
            <p className="text-gray-500 text-lg">Free forever, or go Plus for the full experience.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Free */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Free</p>
              <p className="text-4xl font-black text-gray-900 mb-1">$0</p>
              <p className="text-gray-400 text-sm mb-6">forever</p>
              <ul className="space-y-3 mb-8">
                {freePerks.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-gray-400">✓</span> {p}
                  </li>
                ))}
              </ul>
              <a
                href="#download"
                className="block text-center border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:border-gray-400 transition"
              >
                Download Free
              </a>
            </div>

            {/* DolphinBoo+ */}
            <div className="bg-dolphin-600 text-white rounded-2xl p-8 relative overflow-hidden shadow-xl">
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-dolphin-500 rounded-full opacity-30" />
              <p className="text-sm font-semibold text-dolphin-200 uppercase tracking-widest mb-2">DolphinBoo+</p>
              <p className="text-4xl font-black mb-1">$1.99</p>
              <p className="text-dolphin-200 text-sm mb-6">per month</p>
              <ul className="space-y-3 mb-8">
                {premiumPerks.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-white">
                    <span className="text-dolphin-200">✦</span> {p}
                  </li>
                ))}
              </ul>
              <a
                href="#download"
                className="block text-center bg-white text-dolphin-700 font-bold py-3 rounded-xl hover:bg-dolphin-50 transition"
              >
                Get DolphinBoo+
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-dolphin-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <img
            src="/images/dolphineboomainlogo.png"
            alt="DolphinBoo"
            className="w-16 h-16 object-contain mx-auto mb-6 opacity-90"
          />
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Ready to dive in?</h2>
          <p className="text-dolphin-100 text-lg mb-8">
            No sign-up required. Open the app and you&apos;re in.
          </p>
          {/* TODO: Replace hrefs with real App Store / Play Store URLs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-white text-dolphin-700 font-bold px-6 py-3.5 rounded-xl hover:bg-dolphin-50 transition"
            >
              🍎 App Store
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-dolphin-700 text-white font-bold px-6 py-3.5 rounded-xl hover:bg-dolphin-900 transition border border-dolphin-500"
            >
              ▶ Google Play
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="py-8 px-6 bg-gray-900 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} DolphinBoo. All rights reserved.
        </p>
      </footer>

    </div>
  );
}
