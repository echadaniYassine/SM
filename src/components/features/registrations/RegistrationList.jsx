// src/components/features/registrations/RegistrationList.jsx
import RegistrationCard from './RegistrationCard'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'

export default function RegistrationList({ registrations, isLoading, error, onApprove, onReject }) {
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
        <AlertDescription>Error loading registrations: {error.message}</AlertDescription>
      </Alert>
    )
  }

  if (!registrations || registrations.length === 0) {
    return (
      <Alert>
        <AlertDescription>No registrations found.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {registrations.map((registration) => (
        <RegistrationCard
          key={registration.id}
          registration={registration}
          onApprove={onApprove}
          onReject={onReject}
        />
      ))}
    </div>
  )
}