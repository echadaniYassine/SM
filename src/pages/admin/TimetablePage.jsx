import { useState } from 'react'
import { useTimetables, useCreateTimetable, useUpdateTimetable, useDeleteTimetable } from '@/api/hooks/useTimetable'
import TimetableForm from '@/components/forms/TimetableForm'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"

export default function TimetablePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTimetable, setSelectedTimetable] = useState(null)

  const { data, isLoading } = useTimetables()
  const { mutate: createTimetable } = useCreateTimetable()
  const { mutate: updateTimetable } = useUpdateTimetable()
  const { mutate: deleteTimetable } = useDeleteTimetable()

  const handleSubmit = (data) => {
    if (selectedTimetable) {
      updateTimetable({ id: selectedTimetable.id, data })
    } else {
      createTimetable(data)
    }
    setIsModalOpen(false)
    setSelectedTimetable(null)
  }

  return (
    <div>
      <h1>Timetable Management</h1>
      <button onClick={() => setIsModalOpen(true)}>Add Timetable Entry</button>

      <div>
        {data?.data?.data?.map((timetable) => (
          <div key={timetable.id}>
            <p>
              {timetable.day_name}: {timetable.start_time} - {timetable.end_time}
            </p>
            <p>{timetable.subject?.name}</p>
            <button onClick={() => {
              setSelectedTimetable(timetable)
              setIsModalOpen(true)
            }}>
              Edit
            </button>
            <button onClick={() => deleteTimetable(timetable.id)}>Delete</button>
          </div>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Title here</DialogTitle>
          </DialogHeader>

          <TimetableForm
            timetable={selectedTimetable}
            onSubmit={handleSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        </DialogContent>
      </Dialog>

    </div>
  )
}
