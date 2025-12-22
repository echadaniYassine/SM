// src/components/forms/TeacherForm.jsx
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function TeacherForm({ teacher, onSubmit, onCancel }) {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      speciality: "",
    },
  })

  // Reset form when editing
  useEffect(() => {
    if (!teacher) return

    form.reset({
      name: teacher.name ?? "",
      email: teacher.email ?? "",
      phone: teacher.phone ?? "",
      speciality: teacher.speciality ?? "",
    })
  }, [teacher, form])

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
          rules={{ required: "Teacher name is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teacher Name</FormLabel>
              <FormControl>
                <Input placeholder="Full name" {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="+212..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Speciality */}
        <FormField
          control={form.control}
          name="speciality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Speciality</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a speciality" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value="arabic">Arabic (اللغة العربية)</SelectItem>
                  <SelectItem value="french">French (اللغة الفرنسية)</SelectItem>
                  <SelectItem value="english">English (اللغة الإنجليزية)</SelectItem>
                  <SelectItem value="math">Mathematics (الرياضيات)</SelectItem>
                  <SelectItem value="science">Science (العلوم)</SelectItem>
                  <SelectItem value="physics">Physics & Chemistry (الفيزياء والكيمياء)</SelectItem>
                  <SelectItem value="svt">SVT (علوم الحياة والأرض)</SelectItem>
                  <SelectItem value="history_geo">History & Geography (التاريخ والجغرافيا)</SelectItem>
                  <SelectItem value="islamic">Islamic Education (التربية الإسلامية)</SelectItem>
                  <SelectItem value="philosophy">Philosophy (الفلسفة)</SelectItem>
                  <SelectItem value="it">Informatics (المعلوميات)</SelectItem>
                  <SelectItem value="sport">Physical Education (التربية البدنية)</SelectItem>
                  <SelectItem value="art">Art Education (التربية الفنية)</SelectItem>
                  <SelectItem value="amazigh">Amazigh (الأمازيغية)</SelectItem>
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
          <Button type="submit">Save Teacher</Button>
        </div>
      </form>
    </Form>
  )
}