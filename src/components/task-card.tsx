'use client'

import { useState } from 'react'
import { Favorite } from '@/components/icons/favorite'
import { PaintBucket } from '@/components/icons/paint-bucket'
import { Pencil } from '@/components/icons/pencil'
import { X } from '@/components/icons/x'
import { cn } from '@/helpers/cn'
import { server } from '@/server'

interface TaskCardProps {
  id: string
  title: string
  description: string
  favorite: boolean
}

export function TaskCard({ id, title, description, favorite }: TaskCardProps) {
  const [isFavorite, setIsFavorite] = useState(favorite)

  async function handleSwitchFavorite() {
    setIsFavorite(!favorite)

    await server.tasks[':id'].$patch({ param: { id }, json: { favorite } })
  }

  return (
    <div className="flex h-[27.375rem] flex-col rounded-3xl bg-white shadow-[2px,2px,3px,rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between border-[#D9D9D9] border-b px-5 py-3.5">
        <h3 className="font-bold text-sm leading-none outline-none">{title}</h3>

        <button type="button" onClick={handleSwitchFavorite}>
          <Favorite className={cn(isFavorite && 'fill-none')} />
        </button>
      </div>

      <div className="flex-1 px-5 py-3.5">
        <p className="text-[#4F4F4D] text-sm">{description}</p>
      </div>

      <div className="flex justify-between px-5 py-3">
        <div className="flex gap-3.5">
          <Pencil />
          <PaintBucket />
        </div>

        <X />
      </div>
    </div>
  )
}
