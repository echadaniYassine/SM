// src/components/layout/AuthLayout.jsx
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
