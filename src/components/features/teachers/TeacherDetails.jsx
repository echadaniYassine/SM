// src/components/features/teachers/TeacherDetails.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Mail, Phone, BookOpen } from "lucide-react"

export default function TeacherDetails({ teacher }) {
  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?'
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-4">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
              {getInitials(teacher.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-2xl mb-2">{teacher.name}</CardTitle>
            {teacher.speciality && (
              <Badge variant="secondary">{teacher.speciality}</Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Contact Information */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Contact Information
          </h3>
          
          {teacher.email && (
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${teacher.email}`} className="text-sm hover:underline">
                {teacher.email}
              </a>
            </div>
          )}

          {teacher.phone && (
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a href={`tel:${teacher.phone}`} className="text-sm hover:underline">
                {teacher.phone}
              </a>
            </div>
          )}
        </div>

        {/* Subjects */}
        {teacher.subjects && teacher.subjects.length > 0 && (
          <>
            <Separator />
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Teaching Subjects ({teacher.subjects.length})
              </h3>
              
              <div className="grid gap-2">
                {teacher.subjects.map((subject) => (
                  <div key={subject.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{subject.name}</span>
                      <Badge variant="outline">{subject.code}</Badge>
                    </div>
                    {subject.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {subject.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}