import Image from 'next/image'
import { Search } from '@/components/icons/search'
import { X } from '@/components/icons/x'

export function Header() {
  return (
    <header className="flex h-14 items-center justify-between gap-4 bg-white px-6 shadow-[0_1px_8px_rgba(149,149,149,0.25)] lg:px-9">
      <div className="flex flex-1 items-center">
        <div className="relative size-7.5 shrink-0 md:size-9">
          <Image src="/icon.png" alt="Logo" fill />
        </div>

        <h1 className="ml-3.5 hidden text-[#455A64] text-xs leading-none md:block md:text-sm">
          CoreNotes
        </h1>

        <div className="ml-5 flex h-7 w-full max-w-[33.125rem] items-center justify-between gap-2.5 rounded-sm border border-[#D9D9D9] px-2.5 shadow-[1px,1px,3px,rgba(0,0,0,0.25)]">
          <input
            className="flex-1 text-[0.625rem] leading-none outline-none placeholder:text-[#9A9A9A]"
            placeholder="Search notes"
          />
          <Search />
        </div>
      </div>

      <X className="shrink-0" />
    </header>
  )
}
