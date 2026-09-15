import React from 'react'
import { useNavigate } from 'react-router-dom'

const colors = {
  bgGradient: 'linear-gradient(180deg,#041124 0%, #071226 100%)',
  card: '#071226',
  text: '#e6fff2',
  textSecondary: '#9ff6d3',
  textMuted: '#89e6b6',
  accent: '#10b981',
  border: 'rgba(255,255,255,0.06)',
  shadow: '0 6px 24px rgba(2,6,23,0.6)'
}

export default function Home() {
  const navigate = useNavigate()

  const styles = {
    container: {
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', gap: 16, padding: 24,
      fontFamily: 'Segoe UI, Roboto, Arial, sans-serif',
      color: colors.textSecondary, background: colors.bgGradient
    },
    card: {
      background: colors.card, padding: 28, borderRadius: 12, boxShadow: colors.shadow,
      border: `1px solid ${colors.border}`, maxWidth: 420, width: '100%', textAlign: 'center'
    },
    btnRow: { display: 'flex', gap: 10, marginTop: 16, justifyContent: 'center' },
    btn: { padding: '12px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700 },
    register: { background: 'transparent', color: colors.textSecondary, border: `1px solid ${colors.border}` },
    login: { background: colors.accent, color: '#042226' }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#042226" />
            <path d="M4 16L9 9L13 14L20 6" stroke={colors.textSecondary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: colors.text }}>Trading Journal</div>
            <div style={{ fontSize: 12, color: colors.textMuted }}>Track trades, refine strategy</div>
          </div>
        </div>
        <h2 style={{ margin: '14px 0 4px', color: colors.text }}>Welcome</h2>
        <p style={{ color: colors.textSecondary, margin: 0 }}>Register or login to access your trading journal.</p>
        <div style={styles.btnRow}>
          <button style={{ ...styles.btn, ...styles.register }} onClick={() => navigate('/register')}>Register</button>
          <button style={{ ...styles.btn, ...styles.login }} onClick={() => navigate('/login')}>Login</button>
        </div>
      </div>
    </div>
  )
}