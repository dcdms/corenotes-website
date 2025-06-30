'use client'

import { useQueryClient } from '@tanstack/react-query'
import { type KeyboardEvent, useRef, useState } from 'react'
import { Favorite } from '@/components/icons/favorite'
import { cn } from '@/helpers/cn'
import type { Task } from '@/interfaces/task'
import { server } from '@/server'

export function CreateTaskCard() {
  const titleFieldRef = useRef<HTMLInputElement>(null)
  const descriptionFieldRef = useRef<HTMLTextAreaElement>(null)

  const [favorite, setFavorite] = useState(false)

  const queryClient = useQueryClient()

  async function handleKeydown(event: KeyboardEvent<HTMLElement>) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      const title = titleFieldRef.current?.value
      const description = descriptionFieldRef.current?.value || ''

      if (!title) {
        return
      }

      const response = await server.tasks.$post({
        json: { title, description, favorite },
      })

      const data = await response.json()

      titleFieldRef.current!.value = ''
      descriptionFieldRef.current!.value = ''

      queryClient.setQueryData(['tasks'], (tasks: Task[]): Task[] => {
        return [...tasks, { id: data.id, title, description, favorite }]
      })
    }
  }

  return (
    <div className="w-full max-w-[33.125rem] self-center rounded-sm border border-[#D9D9D9] bg-white shadow-[1px,1px,3px,rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between border-[#D9D9D9] border-b px-5 py-3.5">
        <input
          ref={titleFieldRef}
          className="font-bold text-sm leading-none outline-none"
          placeholder="Refactor spaghetti"
          onKeyDown={handleKeydown}
        />

        <button type="button" onClick={() => setFavorite((f) => !f)}>
          <Favorite className={cn(!favorite && 'fill-none')} />
        </button>
      </div>

      <div className="px-5 py-3.5">
        <textarea
          ref={descriptionFieldRef}
          className="min-h-16 w-full resize-none overflow-y-hidden text-sm leading-none outline-none"
          placeholder="Untangle 400 lines of nested callbacks... or open a ramen shop instead. Both are valid careers."
          onKeyDown={handleKeydown}
        />
      </div>

      <div className="flex justify-end px-5 py-2">
        <div className="border-2 border-[#4F4F4D]/80 p-1 font-medium text-[#4F4F4D]/80 text-xs leading-none">
          CTRL ENTER TO SUBMIT
        </div>
      </div>
    </div>
  )
}
