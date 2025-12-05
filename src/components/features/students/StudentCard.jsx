export default function StudentCard({ student }) {
  return (
    <div>
      <h3>{student.name}</h3>
      <p>Date of Birth: {student.date_of_birth}</p>
      <p>Gender: {student.gender}</p>
      <p>Program: {student.program?.name}</p>
    </div>
  )
}