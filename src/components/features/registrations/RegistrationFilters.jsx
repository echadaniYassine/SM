import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Filter, X } from "lucide-react"
import { useState } from "react"

export default function RegistrationFilters({ onFilterChange }) {
  const [selectedStatus, setSelectedStatus] = useState(null)

  const handleStatusChange = (value) => {
    setSelectedStatus(value)
    onFilterChange({ status: value })
  }

  const handleClearStatus = () => {
    setSelectedStatus(null)
    onFilterChange({ status: '' })
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter by Status
          </Label>
          <div className="flex gap-2">
            <Select value={selectedStatus} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full md:w-[250px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            {selectedStatus && (
              <Button
                variant="outline"
                size="icon"
                onClick={handleClearStatus}
                title="Clear filter"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}