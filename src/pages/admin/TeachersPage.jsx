// src/pages/admin/TeachersPage.jsx
import { useState } from 'react'
import { useTeachers, useCreateTeacher, useUpdateTeacher, useDeleteTeacher } from '@/api/hooks/useTeachers'
import TeacherList from '@/components/features/teachers/TeacherList'
import TeacherForm from '@/components/forms/TeacherForm'
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

export default function TeachersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState(null)

  const { data, isLoading, error, refetch } = useTeachers()
  const { mutate: createTeacher } = useCreateTeacher()
  const { mutate: updateTeacher } = useUpdateTeacher()
  const { mutate: deleteTeacher } = useDeleteTeacher()

  if (isLoading) return <Loading message="Loading teachers..." />
  if (error) return <ErrorDisplay message={error.message} onRetry={refetch} />

  const handleSubmit = (data) => {
    if (selectedTeacher) {
      updateTeacher({ id: selectedTeacher.id, data })
    } else {
      createTeacher(data)
    }
    setIsModalOpen(false)
    setSelectedTeacher(null)
  }

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teachers</h1>
          <p className="text-muted-foreground">Manage teaching staff and assignments</p>
        </div>
        <Button onClick={() => {
          setSelectedTeacher(null)
          setIsModalOpen(true)
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Teacher
        </Button>
      </div>

      {/* List */}
      <TeacherList onTeacherClick={handleEdit} />

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedTeacher ? 'Edit Teacher' : 'Add New Teacher'}
            </DialogTitle>
          </DialogHeader>
          <TeacherForm
            teacher={selectedTeacher}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsModalOpen(false)
              setSelectedTeacher(null)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
