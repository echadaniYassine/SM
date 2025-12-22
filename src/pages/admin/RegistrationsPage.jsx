// src/pages/admin/RegistrationsPage.jsx
import { useState } from 'react'
import { useRegistrations, useUpdateRegistrationStatus } from '@/api/hooks/useRegistrations'
import RegistrationList from '@/components/features/registrations/RegistrationList'
import RegistrationFilters from '@/components/features/registrations/RegistrationFilters'
import Loading from '@/components/ui/Loading'
import { ErrorDisplay } from '@/components/ui/Loading'

export default function RegistrationsPage() {
  const [filters, setFilters] = useState({})
  const { data, isLoading, error, refetch } = useRegistrations(filters)
  const { mutate: updateStatus } = useUpdateRegistrationStatus()

  if (isLoading) return <Loading message="Loading registrations..." />
  if (error) return <ErrorDisplay message={error.message} onRetry={refetch} />

  const registrations = data?.data || []

  const handleApprove = (id) => {
    updateStatus({ id, statusData: { status: 'confirmed' } })
  }

  const handleReject = (id) => {
    updateStatus({ id, statusData: { status: 'rejected' } })
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Registrations</h1>
        <p className="text-muted-foreground">Review and manage student registration requests</p>
      </div>

      {/* Filters */}
      <RegistrationFilters onFilterChange={setFilters} />

      {/* List */}
      <RegistrationList
        registrations={registrations}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  )
}