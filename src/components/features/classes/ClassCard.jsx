import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, DoorOpen } from "lucide-react"

export default function ClassCard({ schoolClass, onClick }) {
  return (
    <Card
      className="cursor-pointer hover:shadow-md transition"
      onClick={() => onClick?.(schoolClass)}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {schoolClass.name}
          <Badge variant={schoolClass.is_full ? "destructive" : "secondary"}>
            {schoolClass.level_name}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          {schoolClass.students_count}/{schoolClass.capacity} students
        </div>

        <div className="flex items-center gap-2">
          <DoorOpen className="h-4 w-4" />
          Room: {schoolClass.room || "—"}
        </div>

        <p className="text-muted-foreground">
          Academic Year: {schoolClass.academic_year}
        </p>
      </CardContent>
    </Card>
  )
}
