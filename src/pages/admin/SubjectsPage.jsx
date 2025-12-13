import { useState } from 'react'
import { useSubjects, useCreateSubject, useUpdateSubject, useDeleteSubject } from '@/api/hooks/useSubjects'
import SubjectForm from '@/components/forms/SubjectForm'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"

export default function SubjectsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState(null)

  const { data, isLoading } = useSubjects()
  const { mutate: createSubject } = useCreateSubject()
  const { mutate: updateSubject } = useUpdateSubject()
  const { mutate: deleteSubject } = useDeleteSubject()

  const handleSubmit = (data) => {
    if (selectedSubject) {
      updateSubject({ id: selectedSubject.id, data })
    } else {
      createSubject(data)
    }
    setIsModalOpen(false)
    setSelectedSubject(null)
  }

  return (
    <div>
      <h1>Subjects Management</h1>
      <button onClick={() => setIsModalOpen(true)}>Add Subject</button>

      <div>
        {data?.data?.data?.map((subject) => (
          <div key={subject.id}>
            <h3>{subject.name}</h3>
            <p>Code: {subject.code}</p>
            <button onClick={() => {
              setSelectedSubject(subject)
              setIsModalOpen(true)
            }}>
              Edit
            </button>
            <button onClick={() => deleteSubject(subject.id)}>Delete</button>
          </div>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Title here</DialogTitle>
          </DialogHeader>

          <SubjectForm
            subject={selectedSubject}
            onSubmit={handleSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        </DialogContent>
      </Dialog>

    </div>
  )
}
