import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Mail, Trash2, CheckCircle, MailCheck, Reply } from 'lucide-react';

export default function MessagesTab() {
  const { data, toggleMessageRead, deleteMessage, unreadMessagesCount } = usePortfolio();

  const messages = data.messages || [];

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete message from "${name}"?`)) {
      deleteMessage(id);
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      {/* Top Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem'
        }}
      >
        <div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.6rem', color: 'var(--text-primary)' }}>
            Visitor Messages ({messages.length})
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Messages received through the public portfolio contact form.
          </p>
        </div>

        {unreadMessagesCount > 0 && (
          <span
            style={{
              padding: '0.35rem 0.85rem',
              borderRadius: '100px',
              fontFamily: 'var(--sans)',
              fontSize: '0.74rem',
              fontWeight: 700,
              background: 'var(--gold-pale)',
              border: '1px solid rgba(201,168,76,0.3)',
              color: 'var(--gold)'
            }}
          >
            {unreadMessagesCount} Unread Message{unreadMessagesCount > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Messages List */}
      {messages.length === 0 ? (
        <div
          style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            background: 'var(--bg-card)',
            borderRadius: '20px',
            border: '1px solid var(--border)'
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.2rem',
              color: 'var(--text-muted)'
            }}
          >
            <Mail size={24} />
          </div>
          <p style={{ color: 'var(--text-secondary)' }}>No visitor messages received yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {messages.map((msg) => {
            const isUnread = !msg.read;

            return (
              <div
                key={msg.id}
                style={{
                  background: 'var(--bg-card)',
                  border: isUnread ? '1px solid rgba(201, 168, 76, 0.4)' : '1px solid var(--border)',
                  borderRadius: '18px',
                  padding: '1.6rem',
                  backdropFilter: 'blur(16px)',
                  boxShadow: isUnread ? '0 8px 30px rgba(201, 168, 76, 0.08)' : 'none',
                  transition: 'all 0.25s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <h4 style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {msg.name}
                      </h4>
                      {isUnread && (
                        <span
                          style={{
                            fontSize: '0.65rem',
                            fontWeight: 800,
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            background: 'var(--gold)',
                            color: 'var(--bg-deep)',
                            padding: '2px 6px',
                            borderRadius: '4px'
                          }}
                        >
                          New
                        </span>
                      )}
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      <a href={`mailto:${msg.email}`} style={{ color: 'var(--gold)', textDecoration: 'none' }}>
                        {msg.email}
                      </a>{' '}
                      &bull; {msg.date}
                    </div>
                  </div>

                  {/* Message actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => toggleMessageRead(msg.id)}
                      className="btn btn-outline"
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.72rem' }}
                      title={isUnread ? 'Mark as Read' : 'Mark as Unread'}
                    >
                      {isUnread ? <CheckCircle size={13} /> : <MailCheck size={13} />}
                      {isUnread ? 'Mark Read' : 'Mark Unread'}
                    </button>

                    {msg.email && (
                      <a
                        href={`mailto:${msg.email}?subject=Re: Your Message to Anita Reddy`}
                        className="btn btn-outline"
                        style={{ padding: '0.4rem 0.75rem', fontSize: '0.72rem' }}
                        title="Reply via email"
                      >
                        <Reply size={13} />
                        Reply
                      </a>
                    )}

                    <button
                      onClick={() => handleDelete(msg.id, msg.name)}
                      className="btn btn-danger"
                      style={{ padding: '0.4rem 0.7rem', fontSize: '0.72rem' }}
                      title="Delete message"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    padding: '1rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.92rem',
                    lineHeight: 1.7,
                    marginTop: '0.8rem',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {msg.message}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
