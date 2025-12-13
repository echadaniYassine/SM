import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Clock } from 'lucide-react'

export default function RecentActivity({ activities = [] }) {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'registration':
        return '📝'
      case 'enrollment':
        return '✅'
      case 'attendance':
        return '📅'
      case 'grade':
        return '📊'
      default:
        return '📌'
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'registration':
        return 'bg-blue-100 text-blue-800'
      case 'enrollment':
        return 'bg-green-100 text-green-800'
      case 'attendance':
        return 'bg-purple-100 text-purple-800'
      case 'grade':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {activities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No recent activity
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity, idx) => (
                <div key={idx} className="flex gap-4 items-start pb-4 border-b last:border-0">
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.message}
                    </p>
                    {activity.user && (
                      <p className="text-xs text-muted-foreground mt-1">
                        by {activity.user}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {activity.timestamp || 'Just now'}
                      </span>
                      {activity.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {activity.badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}