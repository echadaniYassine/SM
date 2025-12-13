// src/components/forms/ProgramForm.jsx
import { useForm } from 'react-hook-form'

export default function ProgramForm({ program, onSubmit, onCancel }) {
  const { register, handleSubmit } = useForm({
    defaultValues: program,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Program Name" />
      <textarea {...register('description')} placeholder="Description" />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  )
}