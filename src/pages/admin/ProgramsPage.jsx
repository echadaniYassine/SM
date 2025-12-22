// src/pages/admin/ProgramsPage.jsx
import { useState } from 'react'
import { usePrograms, useCreateProgram, useUpdateProgram, useDeleteProgram } from '@/api/hooks/usePrograms'
import ProgramForm from '@/components/forms/ProgramForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2, Users, BookOpen } from 'lucide-react'
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

export default function ProgramsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState(null)

  const { data, isLoading, error, refetch } = usePrograms()
  const { mutate: createProgram } = useCreateProgram()
  const { mutate: updateProgram } = useUpdateProgram()
  const { mutate: deleteProgram } = useDeleteProgram()

  if (isLoading) return <Loading message="Loading programs..." />
  if (error) return <ErrorDisplay message={error.message} onRetry={refetch} />

  const programs = data?.data || data || []

  const handleSubmit = (data) => {
    if (selectedProgram) {
      updateProgram({ id: selectedProgram.id, data })
    } else {
      createProgram(data)
    }
    setIsModalOpen(false)
    setSelectedProgram(null)
  }

  const handleEdit = (program) => {
    setSelectedProgram(program)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    deleteProgram(id)
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Programs</h1>
          <p className="text-muted-foreground">Manage academic programs and curricula</p>
        </div>
        <Button onClick={() => {
          setSelectedProgram(null)
          setIsModalOpen(true)
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Program
        </Button>
      </div>

      {/* Programs Grid */}
      {programs.length === 0 ? (
        <Alert>
          <AlertDescription>
            No programs found. Click "Add Program" to create one.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {programs.map((program) => (
            <Card key={program.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{program.name}</CardTitle>
                    <div className="flex gap-2 mt-2">
                      {program.students_count !== undefined && (
                        <Badge variant="secondary" className="text-xs">
                          <Users className="h-3 w-3 mr-1" />
                          {program.students_count} students
                        </Badge>
                      )}
                      {program.subjects_count !== undefined && (
                        <Badge variant="outline" className="text-xs">
                          <BookOpen className="h-3 w-3 mr-1" />
                          {program.subjects_count} subjects
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Description */}
                {program.description ? (
                  <CardDescription className="line-clamp-3">
                    {program.description}
                  </CardDescription>
                ) : (
                  <CardDescription className="text-muted-foreground italic">
                    No description provided
                  </CardDescription>
                )}

                {/* Subjects List */}
                {program.subjects && program.subjects.length > 0 && (
                  <div className="pt-2 border-t">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Subjects:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {program.subjects.slice(0, 3).map((subject) => (
                        <Badge key={subject.id} variant="outline" className="text-xs">
                          {subject.name}
                        </Badge>
                      ))}
                      {program.subjects.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{program.subjects.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleEdit(program)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive" className="flex-1">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Program</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{program.name}"? This action cannot be undone.
                          {program.students_count > 0 && (
                            <span className="block mt-2 text-destructive font-medium">
                              Warning: This program has {program.students_count} associated student(s).
                            </span>
                          )}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(program.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedProgram ? 'Edit Program' : 'Add New Program'}
            </DialogTitle>
          </DialogHeader>
          <ProgramForm
            program={selectedProgram}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsModalOpen(false)
              setSelectedProgram(null)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}