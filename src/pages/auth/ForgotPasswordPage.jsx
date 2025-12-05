import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/api/services/auth.service'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const { register, handleSubmit } = useForm()
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => authService.forgotPassword(data.email),
    onSuccess: () => toast.success('Reset link sent to your email'),
  })

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit((data) => mutate(data))}>
        <input {...register('email')} type="email" placeholder="Email" />
        <button type="submit" disabled={isPending}>
          Send Reset Link
        </button>
      </form>
    </div>
  )
}