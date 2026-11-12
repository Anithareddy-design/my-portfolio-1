import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Bot, Zap } from 'lucide-react';

export default function JarvisSection() {
  const { data, openJarvis } = usePortfolio();

  if (data.site?.showJarvis === false) {
    return null;
  }

  const jarvisName = data.jarvis?.name || 'JARVIS';

  const capabilities = [
    { icon: '🖥️', title: 'Screen Understanding', desc: 'Explains what is visible on the screen.' },
    { icon: '🗣️', title: 'Natural Voice Interaction', desc: 'Communicates naturally like a personal assistant.' },
    { icon: '🧠', title: 'Persistent Memory', desc: 'Remembers useful context to provide better assistance.' },
    { icon: '⚙️', title: 'System Assistance', desc: 'Helps simplify everyday digital workflows.' },
    { icon: '🚀', title: 'Future App Vision', desc: 'Being developed into an autonomous desktop companion.' }
  ];

  return (
    <section id="jarvis" style={{ background: 'var(--bg-deep)', position: 'relative', overflow: 'hidden' }}>
      {/* Background radial glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124, 92, 191, 0.12) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 20% 80%, rgba(26, 143, 255, 0.08) 0%, transparent 60%)
          `,
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(124, 92, 191, 0.15)',
              border: '1px solid rgba(124, 92, 191, 0.4)',
              borderRadius: '100px',
              padding: '0.4rem 1.2rem',
              fontFamily: 'var(--sans)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--violet-light)',
              marginBottom: '1.2rem'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--violet-light)',
                animation: 'blink 1.5s infinite'
              }}
            />
            Currently Developing
          </div>

          <div className="sec-label c">Featured AI Architecture</div>
          <h2 className="sec-title c">
            {jarvisName} &mdash; <em>Personal AI Assistant</em>
          </h2>
        </div>

        {/* Featured Main Panel */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--glass-border)',
            borderRadius: '28px',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            backdropFilter: 'blur(20px)',
            position: 'relative',
            overflow: 'hidden',
            maxWidth: '920px',
            margin: '0 auto 3.5rem',
            boxShadow: '0 32px 80px rgba(0, 0, 0, 0.6), 0 0 60px rgba(124, 92, 191, 0.12)'
          }}
        >
          {/* Subtle gradient border overlay */}
          <div
            style={{
              position: 'absolute',
              inset: '-1px',
              borderRadius: '29px',
              background: 'linear-gradient(135deg, rgba(124,92,191,0.3) 0%, transparent 40%, rgba(26,143,255,0.2) 100%)',
              zIndex: -1,
              pointerEvents: 'none'
            }}
          />

          <div
            className="jarvis-inner"
            style={{
              display: 'grid',
              gridTemplateColumns: '0.85fr 1.15fr',
              gap: '3rem',
              alignItems: 'center'
            }}
          >
            {/* Pulsing Eye Core & Spinning Rings */}
            <div
              onClick={openJarvis}
              role="button"
              tabIndex={0}
              aria-label="Launch JARVIS Assistant"
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openJarvis()}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                cursor: 'pointer',
                minHeight: '220px'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: '210px',
                  height: '210px',
                  borderRadius: '50%',
                  border: '1px solid rgba(124, 92, 191, 0.25)',
                  animation: 'spin 8s linear infinite'
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '-3px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--violet-light)',
                    boxShadow: '0 0 12px 4px rgba(160, 125, 224, 0.6)'
                  }}
                />
              </div>

              <div
                style={{
                  position: 'absolute',
                  width: '165px',
                  height: '165px',
                  borderRadius: '50%',
                  border: '1px solid rgba(26, 143, 255, 0.25)',
                  animation: 'spin 5s linear infinite reverse'
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '-3px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--blue-electric)',
                    boxShadow: '0 0 12px 4px rgba(0, 238, 255, 0.6)'
                  }}
                />
              </div>

              <div
                style={{
                  position: 'absolute',
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  border: '1px solid rgba(201, 168, 76, 0.2)',
                  animation: 'spin 10s linear infinite'
                }}
              />

              {/* Eye Core */}
              <div
                style={{
                  width: '82px',
                  height: '82px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, var(--violet-light) 0%, var(--violet) 40%, #150035 100%)',
                  boxShadow: '0 0 45px rgba(124, 92, 191, 0.6), 0 0 90px rgba(124, 92, 191, 0.25)',
                  animation: 'eye-glow 3s ease-in-out infinite',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 30% 30%, #fff 0%, rgba(0, 238, 255, 0.85) 60%, transparent 100%)',
                    boxShadow: '0 0 20px rgba(0, 238, 255, 0.9)'
                  }}
                />
              </div>
            </div>

            {/* Information */}
            <div>
              <p
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  marginBottom: '0.5rem'
                }}
              >
                AI Product • In Active Development
              </p>

              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: '2.5rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.8rem',
                  lineHeight: 1.15
                }}
              >
                Meet <span style={{ color: 'var(--violet-light)', fontStyle: 'italic' }}>{jarvisName}</span>
              </h3>

              <p
                style={{
                  fontSize: '0.96rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                  marginBottom: '1.4rem'
                }}
              >
                {data.jarvis?.greeting ||
                  "JARVIS is an evolving personal AI assistant designed to make technology feel personal and effortless. It can understand what is visible on a screen, explain screen content, communicate naturally through voice, and assist with everyday digital tasks."}
              </p>

              {/* Technologies */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '2rem' }}>
                {['AI Architecture', 'Prompt Engineering', 'Python', 'Voice Interaction', 'Screen Understanding', 'Memory System'].map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      fontFamily: 'var(--sans)',
                      letterSpacing: '0.04em',
                      padding: '0.28rem 0.75rem',
                      borderRadius: '4px',
                      background: 'rgba(124, 92, 191, 0.12)',
                      border: '1px solid rgba(124, 92, 191, 0.3)',
                      color: 'var(--violet-light)'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Launch Button */}
              <button
                onClick={openJarvis}
                className="btn"
                style={{
                  background: 'linear-gradient(135deg, var(--violet) 0%, #5a3d9e 50%, var(--blue) 100%)',
                  color: '#fff',
                  border: 'none',
                  padding: '0.9rem 2rem',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  boxShadow: '0 8px 24px rgba(124, 92, 191, 0.35)'
                }}
              >
                <Zap size={16} />
                Launch JARVIS OS
              </button>
            </div>
          </div>
        </div>

        {/* 5 Capability Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1rem',
            maxWidth: '920px',
            margin: '0 auto'
          }}
        >
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '1.4rem 1rem',
                textAlign: 'center',
                transition: 'all 0.35s ease'
              }}
              className="cap-hover"
            >
              <div style={{ fontSize: '1.8rem', marginBottom: '0.6rem' }}>{cap.icon}</div>
              <div
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '0.35rem',
                  lineHeight: 1.3
                }}
              >
                {cap.title}
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {cap.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .cap-hover:hover {
          border-color: rgba(124, 92, 191, 0.4);
          transform: translateY(-4px);
          background: rgba(124, 92, 191, 0.08);
        }
        @media (max-width: 860px) {
          .jarvis-inner {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
