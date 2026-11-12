import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import LoginGate from './LoginGate';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import DashboardTab from './DashboardTab';
import ProjectsTab from './ProjectsTab';
import SkillsTab from './SkillsTab';
import ResumeTab from './ResumeTab';
import ContactTab from './ContactTab';
import JarvisTab from './JarvisTab';
import MessagesTab from './MessagesTab';
import SettingsTab from './SettingsTab';

export default function AdminPortal() {
  const { activeRole } = usePortfolio();

  // Remember authentication state for this session (defaults to true if role already chosen)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(sessionStorage.getItem('anithaAdminAuth') === 'true');
  });

  const [activeTab, setActiveTab] = useState('dashboard');

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
    try {
      sessionStorage.setItem('anithaAdminAuth', 'true');
    } catch (e) {
      console.warn(e);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('anithaAdminAuth');
    } catch (e) {
      console.warn(e);
    }
  };

  if (!isAuthenticated) {
    return <LoginGate onAuthenticated={handleAuthenticated} />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab onSelectTab={setActiveTab} />;
      case 'projects':
        return <ProjectsTab />;
      case 'skills':
        return <SkillsTab />;
      case 'resume':
        return <ResumeTab />;
      case 'contact':
        return <ContactTab />;
      case 'jarvis':
        return <JarvisTab />;
      case 'messages':
        return <MessagesTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <DashboardTab onSelectTab={setActiveTab} />;
    }
  };

  return (
    <div
      className="admin-layout"
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'var(--bg-deep)',
        color: 'var(--text-primary)',
        backgroundImage: `
          radial-gradient(ellipse 60% 80% at 85% 20%, rgba(124, 92, 191, 0.08) 0%, transparent 60%),
          radial-gradient(ellipse 50% 60% at 20% 80%, rgba(26, 143, 255, 0.06) 0%, transparent 60%),
          radial-gradient(ellipse 40% 40% at 50% 50%, rgba(201, 168, 76, 0.04) 0%, transparent 70%)
        `
      }}
    >
      {/* Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onLogout={handleLogout}
      />

      {/* Main Panel Content Area */}
      <main
        style={{
          flex: 1,
          padding: 'clamp(1.5rem, 4vw, 3rem)',
          overflowY: 'auto',
          height: '100vh'
        }}
      >
        <AdminHeader activeTab={activeTab} />
        {renderActiveTab()}
      </main>

      <style>{`
        @media (max-width: 900px) {
          .admin-layout {
            flex-direction: column !important;
          }
          .admin-sidebar {
            width: 100% !important;
            height: auto !important;
            position: relative !important;
          }
        }
      `}</style>
    </div>
  );
}
