import { useGuardianStudents } from '@/api/hooks/useGuardians'

export default function MyStudents() {
  const { data, isLoading } = useGuardianStudents()

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h2>My Students</h2>
      <ul>
        {data?.data?.data?.map((student) => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
    </div>
  )
}