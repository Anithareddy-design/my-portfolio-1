import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Eye, Shield, Users, UserCheck, Bot, ChevronUp, ChevronDown, Bell, Wrench } from 'lucide-react';

export default function RoleSwitcher() {
  const {
    currentView,
    setCurrentView,
    activeRole,
    setActiveRole,
    unreadMessagesCount,
    data,
    openJarvis,
    showToast
  } = usePortfolio();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleRoleChange = (role) => {
    if (role === 'admin' && sessionStorage.getItem('anithaAdminAuth') !== 'true') {
      showToast('🔒 Administrator login required for edit access.', 'error');
      setCurrentView('admin');
      return;
    }
    setActiveRole(role);
    showToast(`Switched preview mode to: ${role.toUpperCase()}`, 'info');
  };

  return (
    <aside
      aria-label="Live Preview Controller"
      style={{
        position: 'fixed',
        bottom: '1.2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2500,
        width: 'max-content',
        maxWidth: '94vw'
      }}
    >
      <div
        style={{
          background: 'rgba(6, 12, 24, 0.92)',
          border: '1px solid rgba(201, 168, 76, 0.28)',
          borderRadius: '100px',
          padding: isCollapsed ? '0.4rem 1rem' : '0.45rem 0.75rem',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 16px 48px rgba(0, 0, 0, 0.7), 0 0 24px rgba(201, 168, 76, 0.12)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {isCollapsed ? (
          <button
            onClick={() => setIsCollapsed(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--gold)',
              fontFamily: 'var(--sans)',
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer'
            }}
          >
            <Shield size={14} />
            <span>ROLE: {activeRole.toUpperCase()}</span>
            <ChevronUp size={14} />
          </button>
        ) : (
          <>
            {/* View Mode Toggle */}
            <div
              style={{
                display: 'flex',
                background: 'rgba(255, 255, 255, 0.04)',
                borderRadius: '100px',
                padding: '2px',
                border: '1px solid var(--border)'
              }}
            >
              <button
                onClick={() => setCurrentView('portfolio')}
                style={{
                  background: currentView === 'portfolio' ? 'linear-gradient(135deg, var(--gold), var(--gold-light))' : 'transparent',
                  color: currentView === 'portfolio' ? 'var(--bg-deep)' : 'var(--text-secondary)',
                  border: 'none',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '100px',
                  fontFamily: 'var(--sans)',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  transition: 'all 0.25s'
                }}
              >
                <Eye size={13} />
                Portfolio
              </button>
              <button
                onClick={() => setCurrentView('admin')}
                style={{
                  background: currentView === 'admin' ? 'linear-gradient(135deg, var(--gold), var(--gold-light))' : 'transparent',
                  color: currentView === 'admin' ? 'var(--bg-deep)' : 'var(--text-secondary)',
                  border: 'none',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '100px',
                  fontFamily: 'var(--sans)',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  transition: 'all 0.25s'
                }}
              >
                <Shield size={13} />
                Admin Portal
              </button>
            </div>

            <div style={{ width: '1px', height: '18px', background: 'var(--border)' }} />

            {/* Role Switcher Controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <button
                onClick={() => handleRoleChange('admin')}
                title="Administrator Mode (Full editing permissions)"
                style={{
                  background: activeRole === 'admin' ? 'var(--gold-pale)' : 'transparent',
                  color: activeRole === 'admin' ? 'var(--gold)' : 'var(--text-muted)',
                  border: activeRole === 'admin' ? '1px solid rgba(201, 168, 76, 0.4)' : '1px solid transparent',
                  padding: '0.3rem 0.65rem',
                  borderRadius: '100px',
                  fontFamily: 'var(--sans)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <Shield size={12} />
                Admin
              </button>

              <button
                onClick={() => handleRoleChange('user')}
                title="User Mode (Can submit messages, explore, read-only)"
                style={{
                  background: activeRole === 'user' ? 'var(--violet-pale)' : 'transparent',
                  color: activeRole === 'user' ? 'var(--violet-light)' : 'var(--text-muted)',
                  border: activeRole === 'user' ? '1px solid rgba(124, 92, 191, 0.4)' : '1px solid transparent',
                  padding: '0.3rem 0.65rem',
                  borderRadius: '100px',
                  fontFamily: 'var(--sans)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <Users size={12} />
                User
              </button>

              <button
                onClick={() => handleRoleChange('guest')}
                title="Guest Mode (View-only spectator)"
                style={{
                  background: activeRole === 'guest' ? 'var(--blue-pale)' : 'transparent',
                  color: activeRole === 'guest' ? 'var(--blue-electric)' : 'var(--text-muted)',
                  border: activeRole === 'guest' ? '1px solid rgba(0, 238, 255, 0.35)' : '1px solid transparent',
                  padding: '0.3rem 0.65rem',
                  borderRadius: '100px',
                  fontFamily: 'var(--sans)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <UserCheck size={12} />
                Guest
              </button>
            </div>

            {/* Quick Indicators / Actions */}
            <div style={{ width: '1px', height: '18px', background: 'var(--border)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {/* JARVIS launcher shortcut */}
              <button
                onClick={openJarvis}
                title="Launch JARVIS AI Assistant"
                style={{
                  background: 'rgba(124, 92, 191, 0.18)',
                  border: '1px solid rgba(124, 92, 191, 0.35)',
                  color: 'var(--violet-light)',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '100px',
                  fontFamily: 'var(--sans)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <Bot size={13} />
                JARVIS
              </button>

              {/* Maintenance badge if active */}
              {data.site?.maintenance && (
                <span
                  title="Maintenance mode active for visitors"
                  style={{
                    background: 'rgba(255, 188, 9, 0.15)',
                    color: '#ffbc09',
                    border: '1px solid rgba(255, 188, 9, 0.35)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '100px',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <Wrench size={10} />
                  Maint
                </span>
              )}

              {/* Unread message badge */}
              {unreadMessagesCount > 0 && (
                <button
                  onClick={() => setCurrentView('admin')}
                  title={`${unreadMessagesCount} unread message(s) in inbox`}
                  style={{
                    background: 'var(--gold-pale)',
                    color: 'var(--gold)',
                    border: '1px solid rgba(201, 168, 76, 0.3)',
                    padding: '0.25rem 0.55rem',
                    borderRadius: '100px',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <Bell size={11} />
                  {unreadMessagesCount}
                </button>
              )}

              {/* Collapse button */}
              <button
                onClick={() => setIsCollapsed(true)}
                title="Collapse toolbar"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '2px'
                }}
              >
                <ChevronDown size={14} />
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
