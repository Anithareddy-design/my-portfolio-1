import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Bot, Save, Volume2, Sparkles } from 'lucide-react';

export default function JarvisTab() {
  const { data, updateJarvis, showToast } = usePortfolio();

  const [formData, setFormData] = useState({
    enabled: true,
    voice: true,
    name: 'JARVIS',
    language: 'English + Telugu',
    wakePhrases: 'Jarvis wakeup, hey Jarvis',
    greeting: "Good morning, Ma'am. I'm JARVIS, your personal AI assistant. How can I help you today?"
  });

  useEffect(() => {
    if (data.jarvis) {
      setFormData({
        enabled: data.jarvis.enabled !== false,
        voice: data.jarvis.voice !== false,
        name: data.jarvis.name || 'JARVIS',
        language: data.jarvis.language || 'English + Telugu',
        wakePhrases: Array.isArray(data.jarvis.wakePhrases)
          ? data.jarvis.wakePhrases.join(', ')
          : data.jarvis.wakePhrases || '',
        greeting: data.jarvis.greeting || ''
      });
    }
  }, [data.jarvis]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedPhrases = formData.wakePhrases
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean);

    updateJarvis({
      ...formData,
      wakePhrases: parsedPhrases
    });
  };

  const handleTestVoice = () => {
    if (!('speechSynthesis' in window)) {
      showToast('Speech synthesis not supported in this browser.', 'warning');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(formData.greeting || "JARVIS online.");
    utterance.rate = 0.95;
    utterance.pitch = 0.92;
    utterance.lang = formData.language === 'Telugu' ? 'te-IN' : 'en-US';
    window.speechSynthesis.speak(utterance);
    showToast('Speaking test greeting aloud...', 'info');
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h3
            style={{
              fontFamily: 'var(--serif)',
              fontSize: '1.5rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}
          >
            <Bot size={22} color="var(--violet-light)" />
            JARVIS AI Engine Configuration
          </h3>

          <span
            style={{
              padding: '0.3rem 0.8rem',
              borderRadius: '100px',
              fontFamily: 'var(--sans)',
              fontSize: '0.72rem',
              fontWeight: 700,
              background: formData.enabled ? 'rgba(39, 201, 63, 0.15)' : 'rgba(255, 95, 86, 0.15)',
              border: `1px solid ${formData.enabled ? 'rgba(39, 201, 63, 0.4)' : 'rgba(255, 95, 86, 0.4)'}`,
              color: formData.enabled ? 'var(--success)' : 'var(--danger)'
            }}
          >
            {formData.enabled ? 'ENGINE ACTIVE' : 'ENGINE DISABLED'}
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Toggles */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="switch-wrap">
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>Master Engine Switch</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Show or hide assistant</div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={formData.enabled}
                  onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                />
                <span className="slider" />
              </label>
            </div>

            <div className="switch-wrap">
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>Voice Speech Synthesis</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Audio voice readout</div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={formData.voice}
                  onChange={(e) => setFormData({ ...formData, voice: e.target.checked })}
                />
                <span className="slider" />
              </label>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="jarvisName">
                Assistant Name
              </label>
              <input
                id="jarvisName"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="jarvisLang">
                Primary Language
              </label>
              <select
                id="jarvisLang"
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                className="form-select"
              >
                <option value="English + Telugu" style={{ background: '#0a101d' }}>English + Telugu</option>
                <option value="English" style={{ background: '#0a101d' }}>English</option>
                <option value="Telugu" style={{ background: '#0a101d' }}>Telugu</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="jarvisWake">
              Wake Phrases (comma separated)
            </label>
            <input
              id="jarvisWake"
              type="text"
              value={formData.wakePhrases}
              onChange={(e) => setFormData({ ...formData, wakePhrases: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="jarvisGreeting">
              Custom Greeting Dialogue
            </label>
            <textarea
              id="jarvisGreeting"
              rows={3}
              value={formData.greeting}
              onChange={(e) => setFormData({ ...formData, greeting: e.target.value })}
              className="form-textarea"
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
            <button type="submit" className="btn btn-gold">
              <Save size={15} />
              Save Settings
            </button>

            <button type="button" onClick={handleTestVoice} className="btn btn-outline">
              <Volume2 size={15} />
              Test Voice Audio ⚡
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
