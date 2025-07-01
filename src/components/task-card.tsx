'use client'

import { useQueryClient } from '@tanstack/react-query'
import { type KeyboardEvent, useState } from 'react'
import { Favorite } from '@/components/icons/favorite'
import { PaintBucket } from '@/components/icons/paint-bucket'
import { Pencil } from '@/components/icons/pencil'
import { X } from '@/components/icons/x'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { TASK_COLOR_CLASSNAMES } from '@/constants/task-color-classnames'
import { cn } from '@/helpers/cn'
import type { Task } from '@/interfaces/task'
import { server } from '@/server'

const colors = Object.keys(
  TASK_COLOR_CLASSNAMES,
) as (keyof typeof TASK_COLOR_CLASSNAMES)[]

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const queryClient = useQueryClient()

  const [isEditColorPopoverOpen, setIsEditColorPopoverOpen] = useState(false)
  const [isEditingDetails, setIsEditingDetails] = useState(false)

  const [editingTitle, setEditingTitle] = useState(task.title)
  const [editingDescription, setEditingDescription] = useState(task.description)

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

  async function handleEditColor(
    color: Exclude<keyof typeof TASK_COLOR_CLASSNAMES, 'white'>,
  ) {
    await server.tasks[':id'].$patch({
      param: { id: task.id },
      json: { color: color },
    })

    queryClient.setQueryData(['tasks'], (tasks: Task[]) => {
      return tasks.map((t) => (t.id === task.id ? { ...t, color } : t))
    })
  }

  async function handleEditingFieldsKeydown(event: KeyboardEvent) {
    if (
      (event.ctrlKey || event.metaKey) &&
      event.key === 'Enter' &&
      editingTitle
    ) {
      await server.tasks[':id'].$patch({
        param: { id: task.id },
        json: { title: editingTitle, description: editingDescription },
      })

      queryClient.setQueryData(['tasks'], (tasks: Task[]) => {
        return tasks.map((t) =>
          t.id === task.id
            ? { ...t, title: editingTitle, description: editingDescription }
            : t,
        )
      })

      setIsEditingDetails(false)
    }
  }

  return (
    <div
      className={cn(
        'flex h-[27.375rem] flex-col rounded-3xl shadow-[2px,2px,3px,rgba(0,0,0,0.25)]',
        TASK_COLOR_CLASSNAMES[task.color],
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between border-[#D9D9D9] border-b px-5 py-3.5',
          task.color !== 'white' && 'border-white',
        )}
      >
        {isEditingDetails ? (
          <input
            className="h-3.5 font-bold text-sm leading-none outline-none"
            value={editingTitle}
            onChange={(event) => setEditingTitle(event.target.value)}
            onKeyDown={handleEditingFieldsKeydown}
          />
        ) : (
          <h3 className="font-bold text-sm leading-none">{task.title}</h3>
        )}

        <button type="button" onClick={handleSwitchFavorite}>
          <Favorite className={cn(!task.favorite && 'fill-none')} />
        </button>
      </div>

      <div className="flex-1 px-5 py-3.5">
        {isEditingDetails ? (
          <textarea
            className="w-full resize-none text-[#4F4F4D] text-sm leading-none outline-none"
            value={editingDescription}
            onChange={(event) => setEditingDescription(event.target.value)}
            onKeyDown={handleEditingFieldsKeydown}
          />
        ) : (
          <p className="break-words text-[#4F4F4D] text-sm leading-none">
            {task.description}
          </p>
        )}
      </div>

      <div className="flex justify-between px-5 py-3">
        <div className="flex gap-1">
          <button
            className={cn(
              'flex size-7 items-center justify-center rounded-full',
              isEditingDetails && 'bg-[#FFE3B3]',
            )}
            type="button"
            onClick={() => setIsEditingDetails((e) => !e)}
          >
            <Pencil />
          </button>

          <Popover
            open={isEditColorPopoverOpen}
            onOpenChange={setIsEditColorPopoverOpen}
          >
            <PopoverTrigger
              className={cn(
                'flex size-7 items-center justify-center rounded-full transition-colors',
                isEditColorPopoverOpen && 'bg-[#FFE3B3]',
              )}
            >
              <PaintBucket />
            </PopoverTrigger>

            <PopoverContent className="grid grid-cols-6 gap-2.5">
              {colors
                .filter((color) => color !== 'white')
                .map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleEditColor(color)}
                    className={cn(
                      'size-9 rounded-full',
                      TASK_COLOR_CLASSNAMES[color],
                    )}
                  />
                ))}
            </PopoverContent>
          </Popover>
        </div>

        <button
          className="flex size-7 items-center justify-center rounded-full"
          type="button"
          onClick={handleDelete}
        >
          <X />
        </button>
      </div>
    </div>
  )
}
