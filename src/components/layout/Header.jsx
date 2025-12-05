import { useAuthStore } from '@/store/authSlice'
import { useLogout } from '@/api/hooks/useAuth'

export default function Header() {
  const user = useAuthStore((state) => state.user)
  const { mutate: logout } = useLogout()

  return (
    <header>
      <h1>School Management</h1>
      <div>
        <span>{user?.name}</span>
        <button onClick={() => logout()}>Logout</button>
      </div>
    </header>
  )
}