import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const API_BASE = 'https://journal-hbp1.onrender.com/api'

const colors = {
  bgGradient: 'linear-gradient(180deg,#041124 0%, #071226 100%)',
  card: '#071226',
  input: '#021629',
  text: '#e6fff2',
  textSecondary: '#9ff6d3',
  accent: '#10b981',
  accentSoft: '#38bdf8',
  border: 'rgba(255,255,255,0.08)',
  shadow: '0 8px 30px rgba(2,6,23,0.65)',
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
    maxWidth: 430,
    borderRadius: 18,
    padding: 28,
    background: colors.card,
    border: `1px solid ${colors.border}`,
    boxShadow: colors.shadow
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 8
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(16, 185, 129, 0.12)',
    fontSize: 24
  },
  title: { margin: 0, color: colors.text, fontSize: 30, fontWeight: 700, textAlign: 'center' },
  subtitle: { textAlign: 'center', color: '#c6f7dc', margin: '10px 0 22px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: 14 },
  field: { display: 'flex', flexDirection: 'column', gap: 8 },
  label: { color: colors.textSecondary, fontWeight: 600, fontSize: 13 },
  input: {
    border: `1px solid ${colors.border}`,
    borderRadius: 10,
    background: colors.input,
    color: colors.text,
    padding: '12px 14px',
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box'
  },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, fontSize: 13 },
  remember: { display: 'flex', alignItems: 'center', gap: 8, color: '#d8fce6' },
  link: { color: colors.accentSoft, textDecoration: 'none', fontWeight: 700 },
  button: {
    marginTop: 4,
    padding: '12px 16px',
    background: colors.accent,
    color: '#042226',
    border: 'none',
    borderRadius: 10,
    cursor: 'pointer',
    fontWeight: 800,
    fontSize: 15
  },
  error: { color: colors.danger, fontSize: 13, margin: 0 },
  footer: { marginTop: 18, textAlign: 'center', color: '#d8fce6', fontSize: 14 }
}

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.email || !formData.password) {
      setError('Both email and password are required.')
      return
    }

    setLoading(true)
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, formData)
      const user = {
        id: res.data.id || Date.now(),
        name: res.data.name || formData.email.split('@')[0],
        email: formData.email,
        password: formData.password,
        mobile: res.data.mobile || '',
        image: res.data.image || ''
      }
      localStorage.setItem('user', JSON.stringify(user))
      navigate('/dashboardLayout')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.brand}>
          <div style={styles.icon}>📈</div>
        </div>
        <h2 style={styles.title}>Welcome back</h2>
        <p style={styles.subtitle}>Sign in to continue your trading journal.</p>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="email">Email</label>
              <input id="email" style={styles.input} type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="password">Password</label>
              <input id="password" style={styles.input} type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
            </div>

            <div style={styles.row}>
              <label style={styles.remember}><input type="checkbox" /> Remember me</label>
              <Link to="/forgot-password" style={styles.link}>Forgot password?</Link>
            </div>

            {error && <p style={styles.error}>{error}</p>}
            <button style={styles.button} type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
          </div>
        </form>

        <div style={styles.footer}>
          Don’t have an account? <Link to="/register" style={styles.link}>Register</Link>
        </div>
      </div>
    </div>
  )
}

export default Login