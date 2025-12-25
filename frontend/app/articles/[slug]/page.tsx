"use client"

import { use, useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { getArticle, updateArticle } from "@/lib/api"
import ArticleForm from "@/components/article/ArticleForm"
import { Article } from "@/lib/types"
import { ArrowLeft } from "lucide-react"

export default function ArticlePage({
  params,
}: {
  params:Promise< { slug: string } >
}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const isEditMode = searchParams.get("edit") === "true"
  const { slug } = use(params)

  const [article, setArticle] = useState<Article | null>(null)

  // console.log(params);
  

  useEffect(() => {
    getArticle(slug).then(setArticle)
  }, [slug])

  async function handleUpdate(data: Partial<Article>) {
    await updateArticle(slug, data)
    router.push(`/`)
  }

  if (!article) return <p>Loading...</p>

  // VIEW MODE
  if (!isEditMode) {
    return (
      <main className="container mx-auto py-25 max-w-2xl">
        <div className="flex items-center mb-3 space-x-3 text-center">
          <ArrowLeft className="mr-2 cursor-pointer" onClick={() => router.push("/")} />
            Back
        </div>
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          
        <p className="text-sm text-gray-500 mb-6">
          {article.author} •{" "}
          {new Date(article.published_at).toDateString()}
        </p>
        {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="w-full max-h-100 object-cover rounded mb-6"
            />
          )}

        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />

      </main>
    )
  }

  // EDIT MODE
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Article</h1>

      <ArticleForm
        initialData={article}
        submitLabel="Update"
        onSubmit={handleUpdate}
      />
    </main>
  )
}
