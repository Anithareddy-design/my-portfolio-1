import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import ProjectModal from './ProjectModal';
import { Plus, Edit2, Trash2, ExternalLink, Star } from 'lucide-react';

export default function ProjectsTab() {
  const { data, addProject, updateProject, deleteProject } = usePortfolio();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const handleOpenAdd = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleSave = (projectData) => {
    if (editingProject) {
      updateProject(editingProject.id, projectData);
    } else {
      addProject(projectData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from your portfolio?`)) {
      deleteProject(id);
    }
  };

  const projects = data.projects || [];

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      {/* Top action bar */}
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
            All Projects ({projects.length})
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Changes sync instantly to the public portfolio.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn btn-gold">
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {/* Projects List */}
      {projects.length === 0 ? (
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
            No projects added to your portfolio yet.
          </p>
          <button onClick={handleOpenAdd} className="btn btn-gold">
            <Plus size={15} />
            Create Your First Project
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--glass-border)',
                borderRadius: '18px',
                padding: '1.6rem',
                backdropFilter: 'blur(16px)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)'
                  }}
                >
                  {project.category}
                </span>

                {project.featured && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                      fontSize: '0.66rem',
                      fontWeight: 800,
                      color: 'var(--gold-light)',
                      background: 'var(--gold-pale)',
                      border: '1px solid rgba(201,168,76,0.3)',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px'
                    }}
                  >
                    <Star size={10} fill="currentColor" />
                    Featured
                  </span>
                )}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.6rem'
                }}
              >
                {project.name}
              </h3>

              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.2rem', flex: 1 }}>
                {project.description}
              </p>

              {/* Technologies */}
              {project.tech && (
                <div
                  style={{
                    fontSize: '0.74rem',
                    color: 'var(--blue-electric)',
                    background: 'var(--blue-pale)',
                    padding: '0.35rem 0.65rem',
                    borderRadius: '6px',
                    marginBottom: '1.4rem',
                    width: 'fit-content'
                  }}
                >
                  {project.tech}
                </div>
              )}

              {/* Card Actions */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border)',
                  marginTop: 'auto'
                }}
              >
                <button
                  onClick={() => handleOpenEdit(project)}
                  className="btn btn-outline"
                  style={{ flex: 1, padding: '0.45rem 0.8rem', fontSize: '0.74rem' }}
                >
                  <Edit2 size={13} />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(project.id, project.name)}
                  className="btn btn-danger"
                  style={{ padding: '0.45rem 0.8rem', fontSize: '0.74rem' }}
                  title="Delete project"
                >
                  <Trash2 size={13} />
                </button>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ padding: '0.45rem 0.7rem' }}
                    title="View live"
                  >
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        project={editingProject}
        onSave={handleSave}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
