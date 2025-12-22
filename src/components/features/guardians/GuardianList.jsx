// src/components/features/guardians/GuardianList.jsx
import { useGuardians } from "@/api/hooks/useGuardians"
import GuardianCard from "./GuardianCard"
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'

export default function GuardianList({ onEdit, onDelete }) {
  const { data, isLoading, error } = useGuardians()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Error loading guardians: {error.message}</AlertDescription>
      </Alert>
    )
  }

  const guardians = data?.data ?? []

  if (guardians.length === 0) {
    return (
      <Alert>
        <AlertDescription>No guardians found. Click "Add Guardian" to create one.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {guardians.map((guardian) => (
        <GuardianCard
          key={guardian.id}
          guardian={guardian}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}