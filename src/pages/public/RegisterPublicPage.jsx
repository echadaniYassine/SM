import { useCreateRegistration } from '@/api/hooks/useRegistrations'
import RegistrationForm from '@/components/features/registrations/RegistrationForm'

export default function RegisterPublicPage() {
  const { mutate: createRegistration } = useCreateRegistration()

  return (
    <div>
      <h1>Register for Admission</h1>
      <RegistrationForm onSubmit={(data) => createRegistration(data)} />
    </div>
  )
}