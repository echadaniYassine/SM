import { useForm } from 'react-hook-form'

export default function TimetableForm({ timetable, onSubmit, onCancel }) {
  const { register, handleSubmit } = useForm({
    defaultValues: timetable,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register('subject_id')}>
        <option value="">Select Subject</option>
      </select>
      <select {...register('program_id')}>
        <option value="">Select Program</option>
      </select>
      <select {...register('day_of_week')}>
        <option value="">Select Day</option>
        <option value="1">Monday</option>
        <option value="2">Tuesday</option>
        <option value="3">Wednesday</option>
        <option value="4">Thursday</option>
        <option value="5">Friday</option>
      </select>
      <input {...register('start_time')} type="time" placeholder="Start Time" />
      <input {...register('end_time')} type="time" placeholder="End Time" />
      <input {...register('room')} placeholder="Room" />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  )
}