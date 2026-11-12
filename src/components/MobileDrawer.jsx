import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, FileText, Shield, Linkedin } from 'lucide-react';

export default function MobileDrawer({ isOpen, onClose }) {
  const { data, setCurrentView } = usePortfolio();

  if (!isOpen) return null;

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Selected Work', href: '#work' },
    { label: 'JARVIS AI', href: '#jarvis' },
    { label: 'Interests', href: '#beyond' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = () => {
    onClose();
  };

  const handlePortalClick = () => {
    onClose();
    setCurrentView('admin');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(2, 4, 8, 0.96)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close navigation"
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          background: 'none',
          border: '1px solid var(--border)',
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
      >
        <X size={22} />
      </button>

      {/* Brand logo */}
      <div
        style={{
          fontFamily: 'var(--serif)',
          fontSize: '2.5rem',
          fontWeight: 600,
          color: 'var(--gold)',
          marginBottom: '2rem'
        }}
      >
        AR.
      </div>

      {/* Nav items */}
      <ul
        style={{
          listStyle: 'none',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}
      >
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={handleLinkClick}
              style={{
                fontFamily: 'var(--serif)',
                fontSize: '1.8rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                textDecoration: 'none',
                transition: 'color 0.25s'
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--gold)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-primary)')}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', width: 'min(300px, 100%)' }}>
        {data.resume?.url && (
          <a
            href={data.resume.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            <FileText size={16} />
            View Resume
          </a>
        )}

        <button
          onClick={handlePortalClick}
          className="btn btn-outline"
          style={{ width: '100%', borderColor: 'rgba(201, 168, 76, 0.4)', color: 'var(--gold)' }}
        >
          <Shield size={16} />
          Admin Portal Gate
        </button>

        {data.contact?.linkedin && (
          <a
            href={data.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="btn btn-li"
            style={{ width: '100%' }}
          >
            <Linkedin size={16} />
            Connect on LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}
