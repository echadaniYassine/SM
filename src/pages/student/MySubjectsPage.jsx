import { useMySubjects } from '@/api/hooks/useStudents'

export default function MySubjectsPage() {
  const { data, isLoading } = useMySubjects()

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h1>My Subjects</h1>
      <ul>
        {data?.data?.data?.map((subject) => (
          <li key={subject.id}>
            {subject.name} - {subject.teacher?.name}
          </li>
        ))}
      </ul>
    </div>
  )
}