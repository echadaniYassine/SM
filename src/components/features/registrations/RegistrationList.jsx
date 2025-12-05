import { useRegistrations } from '@/api/hooks/useRegistrations'

export default function RegistrationList() {
  const { data, isLoading } = useRegistrations()

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h2>Registrations</h2>
      <ul>
        {data?.data?.data?.map((reg) => (
          <li key={reg.id}>
            {reg.full_name} - {reg.status}
          </li>
        ))}
      </ul>
    </div>
  )
}