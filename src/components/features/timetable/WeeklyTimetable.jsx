import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, MapPin } from 'lucide-react'

export default function WeeklyTimetable({ timetables = [] }) {
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
        <CardContent className="pt-6 text-center text-muted-foreground">
          No timetable entries found
        </CardContent>
      </Card>
    )
  }

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
                <CardTitle>{day}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {dayClasses.map(item => (
                  <div
                    key={item.id}
                    className="p-3 border rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{item.subject?.name}</h4>
                      <Badge variant="outline">
                        {item.start_time}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      {item.teacher?.name && (
                        <p>Teacher: {item.teacher.name}</p>
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
            <div className="font-semibold p-3 text-center">Time</div>
            {days.map(day => (
              <div key={day} className="font-semibold p-3 text-center">
                {day}
              </div>
            ))}

            {/* Time slots */}
            {timeSlots.map(slot => (
              <>
                <div key={slot} className="p-3 text-sm text-center border-r">
                  {slot}
                </div>
                {days.map(day => {
                  const classItem = timetablesByDay[day]?.find(
                    t => `${t.start_time} - ${t.end_time}` === slot
                  )

                  return (
                    <div key={`${day}-${slot}`} className="p-2">
                      {classItem ? (
                        <div className="p-3 border rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                          <div className="font-semibold text-sm mb-1">
                            {classItem.subject?.name}
                          </div>
                          {classItem.teacher?.name && (
                            <div className="text-xs text-muted-foreground">
                              {classItem.teacher.name}
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
                        <div className="h-full" />
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