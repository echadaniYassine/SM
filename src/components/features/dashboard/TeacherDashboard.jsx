export default function TeacherDashboard({ subjects = [], todaySchedule = [] }) {
  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <div>
        <h2>My Subjects ({subjects.length})</h2>
        <ul>
          {subjects.map((subject) => (
            <li key={subject.id}>{subject.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Today's Schedule</h2>
        <ul>
          {todaySchedule.map((item) => (
            <li key={item.id}>
              {item.start_time} - {item.subject?.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}