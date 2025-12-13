import { useRegistrations, useUpdateRegistrationStatus } from '@/api/hooks/useRegistrations'
import RegistrationList from '@/components/features/registrations/RegistrationList'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"

export default function RegistrationsPage() {
  const { data, isLoading } = useRegistrations()
  const { mutate: updateStatus } = useUpdateRegistrationStatus()

  const handleApprove = (id) => {
    updateStatus({ id, statusData: { status: 'confirmed' } })
  }

  const handleReject = (id) => {
    updateStatus({ id, statusData: { status: 'rejected' } })
  }

  return (
    <div>
      <h1>Registrations Management</h1>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Title here</DialogTitle>
          </DialogHeader>

          <RegistrationList />

        </DialogContent>
      </Dialog>

    </div>
  )
}