import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  GraduationCap, 
  UserCheck, 
  BookOpen,
  TrendingUp,
  Activity
} from 'lucide-react'
import StatsCard from './StatsCard'
import RecentActivity from './RecentActivity'

export default function AdminDashboard({ stats }) {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your school management system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Students"
          value={stats?.students?.total || 0}
          subtitle={`${stats?.students?.active || 0} active`}
          icon={GraduationCap}
          trend={{ direction: 'up', value: 12, label: 'from last month' }}
        />
        <StatsCard
          title="Total Teachers"
          value={stats?.teachers?.total || 0}
          subtitle={`${stats?.teachers?.active || 0} active`}
          icon={Users}
          trend={{ direction: 'up', value: 8 }}
        />
        <StatsCard
          title="Guardians"
          value={stats?.users?.by_role?.guardians || 0}
          subtitle="Registered parents"
          icon={UserCheck}
        />
        <StatsCard
          title="Programs"
          value={stats?.programs?.total || 0}
          subtitle={`${stats?.programs?.active || 0} active`}
          icon={BookOpen}
        />
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Recent Activity */}
            <div className="col-span-4">
              <RecentActivity 
                activities={stats?.recent_activities || [
                  {
                    type: 'registration',
                    message: 'New student registration submitted',
                    user: 'John Doe',
                    timestamp: '2 hours ago',
                    badge: 'Pending'
                  },
                  {
                    type: 'enrollment',
                    message: 'Student enrolled in Mathematics program',
                    user: 'Jane Smith',
                    timestamp: '5 hours ago',
                    badge: 'Completed'
                  }
                ]} 
              />
            </div>

            {/* Quick Stats */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Quick Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Attendance Rate</span>
                    <span className="text-sm font-bold">94%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '94%' }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Course Completion</span>
                    <span className="text-sm font-bold">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Active Programs</span>
                    <span className="text-sm font-bold">12/15</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Pending Registrations</span>
                    </div>
                    <span className="text-sm font-bold text-blue-600">
                      {stats?.registrations?.pending || 5}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics & Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Analytics charts will be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Report generation interface will be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}