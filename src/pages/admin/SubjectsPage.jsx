// src/pages/admin/SubjectsPage.jsx
import { useState } from 'react'
import { useSubjects, useCreateSubject, useUpdateSubject, useDeleteSubject } from '@/api/hooks/useSubjects'
import SubjectCard from '@/components/features/subjects/SubjectCard'
import SubjectForm from '@/components/forms/SubjectForm'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Loading from '@/components/ui/Loading'
import { ErrorDisplay } from '@/components/ui/Loading'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function SubjectsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState(null)

  const { data, isLoading, error, refetch } = useSubjects()
  const { mutate: createSubject } = useCreateSubject()
  const { mutate: updateSubject } = useUpdateSubject()
  const { mutate: deleteSubject } = useDeleteSubject()

  if (isLoading) return <Loading message="Loading subjects..." />
  if (error) return <ErrorDisplay message={error.message} onRetry={refetch} />

  const subjects = data?.data || []

  const handleSubmit = (data) => {
    if (selectedSubject) {
      updateSubject({ id: selectedSubject.id, data })
    } else {
      createSubject(data)
    }
    setIsModalOpen(false)
    setSelectedSubject(null)
  }

  const handleEdit = (subject) => {
    setSelectedSubject(subject)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    deleteSubject(id)
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subjects</h1>
          <p className="text-muted-foreground">Manage subjects, courses, and class assignments</p>
        </div>
        <Button onClick={() => {
          setSelectedSubject(null)
          setIsModalOpen(true)
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Subject
        </Button>
      </div>

      {/* Subjects Grid */}
      {subjects.length === 0 ? (
        <Alert>
          <AlertDescription>
            No subjects found. Click "Add Subject" to create one.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject) => (
            <div key={subject.id} className="relative group">
              <SubjectCard subject={subject} onClick={() => handleEdit(subject)} />
              
              {/* Action buttons overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-background"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEdit(subject)
                  }}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Subject</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete <strong>{subject.name}</strong> ({subject.code})?
                        This action cannot be undone and may affect timetable entries.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(subject.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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