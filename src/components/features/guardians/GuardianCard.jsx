export default function GuardianCard({ guardian }) {
  return (
    <div>
      <h3>{guardian.name}</h3>
      <p>Phone: {guardian.phone}</p>
      <p>Students: {guardian.students?.length || 0}</p>
    </div>
  )
}