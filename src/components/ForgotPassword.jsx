import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const colors = {
  bgGradient: 'linear-gradient(180deg,#041124 0%, #071226 100%)',
  card: '#071226',
  input: '#021629',
  text: '#e6fff2',
  textSecondary: '#9ff6d3',
  accent: '#10b981',
  accentSoft: '#0ea5e9',
  border: 'rgba(255,255,255,0.08)',
  shadow: '0 8px 30px rgba(2,6,23,0.65)',
  success: '#86efac',
  danger: '#fca5a5'
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: colors.bgGradient,
    padding: 24,
    fontFamily: 'Segoe UI, Roboto, Arial, sans-serif'
  },
  card: {
    width: '100%',
    maxWidth: 440,
    padding: 28,
    borderRadius: 18,
    background: colors.card,
    border: `1px solid ${colors.border}`,
    boxShadow: colors.shadow
  },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.textSecondary,
    marginBottom: 12,
    fontWeight: 700
  },
  title: { margin: 0, color: colors.text, fontSize: 28, fontWeight: 700 },
  subtitle: { margin: '10px 0 22px', color: '#c8fce1', lineHeight: 1.5 },
  field: { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 },
  label: { color: colors.textSecondary, fontSize: 13, fontWeight: 600 },
  input: {
    width: '100%',
    border: `1px solid ${colors.border}`,
    background: colors.input,
    color: colors.text,
    padding: '12px 14px',
    borderRadius: 10,
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box'
  },
  button: {
    width: '100%',
    border: 'none',
    borderRadius: 10,
    padding: '12px 16px',
    background: colors.accent,
    color: '#042226',
    fontWeight: 800,
    fontSize: 15,
    cursor: 'pointer',
    marginTop: 8
  },
  secondary: {
    marginTop: 18,
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 14
  },
  link: {
    color: colors.accentSoft,
    cursor: 'pointer',
    fontWeight: 700,
    textDecoration: 'none'
  },
  message: {
    marginTop: 14,
    padding: '10px 12px',
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 600,
    color: '#072b19',
    background: colors.success
  }
}

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) {
      setMessage('Please enter your email address.')
      return
    }

    setMessage(`A reset link has been sent to ${email}.`)
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.eyebrow}>Account recovery</div>
        <h2 style={styles.title}>Forgot password?</h2>
        <p style={styles.subtitle}>Enter your email and we’ll send a secure reset link to get you back into your trading journal.</p>

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label} htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>Send reset link</button>
        </form>

        {message && <div style={styles.message}>{message}</div>}

        <div style={styles.secondary}>
          Back to <span style={styles.link} onClick={() => navigate('/login')}>Login</span>
        </div>
      </div>
    </div>
  )
}
