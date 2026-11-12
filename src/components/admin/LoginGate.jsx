import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { Shield, Users, UserCheck, Eye, Lock, Mail, Loader2 } from 'lucide-react';

export default function LoginGate({ onAuthenticated }) {
  const { setActiveRole, setCurrentView, showToast, fetchAllData } = usePortfolio();

  const [selectedRole, setSelectedRole] = useState('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (selectedRole === 'admin') {
      if (!isSupabaseConfigured) {
        setError('Supabase is not configured yet. Please set VITE_SUPABASE_ANON_KEY in your environment.');
        return;
      }

      try {
        setIsAuthenticating(true);

        // 1. Authenticate with Supabase Auth
        const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password
        });

        if (authErr) {
          setError(authErr.message || 'Invalid email or password.');
          setIsAuthenticating(false);
          return;
        }

        // 2. Strict Whitelist Check: Verify user is an authorized admin
        const { data: adminRow, error: adminErr } = await supabase
          .from('admin_users')
          .select('id')
          .eq('id', authData.user.id)
          .maybeSingle();

        if (adminErr || !adminRow) {
          await supabase.auth.signOut();
          setError('Access Denied: This account is authenticated but not whitelisted in the admin_users table.');
          setIsAuthenticating(false);
          return;
        }

        // 3. Grant Admin Session
        setActiveRole('admin');
        sessionStorage.setItem('anithaAdminAuth', 'true');
        showToast('Authenticated as Administrator (Full Access).', 'success');
        if (fetchAllData) fetchAllData();
        onAuthenticated();
      } catch (err) {
        setError(err.message || 'An unexpected error occurred during authentication.');
      } finally {
        setIsAuthenticating(false);
      }
    } else if (selectedRole === 'user') {
      setActiveRole('user');
      sessionStorage.setItem('anithaAdminAuth', 'false');
      showToast('Entered as Standard User (Read-Only Mode).', 'info');
      onAuthenticated();
    } else {
      setActiveRole('guest');
      sessionStorage.setItem('anithaAdminAuth', 'false');
      showToast('Entered as Guest (Read-Only Mode).', 'info');
      onAuthenticated();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3500,
        background: 'rgba(2, 4, 8, 0.96)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
    >
      <div
        className="login-card"
        style={{
          width: 'min(460px, 100%)',
          background: 'var(--bg-card)',
          border: '1px solid var(--glass-border)',
          borderRadius: '28px',
          padding: '2.8rem 2.2rem',
          backdropFilter: 'blur(28px)',
          boxShadow: '0 32px 80px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(201, 168, 76, 0.2)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Top Gradient Accent Bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, var(--gold), var(--violet), var(--blue))'
          }}
        />

        <div
          style={{
            fontFamily: 'var(--serif)',
            fontSize: '2.5rem',
            fontWeight: 600,
            color: 'var(--gold)',
            letterSpacing: '0.05em',
            marginBottom: '0.2rem'
          }}
        >
          AR.
        </div>
        <div
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '0.74rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '1.8rem'
          }}
        >
          Control Center Portal Gate
        </div>

        {/* Role Selector Segmented Control */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.4rem',
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '4px',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            marginBottom: '1.8rem'
          }}
        >
          <button
            type="button"
            onClick={() => {
              setSelectedRole('admin');
              setError('');
            }}
            style={{
              padding: '0.65rem 0.4rem',
              borderRadius: '8px',
              border: selectedRole === 'admin' ? '1px solid rgba(201,168,76,0.35)' : 'none',
              background: selectedRole === 'admin' ? 'var(--gold-pale)' : 'transparent',
              color: selectedRole === 'admin' ? 'var(--gold)' : 'var(--text-secondary)',
              fontFamily: 'var(--sans)',
              fontSize: '0.76rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              transition: 'all 0.25s'
            }}
          >
            <Shield size={13} />
            Admin
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedRole('user');
              setError('');
            }}
            style={{
              padding: '0.65rem 0.4rem',
              borderRadius: '8px',
              border: selectedRole === 'user' ? '1px solid rgba(124,92,191,0.35)' : 'none',
              background: selectedRole === 'user' ? 'var(--violet-pale)' : 'transparent',
              color: selectedRole === 'user' ? 'var(--violet-light)' : 'var(--text-secondary)',
              fontFamily: 'var(--sans)',
              fontSize: '0.76rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              transition: 'all 0.25s'
            }}
          >
            <Users size={13} />
            User
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedRole('guest');
              setError('');
            }}
            style={{
              padding: '0.65rem 0.4rem',
              borderRadius: '8px',
              border: selectedRole === 'guest' ? '1px solid rgba(0,238,255,0.35)' : 'none',
              background: selectedRole === 'guest' ? 'var(--blue-pale)' : 'transparent',
              color: selectedRole === 'guest' ? 'var(--blue-electric)' : 'var(--text-secondary)',
              fontFamily: 'var(--sans)',
              fontSize: '0.76rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              transition: 'all 0.25s'
            }}
          >
            <UserCheck size={13} />
            Guest
          </button>
        </div>

        {/* Dynamic Form */}
        <form onSubmit={handleSubmit}>
          {selectedRole === 'admin' ? (
            <div>
              <div className="form-group">
                <label className="form-label" htmlFor="loginEmail">
                  Admin Email
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="loginEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                    placeholder="admin@example.com"
                    required
                  />
                  <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="loginPassword">
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="loginPassword"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                    placeholder="••••••••"
                    required
                  />
                  <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                padding: '1.2rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border)',
                marginBottom: '1.5rem',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6
              }}
            >
              {selectedRole === 'user'
                ? 'Standard User Mode allows browsing the dashboard, viewing projects, sending messages, and testing JARVIS with standard permissions.'
                : 'Guest Mode provides a clean, spectator preview of the dashboard and portfolio metrics without write permissions.'}
            </div>
          )}

          {error && (
            <div style={{ color: 'var(--danger)', fontSize: '0.82rem', marginBottom: '1rem', fontWeight: 600 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isAuthenticating}
            className="btn btn-gold"
            style={{ width: '100%', padding: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            {isAuthenticating ? (
              <>
                <Loader2 size={16} className="spin-icon" style={{ animation: 'spin 1s linear infinite' }} />
                Authenticating...
              </>
            ) : (
              <>Enter Control Center &rarr;</>
            )}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem' }}>
          <button
            type="button"
            onClick={() => setCurrentView('portfolio')}
            className="btn btn-outline"
            style={{ width: '100%', fontSize: '0.78rem' }}
          >
            <Eye size={14} />
            Return to Public Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
