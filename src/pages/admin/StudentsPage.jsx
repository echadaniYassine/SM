import { useState } from 'react'
import Loading from '@/components/ui/Loading'
import { ErrorDisplay } from '@/components/ui/Loading'
import { useStudents, useCreateStudent, useUpdateStudent, useDeleteStudent } from '@/api/hooks/useStudents'
import StudentList from '@/components/features/students/StudentList'
import StudentForm from '@/components/forms/StudentForm'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"

export default function StudentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)

  const { data, isLoading, error, refetch } = useStudents()
  const { mutate: createStudent } = useCreateStudent()
  const { mutate: updateStudent } = useUpdateStudent()
  const { mutate: deleteStudent } = useDeleteStudent()

  if (isLoading) return <Loading message="Loading students..." />
  if (error) return <ErrorDisplay message={error.message} onRetry={refetch} />

  const handleSubmit = (data) => {
    if (selectedStudent) {
      updateStudent({ id: selectedStudent.id, data })
    } else {
      createStudent(data)
    }
    setIsModalOpen(false)
    setSelectedStudent(null)
  }

  return (
    <div>
      <h1>Students Management</h1>
      <button onClick={() => setIsModalOpen(true)}>Add Student</button>

      <StudentList />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Title here</DialogTitle>
          </DialogHeader>

          <StudentForm
            student={selectedStudent}
            onSubmit={handleSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        </DialogContent>
      </Dialog>

    </div>
  )
}