import { useAuthStore } from '@/store/authSlice'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user)

  if (!user) return null

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">My Profile</h1>
        <p className="text-sm text-muted-foreground">
          Manage and view your personal information
        </p>
      </div>

      {/* Profile Card */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarFallback className="text-lg font-medium">
              {user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <CardTitle className="text-lg">{user.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>

          <div className="ml-auto">
            <Badge variant="outline" className="capitalize">
              {user.role}
            </Badge>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ProfileItem label="Full Name" value={user.name} />
            <ProfileItem label="Email Address" value={user.email} />
            <ProfileItem label="Role" value={user.role} />
            <ProfileItem
              label="Account Status"
              value={user.status ?? 'Active'}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ProfileItem({ label, value }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value || '-'}</p>
    </div>
  )
}
