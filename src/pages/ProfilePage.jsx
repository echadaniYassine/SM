import { useAuthStore } from '@/store/authSlice'

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user)

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
    </div>
  )
}