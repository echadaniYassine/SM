import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Users,
  MapPin,
  Eye
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function TeacherDashboard({ subjects = [], todaySchedule = [] }) {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Manage your classes and schedule
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">My Subjects</p>
                <h3 className="text-2xl font-bold">{subjects.length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today's Classes</p>
                <h3 className="text-2xl font-bold">{todaySchedule.length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <h3 className="text-2xl font-bold">
                  {subjects.reduce((sum, s) => sum + (s.students_count || 0), 0)}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* My Subjects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              My Subjects ({subjects.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {subjects.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No subjects assigned</p>
              </div>
            ) : (
              <div className="space-y-3">
                {subjects.map((subject) => (
                  <div 
                    key={subject.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{subject.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {subject.code || 'N/A'}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {subject.students_count || 0} students
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/teacher/subjects/${subject.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

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
                    className="p-4 rounded-lg border bg-card"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">
                          {item.start_time} - {item.end_time}
                        </span>
                      </div>
                      <Badge>
                        {item.subject?.code || 'N/A'}
                      </Badge>
                    </div>
                    <h4 className="font-medium mb-1">
                      {item.subject?.name || 'Subject'}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {item.room && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          Room {item.room}
                        </span>
                      )}
                      {item.program && (
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {item.program.name}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}