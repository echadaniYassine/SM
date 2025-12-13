import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  GraduationCap,
  MapPin
} from 'lucide-react'

export default function StudentDashboard({ student, todaySchedule = [] }) {
  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'ST'
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header with Student Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={student?.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                {getInitials(student?.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{student?.name || 'Student'}</h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <GraduationCap className="h-4 w-4" />
                  <span>{student?.program?.name || 'Not enrolled'}</span>
                </div>
                <Badge variant="secondary">
                  Grade {student?.grade || 'N/A'}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todaySchedule.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No classes scheduled for today</p>
              </div>
            ) : (
              <div className="space-y-3">
                {todaySchedule.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold">
                          {item.subject?.name || 'Subject'}
                        </h4>
                        <Badge variant="outline" className="ml-2">
                          {item.start_time}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {item.teacher?.name && (
                          <>
                            <span>{item.teacher.name}</span>
                            <span>•</span>
                          </>
                        )}
                        {item.room && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {item.room}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">
                    {student?.subjects_count || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">Subjects</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">
                    {todaySchedule.length}
                  </div>
                  <p className="text-xs text-muted-foreground">Today's Classes</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Attendance Rate</span>
                <span className="text-sm font-bold">95%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}