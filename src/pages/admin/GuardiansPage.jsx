// src/pages/admin/GuardiansPage.jsx
import { useState } from 'react'
import { useGuardians, useCreateGuardian, useUpdateGuardian, useDeleteGuardian } from '@/api/hooks/useGuardians'
import GuardianList from '@/components/features/guardians/GuardianList'
import GuardianForm from '@/components/forms/GuardianForm'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Loading from '@/components/ui/Loading'
import { ErrorDisplay } from '@/components/ui/Loading'

export default function GuardiansPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedGuardian, setSelectedGuardian] = useState(null)

  const { data, isLoading, error, refetch } = useGuardians()
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
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Guardians</h1>
          <p className="text-muted-foreground">Manage parent and guardian information</p>
        </div>
        <Button onClick={() => {
          setSelectedGuardian(null)
          setIsModalOpen(true)
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Guardian
        </Button>
      </div>

      {/* List */}
      <GuardianList onEdit={handleEdit} onDelete={handleDelete} />

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
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