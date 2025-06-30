import Image from 'next/image'
import { LoginForm } from '@/components/login-form'

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="absolute top-4 left-6">
        <div className="relative size-8 md:size-10">
          <Image src="/icon.png" alt="Logo" fill />
        </div>
      </div>

      <LoginForm />
    </div>
  )
}
