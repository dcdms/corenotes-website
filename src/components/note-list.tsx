'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { NoteCard } from '@/components/note-card'
import { server } from '@/server'

export function NoteList() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')

  const { data: notes } = useQuery({
    queryKey: ['notes', search],
    queryFn: async () => {
      const response = await server.notes.$get({
        query: { search: search ?? undefined },
      })

      const data = await response.json()

      return data.notes
    },
  })

  if (!notes) {
    return (
      <ul className="grid gap-14 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => {
          return (
            <li
              // biome-ignore lint/suspicious/noArrayIndexKey: The order of the elements will never change in this case
              key={index}
              className="flex h-[27.375rem] animate-pulse rounded-3xl bg-white shadow-[2px,2px,3px,rgba(0,0,0,0.25)]"
            />
          )
        })}
      </ul>
    )
  }

  const favorites: typeof notes = []
  const others: typeof notes = []

  for (const note of notes) {
    if (note.favorite) {
      favorites.push(note)
      continue
    }

    others.push(note)
  }

  return (
    <div className="flex flex-col gap-8">
      {favorites.length !== 0 && (
        <section className="flex flex-col gap-2">
          <h2 className="text-xs leading-none">Favorites</h2>

          <ul className="grid gap-14 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((note) => (
              <li key={note.id}>
                <NoteCard note={note} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {others.length !== 0 && (
        <section className="flex flex-col gap-2">
          <h2 className="text-xs leading-none">Others</h2>

          <ul className="grid gap-14 md:grid-cols-2 lg:grid-cols-3">
            {others.map((note) => (
              <li key={note.id}>
                <NoteCard note={note} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
