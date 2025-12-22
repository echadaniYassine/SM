// src/pages/admin/TimetablePage.jsx
import { useState } from 'react'
import { useTimetables, useCreateTimetable, useUpdateTimetable, useDeleteTimetable } from '@/api/hooks/useTimetable'
import { usePrograms } from '@/api/hooks/usePrograms'
import TimetableForm from '@/components/forms/TimetableForm'
import WeeklyTimetable from '@/components/features/timetable/WeeklyTimetable'
import DailySchedule from '@/components/features/timetable/DailySchedule'
import TimetableCard from '@/components/features/timetable/TimetableCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { Plus, Calendar, List, Grid, Edit, Trash2, Filter, X } from 'lucide-react'
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

export default function TimetablePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTimetable, setSelectedTimetable] = useState(null)
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [activeView, setActiveView] = useState('weekly')

  // Fetch timetables with optional program filter
  const { data, isLoading, error, refetch } = useTimetables(
    selectedProgram ? { program_id: selectedProgram } : {}
  )
  const { data: programsData } = usePrograms()
  
  const { mutate: createTimetable } = useCreateTimetable()
  const { mutate: updateTimetable } = useUpdateTimetable()
  const { mutate: deleteTimetable } = useDeleteTimetable()

  const programs = programsData?.data || []
  const timetables = data?.data || []

  if (isLoading) return <Loading message="Loading timetable..." />
  if (error) return <ErrorDisplay message={error.message} onRetry={refetch} />

  const handleSubmit = (data) => {
    if (selectedTimetable) {
      updateTimetable({ id: selectedTimetable.id, data })
    } else {
      createTimetable(data)
    }
    setIsModalOpen(false)
    setSelectedTimetable(null)
  }

  const handleEdit = (timetable) => {
    setSelectedTimetable(timetable)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    deleteTimetable(id)
  }

  const handleClearFilter = () => {
    setSelectedProgram(null)
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Timetable</h1>
          <p className="text-muted-foreground">Manage class schedules and time slots</p>
        </div>
        <Button onClick={() => {
          setSelectedTimetable(null)
          setIsModalOpen(true)
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Schedule
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <Label className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter by Program
              </Label>
              <div className="flex gap-2">
                <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="All Programs" />
                  </SelectTrigger>
                  <SelectContent>
                    {programs.map((program) => (
                      <SelectItem key={program.id} value={String(program.id)}>
                        {program.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedProgram && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleClearFilter}
                    title="Clear filter"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView} className="space-y-4">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="weekly" className="flex items-center gap-2">
            <Grid className="h-4 w-4" />
            <span className="hidden sm:inline">Weekly Grid</span>
            <span className="sm:hidden">Grid</span>
          </TabsTrigger>
          <TabsTrigger value="daily" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Daily View</span>
            <span className="sm:hidden">Daily</span>
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">List View</span>
            <span className="sm:hidden">List</span>
          </TabsTrigger>
        </TabsList>

        {/* Weekly Grid View */}
        <TabsContent value="weekly" className="space-y-4">
          <WeeklyTimetable timetables={timetables} />
        </TabsContent>

        {/* Daily View */}
        <TabsContent value="daily" className="space-y-4">
          <DailySchedule timetables={timetables} />
        </TabsContent>

        {/* List View */}
        <TabsContent value="list" className="space-y-4">
          {timetables.length === 0 ? (
            <Alert>
              <AlertDescription>
                No timetable entries found{selectedProgram ? ' for this program' : ''}.
                Click "Add Schedule" to create one.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {timetables.map((timetable) => (
                <Card key={timetable.id} className="hover:shadow-md transition-shadow">
                  <TimetableCard timetable={timetable} />
                  <CardContent className="pt-0">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleEdit(timetable)}
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
                            <AlertDialogTitle>Delete Schedule Entry</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this schedule entry for{' '}
                              <strong>{timetable.subject?.name}</strong> on{' '}
                              <strong>{timetable.day_name}</strong>?
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(timetable.id)}
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
        </TabsContent>
      </Tabs>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedTimetable ? 'Edit Schedule Entry' : 'Add New Schedule Entry'}
            </DialogTitle>
          </DialogHeader>
          <TimetableForm
            timetable={selectedTimetable}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsModalOpen(false)
              setSelectedTimetable(null)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}