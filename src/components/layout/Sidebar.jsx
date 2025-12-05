import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/programs">Programs</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  )
}