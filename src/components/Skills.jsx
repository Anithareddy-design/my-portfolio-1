import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Skills() {
  const { data } = usePortfolio();

  if (data.site?.showSkills === false) {
    return null;
  }

  const skills = data.skills || [];

  return (
    <section id="skills" style={{ background: 'var(--bg-deep)', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 4rem' }}>
          <div className="sec-label c">Expertise</div>
          <h2 className="sec-title c">
            Skills that turn <em>ideas into reality.</em>
          </h2>
          <p className="sec-sub" style={{ margin: '0 auto' }}>
            A blend of programming foundations, modern web technologies, and generative AI prompt engineering.
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div
          className="skills-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '4rem'
          }}
        >
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="sk-card"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '18px',
                padding: '2rem',
                backdropFilter: 'blur(16px)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Top Accent Line */}
              <div className="card-top-line" />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.2rem'
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'var(--gold-pale)',
                    border: '1px solid rgba(201, 168, 76, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}
                >
                  {skill.icon || '✦'}
                </div>

                <span
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--gold)'
                  }}
                >
                  {skill.level}%
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.35rem'
                }}
              >
                {skill.name}
              </h3>

              <div
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--sans)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '1.2rem'
                }}
              >
                {skill.category}
              </div>

              {/* Progress Bar */}
              <div
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    width: `${skill.level}%`,
                    height: '100%',
                    borderRadius: '10px',
                    background: 'linear-gradient(90deg, var(--gold) 0%, var(--gold-light) 100%)',
                    boxShadow: '0 0 10px rgba(201, 168, 76, 0.4)',
                    transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Infinite Tech Pills Marquee Strip */}
        {skills.length > 0 && (
          <div
            className="strip-wrap"
            style={{
              overflow: 'hidden',
              position: 'relative',
              padding: '1.5rem 0',
              maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
            }}
          >
            <div
              className="strip"
              style={{
                display: 'flex',
                gap: '1.5rem',
                width: 'max-content',
                animation: 'strip-scroll 25s linear infinite'
              }}
            >
              {[...skills, ...skills, ...skills].map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    background: 'var(--glass)',
                    border: '1px solid var(--border)',
                    borderRadius: '100px',
                    padding: '0.6rem 1.4rem',
                    whiteSpace: 'nowrap',
                    fontFamily: 'var(--sans)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    color: 'var(--text-secondary)',
                    cursor: 'default',
                    transition: 'all 0.3s'
                  }}
                  className="pill-hover"
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--gold)',
                      opacity: 0.7
                    }}
                  />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .sk-card:hover {
          transform: translateY(-5px);
          border-color: rgba(201, 168, 76, 0.3);
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.5), 0 0 20px rgba(201, 168, 76, 0.1);
        }
        .sk-card .card-top-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .sk-card:hover .card-top-line {
          opacity: 1;
        }
        .strip:hover {
          animation-play-state: paused;
        }
        .pill-hover:hover {
          border-color: var(--gold);
          color: var(--gold);
          background: var(--gold-pale);
        }
      `}</style>
    </section>
  );
}
