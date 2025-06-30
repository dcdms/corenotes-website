'use client'

import { type FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { email as zEmail } from 'zod/v4'
import { server } from '@/server'

export function LoginForm() {
  const [email, setEmail] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      await server.auth.links.$post({ json: { email } })
      toast.success('Success! Check your email for an auth link.')
    } catch (error) {
      console.log(error)
      toast.error('Damn it. Something went wrong.')
    }
  }

  const emailParseResult = zEmail().safeParse(email)

  return (
    <form className="flex max-w-md flex-col gap-5" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2.5">
        <h1 className="font-medium text-3xl text-[#333333]">
          Simple fullstack application built using the best of TS.
        </h1>

        <h2 className="font-medium text-2xl text-[#4F4F4D]">
          Just a lightweight task management website made for demo purposes.
        </h2>
      </div>

      <input
        className="rounded-md border border-[#D9D9D9] px-4 py-2 outline-none"
        placeholder="alice@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <button
        className="rounded-md bg-[#FFA000] px-4 py-2 font-medium text-white outline-none transition-opacity disabled:pointer-events-none disabled:opacity-50"
        type="submit"
        disabled={!emailParseResult.success}
      >
        Continue
      </button>
    </form>
  )
}
