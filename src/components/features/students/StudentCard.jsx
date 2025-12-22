// src/components/features/students/StudentCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, User, GraduationCap } from "lucide-react"

export default function StudentCard({ student, onClick }) {
  // Get initials for avatar
  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || '?'
  }

  // Format date
  const formatDate = (date) => {
    if (!date) return '—'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Gender badge color
  const getGenderVariant = (gender) => {
    if (gender === 'male') return 'default'
    if (gender === 'female') return 'secondary'
    return 'outline'
  }

  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {getInitials(student.name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold truncate">
              {student.name}
            </CardTitle>
            {student.student_id && (
              <p className="text-xs text-muted-foreground mt-1">
                ID: {student.student_id}
              </p>
            )}
          </div>

          {student.gender && (
            <Badge variant={getGenderVariant(student.gender)}>
              {student.gender.charAt(0).toUpperCase() + student.gender.slice(1)}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        {/* Date of Birth */}
        {student.date_of_birth && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(student.date_of_birth)}</span>
          </div>
        )}

        {/* Guardian */}
        {student.guardian && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span className="truncate">
              {student.guardian.name}
              {student.guardian.relationship && (
                <span className="text-xs ml-1">
                  ({student.guardian.relationship})
                </span>
              )}
            </span>
          </div>
        )}

        {/* Program */}
        {student.program && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <GraduationCap className="h-4 w-4" />
            <span className="truncate">{student.program.name}</span>
          </div>
        )}

        {/* Enrollment Status */}
        {student.enrollment_status && (
          <div className="pt-2 border-t">
            <Badge 
              variant={student.enrollment_status === 'active' ? 'default' : 'secondary'}
              className="text-xs"
            >
              {student.enrollment_status.charAt(0).toUpperCase() + student.enrollment_status.slice(1)}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}