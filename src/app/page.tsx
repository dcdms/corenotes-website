import { Suspense } from 'react'
import { CreateTaskCard } from '@/components/create-task-card'
import { Header } from '@/components/header'
import { TaskList } from '@/components/task-list'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F0FAF5] text-[#333333]">
      <Header />

      <main className="flex flex-1 flex-col gap-10 px-24 py-6">
        <CreateTaskCard />

        <Suspense>
          <TaskList />
        </Suspense>
      </main>
    </div>
  )
}
