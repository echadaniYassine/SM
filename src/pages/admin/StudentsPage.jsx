import { useState } from 'react'
import { useStudents, useCreateStudent, useUpdateStudent, useDeleteStudent } from '@/api/hooks/useStudents'
import StudentList from '@/components/features/students/StudentList'
import StudentForm from '@/components/forms/StudentForm'
import Modal from '@/components/common/Modal'

export default function StudentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)

  const { data, isLoading } = useStudents()
  const { mutate: createStudent } = useCreateStudent()
  const { mutate: updateStudent } = useUpdateStudent()
  const { mutate: deleteStudent } = useDeleteStudent()

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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Student Form">
        <StudentForm
          student={selectedStudent}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}