import { useStudents } from '@/api/hooks/useStudents'

export default function StudentList() {
  const { data, isLoading, error } = useStudents()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading students</div>

  // Debug: Check what data structure you're getting
  console.log('Students data:', data)

  const students = data?.data || data || []
  return (
    <div>
      <h2>Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
    </div>
  )
}