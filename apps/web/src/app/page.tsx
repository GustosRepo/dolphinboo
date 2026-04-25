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
        backgroundColor: '#fff',
      }}
    >
      {/* Banner */}
      <img
        src="/images/dolphineboobanner.png"
        alt="DolphinBoo banner"
        style={{ width: '100%', maxWidth: '720px', marginBottom: '2rem', borderRadius: '1rem' }}
      />

      {/* Logo */}
      <img
        src="/images/dolphineboomainlogo.png"
        alt="DolphinBoo logo"
        style={{ width: '120px', height: '120px', objectFit: 'contain', marginBottom: '1.5rem' }}
      />

      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        DolphinBoo
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem', maxWidth: '400px' }}>
        A creator community. Vote on future content, unlock exclusive posts, and support what you love.
      </p>
      {/* TODO: Add App Store / Play Store links */}
    </main>
  );
}
