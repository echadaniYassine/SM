// src/components/features/subjects/SubjectCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, User, GraduationCap } from "lucide-react"

export default function SubjectCard({ subject, onClick }) {
  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold truncate">
              {subject.name}
            </CardTitle>
            {subject.code && (
              <p className="text-sm text-muted-foreground mt-1">
                Code: {subject.code}
              </p>
            )}
          </div>
          <Badge variant="outline" className="flex-shrink-0">
            <BookOpen className="h-3 w-3 mr-1" />
            Subject
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Description */}
        {subject.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {subject.description}
          </p>
        )}

        {/* Teacher */}
        {subject.teacher && (
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">{subject.teacher.name}</p>
              {subject.teacher.speciality && (
                <p className="text-xs text-muted-foreground">
                  {subject.teacher.speciality}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Program */}
        {subject.program && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t">
            <GraduationCap className="h-4 w-4" />
            <span>{subject.program.name}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}