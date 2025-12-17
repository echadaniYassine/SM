import { useRegistrations, useUpdateRegistrationStatus } from '@/api/hooks/useRegistrations'
import RegistrationList from '@/components/features/registrations/RegistrationList'
import RegistrationFilters from '@/components/features/registrations/RegistrationFilters'
import { useState } from 'react'
import Loading from '@/components/ui/Loading'
import { ErrorDisplay } from '@/components/ui/Loading'

export default function RegistrationsPage() {
  const [filters, setFilters] = useState({})
  const { data, isLoading, error, refetch } = useRegistrations(filters)
  const { mutate: updateStatus } = useUpdateRegistrationStatus()

  if (isLoading) return <Loading message="Loading registrations..." />
  if (error) return <ErrorDisplay message={error.message} onRetry={refetch} />

  const registrations = data?.data || data || []

  const handleApprove = (id) => {
    if (confirm('Are you sure you want to approve this registration?')) {
      updateStatus({ id, statusData: { status: 'confirmed' } })
    }
  }

  const handleReject = (id) => {
    if (confirm('Are you sure you want to reject this registration?')) {
      updateStatus({ id, statusData: { status: 'rejected' } })
    }
  }

  return (
    <div>
      <h1>Registrations Management</h1>

      <RegistrationFilters onFilterChange={setFilters} />

      <RegistrationList
        registrations={registrations}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  )
}