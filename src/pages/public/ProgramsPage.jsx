import { usePrograms } from '@/api/hooks/usePrograms'

export default function ProgramsPage() {
  const { data, isLoading } = usePrograms()

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h1>Our Programs</h1>
      <div>
        {data?.data?.data?.map((program) => (
          <div key={program.id}>
            <h2>{program.name}</h2>
            <p>{program.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}