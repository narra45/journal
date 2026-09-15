import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_BASE = 'http://localhost:8080/api'

const Profile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({ name: '', email: '', mobile: '', image: '' })
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const handleChange = (e) => setUser(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setUser(prev => ({ ...prev, image: reader.result }))
    reader.readAsDataURL(file)
  }

  const saveProfile = async () => {
    setSaving(true)
    setMessage('')
    try {
      const res = await axios.put(`${API_BASE}/users/${user.id}`, user)
      setUser(res.data)
      localStorage.setItem('user', JSON.stringify(res.data))
      setMessage('Profile saved')
    } catch (err) {
      setMessage('Could not save profile')
    } finally {
      setSaving(false)
    }
  }

  const logout = () => {  // simple login: save lastLogin and ensure a user object exists
  localStorage.setItem('lastLogin', formData.Email)
  
  const existing = localStorage.getItem('user')
  if (!existing) {
    const nameFromEmail = formData.Email.split('@')[0]
    const autoUser = { name: nameFromEmail, email: formData.Email, mobile: '' }
    localStorage.setItem('user', JSON.stringify(autoUser))
  }
  navigate('/dashboardLayout')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div>
      <h3 style={{ color: '#e6fff2' }}>Profile</h3>
      <div style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))', color: '#c7f9cc', padding: 18, borderRadius: 10, maxWidth: 560 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
          <div style={{ width: 88, height: 88, borderRadius: 12, overflow: 'hidden', background: '#042226', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {user.image ? <img src={user.image} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ color: '#9ff6d3' }}>No Image</div>}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 6 }}><strong>Name:</strong></p>
            <input name="name" value={user.name || ''} onChange={handleChange} placeholder="Full name" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid rgba(255,255,255,0.04)', background: '#021629', color: '#e6fff2' }} />
            <p style={{ margin: '8px 0 6px' }}><strong>Email:</strong></p>
            <input name="email" value={user.email || ''} onChange={handleChange} placeholder="Email" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid rgba(255,255,255,0.04)', background: '#021629', color: '#e6fff2' }} />
            <p style={{ margin: '8px 0 6px' }}><strong>Mobile:</strong></p>
            <input name="mobile" value={user.mobile || ''} onChange={handleChange} placeholder="Mobile" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid rgba(255,255,255,0.04)', background: '#021629', color: '#e6fff2' }} />

          </div>
        </div>

        {message && <p style={{ color: '#9ff6d3', fontSize: 13 }}>{message}</p>}

        <div style={{ marginTop: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="file" accept="image/*" onChange={handleImage} />
          <button onClick={saveProfile} disabled={saving} style={{ background: '#06b6d4', color: '#042226', padding: '8px 12px', borderRadius: 8, fontWeight: 700 }}>{saving ? 'Saving...' : 'Save Profile'}</button>
          <button onClick={logout} style={{ background: '#ef4444', color: '#fff', padding: '8px 12px', borderRadius: 8, fontWeight: 700 }}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Profile