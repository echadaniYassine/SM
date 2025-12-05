import { useStudents } from '@/api/hooks/useStudents'

export default function StudentList() {
  const { data, isLoading } = useStudents()

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h2>Students</h2>
      <ul>
        {data?.data?.data?.map((student) => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
    </div>
  )
}