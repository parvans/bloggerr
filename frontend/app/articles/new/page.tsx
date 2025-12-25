"use client"

import { useRouter } from "next/navigation"
import ArticleForm from "@/components/article/ArticleForm"
import { createArticle } from "@/lib/api"

export default function NewArticlePage() {
  const router = useRouter()

  async function handleCreate(data: any) {
    await createArticle(data)
    setTimeout(()=>{
      router.push(`/`)
    },2000)
  }

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Create Article</h1>

      <ArticleForm
        submitLabel="Create"
        onSubmit={handleCreate}
      />
    </main>
  )
}
