// src/components/features/timetable/DailySchedule.jsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, MapPin, User, BookOpen } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function DailySchedule({ timetables = [], date }) {
  const formatTime = (time) => {
    if (!time) return '—'
    return time.slice(0, 5)
  }

  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[date ? new Date(date).getDay() : new Date().getDay()]
  }

  // Filter for today's schedule
  const todaySchedule = timetables
    .filter(t => t.day_name === getCurrentDay())
    .sort((a, b) => a.start_time.localeCompare(b.start_time))

  if (todaySchedule.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule - {getCurrentDay()}</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>No classes scheduled for today.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Today's Schedule - {getCurrentDay()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {todaySchedule.map((item) => (
            <div
              key={item.id}
              className="p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold">{item.subject?.name || 'Unknown Subject'}</h4>
                  </div>
                  {item.subject?.code && (
                    <Badge variant="outline" className="text-xs">
                      {item.subject.code}
                    </Badge>
                  )}
                </div>
                <Badge className="flex-shrink-0">
                  {formatTime(item.start_time)} - {formatTime(item.end_time)}
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-sm text-muted-foreground">
                {item.subject?.teacher?.name && (
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3" />
                    <span>{item.subject.teacher.name}</span>
                  </div>
                )}
                {item.room && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    <span>Room {item.room}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}