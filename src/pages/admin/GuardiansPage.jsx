import { useState } from 'react'
import { useGuardians, useCreateGuardian, useUpdateGuardian, useDeleteGuardian } from '@/api/hooks/useGuardians'
import GuardianList from '@/components/features/guardians/GuardianList'
import GuardianForm from '@/components/forms/GuardianForm'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"

export default function GuardiansPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedGuardian, setSelectedGuardian] = useState(null)

  const { data, isLoading } = useGuardians()
  const { mutate: createGuardian } = useCreateGuardian()
  const { mutate: updateGuardian } = useUpdateGuardian()
  const { mutate: deleteGuardian } = useDeleteGuardian()

  const handleSubmit = (data) => {
    if (selectedGuardian) {
      updateGuardian({ id: selectedGuardian.id, data })
    } else {
      createGuardian(data)
    }
    setIsModalOpen(false)
    setSelectedGuardian(null)
  }

  return (
    <div>
      <h1>Guardians Management</h1>
      <button onClick={() => setIsModalOpen(true)}>Add Guardian</button>

      <GuardianList />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Guardian Form">

      </Modal>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Title here</DialogTitle>
          </DialogHeader>
          <GuardianForm
            guardian={selectedGuardian}
            onSubmit={handleSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        </DialogContent>
      </Dialog>

    </div>
  )
}