// src/components/forms/RegistrationForm.jsx
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
import { usePrograms } from "@/api/hooks/usePrograms"

export default function RegistrationForm({ registration, onSubmit, onCancel }) {
  // Fetch programs
  const {
    data: programsData,
    isLoading: programsLoading,
  } = usePrograms()

  // Safe normalization
  const programs = Array.isArray(programsData?.data)
    ? programsData.data
    : []

  const form = useForm({
    defaultValues: {
      full_name: "",
      parent_name: "",
      phone: "",
      email: "",
      program_id: "",
      message: "",
    },
  })

  // Reset form when editing
  useEffect(() => {
    if (!registration) return

    form.reset({
      full_name: registration.full_name ?? "",
      parent_name: registration.parent_name ?? "",
      phone: registration.phone ?? "",
      email: registration.email ?? "",
      program_id: registration.program_id
        ? String(registration.program_id)
        : "",
      message: registration.message ?? "",
    })
  }, [registration, form])

  // Loading state
  if (programsLoading) {
    return <div>Loading form data...</div>
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Student Full Name */}
        <FormField
          control={form.control}
          name="full_name"
          rules={{ required: "Student name is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Student's full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Parent Name */}
        <FormField
          control={form.control}
          name="parent_name"
          rules={{ required: "Parent name is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent/Guardian Name</FormLabel>
              <FormControl>
                <Input placeholder="Parent or guardian name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          rules={{ required: "Phone number is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+212..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Program */}
        <FormField
          control={form.control}
          name="program_id"
          rules={{ required: "Program selection is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a program" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {programs.length === 0 && (
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                      No programs available
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

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Message (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Any additional information or questions..."
                  rows={4}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Actions */}
        <div className="flex justify-end gap-3">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit">Submit Registration</Button>
        </div>
      </form>
    </Form>
  )
}