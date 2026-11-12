import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react';

export default function Toast() {
  const { toast } = usePortfolio();

  if (!toast.visible) return null;

  const iconColor = {
    success: '#27c93f',
    warning: '#e6c97a',
    danger: '#ff5f56',
    info: '#00eeff'
  };

  const borderColors = {
    success: 'rgba(39, 201, 63, 0.5)',
    warning: 'rgba(230, 201, 122, 0.5)',
    danger: 'rgba(255, 95, 86, 0.5)',
    info: 'rgba(0, 238, 255, 0.4)'
  };

  const type = toast.type || 'info';
  const color = iconColor[type] || iconColor.info;

  const icons = {
    success: <CheckCircle2 size={18} style={{ color }} />,
    warning: <AlertTriangle size={18} style={{ color }} />,
    danger: <AlertCircle size={18} style={{ color }} />,
    info: <Info size={18} style={{ color }} />
  };

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: '5rem',
        right: '2rem',
        zIndex: 9998,
        background: 'rgba(6, 12, 22, 0.96)',
        border: `1px solid ${borderColors[type] || borderColors.info}`,
        color: 'var(--text-primary)',
        padding: '0.85rem 1.4rem',
        borderRadius: '12px',
        fontFamily: 'var(--sans)',
        fontSize: '0.85rem',
        fontWeight: '600',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        maxWidth: '400px',
        animation: 'toastIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {icons[type] || icons.info}
      <span style={{ lineHeight: 1.5 }}>{toast.message}</span>
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
