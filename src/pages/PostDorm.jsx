import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './PostDorm.css'

export default function PostDorm() {
  const [form, setForm] = useState({ name: '', city: '', type: 'PG', price: '', imageUrl: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  if (!token) {
    navigate('/login')
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await axios.post('http://localhost:8080/api/dorms', 
        { ...form, price: parseFloat(form.price) },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setSuccess(true)
      setTimeout(() => navigate('/'), 2000)
    } catch (e) {
      setError('Failed to post listing. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="post-page">
      <div className="post-card">
        <div className="post-header">
          <h1>List Your Room</h1>
          <p>Help students find great accommodation</p>
        </div>
        {success && (
          <div className="post-success">
            ✅ Listing posted! Redirecting...
          </div>
        )}
        {error && <div className="post-error">{error}</div>}
        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-row">
            <div className="form-group">
              <label>Listing Name</label>
              <input type="text" placeholder="e.g. Sunshine PG Near Campus" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>City</label>
              <input type="text" placeholder="e.g. Delhi" value={form.city} onChange={e => setForm({...form, city: e.target.value})} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Type</label>
              <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                <option value="PG">PG</option>
                <option value="Hostel">Hostel</option>
                <option value="Dormitory">Dormitory</option>
                <option value="Shared Apartment">Shared Apartment</option>
              </select>
            </div>
            <div className="form-group">
              <label>Monthly Rent (₹)</label>
              <input type="number" placeholder="e.g. 8000" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
            </div>
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input type="url" placeholder="https://..." value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} />
          </div>
          {form.imageUrl && (
            <div className="img-preview">
              <img src={form.imageUrl} alt="preview" onError={e => e.target.style.display='none'} />
            </div>
          )}
          <button type="submit" className="post-btn" disabled={loading}>
            {loading ? 'Posting...' : 'Post Listing'}
          </button>
        </form>
      </div>
    </div>
  )
}