import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Volume2, VolumeX, Monitor, Sparkles } from 'lucide-react';

export default function JarvisOverlay() {
  const { isJarvisOpen, closeJarvis, data } = usePortfolio();

  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceMuted, setVoiceMuted] = useState(false);
  const [showDesktopNote, setShowDesktopNote] = useState(false);

  const typingTimerRef = useRef(null);
  const utteranceRef = useRef(null);

  const jarvisName = data.jarvis?.name || 'JARVIS';
  const defaultGreeting =
    data.jarvis?.greeting ||
    `Hello Ma'am Anita. I am ${jarvisName}, your personal AI assistant. How may I assist your workflow today?`;

  // Speech synthesis speaker
  const speakText = useCallback(
    (text) => {
      if (!('speechSynthesis' in window)) return;
      if (voiceMuted || data.jarvis?.voice === false) return;

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 0.92;
      utterance.volume = 0.9;

      if (data.jarvis?.language === 'Telugu') {
        utterance.lang = 'te-IN';
      } else {
        utterance.lang = 'en-US';
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [voiceMuted, data.jarvis]
  );

  // Typewriter effect
  const typeMessage = useCallback(
    (targetText, speak = true) => {
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
      }

      setMessage('');
      setIsTyping(true);

      if (speak) {
        speakText(targetText);
      }

      let i = 0;
      typingTimerRef.current = setInterval(() => {
        if (i < targetText.length) {
          setMessage(targetText.slice(0, i + 1));
          i++;
        } else {
          setIsTyping(false);
          clearInterval(typingTimerRef.current);
        }
      }, 25);
    },
    [speakText]
  );

  // Trigger default greeting when opened
  useEffect(() => {
    if (isJarvisOpen) {
      document.body.style.overflow = 'hidden';
      typeMessage(defaultGreeting, true);
    } else {
      document.body.style.overflow = '';
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsTyping(false);
    }

    return () => {
      document.body.style.overflow = '';
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, [isJarvisOpen, defaultGreeting, typeMessage]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isJarvisOpen) {
        closeJarvis();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isJarvisOpen, closeJarvis]);

  if (!isJarvisOpen) return null;

  const handleQuery = (queryType) => {
    if (queryType === 'about') {
      typeMessage(
        `${jarvisName} is an evolving personal AI assistant built by Anita Reddy, designed to make everyday computing intuitive, natural, and personal. It understands screen contexts, processes voice, and automates tasks.`,
        true
      );
    } else if (queryType === 'caps') {
      typeMessage(
        'My capabilities include: Real-time Screen Analysis, Natural Voice Speech Synthesis, Persistent Memory for task context, and Intelligent System Workflow Automation.',
        true
      );
    } else if (queryType === 'anita') {
      typeMessage(
        'Anita Reddy is a visionary Computer Science student at KL University, specializing in Prompt Engineering, Generative AI models, and modern frontend architectures.',
        true
      );
    } else if (queryType === 'diagnostics') {
      typeMessage(
        `All systems operational. Voice Synthesizer: ${data.jarvis?.voice !== false ? 'ONLINE' : 'MUTED'}. Active Language: ${data.jarvis?.language || 'English'}. Host Connection: STABLE.`,
        true
      );
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="JARVIS OS Interface"
      onClick={(e) => e.target === e.currentTarget && closeJarvis()}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(1, 3, 7, 0.96)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.3s ease'
      }}
    >
      {/* Background Orbital Rings */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '680px',
            height: '680px',
            borderRadius: '50%',
            border: '1px solid rgba(124, 92, 191, 0.12)',
            transform: 'translate(-50%, -50%)',
            animation: 'spin 22s linear infinite'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            border: '1px solid rgba(26, 143, 255, 0.1)',
            transform: 'translate(-50%, -50%)',
            animation: 'spin 14s linear infinite reverse'
          }}
        />
      </div>

      {/* Main Glass Panel */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: 'min(680px, 94vw)',
          background: 'rgba(6, 11, 22, 0.92)',
          border: '1px solid rgba(124, 92, 191, 0.3)',
          borderRadius: '28px',
          padding: 'clamp(2rem, 5vw, 3rem)',
          backdropFilter: 'blur(40px)',
          boxShadow: '0 0 100px rgba(124, 92, 191, 0.2), 0 32px 80px rgba(0, 0, 0, 0.8)',
          textAlign: 'center'
        }}
      >
        {/* Close Button */}
        <button
          onClick={closeJarvis}
          aria-label="Close Assistant"
          style={{
            position: 'absolute',
            top: '1.2rem',
            right: '1.2rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1px solid var(--border)',
            background: 'transparent',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.25s'
          }}
          className="jos-btn-close"
        >
          <X size={18} />
        </button>

        {/* Audio Mute/Unmute Toggle */}
        <button
          onClick={() => {
            const next = !voiceMuted;
            setVoiceMuted(next);
            if (next && 'speechSynthesis' in window) {
              window.speechSynthesis.cancel();
              setIsSpeaking(false);
            }
          }}
          title={voiceMuted ? 'Unmute voice' : 'Mute voice'}
          style={{
            position: 'absolute',
            top: '1.2rem',
            left: '1.2rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1px solid var(--border)',
            background: 'transparent',
            color: voiceMuted ? 'var(--danger)' : 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {voiceMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>

        {/* Pulsing Eye Core */}
        <div
          style={{
            width: '96px',
            height: '96px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, var(--violet-light) 0%, var(--violet) 35%, #100028 80%)',
            boxShadow: '0 0 50px rgba(124, 92, 191, 0.7), 0 0 100px rgba(124, 92, 191, 0.3)',
            margin: '0 auto 1.4rem',
            animation: 'eye-glow 2.5s ease-in-out infinite',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 25% 25%, #fff 0%, rgba(0, 238, 255, 0.9) 50%, transparent 100%)',
              boxShadow: '0 0 20px rgba(0, 238, 255, 0.9)'
            }}
          />
        </div>

        <div
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--violet-light)',
            marginBottom: '0.4rem'
          }}
        >
          J.A.R.V.I.S &mdash; Neural AI Interface
        </div>

        <h2
          style={{
            fontFamily: 'var(--serif)',
            fontSize: '2.5rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '0.25rem'
          }}
        >
          Hello, <span style={{ color: 'var(--violet-light)', fontStyle: 'italic' }}>Anita.</span>
        </h2>

        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', letterSpacing: '0.04em', marginBottom: '1.8rem' }}>
          Personal AI System Online &bull; Neural Sync Ready
        </div>

        {/* Animated Soundwave Visualizer Bars */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            height: '36px',
            marginBottom: '1.8rem'
          }}
        >
          {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1].map((delay, index) => (
            <div
              key={index}
              style={{
                width: '3.5px',
                borderRadius: '10px',
                background: 'linear-gradient(to top, var(--violet), var(--blue-electric))',
                animation: isSpeaking || isTyping ? `wave 0.85s ease-in-out infinite alternate` : 'none',
                animationDelay: `${delay}s`,
                height: isSpeaking || isTyping ? '26px' : '6px',
                opacity: isSpeaking || isTyping ? 1 : 0.4,
                transition: 'height 0.3s'
              }}
            />
          ))}
        </div>

        {/* Dynamic Typewritten Message Box */}
        <div
          style={{
            fontSize: '1.05rem',
            color: 'var(--text-primary)',
            lineHeight: 1.85,
            minHeight: '4.5rem',
            marginBottom: '2rem',
            fontStyle: 'italic',
            padding: '0 1rem'
          }}
        >
          &ldquo;{message}&rdquo;
          {isTyping && (
            <span
              style={{
                display: 'inline-block',
                width: '2px',
                height: '1.1em',
                background: 'var(--gold)',
                marginLeft: '3px',
                animation: 'blink 0.8s infinite',
                verticalAlign: 'middle'
              }}
            />
          )}
        </div>

        {/* Interactive Query Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginBottom: '2rem' }}>
          <button
            onClick={() => handleQuery('about')}
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '0.78rem',
              fontWeight: 600,
              padding: '0.65rem 1.2rem',
              borderRadius: '8px',
              cursor: 'pointer',
              background: 'rgba(124, 92, 191, 0.16)',
              borderColor: 'rgba(124, 92, 191, 0.4)',
              color: 'var(--violet-light)',
              border: '1px solid',
              transition: 'all 0.25s'
            }}
            className="chip-hover"
          >
            About JARVIS
          </button>

          <button
            onClick={() => handleQuery('caps')}
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '0.78rem',
              fontWeight: 600,
              padding: '0.65rem 1.2rem',
              borderRadius: '8px',
              cursor: 'pointer',
              background: 'var(--gold-pale)',
              borderColor: 'rgba(201, 168, 76, 0.4)',
              color: 'var(--gold)',
              border: '1px solid',
              transition: 'all 0.25s'
            }}
            className="chip-hover"
          >
            Capabilities
          </button>

          <button
            onClick={() => handleQuery('anita')}
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '0.78rem',
              fontWeight: 600,
              padding: '0.65rem 1.2rem',
              borderRadius: '8px',
              cursor: 'pointer',
              background: 'var(--blue-pale)',
              borderColor: 'rgba(26, 143, 255, 0.35)',
              color: 'var(--blue-electric)',
              border: '1px solid',
              transition: 'all 0.25s'
            }}
            className="chip-hover"
          >
            Who is Anita?
          </button>

          <button
            onClick={() => handleQuery('diagnostics')}
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '0.78rem',
              fontWeight: 600,
              padding: '0.65rem 1.2rem',
              borderRadius: '8px',
              cursor: 'pointer',
              background: 'rgba(255, 255, 255, 0.04)',
              borderColor: 'var(--border)',
              color: 'var(--text-secondary)',
              border: '1px solid',
              transition: 'all 0.25s'
            }}
            className="chip-hover"
          >
            Diagnostics
          </button>
        </div>

        {/* Desktop App Launcher Note */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
          <button
            onClick={() => setShowDesktopNote(!showDesktopNote)}
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '0.76rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: 'var(--blue-electric)',
              background: 'rgba(0, 238, 255, 0.08)',
              border: '1px solid rgba(0, 238, 255, 0.25)',
              padding: '0.55rem 1.2rem',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              transition: 'all 0.25s'
            }}
          >
            <Monitor size={14} />
            Launch Desktop Assistant
          </button>

          {showDesktopNote && (
            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                marginTop: '0.4rem',
                fontStyle: 'italic',
                animation: 'fadeIn 0.3s ease'
              }}
            >
              Desktop JARVIS connects locally through Anita&rsquo;s Python speech and screen understanding engine.
            </div>
          )}
        </div>
      </div>

      <style>{`
        .jos-btn-close:hover {
          border-color: var(--gold) !important;
          color: var(--gold) !important;
          background: var(--gold-pale) !important;
        }
        .chip-hover:hover {
          transform: translateY(-2px);
          filter: brightness(1.2);
        }
      `}</style>
    </div>
  );
}
