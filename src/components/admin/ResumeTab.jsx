import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { FileText, Save, ExternalLink } from 'lucide-react';

export default function ResumeTab() {
  const { data, updateResume } = usePortfolio();

  const [formData, setFormData] = useState({
    title: '',
    url: ''
  });

  useEffect(() => {
    if (data.resume) {
      setFormData({
        title: data.resume.title || '',
        url: data.resume.url || ''
      });
    }
  }, [data.resume]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateResume(formData);
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease', maxWidth: '700px' }}>
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
            marginBottom: '1.4rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem'
          }}
        >
          <FileText size={20} color="var(--gold)" />
          Resume Document Management
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="resumeTitle">
              Document Display Title
            </label>
            <input
              id="resumeTitle"
              type="text"
              required
              placeholder="e.g. Anita Reddy Resume"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="resumeUrl">
              Resume URL or Asset Path
            </label>
            <input
              id="resumeUrl"
              type="text"
              required
              placeholder="/Updated_Resume_compress.pdf or Google Drive link"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="form-input"
            />
            <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.3rem', display: 'block' }}>
              The local asset <code>/Updated_Resume_compress.pdf</code> is available in your Vite <code>public/</code> folder.
            </small>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
            <button type="submit" className="btn btn-gold">
              <Save size={15} />
              Save Resume Settings
            </button>

            {formData.url && (
              <a
                href={formData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <ExternalLink size={15} />
                Test Preview
              </a>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
