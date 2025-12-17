import { useState } from 'react'
import Loading from '@/components/ui/Loading'
import { ErrorDisplay } from '@/components/ui/Loading'
import { useSubjects, useCreateSubject, useUpdateSubject, useDeleteSubject } from '@/api/hooks/useSubjects'
import SubjectCard from '@/components/features/subjects/SubjectCard' // ✅ Import SubjectCard
import SubjectForm from '@/components/forms/SubjectForm'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function SubjectsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState(null)

  const { data, isLoading, error, refetch } = useSubjects()
  const { mutate: createSubject } = useCreateSubject()
  const { mutate: updateSubject } = useUpdateSubject()
  const { mutate: deleteSubject } = useDeleteSubject()

  if (isLoading) return <Loading message="Loading subjects..." />
  if (error) return <ErrorDisplay message={error.message} onRetry={refetch} />


  const handleSubmit = (data) => {
    if (selectedSubject) {
      updateSubject({ id: selectedSubject.id, data })
    } else {
      createSubject(data)
    }
    setIsModalOpen(false)
    setSelectedSubject(null)
  }

  // ✅ Fixed data path
  const subjects = data?.data || data || []

  return (
    <div>
      <h1>Subjects Management</h1>
      <button onClick={() => setIsModalOpen(true)}>Add Subject</button>

      <div>
        {subjects.length === 0 ? (
          <p>No subjects found</p>
        ) : (
          subjects.map((subject) => (
            <div key={subject.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
              <SubjectCard subject={subject} />
              <button onClick={() => {
                setSelectedSubject(subject)
                setIsModalOpen(true)
              }}>
                Edit
              </button>
              <button onClick={() => {
                if (confirm('Are you sure you want to delete this subject?')) {
                  deleteSubject(subject.id)
                }
              }}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedSubject ? 'Edit Subject' : 'Add New Subject'}
            </DialogTitle>
          </DialogHeader>

          <SubjectForm
            subject={selectedSubject}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsModalOpen(false)
              setSelectedSubject(null)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}