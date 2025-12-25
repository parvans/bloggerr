"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Props {
  search: string
  onSearchChange: (value: string) => void
  onReset: () => void
}

export default function ArticleFilters({
  search,
  onSearchChange,
  onReset,
}: Props) {
  const router = useRouter();
  return (
    <div className="flex gap-4 mb-6 justify-end">
      <Input
        placeholder="Search by title..."
        className="w-70"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <Button variant="outline" onClick={onReset}>
        Reset
      </Button>
        <Button variant="default" onClick={()=>router.push("/articles/new")}>
          New
        </Button>
    </div>
  )
}
