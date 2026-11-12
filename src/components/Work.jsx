import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ExternalLink, Github } from 'lucide-react';

export default function Work() {
  const { data } = usePortfolio();

  if (data.site?.showProjects === false) {
    return null;
  }

  const projects = data.projects || [];

  return (
    <section id="work" style={{ background: 'var(--bg-mid)', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 4rem' }}>
          <div className="sec-label c">Portfolio</div>
          <h2 className="sec-title c">
            Selected <em>Work</em>
          </h2>
          <p className="sec-sub" style={{ margin: '0 auto' }}>
            A curated collection of web applications, interfaces, and intelligent experiences I&rsquo;ve brought to life.
          </p>
        </div>

        {/* Projects Grid */}
        <div
          className="work-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.8rem'
          }}
        >
          {projects.map((project, idx) => {
            const techList = (project.tech || '')
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean);

            return (
              <div
                key={project.id || idx}
                className="proj-card"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Browser Mockup Header Area */}
                <div
                  style={{
                    width: '100%',
                    height: '190px',
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #090e1b 0%, #0e1628 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid var(--border)'
                  }}
                >
                  <div
                    style={{
                      width: '86%',
                      height: '75%',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(124,92,191,0.08) 50%, rgba(26,143,255,0.06) 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
                    }}
                  >
                    {/* Browser window controls */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '24px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 0.8rem',
                        gap: '6px'
                      }}
                    >
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,95,86,0.8)' }} />
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,188,9,0.8)' }} />
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(39,201,63,0.8)' }} />
                    </div>

                    {/* Stylized index watermark */}
                    <div
                      style={{
                        fontFamily: 'var(--serif)',
                        fontSize: '3rem',
                        fontWeight: 300,
                        fontStyle: 'italic',
                        opacity: 0.35,
                        color: 'var(--gold)',
                        marginTop: '1rem',
                        userSelect: 'none'
                      }}
                    >
                      0{idx + 1}.
                    </div>
                  </div>

                  {project.featured && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)',
                        color: 'var(--bg-deep)',
                        fontSize: '0.66rem',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '4px',
                        textTransform: 'uppercase'
                      }}
                    >
                      ★ Featured
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div style={{ padding: '1.8rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{
                      fontFamily: 'var(--sans)',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--gold)',
                      marginBottom: '0.35rem'
                    }}
                  >
                    Project 0{idx + 1}
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--sans)',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      marginBottom: '0.65rem'
                    }}
                  >
                    {project.category}
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--serif)',
                      fontSize: '1.4rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      lineHeight: 1.25,
                      marginBottom: '0.75rem'
                    }}
                  >
                    {project.name}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.7,
                      marginBottom: '1.4rem',
                      flex: 1
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  {techList.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.5rem' }}>
                      {techList.map((tech) => (
                        <span
                          key={tech}
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            fontFamily: 'var(--sans)',
                            letterSpacing: '0.04em',
                            padding: '0.25rem 0.65rem',
                            borderRadius: '4px',
                            background: 'var(--blue-pale)',
                            border: '1px solid rgba(26, 143, 255, 0.25)',
                            color: 'var(--blue-electric)'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 'auto' }}>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          fontFamily: 'var(--sans)',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          letterSpacing: '0.05em',
                          color: 'var(--gold)',
                          textDecoration: 'none',
                          transition: 'all 0.25s'
                        }}
                        className="proj-live-link"
                      >
                        View Live Project
                        <ExternalLink size={14} />
                      </a>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          fontFamily: 'var(--sans)',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          color: 'var(--text-secondary)',
                          textDecoration: 'none'
                        }}
                      >
                        <Github size={14} />
                        Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .proj-card:hover {
          transform: translateY(-8px);
          border-color: rgba(201, 168, 76, 0.3);
          box-shadow: 0 32px 64px rgba(0, 0, 0, 0.6), 0 0 24px rgba(201, 168, 76, 0.12);
        }
        .proj-live-link:hover {
          color: var(--gold-light);
          gap: 0.6rem;
        }
      `}</style>
    </section>
  );
}
