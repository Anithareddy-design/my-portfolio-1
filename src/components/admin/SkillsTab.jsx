import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import SkillModal from './SkillModal';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function SkillsTab() {
  const { data, addSkill, updateSkill, deleteSkill } = usePortfolio();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  const handleOpenAdd = () => {
    setEditingSkill(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (skill) => {
    setEditingSkill(skill);
    setIsModalOpen(true);
  };

  const handleSave = (skillData) => {
    if (editingSkill) {
      updateSkill(editingSkill.id, skillData);
    } else {
      addSkill(skillData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete skill "${name}"?`)) {
      deleteSkill(id);
    }
  };

  const skills = data.skills || [];

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      {/* Top Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem'
        }}
      >
        <div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.6rem', color: 'var(--text-primary)' }}>
            Technical Skills ({skills.length})
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Configure icons, categories, and proficiency levels rendered on the portfolio.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn btn-gold">
          <Plus size={16} />
          Add Skill
        </button>
      </div>

      {/* Skills Grid */}
      {skills.length === 0 ? (
        <div
          style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            background: 'var(--bg-card)',
            borderRadius: '20px',
            border: '1px solid var(--border)'
          }}
        >
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.2rem' }}>
            No technical skills found in your inventory.
          </p>
          <button onClick={handleOpenAdd} className="btn btn-gold">
            <Plus size={15} />
            Add First Skill
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.2rem'
          }}
        >
          {skills.map((skill) => (
            <div
              key={skill.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--glass-border)',
                borderRadius: '16px',
                padding: '1.4rem',
                backdropFilter: 'blur(16px)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'var(--gold-pale)',
                      border: '1px solid rgba(201, 168, 76, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.3rem'
                    }}
                  >
                    {skill.icon || '✦'}
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.98rem', color: 'var(--text-primary)' }}>
                      {skill.name}
                    </strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {skill.category}
                    </div>
                  </div>
                </div>

                <span
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--gold)'
                  }}
                >
                  {skill.level}%
                </span>
              </div>

              {/* Progress track */}
              <div
                style={{
                  width: '100%',
                  height: '5px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  overflow: 'hidden',
                  margin: '0.6rem 0 1.2rem'
                }}
              >
                <div
                  style={{
                    width: `${skill.level}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--gold), var(--gold-light))'
                  }}
                />
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: 'auto' }}>
                <button
                  onClick={() => handleOpenEdit(skill)}
                  className="btn btn-outline"
                  style={{ flex: 1, padding: '0.4rem 0.6rem', fontSize: '0.72rem' }}
                >
                  <Edit2 size={12} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(skill.id, skill.name)}
                  className="btn btn-danger"
                  style={{ padding: '0.4rem 0.6rem', fontSize: '0.72rem' }}
                  title="Delete skill"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <SkillModal
        isOpen={isModalOpen}
        skill={editingSkill}
        onSave={handleSave}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
