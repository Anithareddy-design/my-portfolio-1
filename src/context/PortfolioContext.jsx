import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { defaultData } from '../data/defaultData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const STORAGE_KEY = 'anithaPortfolioAdminData';
const SESSION_ROLE_KEY = 'anithaPortfolioActiveRole';

const PortfolioContext = createContext(null);

function getInitialData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
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
  const [isLoading, setIsLoading] = useState(false);

  // Persist role in sessionStorage
  const setActiveRole = useCallback((role) => {
    setActiveRoleState(role);
    try {
      sessionStorage.setItem(SESSION_ROLE_KEY, role);
    } catch (e) {
      console.warn(e);
    }
  }, []);

  // Toast notification helper
  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3200);
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

  // Fetch all data from Supabase
  const fetchAllData = useCallback(async () => {
    if (!isSupabaseConfigured) return;

    try {
      setIsLoading(true);

      // 1. Fetch Projects
      const { data: dbProjects, error: projErr } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (projErr) console.warn('Supabase projects fetch error:', projErr.message);

      // 2. Fetch Skills
      const { data: dbSkills, error: skillErr } = await supabase
        .from('skills')
        .select('*')
        .order('display_order', { ascending: true })
        .order('level', { ascending: false });

      if (skillErr) console.warn('Supabase skills fetch error:', skillErr.message);

      // 3. Fetch Site Settings
      const { data: dbSite, error: siteErr } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'primary')
        .maybeSingle();

      if (siteErr) console.warn('Supabase site_settings fetch error:', siteErr.message);

      // 4. Fetch Resume Settings
      const { data: dbResume, error: resErr } = await supabase
        .from('resume_settings')
        .select('*')
        .eq('id', 'primary')
        .maybeSingle();

      if (resErr) console.warn('Supabase resume_settings fetch error:', resErr.message);

      // 5. Fetch Jarvis Settings
      const { data: dbJarvis, error: jarvErr } = await supabase
        .from('jarvis_settings')
        .select('*')
        .eq('id', 'primary')
        .maybeSingle();

      if (jarvErr) console.warn('Supabase jarvis_settings fetch error:', jarvErr.message);

      // 6. Fetch Contact Messages (Only works if user is authenticated admin, RLS protects this)
      let dbMessages = null;
      if (activeRole === 'admin') {
        const { data: msgs, error: msgErr } = await supabase
          .from('contact_messages')
          .select('*')
          .order('created_at', { ascending: false });

        if (!msgErr && msgs) {
          dbMessages = msgs.map(m => ({
            id: m.id,
            name: m.name,
            email: m.email,
            message: m.message,
            read: m.read,
            date: new Date(m.created_at).toLocaleString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          }));
        }
      }

      setData((prev) => {
        const next = {
          ...prev,
          projects: (dbProjects && dbProjects.length > 0) ? dbProjects : prev.projects,
          skills: (dbSkills && dbSkills.length > 0) ? dbSkills : prev.skills,
          site: dbSite ? {
            title: dbSite.title || prev.site.title,
            tagline: dbSite.tagline || prev.site.tagline,
            announcement: dbSite.announcement || prev.site.announcement,
            showProjects: dbSite.show_projects ?? prev.site.showProjects,
            showSkills: dbSite.show_skills ?? prev.site.showSkills,
            showJarvis: dbSite.show_jarvis ?? prev.site.showJarvis,
            maintenance: dbSite.maintenance ?? prev.site.maintenance
          } : prev.site,
          resume: dbResume ? {
            title: dbResume.title || prev.resume.title,
            url: dbResume.url || prev.resume.url
          } : prev.resume,
          jarvis: dbJarvis ? {
            ...prev.jarvis,
            enabled: dbJarvis.enabled ?? prev.jarvis.enabled,
            name: dbJarvis.name || prev.jarvis.name,
            language: dbJarvis.language || prev.jarvis.language,
            wakePhrases: dbJarvis.wake_phrases || prev.jarvis.wakePhrases,
            voice: dbJarvis.voice ?? prev.jarvis.voice,
            greeting: dbJarvis.greeting || prev.jarvis.greeting
          } : prev.jarvis,
          messages: dbMessages !== null ? dbMessages : prev.messages
        };

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch (e) {
          console.warn(e);
        }
        return next;
      });
    } catch (err) {
      console.error('Error synchronizing with Supabase:', err);
    } finally {
      setIsLoading(false);
    }
  }, [activeRole]);

  // Initial load & Auth Listener
  useEffect(() => {
    fetchAllData();

    if (!isSupabaseConfigured) return;

    // Check active session on mount
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        // Verify against admin_users table
        const { data: adminRow } = await supabase
          .from('admin_users')
          .select('id')
          .eq('id', session.user.id)
          .maybeSingle();

        if (adminRow) {
          setActiveRole('admin');
          sessionStorage.setItem('anithaAdminAuth', 'true');
        }
      }
    });

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: adminRow } = await supabase
          .from('admin_users')
          .select('id')
          .eq('id', session.user.id)
          .maybeSingle();

        if (adminRow) {
          setActiveRole('admin');
          sessionStorage.setItem('anithaAdminAuth', 'true');
          fetchAllData();
        }
      } else if (event === 'SIGNED_OUT') {
        setActiveRole('guest');
        sessionStorage.removeItem('anithaAdminAuth');
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [fetchAllData, setActiveRole]);

  /* ── PROJECT CRUD ── */
  const addProject = useCallback(async (project) => {
    if (!canEdit()) return false;

    const newProject = {
      name: project.name,
      category: project.category,
      description: project.description,
      link: project.link || '',
      github: project.github || '',
      tech: project.tech || '',
      featured: Boolean(project.featured),
      display_order: Number(project.display_order) || 0
    };

    if (isSupabaseConfigured) {
      const { data: inserted, error } = await supabase
        .from('projects')
        .insert([newProject])
        .select()
        .single();

      if (error) {
        showToast(`Failed to save project: ${error.message}`, 'danger');
        return false;
      }
      if (inserted) {
        setData((prev) => {
          const next = { ...prev, projects: [inserted, ...prev.projects] };
          try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn(e); }
          return next;
        });
      }
    } else {
      const localProject = {
        ...newProject,
        id: 'proj-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
      };
      setData((prev) => {
        const next = { ...prev, projects: [localProject, ...prev.projects] };
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn(e); }
        return next;
      });
    }

    addActivity(`Added new project: "${project.name}"`);
    showToast(`Project "${project.name}" added successfully!`, 'success');
    return true;
  }, [canEdit, addActivity, showToast]);

  const updateProject = useCallback(async (id, updatedFields) => {
    if (!canEdit()) return false;

    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('projects')
        .update({
          name: updatedFields.name,
          category: updatedFields.category,
          description: updatedFields.description,
          link: updatedFields.link,
          github: updatedFields.github,
          tech: updatedFields.tech,
          featured: updatedFields.featured,
          display_order: updatedFields.display_order
        })
        .eq('id', id);

      if (error) {
        showToast(`Failed to update project: ${error.message}`, 'danger');
        return false;
      }
    }

    setData((prev) => {
      const next = {
        ...prev,
        projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
      };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn(e); }
      return next;
    });

    addActivity(`Updated project: "${updatedFields.name || id}"`);
    showToast('Project updated successfully.', 'success');
    return true;
  }, [canEdit, addActivity, showToast]);

  const deleteProject = useCallback(async (id) => {
    if (!canEdit()) return false;

    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        showToast(`Failed to delete project: ${error.message}`, 'danger');
        return false;
      }
    }

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
  const addSkill = useCallback(async (skill) => {
    if (!canEdit()) return false;

    const newSkill = {
      name: skill.name,
      category: skill.category,
      level: Number(skill.level) || 80,
      icon: skill.icon || '✦',
      display_order: Number(skill.display_order) || 0
    };

    if (isSupabaseConfigured) {
      const { data: inserted, error } = await supabase
        .from('skills')
        .insert([newSkill])
        .select()
        .single();

      if (error) {
        showToast(`Failed to add skill: ${error.message}`, 'danger');
        return false;
      }
      if (inserted) {
        setData((prev) => {
          const next = { ...prev, skills: [...prev.skills, inserted] };
          try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn(e); }
          return next;
        });
      }
    } else {
      const localSkill = {
        ...newSkill,
        id: 'skill-' + Date.now().toString(36)
      };
      setData((prev) => {
        const next = { ...prev, skills: [...prev.skills, localSkill] };
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn(e); }
        return next;
      });
    }

    addActivity(`Added technical skill: "${skill.name}"`);
    showToast(`Skill "${skill.name}" added successfully!`, 'success');
    return true;
  }, [canEdit, addActivity, showToast]);

  const updateSkill = useCallback(async (id, updatedFields) => {
    if (!canEdit()) return false;

    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('skills')
        .update({
          name: updatedFields.name,
          category: updatedFields.category,
          level: Number(updatedFields.level),
          icon: updatedFields.icon
        })
        .eq('id', id);

      if (error) {
        showToast(`Failed to update skill: ${error.message}`, 'danger');
        return false;
      }
    }

    setData((prev) => {
      const next = {
        ...prev,
        skills: prev.skills.map((s) => (s.id === id ? { ...s, ...updatedFields, level: Number(updatedFields.level) || s.level } : s))
      };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn(e); }
      return next;
    });

    addActivity(`Updated skill: "${updatedFields.name || id}"`);
    showToast('Skill updated.', 'success');
    return true;
  }, [canEdit, addActivity, showToast]);

  const deleteSkill = useCallback(async (id) => {
    if (!canEdit()) return false;

    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);

      if (error) {
        showToast(`Failed to delete skill: ${error.message}`, 'danger');
        return false;
      }
    }

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
  const updateResume = useCallback(async (resumeData) => {
    if (!canEdit()) return false;

    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('resume_settings')
        .upsert({
          id: 'primary',
          title: resumeData.title,
          url: resumeData.url,
          updated_at: new Date().toISOString()
        });

      if (error) {
        showToast(`Failed to update resume: ${error.message}`, 'danger');
        return false;
      }
    }

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
  const updateJarvis = useCallback(async (jarvisData) => {
    if (!canEdit()) return false;

    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('jarvis_settings')
        .upsert({
          id: 'primary',
          name: jarvisData.name,
          language: jarvisData.language,
          greeting: jarvisData.greeting,
          voice: jarvisData.voice,
          updated_at: new Date().toISOString()
        });

      if (error) {
        showToast(`Failed to update JARVIS settings: ${error.message}`, 'danger');
        return false;
      }
    }

    setData((prev) => {
      const next = { ...prev, jarvis: { ...prev.jarvis, ...jarvisData } };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn(e); }
      return next;
    });

    addActivity('Updated JARVIS voice & response settings');
    showToast('JARVIS configuration saved.', 'success');
    return true;
  }, [canEdit, addActivity, showToast]);

  const toggleJarvisVoice = useCallback(async (enabled) => {
    if (!canEdit()) return false;

    if (isSupabaseConfigured) {
      await supabase
        .from('jarvis_settings')
        .update({ voice: enabled, updated_at: new Date().toISOString() })
        .eq('id', 'primary');
    }

    setData((prev) => {
      const next = { ...prev, jarvis: { ...prev.jarvis, voice: enabled } };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn(e); }
      return next;
    });

    showToast(`JARVIS voice synthesizer ${enabled ? 'enabled' : 'muted'}.`, 'info');
    return true;
  }, [canEdit, showToast]);

  /* ── SITE SETTINGS & MAINTENANCE ── */
  const updateSiteSettings = useCallback(async (siteData) => {
    if (!canEdit()) return false;

    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          id: 'primary',
          title: siteData.title,
          tagline: siteData.tagline,
          announcement: siteData.announcement,
          show_projects: siteData.showProjects,
          show_skills: siteData.showSkills,
          show_jarvis: siteData.showJarvis,
          maintenance: siteData.maintenance,
          updated_at: new Date().toISOString()
        });

      if (error) {
        showToast(`Failed to update site settings: ${error.message}`, 'danger');
        return false;
      }
    }

    setData((prev) => {
      const next = { ...prev, site: { ...prev.site, ...siteData } };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn(e); }
      return next;
    });

    addActivity('Updated global site settings');
    showToast('Site settings updated.', 'success');
    return true;
  }, [canEdit, addActivity, showToast]);

  const toggleMaintenance = useCallback(async (isMaintenance) => {
    if (!canEdit()) return false;

    if (isSupabaseConfigured) {
      await supabase
        .from('site_settings')
        .update({ maintenance: isMaintenance, updated_at: new Date().toISOString() })
        .eq('id', 'primary');
    }

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
  const addMessage = useCallback(async (msg) => {
    const trimmed = {
      name: msg.name.trim(),
      email: msg.email.trim(),
      message: msg.message.trim()
    };

    if (isSupabaseConfigured) {
      const { data: inserted, error } = await supabase
        .from('contact_messages')
        .insert([trimmed])
        .select()
        .single();

      if (error) {
        console.error('Supabase contact submission error:', error);
        throw new Error(error.message);
      }

      const formatted = {
        id: inserted.id,
        name: inserted.name,
        email: inserted.email,
        message: inserted.message,
        read: inserted.read,
        date: new Date(inserted.created_at).toLocaleString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      setData((prev) => {
        const next = { ...prev, messages: [formatted, ...(prev.messages || [])] };
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn(e); }
        return next;
      });
      addActivity(`New visitor message received from ${formatted.name}`);
      return true;
    }

    // Local fallback
    const localMsg = {
      id: 'msg-' + Date.now().toString(36),
      ...trimmed,
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
      const next = { ...prev, messages: [localMsg, ...(prev.messages || [])] };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn(e); }
      return next;
    });
    addActivity(`New visitor message received from ${localMsg.name}`);
    return true;
  }, [addActivity]);

  const toggleMessageRead = useCallback(async (id) => {
    if (!canEdit()) return false;

    const currentMsg = (data.messages || []).find((m) => m.id === id);
    const nextRead = !currentMsg?.read;

    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('contact_messages')
        .update({ read: nextRead })
        .eq('id', id);

      if (error) {
        showToast(`Failed to update message status: ${error.message}`, 'danger');
        return false;
      }
    }

    setData((prev) => {
      const next = { ...prev, messages: prev.messages.map((m) => (m.id === id ? { ...m, read: nextRead } : m)) };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn(e); }
      return next;
    });
    return true;
  }, [canEdit, data.messages, showToast]);

  const deleteMessage = useCallback(async (id) => {
    if (!canEdit()) return false;

    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) {
        showToast(`Failed to delete message: ${error.message}`, 'danger');
        return false;
      }
    }

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
        isLoading,
        fetchAllData,
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
