import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

export default function StatsCard({ title, value, subtitle, icon: Icon, trend }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
        {trend && (
          <div className="flex items-center gap-1 mt-2">
            {trend.direction === 'up' ? (
              <ArrowUpIcon className="h-4 w-4 text-green-600" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 text-red-600" />
            )}
            <span className={`text-xs font-medium ${
              trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend.value}%
            </span>
            <span className="text-xs text-muted-foreground">
              {trend.label || 'from last month'}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}