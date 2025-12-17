// GuardiansPage.jsx
import { useState } from 'react'
import Loading from '@/components/ui/Loading'
import { ErrorDisplay } from '@/components/ui/Loading'
import { useGuardians, useCreateGuardian, useUpdateGuardian, useDeleteGuardian } from '@/api/hooks/useGuardians'
import GuardianList from '@/components/features/guardians/GuardianList'
import GuardianForm from '@/components/forms/GuardianForm'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function GuardiansPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedGuardian, setSelectedGuardian] = useState(null)

  const { data, isLoading, error, refetch } = useGuardians() // Add error and refetch
  const { mutate: createGuardian } = useCreateGuardian()
  const { mutate: updateGuardian } = useUpdateGuardian()
  const { mutate: deleteGuardian } = useDeleteGuardian()

  if (isLoading) return <Loading message="Loading guardians..." />
  if (error) return <ErrorDisplay message={error.message} onRetry={refetch} />

  const handleSubmit = (data) => {
    if (selectedGuardian) {
      updateGuardian({ id: selectedGuardian.id, data })
    } else {
      createGuardian(data)
    }
    setIsModalOpen(false)
    setSelectedGuardian(null)
  }

  const handleEdit = (guardian) => {
    setSelectedGuardian(guardian)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    deleteGuardian(id)
  }

  return (
    <div>
      <h1>Guardians Management</h1>
      <button onClick={() => setIsModalOpen(true)}>Add Guardian</button>

      <GuardianList onEdit={handleEdit} onDelete={handleDelete} />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedGuardian ? 'Edit Guardian' : 'Add New Guardian'}
            </DialogTitle>
          </DialogHeader>
          <GuardianForm
            guardian={selectedGuardian}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsModalOpen(false)
              setSelectedGuardian(null)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}