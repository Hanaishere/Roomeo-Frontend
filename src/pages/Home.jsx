import { useState, useEffect } from 'react'
import axios from 'axios'
import './Home.css'

const API = `${import.meta.env.VITE_API_URL}/api/dorms`

export default function Home() {
  const [dorms, setDorms] = useState([])
  const [loading, setLoading] = useState(true)
  const [city, setCity] = useState('')
  const [type, setType] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [name, setName] = useState('')


  useEffect(() => { fetchDorms() }, [])

  const fetchDorms = async () => {
    setLoading(true)
    try {
      const res = await axios.get(API)
      setDorms(res.data)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const handleSearch = async () => {
    setLoading(true)
    try {
      let res
      if (city) res = await axios.get(`${API}/search?city=${city}`)
      else if (name) res = await axios.get(`${API}/name?name=${name}`)
      else if (type) res = await axios.get(`${API}/type?type=${type}`)
      else if (minPrice && maxPrice) res = await axios.get(`${API}/price?min=${minPrice}&max=${maxPrice}`)
      else res = await axios.get(API)
      setDorms(res.data)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const handleReset = () => {
    setCity(''); setType(''); setMinPrice(''); setMaxPrice(''); setName('')
    fetchDorms()
  }

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-badge">🏠 1000+ listings across India</div>
        <h1 className="hero-title">Find Your Perfect<br /><span className="gradient-text">Student Home</span></h1>
        <p className="hero-sub">PGs, hostels, and shared apartments near your college — verified and affordable.</p>
      </div>

      <div className="search-bar">
        <input className="search-input" placeholder="City (e.g. Delhi, Mumbai)" value={city} onChange={e => setCity(e.target.value)} />
        <input  className="search-input" placeholder="Search by name..."  value={name} onChange={e => setName(e.target.value)} />
        <select className="search-select" value={type} onChange={e => setType(e.target.value)}>
          <option value="">All Types</option>
          <option value="PG">PG</option>
          <option value="Hostel">Hostel</option>
          <option value="Dormitory">Dormitory</option>
          <option value="Shared Apartment">Shared Apartment</option>
        </select>
        <input className="search-input small" placeholder="Min ₹" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
        <input className="search-input small" placeholder="Max ₹" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
        <button className="search-btn" onClick={handleSearch}>Search</button>
        <button className="reset-btn" onClick={handleReset}>Reset</button>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner" />
          <p>Finding rooms...</p>
        </div>
      ) : (
        <>
          <p className="results-count">{dorms.length} rooms found</p>
          <div className="dorm-grid">
            {dorms.map(dorm => (
              <div className="dorm-card" key={dorm.id}>
                <div className="dorm-img-wrapper">
                  <img src={dorm.imageUrl} alt={dorm.name} className="dorm-img" onError={e => e.target.src='https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400'} />
                  <span className="dorm-type-badge">{dorm.type}</span>
                </div>
                <div className="dorm-info">
                  <h3 className="dorm-name">{dorm.name}</h3>
                  <p className="dorm-city">📍 {dorm.city}</p>
                  <div className="dorm-footer">
                    <span className="dorm-price">₹{dorm.price.toLocaleString()}<span className="per-month">/mo</span></span>
                    <button className="view-btn">View</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}