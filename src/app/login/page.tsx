import Image from 'next/image'

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative top-4 left-6 size-8 md:size-10">
        <Image src="/icon.png" alt="Logo" fill />
      </div>
    </div>
  )
}
