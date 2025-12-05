import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to School Management System</h1>
      <Link to="/programs">View Programs</Link>
      <Link to="/register-public">Register Now</Link>
      <Link to="/login">Login</Link>
    </div>
  )
}