import React, { useState } from 'react'

const inputStyle = { padding: 8, borderRadius: 6, border: '1px solid rgba(255,255,255,0.06)', background: '#021629', color: '#e6fff2' }

export default function AddJournal({ onSave, onCancel }) {
  const [form, setForm] = useState({ date: '', instrument: '', direction: 'LONG', size: '', entry: '', exit: '', pl: '', notes: '', strategy: '' })

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
    setForm({ date: '', instrument: '', direction: 'LONG', size: '', entry: '', exit: '', pl: '', notes: '', strategy: '' })
  }

  const labelStyle = { color: '#9ff6d3', fontSize: 12, marginBottom: 6, display: 'block' }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16, padding: 16, borderRadius: 10, background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
        <div>
          <label style={labelStyle} htmlFor="date">Date</label>
          <input id="date" name="date" type="date" value={form.date} onChange={handleChange} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle} htmlFor="instrument">Instrument</label>
          <input id="instrument" name="instrument" placeholder="e.g. BTCUSD" value={form.instrument} onChange={handleChange} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle} htmlFor="direction">Direction</label>
          <select id="direction" name="direction" value={form.direction} onChange={handleChange} style={inputStyle}>
            <option value="LONG">LONG</option>
            <option value="SHORT">SHORT</option>
          </select>
        </div>

        <div>
          <label style={labelStyle} htmlFor="size">Size</label>
          <input id="size" name="size" placeholder="Size" value={form.size} onChange={handleChange} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle} htmlFor="entry">Entry Price</label>
          <input id="entry" name="entry" placeholder="Entry Price" value={form.entry} onChange={handleChange} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle} htmlFor="exit">Exit Price</label>
          <input id="exit" name="exit" placeholder="Exit Price" value={form.exit} onChange={handleChange} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle} htmlFor="pl">P/L</label>
          <input id="pl" name="pl" placeholder="P/L" value={form.pl} onChange={handleChange} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle} htmlFor="strategy">Strategy</label>
          <input id="strategy" name="strategy" placeholder="Strategy" value={form.strategy} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle} htmlFor="notes">Notes</label>
          <textarea id="notes" name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} style={{ ...inputStyle, width: '100%', minHeight: 80 }} />
        </div>
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <button type="submit" style={{ background: '#06b6d4', color: '#042226', padding: '10px 14px', borderRadius: 8, fontWeight: 700 }}>Save Entry</button>
        <button type="button" onClick={onCancel} style={{ background: '#ef4444', color: '#fff', padding: '10px 14px', borderRadius: 8, fontWeight: 700 }}>Cancel</button>
      </div>
    </form>
  )
}