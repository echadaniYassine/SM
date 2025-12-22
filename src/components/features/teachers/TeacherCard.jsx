// src/components/features/teachers/TeacherCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Mail, Phone, BookOpen } from "lucide-react"

export default function TeacherCard({ teacher, onClick }) {
  // Get initials for avatar
  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || '?'
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
              {getInitials(teacher.name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold truncate">
              {teacher.name}
            </CardTitle>
            {teacher.speciality && (
              <Badge variant="secondary" className="mt-1">
                {teacher.speciality}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        {/* Email */}
        {teacher.email && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{teacher.email}</span>
          </div>
        )}

        {/* Phone */}
        {teacher.phone && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4 flex-shrink-0" />
            <span>{teacher.phone}</span>
          </div>
        )}

        {/* Subjects */}
        {teacher.subjects && teacher.subjects.length > 0 && (
          <div className="pt-2 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <BookOpen className="h-4 w-4" />
              <span className="font-medium">
                {teacher.subjects.length} subject{teacher.subjects.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {teacher.subjects.slice(0, 3).map((subject) => (
                <Badge key={subject.id} variant="outline" className="text-xs">
                  {subject.name}
                </Badge>
              ))}
              {teacher.subjects.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{teacher.subjects.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}