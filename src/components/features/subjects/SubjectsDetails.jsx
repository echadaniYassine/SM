// src/components/features/subjects/SubjectDetails.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BookOpen, User, GraduationCap, FileText } from "lucide-react"

export default function SubjectDetails({ subject }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl mb-2">{subject.name}</CardTitle>
            {subject.code && (
              <Badge variant="outline">Code: {subject.code}</Badge>
            )}
          </div>
          <BookOpen className="h-8 w-8 text-primary" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Description */}
        {subject.description && (
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Description
            </h3>
            <p className="text-sm">{subject.description}</p>
          </div>
        )}

        <Separator />

        {/* Teacher */}
        {subject.teacher && (
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
              <User className="h-4 w-4" />
              Instructor
            </h3>
            
            <div className="p-3 border rounded-lg">
              <p className="font-medium">{subject.teacher.name}</p>
              {subject.teacher.speciality && (
                <p className="text-sm text-muted-foreground">
                  Speciality: {subject.teacher.speciality}
                </p>
              )}
              {subject.teacher.email && (
                <p className="text-sm text-muted-foreground">
                  Email: {subject.teacher.email}
                </p>
              )}
            </div>
          </div>
        )}

        <Separator />

        {/* Program */}
        {subject.program && (
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Program
            </h3>
            
            <div className="p-3 border rounded-lg">
              <p className="font-medium">{subject.program.name}</p>
              {subject.program.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {subject.program.description}
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}