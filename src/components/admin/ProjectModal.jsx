import React, { useState, useEffect } from 'react';
import { X, Save, Sparkles } from 'lucide-react';

export default function ProjectModal({ isOpen, project, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Web Development',
    description: '',
    link: '',
    github: '',
    tech: '',
    featured: false
  });

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        category: project.category || 'Web Development',
        description: project.description || '',
        link: project.link || '',
        github: project.github || '',
        tech: project.tech || '',
        featured: Boolean(project.featured)
      });
    } else {
      setFormData({
        name: '',
        category: 'Web Development',
        description: '',
        link: '',
        github: '',
        tech: 'HTML, CSS, JavaScript',
        featured: false
      });
    }
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const categories = [
    'Web Development',
    'Web Design',
    'AI Application',
    'UI/UX Design',
    'E-Commerce',
    'Machine Learning',
    'Full Stack'
  ];

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-box">
        <button onClick={onClose} className="modal-close" aria-label="Close Modal">
          <X size={18} />
        </button>

        <h3
          style={{
            fontFamily: 'var(--serif)',
            fontSize: '1.6rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Sparkles size={18} color="var(--gold)" />
          {project ? 'Edit Project' : 'Add New Portfolio Project'}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="projName">
              Project Name *
            </label>
            <input
              id="projName"
              type="text"
              required
              placeholder="e.g. Aureva Brand Portfolio"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="projCategory">
              Category
            </label>
            <select
              id="projCategory"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="form-select"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} style={{ background: '#0a101d' }}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="projDesc">
              Description *
            </label>
            <textarea
              id="projDesc"
              required
              rows={3}
              placeholder="Brief overview of features, UX highlights, or problem solved..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="form-textarea"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="projLink">
                Live Preview URL
              </label>
              <input
                id="projLink"
                type="url"
                placeholder="https://example.vercel.app/"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="projGithub">
                GitHub Repository
              </label>
              <input
                id="projGithub"
                type="url"
                placeholder="https://github.com/..."
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="projTech">
              Technologies (comma separated)
            </label>
            <input
              id="projTech"
              type="text"
              placeholder="React, Tailwind, Vite, AI API"
              value={formData.tech}
              onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
              className="form-input"
            />
          </div>

          {/* Featured checkbox */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', margin: '1rem 0 1.5rem' }}>
            <input
              id="projFeatured"
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              style={{ width: '18px', height: '18px', accentColor: 'var(--gold)', cursor: 'pointer' }}
            />
            <label htmlFor="projFeatured" style={{ fontSize: '0.85rem', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 600 }}>
              Feature this project on hero showcase
            </label>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem' }}>
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-gold">
              <Save size={15} />
              {project ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
