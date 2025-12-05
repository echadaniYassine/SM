import { useForm } from 'react-hook-form'

export default function GuardianForm({ guardian, onSubmit, onCancel }) {
  const { register, handleSubmit } = useForm({
    defaultValues: guardian,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Guardian Name" />
      <input {...register('phone')} placeholder="Phone" />
      <input {...register('email')} type="email" placeholder="Email" />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  )
}