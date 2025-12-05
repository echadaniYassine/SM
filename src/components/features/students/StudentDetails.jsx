export default function StudentDetails({ student }) {
  return (
    <div>
      <h2>{student.name}</h2>
      <p>Date of Birth: {student.date_of_birth}</p>
      <p>Gender: {student.gender}</p>
      <p>Guardian: {student.guardian?.name}</p>
      <p>Program: {student.program?.name}</p>
    </div>
  )
}