import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Wrench, Shield } from 'lucide-react';

export default function MaintenanceScreen() {
  const { setCurrentView } = usePortfolio();

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        background: 'var(--bg-deep)',
        color: 'var(--text-primary)',
        padding: '2rem',
        position: 'relative',
        zIndex: 1000
      }}
    >
      <div
        style={{
          width: '74px',
          height: '74px',
          borderRadius: '50%',
          background: 'var(--gold-pale)',
          border: '1px solid rgba(201, 168, 76, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--gold)',
          marginBottom: '1.5rem',
          boxShadow: '0 0 40px rgba(201, 168, 76, 0.2)'
        }}
      >
        <Wrench size={32} />
      </div>

      <h1
        style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
          fontWeight: 600,
          color: 'var(--gold)',
          lineHeight: 1.1,
          marginBottom: '1rem'
        }}
      >
        Site Under Maintenance
      </h1>

      <p
        style={{
          color: 'var(--text-secondary)',
          maxWidth: '520px',
          fontSize: '1.05rem',
          lineHeight: 1.8,
          marginBottom: '2.5rem'
        }}
      >
        I am currently fine-tuning intelligent features and updating my latest projects. Please check back shortly or access the Control Center below.
      </p>

      <button
        onClick={() => setCurrentView('admin')}
        className="btn btn-primary"
        style={{ padding: '0.9rem 2.2rem' }}
      >
        <Shield size={16} />
        Admin Control Portal
      </button>
    </div>
  );
}
