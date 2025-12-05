import { useState } from 'react'
import { useGuardians, useCreateGuardian, useUpdateGuardian, useDeleteGuardian } from '@/api/hooks/useGuardians'
import GuardianList from '@/components/features/guardians/GuardianList'
import GuardianForm from '@/components/forms/GuardianForm'
import Modal from '../../components/common/Modal'

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
        <GuardianForm
          guardian={selectedGuardian}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}