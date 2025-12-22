// src/components/features/timetable/TimetableCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, BookOpen, User } from "lucide-react"

export default function TimetableCard({ timetable, onClick }) {
  // Format time
  const formatTime = (time) => {
    if (!time) return '—'
    // Assuming time is in HH:MM:SS format
    return time.slice(0, 5) // Returns HH:MM
  }

  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-semibold">
            {timetable.subject?.name || 'Unknown Subject'}
          </CardTitle>
          <Badge variant="outline">
            {timetable.day_name || `Day ${timetable.day_of_week}`}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        {/* Time */}
        <div className="flex items-center gap-2 text-sm font-medium">
          <Clock className="h-4 w-4 text-primary" />
          <span>
            {formatTime(timetable.start_time)} - {formatTime(timetable.end_time)}
          </span>
        </div>

        {/* Room */}
        {timetable.room && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Room {timetable.room}</span>
          </div>
        )}

        {/* Subject Code */}
        {timetable.subject?.code && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>{timetable.subject.code}</span>
          </div>
        )}

        {/* Teacher */}
        {timetable.subject?.teacher && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t">
            <User className="h-4 w-4" />
            <span>{timetable.subject.teacher.name}</span>
          </div>
        )}

        {/* Program */}
        {timetable.program && (
          <div className="pt-2">
            <Badge variant="secondary" className="text-xs">
              {timetable.program.name}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}