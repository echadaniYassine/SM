// src/components/features/students/StudentDetails.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Calendar,
  User,
  GraduationCap,
  Droplet,
  FileText,
  MapPin,
  Phone,
  Mail,
  IdCard
} from "lucide-react"

export default function StudentDetails({ student }) {
  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?'
  }

  const formatDate = (date) => {
    if (!date) return '—'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-4">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
              {getInitials(student.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-2xl mb-2">{student.name}</CardTitle>
            <div className="flex flex-wrap gap-2">
              {student.gender && (
                <Badge>{student.gender.charAt(0).toUpperCase() + student.gender.slice(1)}</Badge>
              )}
              {student.enrollment_status && (
                <Badge variant="secondary">
                  {student.enrollment_status.charAt(0).toUpperCase() + student.enrollment_status.slice(1)}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Basic Information
          </h3>
          
          {student.student_id && (
            <div className="flex items-center gap-3">
              <IdCard className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Student ID: <strong>{student.student_id}</strong></span>
            </div>
          )}

          {student.date_of_birth && (
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Date of Birth: <strong>{formatDate(student.date_of_birth)}</strong></span>
            </div>
          )}

          {student.blood_type && (
            <div className="flex items-center gap-3">
              <Droplet className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Blood Type: <strong>{student.blood_type}</strong></span>
            </div>
          )}

          {student.address && (
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span className="text-sm">Address: <strong>{student.address}</strong></span>
            </div>
          )}
        </div>

        <Separator />

        {/* Guardian Information */}
        {student.guardian && (
          <>
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Guardian Information
              </h3>
              
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <strong>{student.guardian.name}</strong>
                  {student.guardian.relationship && (
                    <span className="text-muted-foreground ml-2">
                      ({student.guardian.relationship})
                    </span>
                  )}
                </span>
              </div>

              {student.guardian.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{student.guardian.phone}</span>
                </div>
              )}
            </div>
            <Separator />
          </>
        )}

        {/* Program */}
        {student.program && (
          <>
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Academic Program
              </h3>
              
              <div className="flex items-start gap-3">
                <GraduationCap className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-semibold">{student.program.name}</p>
                  {student.program.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {student.program.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Medical Notes */}
        {student.medical_notes && (
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Medical Notes
            </h3>
            
            <div className="flex items-start gap-3">
              <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
              <p className="text-sm">{student.medical_notes}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
