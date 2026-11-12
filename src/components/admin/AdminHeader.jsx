import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Shield, Users, UserCheck, Eye } from 'lucide-react';

export default function AdminHeader({ activeTab }) {
  const { activeRole, setCurrentView } = usePortfolio();

  const tabTitles = {
    dashboard: { title: 'Dashboard Overview', desc: 'Real-time metrics, system health, and quick operational shortcuts.' },
    projects: { title: 'Projects Inventory', desc: 'Manage featured work, categories, and live links showcased on your public portfolio.' },
    skills: { title: 'Skills & Proficiencies', desc: 'Maintain technical expertise, mastery percentages, and marquee strip pills.' },
    resume: { title: 'Resume Configuration', desc: 'Update public resume asset paths and verify live PDF document access.' },
    contact: { title: 'Contact Information', desc: 'Update direct communication channels, socials, and availability status.' },
    jarvis: { title: 'JARVIS AI Engine', desc: 'Configure voice synthesis, wake phrases, and custom greeting prompts.' },
    messages: { title: 'Visitor Messages Inbox', desc: 'Review visitor inquiries, mark messages as read, or reply via email.' },
    settings: { title: 'Global Site Settings', desc: 'Control maintenance mode, section visibility, and system backup/restore.' }
  };

  const currentTabInfo = tabTitles[activeTab] || tabTitles.dashboard;

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBottom: '2.5rem',
        paddingBottom: '1.2rem',
        borderBottom: '1px solid var(--border)'
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontSize: '2.1rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            lineHeight: 1.2
          }}
        >
          {currentTabInfo.title}
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
          {currentTabInfo.desc}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
        {/* Active Role Badge */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.4rem 0.95rem',
            borderRadius: '100px',
            fontFamily: 'var(--sans)',
            fontSize: '0.72rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            background: activeRole === 'admin' ? 'var(--gold-pale)' : activeRole === 'user' ? 'var(--violet-pale)' : 'var(--blue-pale)',
            border: `1px solid ${activeRole === 'admin' ? 'rgba(201,168,76,0.35)' : activeRole === 'user' ? 'rgba(124,92,191,0.35)' : 'rgba(0,238,255,0.35)'}`,
            color: activeRole === 'admin' ? 'var(--gold)' : activeRole === 'user' ? 'var(--violet-light)' : 'var(--blue-electric)'
          }}
        >
          {activeRole === 'admin' ? <Shield size={12} /> : activeRole === 'user' ? <Users size={12} /> : <UserCheck size={12} />}
          <span>{activeRole} Mode</span>
        </span>

        {/* Live Preview Button */}
        <button
          onClick={() => setCurrentView('portfolio')}
          className="btn btn-outline"
          style={{ padding: '0.5rem 1rem', fontSize: '0.76rem' }}
        >
          <Eye size={13} />
          Launch Live View
        </button>
      </div>
    </header>
  );
}
