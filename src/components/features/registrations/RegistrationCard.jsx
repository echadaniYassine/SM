// src/components/features/registrations/RegistrationCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, User, GraduationCap, Check, X } from "lucide-react"

export default function RegistrationCard({ registration, onApprove, onReject }) {
  // Status badge styling
  const getStatusVariant = (status) => {
    switch (status) {
      case 'confirmed':
        return 'default'
      case 'rejected':
        return 'destructive'
      case 'pending':
      default:
        return 'secondary'
    }
  }

  const isPending = registration.status === 'pending'

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold truncate">
              {registration.full_name}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Submitted: {new Date(registration.created_at).toLocaleDateString()}
            </p>
          </div>
          <Badge variant={getStatusVariant(registration.status)}>
            {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Parent Information */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{registration.parent_name}</span>
          </div>

          {registration.email && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{registration.email}</span>
            </div>
          )}

          {registration.phone && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{registration.phone}</span>
            </div>
          )}
        </div>

        {/* Program */}
        {registration.program && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t">
            <GraduationCap className="h-4 w-4" />
            <span className="font-medium">{registration.program.name}</span>
          </div>
        )}

        {/* Message */}
        {registration.message && (
          <div className="pt-2 border-t">
            <p className="text-xs font-medium text-muted-foreground mb-1">Message:</p>
            <p className="text-sm line-clamp-2">{registration.message}</p>
          </div>
        )}

        {/* Rejection Reason */}
        {registration.rejection_reason && (
          <div className="pt-2 border-t">
            <p className="text-xs font-medium text-destructive mb-1">Rejection Reason:</p>
            <p className="text-sm text-muted-foreground">{registration.rejection_reason}</p>
          </div>
        )}

        {/* Actions - Only show for pending registrations */}
        {isPending && (
          <div className="flex gap-2 pt-3">
            <Button
              size="sm"
              variant="default"
              className="flex-1"
              onClick={() => onApprove(registration.id)}
            >
              <Check className="h-4 w-4 mr-1" />
              Approve
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="flex-1"
              onClick={() => onReject(registration.id)}
            >
              <X className="h-4 w-4 mr-1" />
              Reject
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}