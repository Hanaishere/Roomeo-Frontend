import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-icon">⬡</span>
        Roomeo
      </Link>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Browse</Link>
        {token ? (
          <>
            <Link to="/post" className="nav-link">List a Room</Link>
            <button onClick={handleLogout} className="nav-btn-outline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-btn">Get Started</Link>
          </>
        )}
      </div>
    </nav>
  )
}