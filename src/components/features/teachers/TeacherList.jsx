import { useTeachers } from '@/api/hooks/useTeachers'

export default function TeacherList() {
  const { data, isLoading, error } = useTeachers()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading teachers</div>

  // Debug: Check what data structure you're getting
  console.log('Teachers data:', data)

  // The service already returns response.data, so it's likely:
  // Option 1: data.data (if API wraps in { data: [...] })
  // Option 2: just data (if API returns array directly)
  
  const teachers = data?.data || data || []

  if (teachers.length === 0) {
    return <div>No teachers found</div>
  }

  return (
    <div>
      <h2>Teachers</h2>
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id}>{teacher.name}</li>
        ))}
      </ul>
    </div>
  )
}