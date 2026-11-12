import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  LayoutDashboard,
  FolderGit2,
  Cpu,
  FileText,
  Mail,
  Bot,
  MessageSquare,
  Settings,
  Eye,
  LogOut,
  ShieldCheck
} from 'lucide-react';

export default function AdminSidebar({ activeTab, onSelectTab, onLogout }) {
  const { unreadMessagesCount, setCurrentView, activeRole } = usePortfolio();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'jarvis', label: 'JARVIS Engine', icon: Bot },
    { id: 'messages', label: 'Visitor Inbox', icon: MessageSquare, badge: unreadMessagesCount },
    { id: 'settings', label: 'Site Settings', icon: Settings }
  ];

  const roleTitles = {
    admin: 'Administrator',
    user: 'Standard User',
    guest: 'Guest Spectator'
  };

  return (
    <aside
      className="admin-sidebar"
      style={{
        width: '270px',
        background: 'rgba(4, 8, 16, 0.96)',
        borderRight: '1px solid var(--border)',
        padding: '2rem 1.2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backdropFilter: 'blur(20px)',
        position: 'sticky',
        top: 0,
        height: '100vh',
        zIndex: 100
      }}
    >
      <div>
        {/* Header Branding */}
        <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
          <div
            style={{
              fontFamily: 'var(--serif)',
              fontSize: '2.2rem',
              fontWeight: 600,
              color: 'var(--gold)',
              letterSpacing: '0.05em',
              marginBottom: '0.2rem'
            }}
          >
            AR.
          </div>
          <div
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)'
            }}
          >
            Control Center
          </div>

          {/* User profile card */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              padding: '0.75rem 0.9rem',
              background: 'var(--glass)',
              border: '1px solid var(--border)',
              borderRadius: '14px',
              marginTop: '1.2rem',
              textAlign: 'left'
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--gold), var(--violet))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--serif)',
                fontWeight: 700,
                color: 'var(--bg-deep)',
                fontSize: '1.05rem',
                flexShrink: 0
              }}
            >
              AR
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                Anita Reddy
              </div>
              <div
                style={{
                  fontSize: '0.68rem',
                  color: activeRole === 'admin' ? 'var(--gold)' : activeRole === 'user' ? 'var(--violet-light)' : 'var(--blue-electric)',
                  fontFamily: 'var(--sans)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <ShieldCheck size={10} />
                {roleTitles[activeRole] || 'Administrator'}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onSelectTab(item.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 0.9rem',
                    borderRadius: '10px',
                    background: isActive ? 'var(--gold-pale)' : 'transparent',
                    border: isActive ? '1px solid rgba(201, 168, 76, 0.28)' : '1px solid transparent',
                    color: isActive ? 'var(--gold)' : 'var(--text-secondary)',
                    fontFamily: 'var(--sans)',
                    fontSize: '0.82rem',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                    textAlign: 'left'
                  }}
                  className="sidebar-tab-btn"
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                  {item.badge > 0 && (
                    <span
                      style={{
                        marginLeft: 'auto',
                        background: 'var(--gold)',
                        color: 'var(--bg-deep)',
                        padding: '1px 7px',
                        borderRadius: '10px',
                        fontSize: '0.65rem',
                        fontWeight: 800
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1.5rem' }}>
        <button
          onClick={() => setCurrentView('portfolio')}
          className="btn btn-gold"
          style={{ width: '100%', fontSize: '0.76rem', padding: '0.75rem' }}
        >
          <Eye size={14} />
          View Live Portfolio
        </button>

        <button
          onClick={onLogout}
          className="btn btn-outline"
          style={{ width: '100%', fontSize: '0.76rem', padding: '0.75rem' }}
        >
          <LogOut size={14} />
          Logout / Switch Role
        </button>
      </div>

      <style>{`
        .sidebar-tab-btn:hover {
          color: var(--gold) !important;
          background: var(--gold-pale) !important;
        }
      `}</style>
    </aside>
  );
}
