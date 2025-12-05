export default function DailySchedule({ timetables = [] }) {
  return (
    <div>
      <h2>Today's Schedule</h2>
      <ul>
        {timetables.map((item) => (
          <li key={item.id}>
            {item.start_time} - {item.end_time}: {item.subject?.name} ({item.room})
          </li>
        ))}
      </ul>
    </div>
  )
}