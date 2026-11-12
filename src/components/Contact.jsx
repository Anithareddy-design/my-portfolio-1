import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, Phone, Linkedin, FileText, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const { data, addMessage, showToast } = usePortfolio();

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast('Please fill out all contact fields.', 'warning');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      addMessage(formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      showToast('Thank you! Your message has been sent to Anita.', 'success');
    }, 700);
  };

  return (
    <section id="contact" style={{ background: 'var(--bg-deep)', position: 'relative' }}>
      {/* Background radial accent */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201, 168, 76, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          className="contact-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4.5rem',
            alignItems: 'start'
          }}
        >
          {/* Left Column: Direct Contact Info */}
          <div>
            <div className="sec-label">Contact</div>
            <h2 className="sec-title">
              Let&rsquo;s Build Something <br />
              <em>Intelligent.</em>
            </h2>
            <p className="sec-sub">
              Have an idea, project, or opportunity in mind? Feel free to reach out directly or send a message through the form.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', margin: '2.5rem 0' }}>
              {/* Phone item */}
              {data.contact?.phone && (
                <a
                  href={`tel:${data.contact.phone.replace(/\s+/g, '')}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.1rem',
                    padding: '1.1rem 1.4rem',
                    background: 'var(--glass)',
                    border: '1px solid var(--border)',
                    borderRadius: '14px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  className="cinfo-item-hover"
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'var(--gold-pale)',
                      border: '1px solid rgba(201, 168, 76, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: 'var(--gold)'
                    }}
                  >
                    <Phone size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      Phone
                    </div>
                    <div style={{ fontSize: '0.96rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {data.contact.phone}
                    </div>
                  </div>
                </a>
              )}

              {/* Email item */}
              {data.contact?.email && (
                <a
                  href={`mailto:${data.contact.email}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.1rem',
                    padding: '1.1rem 1.4rem',
                    background: 'var(--glass)',
                    border: '1px solid var(--border)',
                    borderRadius: '14px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  className="cinfo-item-hover"
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'var(--gold-pale)',
                      border: '1px solid rgba(201, 168, 76, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: 'var(--gold)'
                    }}
                  >
                    <Mail size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      Email
                    </div>
                    <div style={{ fontSize: '0.96rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {data.contact.email}
                    </div>
                  </div>
                </a>
              )}
            </div>

            {/* Quick Link Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {data.contact?.linkedin && (
                <a
                  href={data.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-li"
                >
                  <Linkedin size={15} />
                  Connect on LinkedIn
                </a>
              )}

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
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--glass-border)',
              borderRadius: '24px',
              padding: 'clamp(2rem, 4vw, 2.8rem)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.5)'
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--serif)',
                fontSize: '1.6rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '1.8rem'
              }}
            >
              Send a Message
            </h3>

            {isSubmitted ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '2.5rem 1rem',
                  animation: 'fadeIn 0.4s ease'
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'var(--gold-pale)',
                    border: '1px solid rgba(201, 168, 76, 0.4)',
                    color: 'var(--gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.4rem'
                  }}
                >
                  <CheckCircle2 size={30} />
                </div>
                <h4 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', color: 'var(--gold)', marginBottom: '0.6rem' }}>
                  Thank you!
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  Your message has been received and saved to Anita&rsquo;s inbox. I will get back to you soon.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn btn-outline"
                  style={{ fontSize: '0.8rem', padding: '0.6rem 1.4rem' }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    placeholder="Tell me about your idea, project, or role..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.95rem', marginTop: '0.6rem' }}
                >
                  {isSubmitting ? (
                    'Saving Message...'
                  ) : (
                    <>
                      Send Message
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .cinfo-item-hover:hover {
          border-color: rgba(201, 168, 76, 0.4) !important;
          background: var(--gold-pale) !important;
          transform: translateY(-2px);
        }
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 3.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
