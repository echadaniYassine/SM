export default function StudentDashboard({ student, todaySchedule = [] }) {
  return (
    <div>
      <h1>Student Dashboard</h1>
      <p>Program: {student?.program?.name}</p>
      <h2>Today's Schedule</h2>
      <ul>
        {todaySchedule.map((item) => (
          <li key={item.id}>
            {item.start_time} - {item.subject?.name}
          </li>
        ))}
      </ul>
    </div>
  )
}