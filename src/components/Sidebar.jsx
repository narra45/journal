import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/')

  const linkStyle = (active) => ({
    display: 'block',
    padding: '10px 14px',
    borderRadius: 10,
    marginBottom: 10,
    color: active ? '#042226' : '#b8f3d1',
    background: active ? '#10b981' : 'transparent',
    cursor: 'pointer',
    fontWeight: 700,
    transition: 'all 0.2s ease'
  })

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <aside style={{ width: 260, padding: 22, background: '#021629', color: '#b8f3d1', boxShadow: '2px 0 14px rgba(2,6,23,0.6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
        <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(16, 185, 129, 0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
          📈
        </div>
        <div>
          <h3 style={{ margin: 0, color: '#e6fff2', fontSize: 18 }}>Trading Journal</h3>
          <div style={{ fontSize: 11, color: '#9ff6d3', letterSpacing: 0.6 }}>Professional workflow</div>
        </div>
      </div>
      <nav>
        <div onClick={() => navigate('/dashboardLayout')} style={linkStyle(location.pathname === '/dashboardLayout')}>Dashboard</div>
        <div onClick={() => navigate('/dashboardLayout/profile')} style={linkStyle(isActive('/dashboardLayout/profile'))}>Profile</div>
      </nav>
      <button onClick={handleLogout} style={{ marginTop: 24, width: '100%', padding: '10px 12px', background: 'transparent', color: '#9ff6d3', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, cursor: 'pointer', fontWeight: 700 }}>
        Logout
      </button>
    </aside>
  )
}