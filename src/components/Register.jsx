import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://journal-hbp1.onrender.com/api'

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
    maxWidth: 470,
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
    marginBottom: 10
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

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.name || !formData.email || !formData.password || !formData.mobile) {
      setError('Please fill in all required fields.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      await axios.post(`${API_BASE}/auth/register`, {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password
      })
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.brand}>
          <div style={styles.icon}>📊</div>
        </div>
        <h2 style={styles.title}>Create account</h2>
        <p style={styles.subtitle}>Build your journal and track every trade with clarity.</p>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="name">Full name</label>
              <input id="name" style={styles.input} type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="email">Email</label>
              <input id="email" style={styles.input} type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="mobile">Mobile number</label>
              <input id="mobile" style={styles.input} type="tel" name="mobile" placeholder="Enter your mobile number" value={formData.mobile} onChange={handleChange} required />
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="password">Password</label>
              <input id="password" style={styles.input} type="password" name="password" placeholder="Create a password" value={formData.password} onChange={handleChange} required />
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="confirmPassword">Confirm password</label>
              <input id="confirmPassword" style={styles.input} type="password" name="confirmPassword" placeholder="Re-enter your password" value={formData.confirmPassword} onChange={handleChange} required />
            </div>

            {error && <p style={styles.error}>{error}</p>}
            <button style={styles.button} type="submit" disabled={loading}>{loading ? 'Creating account...' : 'Create account'}</button>
          </div>
        </form>

        <div style={styles.footer}>
          Already have an account? <Link to="/login" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 700 }}>Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Register