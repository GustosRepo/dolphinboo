export default function HomePage() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'system-ui, sans-serif',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        🐬 DolphinBoo
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
        Coming soon. Download the app to get started.
      </p>
      {/* TODO: Add App Store / Play Store links */}
    </main>
  );
}
