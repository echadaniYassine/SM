export default function RegistrationCard({ registration }) {
  return (
    <div>
      <h3>{registration.full_name}</h3>
      <p>Parent: {registration.parent_name}</p>
      <p>Email: {registration.email}</p>
      <p>Status: {registration.status}</p>
    </div>
  )
}