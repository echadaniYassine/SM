import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/api/services/auth.service'
import { useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function ResetPasswordPage() {
  const { register, handleSubmit } = useForm()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: () => {
      toast.success('Password reset successfully')
      navigate('/login')
    },
  })

  const onSubmit = (data) => {
    mutate({
      ...data,
      token: searchParams.get('token'),
      email: searchParams.get('email'),
    })
  }

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('password')} type="password" placeholder="New Password" />
        <input {...register('password_confirmation')} type="password" placeholder="Confirm Password" />
        <button type="submit" disabled={isPending}>
          Reset Password
        </button>
      </form>
    </div>
  )
}