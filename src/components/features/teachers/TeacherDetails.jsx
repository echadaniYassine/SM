export default function TeacherDetails({ teacher }) {
  return (
    <div>
      <h2>{teacher.name}</h2>
      <p>Email: {teacher.email}</p>
      <p>Phone: {teacher.phone}</p>
      <p>Speciality: {teacher.speciality}</p>
    </div>
  )
}
