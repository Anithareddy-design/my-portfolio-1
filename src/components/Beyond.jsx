import React from 'react';

export default function Beyond() {
  const interests = [
    {
      emoji: '💃',
      title: 'Dancing',
      desc: 'Movement, rhythm, expression, and creative energy that inspires fresh thinking.'
    },
    {
      emoji: '🔧',
      title: 'Building',
      desc: 'Exploring prompt engineering, modern frontends, and novel generative AI tools.'
    },
    {
      emoji: '📚',
      title: 'Novels',
      desc: 'Immersing in world-building, thoughtful storytelling, imagination, and philosophies.'
    }
  ];

  return (
    <section id="beyond" style={{ background: 'var(--bg-mid)', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="sec-label c">Interests</div>
          <h2 className="sec-title c">
            A little more <em>about me.</em>
          </h2>
          <p className="sec-sub" style={{ margin: '0 auto' }}>
            Beyond algorithms and prompt architectures, here is what fuels my curiosity and creative drive.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.8rem'
          }}
        >
          {interests.map((item) => (
            <div
              key={item.title}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '22px',
                padding: '2.8rem 2rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="beyond-card"
            >
              <div style={{ fontSize: '2.8rem', marginBottom: '1.2rem' }}>{item.emoji}</div>
              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: '1.45rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.65rem'
                }}
              >
                {item.title}
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {item.desc}
              </p>
              <div className="card-bottom-line" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .beyond-card:hover {
          transform: translateY(-6px);
          border-color: rgba(201, 168, 76, 0.25);
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.4);
        }
        .beyond-card .card-bottom-line {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          opacity: 0;
          transition: opacity 0.35s;
        }
        .beyond-card:hover .card-bottom-line {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
