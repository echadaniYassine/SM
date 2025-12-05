import { useForm } from 'react-hook-form'

export default function TeacherForm({ teacher, onSubmit, onCancel }) {
  const { register, handleSubmit } = useForm({
    defaultValues: teacher,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Teacher Name" />
      <input {...register('email')} type="email" placeholder="Email" />
      <input {...register('phone')} placeholder="Phone" />
      <input {...register('speciality')} placeholder="Speciality" />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  )
}