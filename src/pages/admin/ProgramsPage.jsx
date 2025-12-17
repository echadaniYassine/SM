import { useState } from 'react'
import Loading from '@/components/ui/Loading'
import { ErrorDisplay } from '@/components/ui/Loading'
import { usePrograms, useCreateProgram, useUpdateProgram, useDeleteProgram } from '@/api/hooks/usePrograms'
import ProgramForm from '@/components/forms/ProgramForm'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"

export default function ProgramsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState(null)

  const { data, isLoading, error, refetch } = usePrograms()
  const { mutate: createProgram } = useCreateProgram()
  const { mutate: updateProgram } = useUpdateProgram()
  const { mutate: deleteProgram } = useDeleteProgram()

  if (isLoading) return <Loading message="Loading programs..." />
  if (error) return <ErrorDisplay message={error.message} onRetry={refetch} />

  const handleSubmit = (data) => {
    if (selectedProgram) {
      updateProgram({ id: selectedProgram.id, data })
    } else {
      createProgram(data)
    }
    setIsModalOpen(false)
    setSelectedProgram(null)
  }
  const programs = data?.data || data || [] // Add this line


  return (
    <div>
      <h1>Programs Management</h1>
      <button onClick={() => setIsModalOpen(true)}>Add Program</button>

      <div>
        {programs.map((program) => (
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Title here</DialogTitle>
          </DialogHeader>
          <ProgramForm
            program={selectedProgram}
            onSubmit={handleSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        </DialogContent>
      </Dialog>

    </div>
  )
}
