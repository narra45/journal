import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_BASE = 'http://localhost:8080/api'

const Profile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({ id: '', name: '', email: '', password: '', mobile: '', image: '' })
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser({
        id: parsedUser.id || '',
        name: parsedUser.name || '',
        email: parsedUser.email || '',
        password: parsedUser.password || '',
        mobile: parsedUser.mobile || '',
        image: parsedUser.image || ''
      })
    }
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
      const payload = {
        ...user,
        password: user.password || ''
      }

      if (user.id) {
        const res = await axios.put(`${API_BASE}/users/${user.id}`, payload)
        setUser(res.data)
        localStorage.setItem('user', JSON.stringify(res.data))
      } else {
        localStorage.setItem('user', JSON.stringify(payload))
      }
      setMessage('Profile saved successfully')
    } catch (err) {
      setMessage('Could not save profile')
    } finally {
      setSaving(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div>
      <h3 style={{ color: '#e6fff2', marginBottom: 16 }}>Profile</h3>
      <div style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))', color: '#c7f9cc', padding: 18, borderRadius: 14, maxWidth: 640, border: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center', marginBottom: 18 }}>
          <div style={{ width: 88, height: 88, borderRadius: 16, overflow: 'hidden', background: '#042226', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.04)' }}>
            {user.image ? <img src={user.image} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ color: '#9ff6d3', fontSize: 12 }}>No Image</div>}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: 8 }}>
              <label style={{ display: 'block', color: '#9ff6d3', marginBottom: 6, fontSize: 12 }}>Full name</label>
              <input name="name" value={user.name || ''} onChange={handleChange} placeholder="Full name" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.04)', background: '#021629', color: '#e6fff2', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: 8 }}>
              <label style={{ display: 'block', color: '#9ff6d3', marginBottom: 6, fontSize: 12 }}>Email</label>
              <input name="email" value={user.email || ''} onChange={handleChange} placeholder="Email" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.04)', background: '#021629', color: '#e6fff2', boxSizing: 'border-box' }} />
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={{ display: 'block', color: '#9ff6d3', marginBottom: 6, fontSize: 12 }}>Mobile</label>
            <input name="mobile" value={user.mobile || ''} onChange={handleChange} placeholder="Mobile" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.04)', background: '#021629', color: '#e6fff2', boxSizing: 'border-box' }} />
          </div>

          <div>
            <label style={{ display: 'block', color: '#9ff6d3', marginBottom: 6, fontSize: 12 }}>Password</label>
            <input type="password" name="password" value={user.password || ''} onChange={handleChange} placeholder="Password" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.04)', background: '#021629', color: '#e6fff2', boxSizing: 'border-box' }} />
          </div>
        </div>

        {message && <p style={{ color: '#9ff6d3', fontSize: 13, marginTop: 14 }}>{message}</p>}

        <div style={{ marginTop: 18, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <input type="file" accept="image/*" onChange={handleImage} style={{ color: '#d8fce6' }} />
          <button onClick={saveProfile} disabled={saving} style={{ background: '#06b6d4', color: '#042226', padding: '10px 14px', borderRadius: 8, fontWeight: 700, border: 'none', cursor: 'pointer' }}>{saving ? 'Saving...' : 'Save Profile'}</button>
          <button onClick={logout} style={{ background: '#ef4444', color: '#fff', padding: '10px 14px', borderRadius: 8, fontWeight: 700, border: 'none', cursor: 'pointer' }}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Profile