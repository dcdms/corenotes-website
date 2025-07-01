import { Suspense } from 'react'
import { CreateNoteCard } from '@/components/create-note-card'
import { Header } from '@/components/header'
import { NoteList } from '@/components/note-list'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F0FAF5] text-[#333333]">
      <Header />

      <main className="flex flex-1 flex-col gap-10 px-24 py-6">
        <CreateNoteCard />

        <Suspense>
          <NoteList />
        </Suspense>
      </main>
    </div>
  )
}
