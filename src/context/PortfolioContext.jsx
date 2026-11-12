import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { defaultData } from '../data/defaultData';

const STORAGE_KEY = 'anithaPortfolioAdminData';
const SESSION_ROLE_KEY = 'anithaPortfolioActiveRole';

const PortfolioContext = createContext(null);

function getInitialData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
      return defaultData;
    }
    const parsed = JSON.parse(saved);
    return {
      ...defaultData,
      ...parsed,
      site: { ...defaultData.site, ...(parsed.site || {}) },
      contact: { ...defaultData.contact, ...(parsed.contact || {}) },
      jarvis: { ...defaultData.jarvis, ...(parsed.jarvis || {}) },
      resume: { ...defaultData.resume, ...(parsed.resume || {}) }
    };
  } catch (err) {
    console.error('Failed to load portfolio data from localStorage:', err);
    return defaultData;
  }
}

function getInitialRole() {
  try {
    return sessionStorage.getItem(SESSION_ROLE_KEY) || 'guest';
  } catch {
    return 'guest';
  }
}

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(getInitialData);
  const [currentView, setCurrentView] = useState('portfolio'); // 'portfolio' | 'admin'
  const [activeRole, setActiveRoleState] = useState(getInitialRole); // 'admin' | 'user' | 'guest'
  const [isJarvisOpen, setIsJarvisOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'info', visible: false });

  // Persist role in sessionStorage
  const setActiveRole = useCallback((role) => {
    setActiveRoleState(role);
    try {
      sessionStorage.setItem(SESSION_ROLE_KEY, role);
    } catch (e) {
      console.warn(e);
    }
  }, []);

  // Toast helper (defined early so other callbacks can reference it)
  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3200);
  }, []);

  // Sync across tabs via window 'storage' listener
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setData(JSON.parse(e.newValue));
        } catch (err) {
          console.error('Storage sync error:', err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Activity logger helper
  const addActivity = useCallback((text) => {
    const time = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    setData((prev) => {
      const updatedActivity = [{ text, time }, ...(prev.activity || [])].slice(0, 12);
      const next = { ...prev, activity: updatedActivity };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.warn(e);
      }
      return next;
    });
  }, []);

  // Permission check
  const canEdit = useCallback(() => {
    if (activeRole !== 'admin') {
      showToast(`🔒 Access Denied: '${activeRole.toUpperCase()}' mode is read-only. Login as ADMIN to make changes.`, 'warning');
      return false;
    }
    return true;
  }, [activeRole, showToast]);

  /* ── PROJECT CRUD ── */
  const addProject = useCallback((project) => {
    if (!canEdit()) return false;
    const newProject = {
      ...project,
      id: 'proj-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
    };
    setData((prev) => {
      const next = { ...prev, projects: [newProject, ...prev.projects] };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn(e); }
      return next;
    });
    addActivity(`Added new project: "${project.name}"`);
    showToast(`Project "${project.name}" added successfully!`, 'success');
    return true;
  }, [canEdit, addActivity, showToast]);

  const updateProject = useCallback((id, updatedFields) => {
    if (!canEdit()) return false;
    setData((prev) => {
      const next = { ...prev, projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)) };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn(e); }
      return next;
    });
    addActivity(`Updated project: "${updatedFields.name || id}"`);
    showToast('Project updated successfully.', 'success');
    return true;
  }, [canEdit, addActivity, showToast]);

  const deleteProject = useCallback((id) => {
    if (!canEdit()) return false;
    let deletedName = id;
    setData((prev) => {
      const proj = prev.projects.find((p) => p.id === id);
      deletedName = proj?.name || id;
      const next = { ...prev, projects: prev.projects.filter((p) => p.id !== id) };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn(e); }
      return next;
    });
    addActivity(`Deleted project: "${deletedName}"`);
    showToast('Project removed.', 'info');
    return true;
  }, [canEdit, addActivity, showToast]);

  /* ── SKILLS CRUD ── */
  const addSkill = useCallback((skill) => {
    if (!canEdit()) return false;
    const newSkill = {
      ...skill,
      id: 'skill-' + Date.now().toString(36),
      level: Number(skill.level) || 80
    };
    setData((prev) => {
      const next = { ...prev, skills: [...prev.skills, newSkill] };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn(e); }
      return next;
    });
    addActivity(`Added technical skill: "${skill.name}"`);
    showToast(`Skill "${skill.name}" added successfully!`, 'success');
    return true;
  }, [canEdit, addActivity, showToast]);

  const updateSkill = useCallback((id, updatedFields) => {
    if (!canEdit()) return false;
    setData((prev) => {
      const next = { ...prev, skills: prev.skills.map((s) => (s.id === id ? { ...s, ...updatedFields, level: Number(updatedFields.level) || s.level } : s)) };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn(e); }
      return next;
    });
    addActivity(`Updated skill: "${updatedFields.name || id}"`);
    showToast('Skill updated.', 'success');
    return true;
  }, [canEdit, addActivity, showToast]);

  const deleteSkill = useCallback((id) => {
    if (!canEdit()) return false;
    let deletedName = id;
    setData((prev) => {
      const skill = prev.skills.find((s) => s.id === id);
      deletedName = skill?.name || id;
      const next = { ...prev, skills: prev.skills.filter((s) => s.id !== id) };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn(e); }
      return next;
    });
    addActivity(`Deleted skill: "${deletedName}"`);
    showToast('Skill deleted.', 'info');
    return true;
  }, [canEdit, addActivity, showToast]);

  /* ── RESUME & CONTACT ── */
  const updateResume = useCallback((resumeData) => {
    if (!canEdit()) return false;
    setData((prev) => {
      const next = { ...prev, resume: { ...prev.resume, ...resumeData } };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn(e); }
      return next;
    });
    addActivity('Updated resume link information');
    showToast('Resume settings saved.', 'success');
    return true;
  }, [canEdit, addActivity, showToast]);

  const updateContact = useCallback((contactData) => {
    if (!canEdit()) return false;
    setData((prev) => {
      const next = { ...prev, contact: { ...prev.contact, ...contactData } };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn(e); }
      return next;
    });
    addActivity('Updated contact & social info');
    showToast('Contact details saved.', 'success');
    return true;
  }, [canEdit, addActivity, showToast]);

  /* ── JARVIS SETTINGS ── */
  const updateJarvis = useCallback((jarvisData) => {
    if (!canEdit()) return false;
    setData((prev) => {
      const next = { ...prev, jarvis: { ...prev.jarvis, ...jarvisData } };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn(e); }
      return next;
    });
    addActivity('Updated JARVIS voice & response settings');
    showToast('JARVIS configuration saved.', 'success');
    return true;
  }, [canEdit, addActivity, showToast]);

  const toggleJarvisVoice = useCallback((enabled) => {
    if (!canEdit()) return false;
    setData((prev) => {
      const next = { ...prev, jarvis: { ...prev.jarvis, voice: enabled } };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn(e); }
      return next;
    });
    showToast(`JARVIS voice synthesizer ${enabled ? 'enabled' : 'muted'}.`, 'info');
    return true;
  }, [canEdit, showToast]);

  /* ── SITE SETTINGS & MAINTENANCE ── */
  const updateSiteSettings = useCallback((siteData) => {
    if (!canEdit()) return false;
    setData((prev) => {
      const next = { ...prev, site: { ...prev.site, ...siteData } };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn(e); }
      return next;
    });
    addActivity('Updated global site settings');
    showToast('Site settings updated.', 'success');
    return true;
  }, [canEdit, addActivity, showToast]);

  const toggleMaintenance = useCallback((isMaintenance) => {
    if (!canEdit()) return false;
    setData((prev) => {
      const next = { ...prev, site: { ...prev.site, maintenance: isMaintenance } };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn(e); }
      return next;
    });
    addActivity(`Site maintenance mode turned ${isMaintenance ? 'ON' : 'OFF'}`);
    showToast(`Maintenance mode turned ${isMaintenance ? 'ON' : 'OFF'}.`, isMaintenance ? 'warning' : 'success');
    return true;
  }, [canEdit, addActivity, showToast]);

  /* ── MESSAGES INBOX ── */
  const addMessage = useCallback((msg) => {
    const newMsg = {
      id: 'msg-' + Date.now().toString(36),
      name: msg.name.trim(),
      email: msg.email.trim(),
      message: msg.message.trim(),
      date: new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      read: false
    };
    setData((prev) => {
      const next = { ...prev, messages: [newMsg, ...(prev.messages || [])] };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn(e); }
      return next;
    });
    addActivity(`New visitor message received from ${newMsg.name}`);
    return true;
  }, [addActivity]);

  const toggleMessageRead = useCallback((id) => {
    if (!canEdit()) return false;
    setData((prev) => {
      const next = { ...prev, messages: prev.messages.map((m) => (m.id === id ? { ...m, read: !m.read } : m)) };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn(e); }
      return next;
    });
    return true;
  }, [canEdit]);

  const deleteMessage = useCallback((id) => {
    if (!canEdit()) return false;
    setData((prev) => {
      const next = { ...prev, messages: prev.messages.filter((m) => m.id !== id) };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn(e); }
      return next;
    });
    addActivity('Deleted a visitor message');
    showToast('Message deleted.', 'info');
    return true;
  }, [canEdit, addActivity, showToast]);

  /* ── BACKUP & RESTORE ── */
  const exportBackup = useCallback(() => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `anita-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addActivity('Exported portfolio backup JSON');
    showToast('Backup file downloaded.', 'success');
  }, [data, addActivity, showToast]);

  const importBackup = useCallback((jsonData) => {
    if (!canEdit()) return false;
    try {
      if (!jsonData.projects || !jsonData.skills || !jsonData.contact) {
        throw new Error('Invalid schema format');
      }
      const restored = {
        ...defaultData,
        ...jsonData,
        site: { ...defaultData.site, ...(jsonData.site || {}) },
        contact: { ...defaultData.contact, ...(jsonData.contact || {}) },
        jarvis: { ...defaultData.jarvis, ...(jsonData.jarvis || {}) },
        resume: { ...defaultData.resume, ...(jsonData.resume || {}) }
      };
      setData(restored);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(restored)); } catch (e) { console.warn(e); }
      addActivity('Imported portfolio backup JSON data');
      showToast('Data imported successfully!', 'success');
      return true;
    } catch (err) {
      showToast('Error importing file: Invalid format.', 'danger');
      return false;
    }
  }, [canEdit, addActivity, showToast]);

  const resetData = useCallback(() => {
    if (!canEdit()) return false;
    setData(defaultData);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData)); } catch (e) { console.warn(e); }
    addActivity('Restored demo system data');
    showToast('Demo data restored successfully.', 'info');
    return true;
  }, [canEdit, addActivity, showToast]);

  const unreadMessagesCount = (data.messages || []).filter((m) => !m.read).length;

  return (
    <PortfolioContext.Provider
      value={{
        data,
        currentView,
        setCurrentView,
        activeRole,
        setActiveRole,
        isJarvisOpen,
        openJarvis: () => setIsJarvisOpen(true),
        closeJarvis: () => setIsJarvisOpen(false),
        toast,
        showToast,
        unreadMessagesCount,
        canEdit,
        // CRUD actions
        addProject,
        updateProject,
        deleteProject,
        addSkill,
        updateSkill,
        deleteSkill,
        updateResume,
        updateContact,
        updateJarvis,
        toggleJarvisVoice,
        updateSiteSettings,
        toggleMaintenance,
        addMessage,
        toggleMessageRead,
        deleteMessage,
        exportBackup,
        importBackup,
        resetData
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
