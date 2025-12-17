import { useForm } from 'react-hook-form'

export default function RegistrationForm({ onSubmit }) {
  const { register, handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('full_name')} placeholder="Student Name" />
      <input {...register('parent_name')} placeholder="Parent Name" />
      <input {...register('phone')} placeholder="Phone" />
      <input {...register('email')} type="email" placeholder="Email" />
      <select {...register('program_id')}>
        <option value="">Select Program</option>
      </select>
      <textarea {...register('message')} placeholder="Message" />
      <button type="submit">Submit Registration</button>
    </form>
  )
}
