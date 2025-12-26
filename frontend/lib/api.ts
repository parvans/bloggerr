import { Article, PaginatedResponse } from "./types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://bloggerr-9t8p.onrender.com/api"

export async function fetchArticles(params:{
  page?: number,
  search?: string,
}): Promise<PaginatedResponse<Article>> {
  const query = new URLSearchParams();
  if (params.page) query.append("page", params.page.toString())
  if (params.search) query.append("search", params.search)

  const res = await fetch(`${API_URL}/articles/?${query.toString()}`, {
    cache: "no-store",
  })

  if (!res.ok) throw new Error("Failed to fetch articles")
  return res.json()
}

export async function createArticle(data:Partial<Article>) {
  const formData = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, typeof value === 'string' || value instanceof File ? value : String(value))
    }
  })
  
  const res = await fetch(`${API_URL}/articles/`, {
    method: "POST",
    body: formData,
  })
  
  if (!res.ok) throw new Error("Failed to create article")
  return res.json()

}

export async function updateArticle(slug: string, data:Partial<Article>) {
  const formData = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, typeof value === 'string' || value instanceof File ? value : String(value))
    }
  })

  const res = await fetch(`${API_URL}/articles/${slug}/`, {
    method: "PUT",
    body: formData,
  })
  if (!res.ok) throw new Error("Failed to update article")
  return res.json()

}
export async function deleteArticle(slug: string) {
  const res = await fetch(`${API_URL}/articles/${slug}/`, {
    method: "DELETE",
  })

  if (!res.ok) throw new Error("Failed to update article")
}



export async function getArticle(slug: string): Promise<Article> {
  const res = await fetch(`${API_URL}/articles/${slug}/`, {
    cache: "no-store",
  })

  if (!res.ok) throw new Error("Article not found")
  return res.json()
}
