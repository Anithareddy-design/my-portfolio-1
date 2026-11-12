import React from 'react';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg-deep)',
        borderTop: '1px solid var(--border)',
        padding: '3rem 0 5rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="container">
        <div
          style={{
            fontFamily: 'var(--serif)',
            fontSize: '1.6rem',
            fontWeight: 600,
            color: 'var(--gold)',
            marginBottom: '0.8rem'
          }}
        >
          AR.
        </div>
        <p
          style={{
            fontStyle: 'italic',
            fontFamily: 'var(--serif)',
            fontSize: '1rem',
            color: 'var(--text-muted)',
            marginBottom: '0.6rem'
          }}
        >
          &ldquo;Designed with curiosity. Powered by AI.&rdquo;
        </p>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          &copy; {new Date().getFullYear()} Anita Reddy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
