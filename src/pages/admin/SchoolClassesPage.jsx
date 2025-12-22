import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import ClassList from "@/components/features/classes/ClassList"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import SchoolClassForm from '@/components/forms/SchoolClassForm'
import {
  useSchoolClasses,
  useCreateSchoolClass,
  useUpdateSchoolClass,
  useDeleteSchoolClass,
} from "@/api/hooks/useSchoolClasses"

export default function SchoolClassesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState(null)
  const [filters, setFilters] = useState({})

  // ✅ QUERY
  const { data, isLoading, error } = useSchoolClasses(filters)

  // ✅ MUTATIONS
  const { mutate: createClass } = useCreateSchoolClass()
  const { mutate: updateClass } = useUpdateSchoolClass()
  const { mutate: deleteClass } = useDeleteSchoolClass()

  const handleSubmit = (formData) => {
    if (selectedClass) {
      updateClass({ id: selectedClass.id, data: formData })
    } else {
      createClass(formData)
    }

    setIsModalOpen(false)
    setSelectedClass(null)
  }

  const handleEdit = (cls) => {
    setSelectedClass(cls)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Classes</h1>
          <p className="text-muted-foreground">
            Manage school classes and assignments
          </p>
        </div>

        <Button
          onClick={() => {
            setSelectedClass(null)
            setIsModalOpen(true)
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Class
        </Button>
      </div>

      {/* List */}
      <ClassList
        data={data}
        isLoading={isLoading}
        error={error}
        onEdit={handleEdit}
        onDelete={(id) => deleteClass(id)}
      />

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedClass ? "Edit Class" : "Add New Class"}
            </DialogTitle>
          </DialogHeader>
          <SchoolClassForm
            schoolClass={selectedClass}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsModalOpen(false)
              setSelectedClass(null)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
