export default function TimetableCard({ timetable }) {
  return (
    <div>
      <h3>{timetable.subject?.name}</h3>
      <p>Day: {timetable.day_name}</p>
      <p>
        Time: {timetable.start_time} - {timetable.end_time}
      </p>
      <p>Room: {timetable.room}</p>
    </div>
  )
}