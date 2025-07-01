'use client'

import { useQueryClient } from '@tanstack/react-query'
import { type KeyboardEvent, useRef, useState } from 'react'
import { Favorite } from '@/components/icons/favorite'
import { cn } from '@/helpers/cn'
import type { Task } from '@/interfaces/task'
import { server } from '@/server'

// fix: fix inconsistent edits when searching
// fix: increase size of tasks search

export function CreateTaskCard() {
  const [title, setTitle] = useState('')
  const [favorite, setFavorite] = useState(false)

  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null)

  const queryClient = useQueryClient()

  async function handleKeydown(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter' && title) {
      const description = descriptionTextareaRef.current!.value

      const response = await server.tasks.$post({
        json: { title, description, favorite },
      })

      const data = await response.json()

      queryClient.setQueryData(['tasks', null], (tasks: Task[]): Task[] => {
        return [
          { id: data.id, title, description, color: 'white', favorite },
          ...tasks,
        ]
      })

      setTitle('')
      setFavorite(false)

      descriptionTextareaRef.current!.value = ''
    }
  }

  return (
    <div className="w-full max-w-[33.125rem] self-center rounded-sm border border-[#D9D9D9] bg-white shadow-[1px,1px,3px,rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between border-[#D9D9D9] border-b px-5 py-3.5">
        <input
          className="font-bold text-sm leading-none outline-none"
          placeholder="Refactor spaghetti"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={handleKeydown}
        />

        <button type="button" onClick={() => setFavorite((f) => !f)}>
          <Favorite className={cn(!favorite && 'fill-none')} />
        </button>
      </div>

      <div className="px-5 pt-3.5 pb-1">
        <textarea
          ref={descriptionTextareaRef}
          className="min-h-16 w-full resize-none overflow-y-hidden text-sm leading-none outline-none"
          placeholder="Untangle 400 lines of nested callbacks... or open a ramen shop instead. Both are valid careers."
          onKeyDown={handleKeydown}
        />
      </div>

      <div className="flex h-10 items-center justify-end px-5">
        {title && (
          <div className="border-2 border-[#4F4F4D]/80 p-1 font-medium text-[#4F4F4D]/80 text-xs leading-none">
            CTRL ENTER TO SUBMIT
          </div>
        )}
      </div>
    </div>
  )
}
