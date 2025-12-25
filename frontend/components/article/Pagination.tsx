"use client"

import { Button } from "@/components/ui/button"

interface Props {
  page: number
  total: number
  pageSize: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  page,
  total,
  pageSize,
  onPageChange,
}: Props) {
  const totalPages = Math.ceil(total / pageSize)

  return (
    <div className="flex justify-between items-center mt-6">
      <Button
        variant="outline"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Button>

      <span className="text-sm">
        Page {page} of {totalPages}
      </span>

      <Button
        variant="outline"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </div>
  )
}
