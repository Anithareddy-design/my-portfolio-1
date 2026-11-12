import React, { useState, useEffect } from 'react';
import { X, Save, Cpu } from 'lucide-react';

export default function SkillModal({ isOpen, skill, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Programming',
    level: 80,
    icon: '✦'
  });

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name || '',
        category: skill.category || 'Programming',
        level: skill.level || 80,
        icon: skill.icon || '✦'
      });
    } else {
      setFormData({
        name: '',
        category: 'Programming',
        level: 80,
        icon: '✦'
      });
    }
  }, [skill, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const categories = [
    'Programming',
    'AI & Tools',
    'Web Development',
    'Design',
    'Cloud & DevOps',
    'Database',
    'Other'
  ];

  const presetIcons = ['🐍', '🤖', '✨', '🎨', '⚡', '🧠', '💻', '🖌️', '🌍', '🔥', '🚀', '✦'];

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
          <Cpu size={18} color="var(--gold)" />
          {skill ? 'Edit Technical Skill' : 'Add New Skill'}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="skillName">
              Skill Name *
            </label>
            <input
              id="skillName"
              type="text"
              required
              placeholder="e.g. Prompt Engineering"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="skillCategory">
              Category
            </label>
            <select
              id="skillCategory"
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

          {/* Icon / Emoji Selection */}
          <div className="form-group">
            <label className="form-label" htmlFor="skillIcon">
              Skill Icon / Emoji
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.6rem' }}>
              <input
                id="skillIcon"
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="form-input"
                style={{ width: '80px', textAlign: 'center', fontSize: '1.3rem' }}
              />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Select a preset or type any emoji / symbol
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {presetIcons.map((ic) => (
                <button
                  key={ic}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon: ic })}
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    border: formData.icon === ic ? '1px solid var(--gold)' : '1px solid var(--border)',
                    background: formData.icon === ic ? 'var(--gold-pale)' : 'rgba(255, 255, 255, 0.03)',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>

          {/* Proficiency Slider */}
          <div className="form-group" style={{ marginTop: '1.4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <label className="form-label" htmlFor="skillLevel">
                Proficiency Level
              </label>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, color: 'var(--gold)', fontSize: '0.85rem' }}>
                {formData.level}%
              </span>
            </div>
            <input
              id="skillLevel"
              type="range"
              min="10"
              max="100"
              step="5"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
              style={{ width: '100%', accentColor: 'var(--gold)', cursor: 'pointer' }}
            />
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginTop: '2rem' }}>
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-gold">
              <Save size={15} />
              {skill ? 'Update Skill' : 'Save Skill'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
