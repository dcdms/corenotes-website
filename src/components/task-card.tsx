'use client'

import { useQueryClient } from '@tanstack/react-query'
import { Favorite } from '@/components/icons/favorite'
import { PaintBucket } from '@/components/icons/paint-bucket'
import { Pencil } from '@/components/icons/pencil'
import { X } from '@/components/icons/x'
import { cn } from '@/helpers/cn'
import type { Task } from '@/interfaces/task'
import { server } from '@/server'

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const queryClient = useQueryClient()

  async function handleSwitchFavorite() {
    await server.tasks[':id'].$patch({
      param: { id: task.id },
      json: { favorite: !task.favorite },
    })

    queryClient.setQueryData(['tasks'], (tasks: Task[]) => {
      return tasks.map((t) =>
        t.id === task.id ? { ...t, favorite: !task.favorite } : t,
      )
    })
  }

  async function handleDelete() {
    await server.tasks[':id'].$delete({ param: { id: task.id } })

    queryClient.setQueryData(['tasks'], (tasks: Task[]) => {
      return tasks.filter((t) => t.id !== task.id)
    })
  }

  return (
    <div className="flex h-[27.375rem] flex-col rounded-3xl bg-white shadow-[2px,2px,3px,rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between border-[#D9D9D9] border-b px-5 py-3.5">
        <h3 className="font-bold text-sm leading-none outline-none">
          {task.title}
        </h3>

        <button type="button" onClick={handleSwitchFavorite}>
          <Favorite className={cn(!task.favorite && 'fill-none')} />
        </button>
      </div>

      <div className="flex-1 px-5 py-3.5">
        <p className="break-words text-[#4F4F4D] text-sm">{task.description}</p>
      </div>

      <div className="flex justify-between px-5 py-3">
        <div className="flex gap-3.5">
          <Pencil />
          <PaintBucket />
        </div>

        <button type="button" onClick={handleDelete}>
          <X />
        </button>
      </div>
    </div>
  )
}
