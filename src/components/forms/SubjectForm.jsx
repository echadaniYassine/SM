// src/components/forms/SubjectForm.jsx
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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Import hooks
import { useTeachers } from "@/api/hooks/useTeachers"
import { usePrograms } from "@/api/hooks/usePrograms"

export default function SubjectForm({ subject, onSubmit, onCancel }) {
  // Fetch data
  const {
    data: teachersData,
    isLoading: teachersLoading,
  } = useTeachers()

  const {
    data: programsData,
    isLoading: programsLoading,
  } = usePrograms()

  // Safe normalization
  const teachers = Array.isArray(teachersData?.data)
    ? teachersData.data
    : []

  const programs = Array.isArray(programsData?.data)
    ? programsData.data
    : []

  const form = useForm({
    defaultValues: {
      name: "",
      code: "",
      description: "",
      teacher_id: "",
      program_id: "",
    },
  })

  // Reset form when editing
  useEffect(() => {
    if (!subject) return

    form.reset({
      name: subject.name ?? "",
      code: subject.code ?? "",
      description: subject.description ?? "",
      teacher_id: subject.teacher_id
        ? String(subject.teacher_id)
        : "",
      program_id: subject.program_id
        ? String(subject.program_id)
        : "",
    })
  }, [subject, form])

  // Loading state
  if (teachersLoading || programsLoading) {
    return <div>Loading form data...</div>
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          rules={{ required: "Subject name is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Mathematics" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Code */}
        <FormField
          control={form.control}
          name="code"
          rules={{ required: "Subject code is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject Code</FormLabel>
              <FormControl>
                <Input placeholder="e.g., MATH101" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Subject description"
                  rows={3}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Teacher */}
        <FormField
          control={form.control}
          name="teacher_id"
          rules={{ required: "Teacher is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teacher</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select teacher" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {teachers.length === 0 && (
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                      No teachers found
                    </div>
                  )}
                  {teachers.map((t) => (
                    <SelectItem key={t.id} value={String(t.id)}>
                      {t.name} {t.speciality && `(${t.speciality})`}
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

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Subject</Button>
        </div>
      </form>
    </Form>
  )
}