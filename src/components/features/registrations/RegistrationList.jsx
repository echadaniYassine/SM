import { useRegistrations } from '@/api/hooks/useRegistrations'

export default function RegistrationList() {
  const { data, isLoading, error } = useRegistrations()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading registrations</div>

  console.log('Registrations data:', data)

  const registrations = data?.data || data || []

  return (
    <div>
      <h2>Registrations</h2>
      <ul>
        {registrations.map((reg) => (
          <li key={reg.id}>
            {reg.full_name} - {reg.status}
          </li>
        ))}
      </ul>
    </div>
  )
}