import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Settings, Save, Download, Upload, RotateCcw, AlertTriangle } from 'lucide-react';

export default function SettingsTab() {
  const { data, updateSiteSettings, exportBackup, importBackup, resetData } = usePortfolio();

  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    announcement: '',
    showProjects: true,
    showSkills: true,
    showJarvis: true,
    maintenance: false
  });

  useEffect(() => {
    if (data.site) {
      setFormData({
        title: data.site.title || '',
        tagline: data.site.tagline || '',
        announcement: data.site.announcement || '',
        showProjects: data.site.showProjects !== false,
        showSkills: data.site.showSkills !== false,
        showJarvis: data.site.showJarvis !== false,
        maintenance: Boolean(data.site.maintenance)
      });
    }
  }, [data.site]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSiteSettings(formData);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        importBackup(json);
      } catch (err) {
        alert('Invalid JSON backup file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease', maxWidth: '850px' }}>
      {/* Site Meta Configuration */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--glass-border)',
          borderRadius: '22px',
          padding: '2.2rem',
          backdropFilter: 'blur(20px)',
          marginBottom: '2rem'
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--serif)',
            fontSize: '1.5rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '1.4rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem'
          }}
        >
          <Settings size={20} color="var(--gold)" />
          Global Portfolio &amp; Hero Settings
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="siteTitle">
              Public Page Title
            </label>
            <input
              id="siteTitle"
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="siteAnnouncement">
              Hero Announcement Pill Tag
            </label>
            <input
              id="siteAnnouncement"
              type="text"
              value={formData.announcement}
              onChange={(e) => setFormData({ ...formData, announcement: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="siteTagline">
              Hero Introduction Tagline
            </label>
            <textarea
              id="siteTagline"
              rows={2}
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="form-textarea"
            />
          </div>

          {/* Visibility Section Toggles */}
          <h4
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              margin: '1.8rem 0 1rem'
            }}
          >
            Section Visibility &amp; Operational Gates
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div className="switch-wrap">
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.86rem' }}>Selected Work</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Show Projects section</div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={formData.showProjects}
                  onChange={(e) => setFormData({ ...formData, showProjects: e.target.checked })}
                />
                <span className="slider" />
              </label>
            </div>

            <div className="switch-wrap">
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.86rem' }}>Technical Skills</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Show Skills section</div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={formData.showSkills}
                  onChange={(e) => setFormData({ ...formData, showSkills: e.target.checked })}
                />
                <span className="slider" />
              </label>
            </div>

            <div className="switch-wrap">
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.86rem' }}>JARVIS Assistant</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Show JARVIS section</div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={formData.showJarvis}
                  onChange={(e) => setFormData({ ...formData, showJarvis: e.target.checked })}
                />
                <span className="slider" />
              </label>
            </div>

            <div className="switch-wrap">
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.86rem' }}>Maintenance Gate</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Redirect public visitors</div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={formData.maintenance}
                  onChange={(e) => setFormData({ ...formData, maintenance: e.target.checked })}
                />
                <span className="slider" />
              </label>
            </div>
          </div>

          <div style={{ marginTop: '1.8rem' }}>
            <button type="submit" className="btn btn-gold">
              <Save size={15} />
              Save Site Settings
            </button>
          </div>
        </form>
      </div>

      {/* Data Backup & Restore */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--glass-border)',
          borderRadius: '22px',
          padding: '2.2rem',
          backdropFilter: 'blur(20px)'
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--serif)',
            fontSize: '1.5rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '0.6rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem'
          }}
        >
          <Download size={20} color="var(--gold)" />
          Backup &amp; Data Recovery
        </h3>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Download a complete JSON snapshot of all projects, skills, contact records, messages, and site configuration, or import an existing snapshot.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <button onClick={exportBackup} className="btn btn-outline">
            <Download size={15} />
            Export JSON Backup
          </button>

          <label className="btn btn-outline" style={{ cursor: 'pointer' }}>
            <Upload size={15} />
            Import JSON Backup
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </label>

          <button
            onClick={() => {
              if (window.confirm('Reset all data to default demo state? Any unsaved edits will be cleared.')) {
                resetData();
              }
            }}
            className="btn btn-danger"
          >
            <RotateCcw size={15} />
            Reset to Demo Data
          </button>
        </div>
      </div>
    </div>
  );
}
