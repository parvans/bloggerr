"use client"

import { useEffect, useState } from "react"
import { fetchArticles } from "@/lib/api"
import ArticlesTable from "./ArticlesTable"
import ArticleFilters from "./ArticleFilters"
import Pagination from "./Pagination"
import { Article } from "@/lib/types"
import Link from "next/link"

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchArticles({ page, search }).then(res => {
      setArticles(res.results)
      setTotal(res.count)
    })
    .catch(() => {
      setError("Failed to load articles")
    })
    .finally(() => {
      setLoading(false)
    })
  }, [page, search])
 
  if(error){
    return <p className="text-red-500">{error}</p>
  }

  console.log(articles);
  

  return (
    <main className="container mx-auto py-25">
      <ArticleFilters
        search={search}
        onSearchChange={(value)=>{
          setSearch(value);
          setPage(1);
        }}
        onReset={() => {
          setSearch("")
          setPage(1)
        }}
      />

      {
      loading ? (<p>Loading articles...</p>) :
      (<ArticlesTable articles={articles} />)
      }

      <Pagination
        page={page}
        total={total}
        pageSize={10}
        onPageChange={setPage}
      />
    </main>
  )
}
