// src/components/forms/TimetableForm.jsx
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Import hooks
import { useSubjects } from "@/api/hooks/useSubjects"
import { usePrograms } from "@/api/hooks/usePrograms"

export default function TimetableForm({ timetable, onSubmit, onCancel }) {
  // Fetch data
  const {
    data: subjectsData,
    isLoading: subjectsLoading,
  } = useSubjects()

  const {
    data: programsData,
    isLoading: programsLoading,
  } = usePrograms()

  // Safe normalization
  const subjects = Array.isArray(subjectsData?.data)
    ? subjectsData.data
    : []

  const programs = Array.isArray(programsData?.data)
    ? programsData.data
    : []

  const form = useForm({
    defaultValues: {
      subject_id: "",
      program_id: "",
      day_of_week: "",
      start_time: "",
      end_time: "",
      room: "",
    },
  })

  // Reset form when editing
  useEffect(() => {
    if (!timetable) return

    form.reset({
      subject_id: timetable.subject_id
        ? String(timetable.subject_id)
        : "",
      program_id: timetable.program_id
        ? String(timetable.program_id)
        : "",
      day_of_week: timetable.day_of_week
        ? String(timetable.day_of_week)
        : "",
      start_time: timetable.start_time ?? "",
      end_time: timetable.end_time ?? "",
      room: timetable.room ?? "",
    })
  }, [timetable, form])

  // Loading state
  if (subjectsLoading || programsLoading) {
    return <div>Loading form data...</div>
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Subject */}
        <FormField
          control={form.control}
          name="subject_id"
          rules={{ required: "Subject is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subjects.length === 0 && (
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                      No subjects found
                    </div>
                  )}
                  {subjects.map((s) => (
                    <SelectItem key={s.id} value={String(s.id)}>
                      {s.name} ({s.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Program */}
        <FormField
          control={form.control}
          name="program_id"
          rules={{ required: "Program is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select program" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {programs.length === 0 && (
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                      No programs found
                    </div>
                  )}
                  {programs.map((p) => (
                    <SelectItem key={p.id} value={String(p.id)}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Day of Week */}
        <FormField
          control={form.control}
          name="day_of_week"
          rules={{ required: "Day is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Day of Week</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">Monday</SelectItem>
                  <SelectItem value="2">Tuesday</SelectItem>
                  <SelectItem value="3">Wednesday</SelectItem>
                  <SelectItem value="4">Thursday</SelectItem>
                  <SelectItem value="5">Friday</SelectItem>
                  <SelectItem value="6">Saturday</SelectItem>
                  <SelectItem value="7">Sunday</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Start Time */}
        <FormField
          control={form.control}
          name="start_time"
          rules={{ required: "Start time is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* End Time */}
        <FormField
          control={form.control}
          name="end_time"
          rules={{ required: "End time is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Room */}
        <FormField
          control={form.control}
          name="room"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Room 101, Lab A" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Timetable</Button>
        </div>
      </form>
    </Form>
  )
}