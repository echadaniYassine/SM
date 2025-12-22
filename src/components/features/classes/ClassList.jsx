import { useSchoolClasses } from "@/api/hooks/useSchoolClasses"
import ClassCard from "./ClassCard"
import Loading from "@/components/ui/Loading"
import { ErrorDisplay } from "@/components/ui/Loading"

export default function ClassList({ filters, onClassClick }) {
  const { data, isLoading, error, refetch } = useSchoolClasses(filters)

  if (isLoading) return <Loading message="Loading classes..." />
  if (error) return <ErrorDisplay message={error.message} onRetry={refetch} />

  const classes = data?.data || []

  if (!classes.length) {
    return (
      <p className="text-muted-foreground text-center">
        No classes found
      </p>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {classes.map(cls => (
        <ClassCard
          key={cls.id}
          schoolClass={cls}
          onClick={() => onClassClick?.(cls)}

        />
      ))}
    </div>
  )
}
