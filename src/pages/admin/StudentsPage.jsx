// src/pages/admin/StudentsPage.jsx
import { useState, useCallback } from 'react'
import { useStudents, useCreateStudent, useUpdateStudent, useDeleteStudent } from '@/api/hooks/useStudents'
import StudentList from '@/components/features/students/StudentList'
import StudentFilters from '@/components/features/students/StudentFilters'
import StudentForm from '@/components/forms/StudentForm'
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

export default function StudentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [filters, setFilters] = useState({})

  const { data, isLoading, error, refetch } = useStudents(filters)
  const { mutate: createStudent } = useCreateStudent()
  const { mutate: updateStudent } = useUpdateStudent()
  const { mutate: deleteStudent } = useDeleteStudent()

  // Handle filter changes
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }))
  }, [])

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

  const handleEdit = (student) => {
    setSelectedStudent(student)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">Manage student records and information</p>
        </div>
        <Button onClick={() => {
          setSelectedStudent(null)
          setIsModalOpen(true)
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Filters */}
      <StudentFilters onFilterChange={handleFilterChange} />

      {/* List */}
      <StudentList onStudentClick={handleEdit} />

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedStudent ? 'Edit Student' : 'Add New Student'}
            </DialogTitle>
          </DialogHeader>
          <StudentForm
            student={selectedStudent}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsModalOpen(false)
              setSelectedStudent(null)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}