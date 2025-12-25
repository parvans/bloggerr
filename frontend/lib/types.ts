export interface Article {
  id: number
  title: string
  slug: string
  body: string
  image?: File | null
  author: string
  is_published: boolean
  published_at: string
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}