export default function GuardianDashboard({ students = [] }) {
  return (
    <div>
      <h1>Guardian Dashboard</h1>
      <h2>My Students ({students.length})</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
    </div>
  )
}