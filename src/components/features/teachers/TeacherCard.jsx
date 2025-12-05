export default function TeacherCard({ teacher }) {
  return (
    <div>
      <h3>{teacher.name}</h3>
      <p>Email: {teacher.email}</p>
      <p>Speciality: {teacher.speciality}</p>
    </div>
  )
}