'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { Search } from '@/components/icons/search'

export function TasksSearch() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const search = searchParams.get('search')

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)

    if (term) {
      params.set('search', term)
    } else {
      params.delete('search')
    }

    router.replace('/?' + params.toString())
  }, 300)

  return (
    <div className="ml-5 flex h-7 w-full max-w-[33.125rem] items-center justify-between gap-2.5 rounded-sm border border-[#D9D9D9] px-2.5 shadow-[1px,1px,3px,rgba(0,0,0,0.25)]">
      <input
        className="flex-1 text-[0.625rem] leading-none outline-none placeholder:text-[#9A9A9A]"
        placeholder="Search notes"
        defaultValue={search ?? undefined}
        onChange={(event) => handleSearch(event.target.value)}
      />

      <Search />
    </div>
  )
}
