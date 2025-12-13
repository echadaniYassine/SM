// src/components/forms/StudentForm.jsx
import { useForm } from 'react-hook-form'

export default function StudentForm({ student, onSubmit, onCancel }) {
  const { register, handleSubmit } = useForm({
    defaultValues: student,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Student Name" />
      <input {...register('date_of_birth')} type="date" />
      <select {...register('gender')}>
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <select {...register('guardian_id')}>
        <option value="">Select Guardian</option>
      </select>
      <select {...register('program_id')}>
        <option value="">Select Program</option>
      </select>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  )
}
