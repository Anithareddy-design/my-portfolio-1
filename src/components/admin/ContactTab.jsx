import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Mail, Save, RefreshCw } from 'lucide-react';

export default function ContactTab() {
  const { data, updateContact, showToast } = usePortfolio();

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    instagram: '',
    availability: 'Available for internships'
  });

  useEffect(() => {
    if (data.contact) {
      setFormData({
        email: data.contact.email || '',
        phone: data.contact.phone || '',
        location: data.contact.location || '',
        linkedin: data.contact.linkedin || '',
        github: data.contact.github || '',
        instagram: data.contact.instagram || '',
        availability: data.contact.availability || 'Available for internships'
      });
    }
  }, [data.contact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateContact(formData);
  };

  const handleClear = () => {
    if (window.confirm('Reset all contact info to blanks?')) {
      const cleared = {
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        github: '',
        instagram: '',
        availability: 'Currently unavailable'
      };
      setFormData(cleared);
      updateContact(cleared);
      showToast('Contact fields cleared.', 'info');
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease', maxWidth: '800px' }}>
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
          <Mail size={20} color="var(--gold)" />
          Contact &amp; Social Profile Information
        </h3>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="contactEmail">
                Email Address
              </label>
              <input
                id="contactEmail"
                type="email"
                placeholder="anitha@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contactPhone">
                Phone Number
              </label>
              <input
                id="contactPhone"
                type="text"
                placeholder="+91 21 00 2606"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="contactLocation">
                Location
              </label>
              <input
                id="contactLocation"
                type="text"
                placeholder="Vijayawada, Andhra Pradesh, India"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contactAvailability">
                Availability Status
              </label>
              <select
                id="contactAvailability"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="form-select"
              >
                <option value="Available for internships" style={{ background: '#0a101d' }}>Available for internships</option>
                <option value="Available for freelance & contract" style={{ background: '#0a101d' }}>Available for freelance & contract</option>
                <option value="Open to full-time roles" style={{ background: '#0a101d' }}>Open to full-time roles</option>
                <option value="Currently unavailable" style={{ background: '#0a101d' }}>Currently unavailable</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="contactLinkedin">
              LinkedIn Profile URL
            </label>
            <input
              id="contactLinkedin"
              type="url"
              placeholder="https://www.linkedin.com/in/..."
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              className="form-input"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="contactGithub">
                GitHub Profile URL
              </label>
              <input
                id="contactGithub"
                type="url"
                placeholder="https://github.com/..."
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contactInstagram">
                Instagram URL (Optional)
              </label>
              <input
                id="contactInstagram"
                type="url"
                placeholder="https://instagram.com/..."
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.8rem' }}>
            <button type="submit" className="btn btn-gold">
              <Save size={15} />
              Save Contact Details
            </button>

            <button type="button" onClick={handleClear} className="btn btn-outline">
              <RefreshCw size={14} />
              Clear Fields
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
