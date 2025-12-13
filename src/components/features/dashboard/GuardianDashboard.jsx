import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Users, Calendar, BookOpen, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function GuardianDashboard({ students = [] }) {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Guardian Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Monitor your children's academic progress
        </p>
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            My Students ({students.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {students.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No students registered</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {students.map((student) => (
                <Card key={student.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getInitials(student.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Grade {student.grade || 'N/A'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          Program
                        </span>
                        <span className="font-medium">
                          {student.program?.name || 'Not enrolled'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Status
                        </span>
                        <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                          {student.status || 'Active'}
                        </Badge>
                      </div>
                    </div>

                    <Button 
                      asChild 
                      variant="outline" 
                      className="w-full"
                    >
                      <Link to={`/guardian/students/${student.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}