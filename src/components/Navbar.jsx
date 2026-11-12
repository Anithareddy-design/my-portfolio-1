import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Shield, Linkedin, Menu, FileText } from 'lucide-react';

export default function Navbar({ onOpenDrawer }) {
  const { data, setCurrentView } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Scrollspy active section
      const sections = ['hero', 'about', 'skills', 'work', 'jarvis', 'beyond', 'contact'];
      const scrollPos = window.scrollY + 140;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Selected Work', href: '#work', id: 'work' },
    { label: 'JARVIS', href: '#jarvis', id: 'jarvis' },
    { label: 'Contact', href: '#contact', id: 'contact' }
  ];

  return (
    <nav
      id="navbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: isScrolled ? '0.75rem 0' : '1.3rem 0',
        background: isScrolled ? 'rgba(2, 4, 8, 0.88)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.35s ease'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}
        >
          {/* Logo */}
          <a
            href="#hero"
            style={{
              fontFamily: 'var(--serif)',
              fontSize: '1.6rem',
              fontWeight: 600,
              color: 'var(--gold)',
              textDecoration: 'none',
              letterSpacing: '0.05em',
              transition: 'opacity 0.25s'
            }}
          >
            AR.
          </a>

          {/* Desktop Nav Links */}
          <ul
            className="nav-links"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.2rem',
              listStyle: 'none'
            }}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    style={{
                      fontFamily: 'var(--sans)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: isActive ? 'var(--gold)' : 'var(--text-secondary)',
                      textDecoration: 'none',
                      position: 'relative',
                      transition: 'color 0.25s ease',
                      padding: '0.2rem 0'
                    }}
                  >
                    {link.label}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-4px',
                        left: 0,
                        width: isActive ? '100%' : '0%',
                        height: '1px',
                        background: 'var(--gold)',
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            {/* LinkedIn */}
            {data.contact?.linkedin && (
              <a
                href={data.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Profile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'all 0.3s'
                }}
                className="hover-gold"
              >
                <Linkedin size={16} />
              </a>
            )}

            {/* Resume Button */}
            {data.resume?.url && (
              <a
                href={data.resume.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-resume-nav"
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--bg-deep)',
                  background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)',
                  padding: '0.55rem 1.1rem',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <FileText size={13} />
                Resume
              </a>
            )}

            {/* Portal Gate Button */}
            <button
              onClick={() => setCurrentView('admin')}
              title="Admin Control Center"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontFamily: 'var(--sans)',
                fontSize: '0.74rem',
                fontWeight: 600,
                color: 'var(--gold)',
                background: 'var(--gold-pale)',
                border: '1px solid rgba(201, 168, 76, 0.28)',
                padding: '0.55rem 0.9rem',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              <Shield size={13} />
              Portal
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={onOpenDrawer}
              className="hamburger-btn"
              aria-label="Open Navigation Menu"
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                padding: '0.3rem'
              }}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .hover-gold:hover {
          border-color: var(--gold) !important;
          color: var(--gold) !important;
          background: var(--gold-pale) !important;
        }
        .btn-resume-nav:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(201, 168, 76, 0.35);
        }
        @media (max-width: 860px) {
          .nav-links, .btn-resume-nav {
            display: none !important;
          }
          .hamburger-btn {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}
