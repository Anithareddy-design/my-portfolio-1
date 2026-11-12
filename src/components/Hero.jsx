import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import ParticleCanvas from './ParticleCanvas';
import { ArrowDown, FileText, Linkedin, Sparkles } from 'lucide-react';

export default function Hero() {
  const { data } = usePortfolio();

  const skillCount = data.skills?.length || 10;
  const projectCount = data.projects?.length || 3;

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: '7rem',
        paddingBottom: '4rem'
      }}
    >
      {/* Radial Gradient Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 60% 80% at 70% 50%, rgba(26, 143, 255, 0.08) 0%, transparent 70%),
            radial-gradient(ellipse 45% 65% at 30% 20%, rgba(124, 92, 191, 0.1) 0%, transparent 60%),
            radial-gradient(ellipse 35% 45% at 80% 80%, rgba(201, 168, 76, 0.06) 0%, transparent 60%),
            linear-gradient(180deg, #020408 0%, #060c14 50%, #020408 100%)
          `,
          zIndex: 0
        }}
      />

      {/* Dynamic Particle & Constellation Canvas */}
      <ParticleCanvas />

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div
          className="hero-inner"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: '3.5rem',
            alignItems: 'center'
          }}
        >
          {/* Left Hero Details */}
          <div>
            {/* Announcement Badge */}
            {data.site?.announcement && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  background: 'var(--glass)',
                  border: '1px solid var(--border)',
                  borderRadius: '100px',
                  padding: '0.4rem 1.1rem',
                  fontFamily: 'var(--sans)',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  marginBottom: '1.8rem',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--gold)',
                    animation: 'blink 2s infinite'
                  }}
                />
                <Sparkles size={12} />
                <span>{data.site.announcement}</span>
              </div>
            )}

            {/* Headline */}
            <h1
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(2.8rem, 5.2vw, 5rem)',
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                marginBottom: '1.4rem'
              }}
            >
              Building the future <br />
              with <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>AI &amp; ideas.</em>
            </h1>

            {/* Tagline */}
            <p
              style={{
                fontSize: '1.08rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.85,
                maxWidth: '540px',
                marginBottom: '2.5rem'
              }}
            >
              {data.site?.tagline ||
                "Hi, I'm Anita Reddy — a Prompt Engineer and AI creator transforming ideas into intelligent, useful digital experiences."}
            </p>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '3.5rem'
              }}
            >
              <a href="#work" className="btn btn-primary">
                Explore My Work
                <ArrowDown size={15} />
              </a>

              {data.resume?.url && (
                <a
                  href={data.resume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <FileText size={15} />
                  View Resume
                </a>
              )}

              {data.contact?.linkedin && (
                <a
                  href={data.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-li"
                >
                  <Linkedin size={15} />
                  LinkedIn
                </a>
              )}
            </div>

            {/* Live Stats */}
            <div
              style={{
                display: 'flex',
                gap: '2.5rem',
                flexWrap: 'wrap',
                alignItems: 'center'
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: '2.4rem',
                    fontWeight: 600,
                    color: 'var(--gold)',
                    lineHeight: 1
                  }}
                >
                  02+
                </div>
                <div
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginTop: '0.35rem'
                  }}
                >
                  Years of Learning
                </div>
              </div>

              <div style={{ width: '1px', height: '36px', background: 'var(--border)' }} />

              <div>
                <div
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: '2.4rem',
                    fontWeight: 600,
                    color: 'var(--gold)',
                    lineHeight: 1
                  }}
                >
                  {skillCount}+
                </div>
                <div
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginTop: '0.35rem'
                  }}
                >
                  Technical Skills
                </div>
              </div>

              <div style={{ width: '1px', height: '36px', background: 'var(--border)' }} />

              <div>
                <div
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: '2.4rem',
                    fontWeight: 600,
                    color: 'var(--gold)',
                    lineHeight: 1
                  }}
                >
                  {String(projectCount).padStart(2, '0')}
                </div>
                <div
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginTop: '0.35rem'
                  }}
                >
                  Projects Completed
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero: Animated 3-Ring Orbital AI Core */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '380px',
                height: '380px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Outer Ring 1: Gold Satellite */}
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: '1px solid rgba(201, 168, 76, 0.18)',
                  animation: 'spin 16s linear infinite'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--gold)',
                    boxShadow: '0 0 14px 4px rgba(201, 168, 76, 0.7)'
                  }}
                />
              </div>

              {/* Middle Ring 2: Violet Satellite (Counter-spin) */}
              <div
                style={{
                  position: 'absolute',
                  width: '78%',
                  height: '78%',
                  borderRadius: '50%',
                  border: '1px solid rgba(124, 92, 191, 0.22)',
                  animation: 'spin 11s linear infinite reverse'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--violet-light)',
                    boxShadow: '0 0 14px 4px rgba(160, 125, 224, 0.7)'
                  }}
                />
              </div>

              {/* Inner Ring 3: Cyan Satellite */}
              <div
                style={{
                  position: 'absolute',
                  width: '56%',
                  height: '56%',
                  borderRadius: '50%',
                  border: '1px solid rgba(26, 143, 255, 0.22)',
                  animation: 'spin 7s linear infinite'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--blue-electric)',
                    boxShadow: '0 0 14px 4px rgba(0, 238, 255, 0.8)'
                  }}
                />
              </div>

              {/* Pulsing Core */}
              <div
                style={{
                  width: '165px',
                  height: '165px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle at 35% 35%, rgba(201, 168, 76, 0.35) 0%, rgba(124, 92, 191, 0.28) 40%, rgba(26, 143, 255, 0.22) 75%, transparent 100%)`,
                  boxShadow: `0 0 60px 20px rgba(124, 92, 191, 0.25), 0 0 120px 40px rgba(26, 143, 255, 0.12), inset 0 0 40px rgba(201, 168, 76, 0.2)`,
                  animation: 'orb-pulse 4s ease-in-out infinite',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: '2.8rem',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: 'var(--gold-light)',
                    opacity: 0.9,
                    userSelect: 'none',
                    textShadow: '0 0 20px rgba(230, 201, 122, 0.5)'
                  }}
                >
                  AI
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .hero-inner {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-inner > div:first-child {
            order: 2;
          }
          .hero-inner > div:last-child {
            order: 1;
            margin-bottom: 2rem;
          }
          .hero-btns, .hero-stats {
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
