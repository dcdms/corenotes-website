import { CreateTaskCard } from '@/components/create-task-card'
import { Header } from '@/components/header'
import { TaskCard } from '@/components/task-card'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F0FAF5] text-[#333333]">
      <Header />

      <main className="flex flex-1 flex-col gap-10 px-24 py-6">
        <CreateTaskCard />

        <div className="flex flex-col gap-8">
          <section className="flex flex-col gap-2">
            <h2 className="text-xs leading-none">Favorites</h2>

            <ul className="grid gap-14 md:grid-cols-2 lg:grid-cols-3">
              <li>
                <TaskCard
                  id="something"
                  title="hello"
                  description="hello"
                  favorite={false}
                />
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xs leading-none">Others</h2>

            <ul className="grid gap-14 md:grid-cols-2 lg:grid-cols-3">
              <li>
                <TaskCard
                  id="something"
                  title="hello"
                  description="hello"
                  favorite={false}
                />
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  )
}
