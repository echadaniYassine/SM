// GuardianList.jsx
import { useGuardians } from '@/api/hooks/useGuardians'

export default function GuardianList({ onEdit, onDelete }) {
  const { data, isLoading, error } = useGuardians()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading guardians</div>

  const guardians = data?.data || data || []

  if (guardians.length === 0) {
    return <div>No guardians found</div>
  }

  return (
    <div>
      <h2>Guardians</h2>
      {guardians.map((guardian) => (
        <div
          key={guardian.id}
          style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}
        >
          <h3>{guardian.name}</h3>
          <p>Email: {guardian.email}</p>
          <p>Phone: {guardian.phone}</p>

          <button onClick={() => onEdit(guardian)}>Edit</button>
          <button onClick={() => {
            if (confirm('Are you sure you want to delete this guardian?')) {
              onDelete(guardian.id)
            }
          }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}