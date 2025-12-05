import { useGuardians } from '@/api/hooks/useGuardians'

export default function GuardianList() {
  const { data, isLoading } = useGuardians()

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h2>Guardians</h2>
      <ul>
        {data?.data?.data?.map((guardian) => (
          <li key={guardian.id}>{guardian.name}</li>
        ))}
      </ul>
    </div>
  )
}