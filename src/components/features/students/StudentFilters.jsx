// src/components/features/students/StudentFilters.jsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Filter, X } from "lucide-react"
import { usePrograms } from "@/api/hooks/usePrograms"
import { useState, useEffect, useRef } from "react"

export default function StudentFilters({ onFilterChange }) {
  const { data: programsData } = usePrograms()
  const programs = programsData?.data || []
  
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Debounce timer ref
  const debounceTimer = useRef(null)

  // Effect to handle debounced search
  useEffect(() => {
    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    // Set new timer for search (300ms delay)
    debounceTimer.current = setTimeout(() => {
      onFilterChange({ 
        search: searchQuery,
        program_id: selectedProgram || '' 
      })
    }, 300)

    // Cleanup on unmount
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [searchQuery, selectedProgram, onFilterChange])

  const handleProgramChange = (value) => {
    setSelectedProgram(value)
  }

  const handleClearProgram = () => {
    setSelectedProgram(null)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleClearSearch = () => {
    setSearchQuery('')
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="search" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search Students
            </Label>
            <div className="flex gap-2">
              <Input
                id="search"
                type="text"
                placeholder="Search by name or ID..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="flex-1"
              />
              {searchQuery && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleClearSearch}
                  title="Clear search"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Program Filter */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter by Program
            </Label>
            <div className="flex gap-2">
              <Select value={selectedProgram} onValueChange={handleProgramChange}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="All Programs" />
                </SelectTrigger>
                <SelectContent>
                  {programs.map((program) => (
                    <SelectItem key={program.id} value={String(program.id)}>
                      {program.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedProgram && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleClearProgram}
                  title="Clear filter"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}