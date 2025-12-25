"use client"

import { Article } from "@/lib/types"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"
import { Eye, Pen, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { deleteArticle } from "@/lib/api"
import toast, { Toaster } from "react-hot-toast"

export default function ArticlesTable({ articles }: { articles: Article[] }) {
  const router = useRouter();

  const handleNavigate = (route:string)=>{
    router.push(route)
  }

  const deleteBlog = async(slug:string)=>{
    const confirmed = confirm(
        "Are you sure you want to delete this article?"
      )
      if (!confirmed) return

      try {
        await deleteArticle(slug)
        toast.success("Article deleted")
        window.location.reload()
      } catch {
        toast.error("Failed to delete article")
      }
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SI.No.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Published</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {articles.length === 0 ?(
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No Articles Found.
              </TableCell>
            </TableRow>
          )
          :
          articles.map((article,index) => (
            <TableRow key={article.id}>
              <TableCell>{index+1}</TableCell>
              <TableCell className="font-medium">
                <Link
                  href={`/articles/${article.slug}`}
                  className="hover:underline"
                >
                  {article.title}
                </Link>
              </TableCell>
              <TableCell>{article.author}</TableCell>
              <TableCell>
                {new Date(article.published_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right space-x-2">
                {/* <Link
                  href={`/articles/${article.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link> */}
                <Button 
                onClick={()=>handleNavigate(`/articles/${article.slug}`)} 
                className="bg-blue-400 hover:bg-blue-500" size="icon-sm"><Eye/></Button>
                {/* <Link
                  href={`/articles/${article.slug}?edit=true`}
                  className="text-green-600 hover:underline"
                >
                  Edit
                </Link> */}
                <Button 
                onClick={()=>handleNavigate(`/articles/${article.slug}?edit=true`)} 
                className="bg-green-500 hover:bg-green-700" size="icon-sm"><Pen/></Button>
                <Button 
                onClick={()=>deleteBlog(article.slug)}
                className="bg-red-400 hover:bg-red-500" size="icon-sm"><Trash/></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>
  )
}
