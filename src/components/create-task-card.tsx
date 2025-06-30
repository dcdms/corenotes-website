'use client'

import { type KeyboardEvent, useRef, useState } from 'react'
import { Favorite } from '@/components/icons/favorite'
import { cn } from '@/helpers/cn'
import { server } from '@/server'

export function CreateTaskCard() {
  const titleFieldRef = useRef<HTMLInputElement>(null)
  const descriptionFieldRef = useRef<HTMLTextAreaElement>(null)

  const [favorite, setFavorite] = useState(false)

  async function handleKeydown(event: KeyboardEvent<HTMLElement>) {
    if (
      (event.ctrlKey || event.metaKey) &&
      event.key === 'Enter' &&
      titleFieldRef.current?.value
    ) {
      await server.tasks.$post({
        json: {
          title: titleFieldRef.current.value,
          description: descriptionFieldRef.current?.value || '',
          favorite,
        },
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
          <Favorite className={cn(favorite && 'fill-none')} />
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
    </div>
  )
}
