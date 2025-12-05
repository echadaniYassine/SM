import { useTeachers } from '@/api/hooks/useTeachers'

export default function TeacherList() {
  const { data, isLoading } = useTeachers()

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h2>Teachers</h2>
      <ul>
        {data?.data?.data?.map((teacher) => (
          <li key={teacher.id}>{teacher.name}</li>
        ))}
      </ul>
    </div>
  )
}