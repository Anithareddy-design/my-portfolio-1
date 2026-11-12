import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  FolderGit2,
  Cpu,
  MessageSquare,
  Bot,
  Activity,
  ArrowRight,
  ShieldAlert,
  Volume2
} from 'lucide-react';

export default function DashboardTab({ onSelectTab }) {
  const { data, toggleMaintenance, toggleJarvisVoice } = usePortfolio();

  const totalProjects = data.projects?.length || 0;
  const totalSkills = data.skills?.length || 0;
  const totalMessages = data.messages?.length || 0;
  const isJarvisActive = data.jarvis?.enabled !== false;
  const isMaintenance = Boolean(data.site?.maintenance);
  const isVoiceActive = Boolean(data.jarvis?.voice !== false);

  const activityList = data.activity || [];

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      {/* 4 KPI Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.2rem',
          marginBottom: '2.5rem'
        }}
      >
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--glass-border)',
            borderRadius: '18px',
            padding: '1.5rem',
            backdropFilter: 'blur(16px)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}>
              Total Projects
            </span>
            <FolderGit2 size={16} color="var(--gold)" />
          </div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: '2.5rem', fontWeight: 600, color: 'var(--gold)' }}>
            {totalProjects}
          </div>
        </div>

        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--glass-border)',
            borderRadius: '18px',
            padding: '1.5rem',
            backdropFilter: 'blur(16px)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: 'linear-gradient(90deg, transparent, var(--violet-light), transparent)' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}>
              Skills Mastered
            </span>
            <Cpu size={16} color="var(--violet-light)" />
          </div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: '2.5rem', fontWeight: 600, color: 'var(--violet-light)' }}>
            {totalSkills}
          </div>
        </div>

        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--glass-border)',
            borderRadius: '18px',
            padding: '1.5rem',
            backdropFilter: 'blur(16px)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: 'linear-gradient(90deg, transparent, var(--blue-electric), transparent)' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}>
              Visitor Messages
            </span>
            <MessageSquare size={16} color="var(--blue-electric)" />
          </div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: '2.5rem', fontWeight: 600, color: 'var(--blue-electric)' }}>
            {totalMessages}
          </div>
        </div>

        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--glass-border)',
            borderRadius: '18px',
            padding: '1.5rem',
            backdropFilter: 'blur(16px)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: 'linear-gradient(90deg, transparent, var(--success), transparent)' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}>
              JARVIS Engine
            </span>
            <Bot size={16} color={isJarvisActive ? 'var(--success)' : 'var(--danger)'} />
          </div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: '2.5rem', fontWeight: 600, color: isJarvisActive ? 'var(--success)' : 'var(--danger)' }}>
            {isJarvisActive ? 'ONLINE' : 'OFFLINE'}
          </div>
        </div>
      </div>

      {/* Middle Grid: Quick Actions & Quick Status */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.8rem',
          marginBottom: '2.5rem'
        }}
      >
        {/* Quick Management Shortcuts */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--glass-border)',
            borderRadius: '20px',
            padding: '1.8rem',
            backdropFilter: 'blur(20px)'
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--serif)',
              fontSize: '1.35rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '1.2rem'
            }}
          >
            Quick Management Shortcuts
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              onClick={() => onSelectTab('projects')}
              className="btn btn-outline"
              style={{ justifyContent: 'space-between', width: '100%', padding: '0.75rem 1rem' }}
            >
              <span>✦ Add / Edit Projects</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={() => onSelectTab('skills')}
              className="btn btn-outline"
              style={{ justifyContent: 'space-between', width: '100%', padding: '0.75rem 1rem' }}
            >
              <span>🧠 Update Technical Skills</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={() => onSelectTab('resume')}
              className="btn btn-outline"
              style={{ justifyContent: 'space-between', width: '100%', padding: '0.75rem 1rem' }}
            >
              <span>📄 Update Resume Document Link</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={() => onSelectTab('jarvis')}
              className="btn btn-outline"
              style={{ justifyContent: 'space-between', width: '100%', padding: '0.75rem 1rem' }}
            >
              <span>⚡ Configure JARVIS Speech Synthesis</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* System Quick Status */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--glass-border)',
            borderRadius: '20px',
            padding: '1.8rem',
            backdropFilter: 'blur(20px)'
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--serif)',
              fontSize: '1.35rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '1.2rem'
            }}
          >
            System Operations
          </h3>

          <div className="switch-wrap">
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldAlert size={14} color="var(--gold)" />
                Maintenance Mode
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Temporarily show maintenance screen to visitors
              </div>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={isMaintenance}
                onChange={(e) => toggleMaintenance(e.target.checked)}
              />
              <span className="slider" />
            </label>
          </div>

          <div className="switch-wrap">
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Volume2 size={14} color="var(--violet-light)" />
                JARVIS Voice Synthesizer
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Enable browser text-to-speech engine
              </div>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={isVoiceActive}
                onChange={(e) => toggleJarvisVoice(e.target.checked)}
              />
              <span className="slider" />
            </label>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--glass-border)',
          borderRadius: '20px',
          padding: '1.8rem',
          backdropFilter: 'blur(20px)'
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--serif)',
            fontSize: '1.35rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Activity size={18} color="var(--gold)" />
          Recent Control Center Activity
        </h3>

        {activityList.length === 0 ? (
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No recent activity logged.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {activityList.slice(0, 6).map((act, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border)',
                  fontSize: '0.85rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--text-primary)' }}>
                  <span style={{ color: 'var(--gold)' }}>✦</span>
                  <span>{act.text}</span>
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{act.time}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
