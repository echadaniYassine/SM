// src/components/features/timetable/TimetableGrid.jsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { MapPin, User } from 'lucide-react'
import { useTimetables } from '@/api/hooks/useTimetable'
import { Loader2 } from 'lucide-react'

export default function TimetableGrid({ programId }) {
  const { data, isLoading, error } = useTimetables({ program_id: programId })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Error loading timetable: {error.message}</AlertDescription>
      </Alert>
    )
  }

  const timetables = data?.data || []
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

  // Group timetables by day
  const timetablesByDay = days.reduce((acc, day) => {
    acc[day] = timetables
      .filter(t => t.day_name === day)
      .sort((a, b) => a.start_time.localeCompare(b.start_time))
    return acc
  }, {})

  // Get unique time slots
  const timeSlots = [...new Set(timetables.map(t => `${t.start_time} - ${t.end_time}`))]
    .sort()

  if (timetables.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <Alert>
            <AlertDescription>
              No timetable entries found{programId ? ' for this program' : ''}.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  const formatTime = (time) => time?.slice(0, 5) || '—'

  return (
    <div className="space-y-6">
      {/* Mobile View - Day by Day */}
      <div className="lg:hidden space-y-4">
        {days.map(day => {
          const dayClasses = timetablesByDay[day]
          if (dayClasses.length === 0) return null

          return (
            <Card key={day}>
              <CardHeader>
                <CardTitle className="text-lg">{day}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {dayClasses.map(item => (
                  <div
                    key={item.id}
                    className="p-3 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{item.subject?.name}</h4>
                      <Badge variant="outline">
                        {formatTime(item.start_time)}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      {item.subject?.teacher?.name && (
                        <p className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {item.subject.teacher.name}
                        </p>
                      )}
                      {item.room && (
                        <p className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          Room {item.room}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Desktop View - Grid */}
      <Card className="hidden lg:block overflow-x-auto">
        <CardContent className="pt-6">
          <div className="grid grid-cols-6 gap-2 min-w-[800px]">
            {/* Header */}
            <div className="font-semibold p-3 text-center bg-muted rounded-t-lg">
              Time
            </div>
            {days.map(day => (
              <div key={day} className="font-semibold p-3 text-center bg-muted rounded-t-lg">
                {day}
              </div>
            ))}

            {/* Time slots */}
            {timeSlots.map(slot => (
              <>
                <div key={slot} className="p-3 text-sm text-center border-r font-medium bg-muted/50">
                  {slot}
                </div>
                {days.map(day => {
                  const classItem = timetablesByDay[day]?.find(
                    t => `${t.start_time} - ${t.end_time}` === slot
                  )

                  return (
                    <div key={`${day}-${slot}`} className="p-2">
                      {classItem ? (
                        <div className="p-3 border rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors h-full">
                          <div className="font-semibold text-sm mb-1">
                            {classItem.subject?.name}
                          </div>
                          {classItem.subject?.code && (
                            <Badge variant="outline" className="text-xs mb-1">
                              {classItem.subject.code}
                            </Badge>
                          )}
                          {classItem.subject?.teacher?.name && (
                            <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <User className="h-3 w-3" />
                              {classItem.subject.teacher.name}
                            </div>
                          )}
                          {classItem.room && (
                            <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3" />
                              {classItem.room}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="h-full min-h-[80px]" />
                      )}
                    </div>
                  )
                })}
              </>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}