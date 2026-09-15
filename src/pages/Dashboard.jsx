import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AddJournal from '../components/AddJournal'

const API_BASE = 'http://localhost:8080/api'

export default function Dashboard() {
  const [entries, setEntries] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadEntries()
  }, [])

  const loadEntries = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await axios.get(`${API_BASE}/journal`)
      setEntries(res.data)
    } catch (err) {
      setError('Could not load journal entries.')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (form) => {
    try {
      const res = await axios.post(`${API_BASE}/journal`, form)
      setEntries(prev => [res.data, ...prev])
      setShowForm(false)
    } catch (err) {
      setError('Could not save entry.')
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/journal/${id}`)
      setEntries(prev => prev.filter(x => x.id !== id))
    } catch (err) {
      setError('Could not delete entry.')
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, color: '#e6fff2' }}>Trading Journal</h3>
        <button onClick={() => setShowForm(s => !s)} style={{ background: '#10b981', color: '#042226', padding: '10px 14px', borderRadius: 8, fontWeight: 700 }}>
          {showForm ? 'Close' : 'New Journal Entry'}
        </button>
      </div>

      {error && <p style={{ color: '#ef4444' }}>{error}</p>}

      {showForm && <AddJournal onSave={handleSave} onCancel={() => setShowForm(false)} />}

      <div style={{ marginTop: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left' }}>
              <th style={{ padding: 12, color: '#9ff6d3' }}>Date</th>
              <th style={{ color: '#9ff6d3' }}>Instrument</th>
              <th style={{ color: '#9ff6d3' }}>Direction</th>
              <th style={{ color: '#9ff6d3' }}>Size</th>
              <th style={{ color: '#9ff6d3' }}>Entry</th>
              <th style={{ color: '#9ff6d3' }}>Exit</th>
              <th style={{ color: '#9ff6d3' }}>P/L</th>
              <th style={{ color: '#9ff6d3' }}>Strategy</th>
              <th style={{ color: '#9ff6d3' }}>Notes</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={10} style={{ padding: 18, textAlign: 'center', color: '#9ff6d3' }}>Loading...</td></tr>
            )}
            {!loading && entries.map(e => (
              <tr key={e.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: 10 }}>{e.date}</td>
                <td>{e.instrument}</td>
                <td>{e.direction}</td>
                <td>{e.size}</td>
                <td>{e.entry}</td>
                <td>{e.exit}</td>
                <td>{e.pl}</td>
                <td>{e.strategy}</td>
                <td style={{ maxWidth: 240, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={e.notes}>{e.notes}</td>
                <td><button onClick={() => handleDelete(e.id)} style={{ background: '#ef4444', color: '#fff', borderRadius: 8, padding: '6px 10px' }}>Delete</button></td>
              </tr>
            ))}
            {!loading && entries.length === 0 && (
              <tr><td colSpan={10} style={{ padding: 18, textAlign: 'center', color: '#9ff6d3' }}>No entries yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}