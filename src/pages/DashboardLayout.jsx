import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

function DashboardLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(180deg,#041124 0%, #071226 100%)' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '32px', color: '#e6fff2', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.02), transparent)', padding: 20, borderRadius: 12, boxShadow: '0 6px 18px rgba(2,6,23,0.6)' }}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout