import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Briefcase, MapPin, Phone } from 'lucide-react';

export default function About() {
  const { data } = usePortfolio();

  const tags = [
    'Self-Motivated',
    'Creative Thinker',
    'Fast Learner',
    'AI Enthusiast',
    'Consistent Builder',
    'Curious Explorer'
  ];

  return (
    <section id="about" style={{ background: 'var(--bg-mid)', position: 'relative' }}>
      <div className="container">
        <div
          className="about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '0.9fr 1.1fr',
            gap: '4.5rem',
            alignItems: 'center'
          }}
        >
          {/* Left Bio Card */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {/* Ambient Drift Glow */}
            <div
              style={{
                position: 'absolute',
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(124, 92, 191, 0.18) 0%, transparent 70%)',
                pointerEvents: 'none',
                animation: 'glow-drift 8s ease-in-out infinite'
              }}
            />

            <div
              className="about-card"
              style={{
                position: 'relative',
                width: 'min(350px, 100%)',
                background: 'var(--bg-card)',
                border: '1px solid var(--glass-border)',
                borderRadius: '26px',
                padding: '2.5rem',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 32px 64px rgba(0, 0, 0, 0.5)'
              }}
            >
              {/* Spinning gradient avatar border */}
              <div
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--gold) 0%, var(--violet) 50%, var(--blue) 100%)',
                  padding: '2px',
                  marginBottom: '1.5rem',
                  animation: 'slow-spin 20s linear infinite'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'var(--bg-deep)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--serif)',
                    fontSize: '1.9rem',
                    fontWeight: 600,
                    color: 'var(--gold)',
                    animation: 'slow-spin 20s linear infinite reverse'
                  }}
                >
                  AR
                </div>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: '1.45rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.25rem'
                }}
              >
                Anita Reddy
              </h3>

              <div
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--gold)',
                  fontFamily: 'var(--sans)',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  marginBottom: '1.6rem'
                }}
              >
                Prompt Engineer • AI Creator
              </div>

              {/* Info Rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <Briefcase size={15} color="var(--gold)" />
                  <span>{data.contact?.availability || 'Available for internships'}</span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <MapPin size={15} color="var(--gold)" />
                  <span>{data.contact?.location || 'Vijayawada, India'}</span>
                </div>

                {data.contact?.phone && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    <Phone size={15} color="var(--gold)" />
                    <span>{data.contact.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Narrative */}
          <div>
            <div className="sec-label">About Me</div>
            <h2 className="sec-title">
              Curiosity is my <em>superpower.</em>
            </h2>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '1.2rem' }}>
              I&rsquo;m Anita Reddy, a self-motivated Computer Science student passionate about artificial intelligence, prompt engineering, and building meaningful technology. I enjoy using advanced tools such as ChatGPT, Gemini, and cloud-based AI platforms to turn creative ideas into useful digital experiences.
            </p>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '2rem' }}>
              I believe technology should feel intelligent, natural, personal, and empowering — from everyday assistant interactions to intuitive interfaces.
            </p>

            {/* Badge Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '0.45rem 1rem',
                    borderRadius: '100px',
                    background: 'var(--glass)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-secondary)',
                    transition: 'all 0.3s ease',
                    cursor: 'default'
                  }}
                  className="tag-hover"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .tag-hover:hover {
          border-color: var(--gold) !important;
          color: var(--gold) !important;
          background: var(--gold-pale) !important;
        }
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
