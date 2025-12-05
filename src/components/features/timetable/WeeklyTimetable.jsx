export default function WeeklyTimetable({ timetables = [] }) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

  return (
    <div>
      <h2>Weekly Timetable</h2>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Add time slots and timetable entries */}
        </tbody>
      </table>
    </div>
  )
}