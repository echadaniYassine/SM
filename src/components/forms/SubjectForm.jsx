// src/components/forms/SubjectForm.jsx
import { useForm } from 'react-hook-form'

export default function SubjectForm({ subject, onSubmit, onCancel }) {
  const { register, handleSubmit } = useForm({
    defaultValues: subject,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Subject Name" />
      <input {...register('code')} placeholder="Code" />
      <textarea {...register('description')} placeholder="Description" />
      <select {...register('teacher_id')}>
        <option value="">Select Teacher</option>
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