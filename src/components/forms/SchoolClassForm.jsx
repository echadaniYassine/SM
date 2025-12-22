// src/components/forms/SchoolClassForm.jsx
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

// ✅ DATA HOOKS
import { usePrograms } from "@/api/hooks/usePrograms"
import { useTeachers } from "@/api/hooks/useTeachers"

export default function SchoolClassForm({
  schoolClass,
  onSubmit,
  onCancel,
}) {
  // ===============================
  // FETCH DATA
  // ===============================
  const { data: programsData, isLoading: programsLoading } = usePrograms()
  const { data: teachersData, isLoading: teachersLoading } = useTeachers()

  const programs = Array.isArray(programsData?.data)
    ? programsData.data
    : []

  const teachers = Array.isArray(teachersData?.data)
    ? teachersData.data
    : []

  // ===============================
  // FORM
  // ===============================
  const form = useForm({
    defaultValues: {
      name: "",
      level: "",
      section: "",
      capacity: "",
      room: "",
      academic_year: "",
      program_id: "",
      main_teacher_id: "",
    },
  })

  // ===============================
  // RESET ON EDIT
  // ===============================
  useEffect(() => {
    if (!schoolClass) return

    form.reset({
      name: schoolClass.name ?? "",
      level: schoolClass.level ?? "",
      section: schoolClass.section ?? "",
      capacity: schoolClass.capacity ?? "",
      room: schoolClass.room ?? "",
      academic_year: schoolClass.academic_year ?? "",
      program_id: schoolClass.program?.id
        ? String(schoolClass.program.id)
        : "",
      main_teacher_id: schoolClass.main_teacher?.id
        ? String(schoolClass.main_teacher.id)
        : "",
    })
  }, [schoolClass, form])

  if (programsLoading || teachersLoading) {
    return <div>Loading form data...</div>
  }

  // ===============================
  // RENDER
  // ===============================
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Class Name */}
        <FormField
          control={form.control}
          name="name"
          rules={{ required: "Class name is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 1A, 2B" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Level */}
        <FormField
          control={form.control}
          name="level"
          rules={{ required: "Level is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Level</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1st_year">1st Year</SelectItem>
                  <SelectItem value="2nd_year">2nd Year</SelectItem>
                  <SelectItem value="3rd_year">3rd Year</SelectItem>
                  <SelectItem value="4th_year">4th Year</SelectItem>
                  <SelectItem value="5th_year">5th Year</SelectItem>
                  <SelectItem value="6th_year">6th Year</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Section */}
        <FormField
          control={form.control}
          name="section"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section</FormLabel>
              <FormControl>
                <Input placeholder="A / B / C" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Capacity */}
        <FormField
          control={form.control}
          name="capacity"
          rules={{ required: "Capacity is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity</FormLabel>
              <FormControl>
                <Input type="number" placeholder="30" {...field} />
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
                <Input placeholder="Room 101" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Academic Year */}
        <FormField
          control={form.control}
          name="academic_year"
          rules={{ required: "Academic year is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Academic Year</FormLabel>
              <FormControl>
                <Input placeholder="2024-2025" {...field} />
              </FormControl>
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

        {/* Main Teacher */}
        <FormField
          control={form.control}
          name="main_teacher_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Teacher (optional)</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select teacher" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {teachers.map((t) => (
                    <SelectItem key={t.id} value={String(t.id)}>
                      {t.name} — {t.speciality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {schoolClass ? "Update Class" : "Create Class"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
