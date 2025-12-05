import { useState } from 'react'
import { usePrograms, useCreateProgram, useUpdateProgram, useDeleteProgram } from '@/api/hooks/usePrograms'
import ProgramForm from '@/components/forms/ProgramForm'
import Modal from '@/components/common/Modal'

export default function ProgramsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState(null)

  const { data, isLoading } = usePrograms()
  const { mutate: createProgram } = useCreateProgram()
  const { mutate: updateProgram } = useUpdateProgram()
  const { mutate: deleteProgram } = useDeleteProgram()

  const handleSubmit = (data) => {
    if (selectedProgram) {
      updateProgram({ id: selectedProgram.id, data })
    } else {
      createProgram(data)
    }
    setIsModalOpen(false)
    setSelectedProgram(null)
  }

  return (
    <div>
      <h1>Programs Management</h1>
      <button onClick={() => setIsModalOpen(true)}>Add Program</button>

      <div>
        {data?.data?.data?.map((program) => (
          <div key={program.id}>
            <h3>{program.name}</h3>
            <p>{program.description}</p>
            <button onClick={() => {
              setSelectedProgram(program)
              setIsModalOpen(true)
            }}>
              Edit
            </button>
            <button onClick={() => deleteProgram(program.id)}>Delete</button>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Program Form">
        <ProgramForm
          program={selectedProgram}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}
