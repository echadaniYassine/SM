// src/components/forms/StudentForm.jsx
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

// ✅ IMPORT HOOKS
import { useGuardians } from "@/api/hooks/useGuardians"
import { usePrograms } from "@/api/hooks/usePrograms"

export default function StudentForm({
  student,
  onSubmit,
  onCancel,
}) {
  // ✅ FETCH DATA (PROPERLY)
  const {
    data: guardiansData,
    isLoading: guardiansLoading,
  } = useGuardians()

  const {
    data: programsData,
    isLoading: programsLoading,
  } = usePrograms()

  // ✅ SAFE NORMALIZATION
  const guardians = Array.isArray(guardiansData?.data)
    ? guardiansData.data
    : []

  const programs = Array.isArray(programsData?.data)
    ? programsData.data
    : []

  const form = useForm({
    defaultValues: {
      name: "",
      date_of_birth: "",
      gender: "",
      guardian_id: "",
      program_id: "",
    },
  })

  // ✅ RESET ON EDIT
  useEffect(() => {
    if (!student) return

    form.reset({
      name: student.name ?? "",
      date_of_birth: student.date_of_birth ?? "",
      gender: student.gender ?? "",
      guardian_id: student.guardian?.id
        ? String(student.guardian.id)
        : "",
      program_id: student.program?.id
        ? String(student.program.id)
        : "",
    })
  }, [student, form])

  // ✅ LOADING STATE
  if (guardiansLoading || programsLoading) {
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
          rules={{ required: "Student name is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Name</FormLabel>
              <FormControl>
                <Input placeholder="Student name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date of Birth */}
        <FormField
          control={form.control}
          name="date_of_birth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Gender */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* Guardian */}
        <FormField
          control={form.control}
          name="guardian_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guardian</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select guardian" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {guardians.length === 0 && (
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                      No guardians found
                    </div>
                  )}
                  {guardians.map((g) => (
                    <SelectItem key={g.id} value={String(g.id)}>
                      {g.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* Program */}
        <FormField
          control={form.control}
          name="program_id"
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
            </FormItem>
          )}
        />

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Student</Button>
        </div>
      </form>
    </Form>
  )
}
