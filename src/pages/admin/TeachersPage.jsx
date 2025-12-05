import { useState } from 'react'
import { useTeachers, useCreateTeacher, useUpdateTeacher, useDeleteTeacher } from '@/api/hooks/useTeachers'
import TeacherList from '@/components/features/teachers/TeacherList'
import TeacherForm from '@/components/forms/TeacherForm'
import Modal from '../../components/common/Modal'

export default function TeachersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState(null)

  const { data, isLoading } = useTeachers()
  const { mutate: createTeacher } = useCreateTeacher()
  const { mutate: updateTeacher } = useUpdateTeacher()
  const { mutate: deleteTeacher } = useDeleteTeacher()

  const handleSubmit = (data) => {
    if (selectedTeacher) {
      updateTeacher({ id: selectedTeacher.id, data })
    } else {
      createTeacher(data)
    }
    setIsModalOpen(false)
    setSelectedTeacher(null)
  }

  return (
    <div>
      <h1>Teachers Management</h1>
      <button onClick={() => setIsModalOpen(true)}>Add Teacher</button>

      <TeacherList />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Teacher Form">
        <TeacherForm
          teacher={selectedTeacher}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}