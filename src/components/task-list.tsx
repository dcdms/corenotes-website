'use client'

import { useQuery } from '@tanstack/react-query'
import { TaskCard } from '@/components/task-card'
import { server } from '@/server'

export function TaskList() {
  const { data: tasks } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await server.tasks.$get({ query: {} })
      const data = await response.json()

      return data.tasks
    },
  })

  if (!tasks) {
    return null
  }

  const favorites: typeof tasks = []
  const others: typeof tasks = []

  for (const task of tasks!) {
    if (task.favorite) {
      favorites.push(task)
      continue
    }

    others.push(task)
  }

  return (
    <div className="flex flex-col gap-8">
      {favorites.length !== 0 && (
        <section className="flex flex-col gap-2">
          <h2 className="text-xs leading-none">Favorites</h2>

          <ul className="grid gap-14 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((task) => (
              <li key={task.id}>
                <TaskCard task={task} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {others.length !== 0 && (
        <section className="flex flex-col gap-2">
          <h2 className="text-xs leading-none">Others</h2>

          <ul className="grid gap-14 md:grid-cols-2 lg:grid-cols-3">
            {others.map((task) => (
              <li key={task.id}>
                <TaskCard task={task} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
