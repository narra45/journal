import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_BASE = 'http://localhost:8080/api'

const colors = {
  bgGradient: 'linear-gradient(180deg,#041124 0%, #071226 100%)', card: '#071226', input: '#021629',
  text: '#e6fff2', textSecondary: '#9ff6d3', accent: '#10b981', danger: '#ef4444',
  border: 'rgba(255,255,255,0.06)', shadow: '0 6px 24px rgba(2,6,23,0.6)'
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: colors.bgGradient, fontFamily: 'Segoe UI, Roboto, Arial, sans-serif', color: colors.textSecondary },
  card: { background: colors.card, padding: 24, borderRadius: 8, boxShadow: colors.shadow, width: 380, border: `1px solid ${colors.border}` },
  heading: { margin: 0, marginBottom: 12, textAlign: 'center', color: colors.textSecondary },
  formGroup: { display: 'flex', flexDirection: 'column', gap: 10 },
  input: { padding: '10px 12px', border: `1px solid ${colors.border}`, borderRadius: 6, fontSize: 14, outline: 'none', background: colors.input, color: colors.text },
  button: { marginTop: 8, padding: '10px 12px', background: colors.accent, color: '#042226', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 },
  error: { color: colors.danger, fontSize: 13, margin: 0 }
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
    setLoading(true)
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, formData)
      localStorage.setItem('user', JSON.stringify(res.data))
      navigate('/dashboardLayout')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <input style={styles.input} type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
            <input style={styles.input} type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
            {error && <p style={styles.error}>{error}</p>}
            <button style={styles.button} type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login