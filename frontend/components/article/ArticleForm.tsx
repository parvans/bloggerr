"use client"

import { useState } from "react"
import { Article } from "@/lib/types"
import { useRouter } from "next/navigation"
import RichTextEditor from "./RichTextEditor"
import { slugify } from "@/lib/utils"
import { Button } from "../ui/button"
import toast, { Toaster } from "react-hot-toast"
import { Input } from "../ui/input"

interface Props {
  initialData?: Partial<Article>
  onSubmit: (data: Partial<Article>) => Promise<void>
  submitLabel: string
}

export default function ArticleForm({
  initialData = {},
  onSubmit,
  submitLabel,
}: Props) {
  const [title, setTitle] = useState(initialData.title ?? "")
  const [slug, setSlug] = useState(initialData.slug ?? "")
  const [isSlugEdited, setIsSlugEdited] = useState(false)
  const [body, setBody] = useState(initialData.body ?? "")
  const [author, setAuthor] = useState(initialData.author ?? "")
  const [image, setImage] = useState<File | null>(null)

  const [isPublished, setIsPublished] = useState(
    initialData.is_published ?? false
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null);
    if(!title || !author|| !body){
      toast.error("Please fill the fields.")
      return
    }
    setLoading(true)

    try {
      await onSubmit({
        title,
        slug,
        body,
        author,
        is_published: isPublished,
        image
      })
      toast.success("Article saved successfully!")
    } catch {
      toast.error("Something went wrong")
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        {error && <p className="text-red-500">{error}</p>}

        <Input
          className="border p-2 w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => {
              const value = e.target.value
              setTitle(value)
              if (!isSlugEdited) {
                  setSlug(slugify(value))
              }
          }
          }
          required
        />

        <Input
          className="border p-2 w-full"
          placeholder="Author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required
        />

        <div className="space-y-2">
          <label className="text-sm font-medium">Cover Image</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setImage(e.target.files[0])
              }
            }}
          />
          <RichTextEditor value={body} onChange={setBody} />
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={e => setIsPublished(e.target.checked)}
          />
          Published
        </label>
        <div className="space-x-2">

          <Button variant="default">
            {loading ? "Saving..." : submitLabel}
          </Button>
          
          <Button 
          variant="secondary"
          onClick={() => {
              // reset form
              setTitle(initialData.title ?? "")
              setSlug(initialData.slug ?? "")
              setBody(initialData.body ?? "")
              setAuthor(initialData.author ?? "")
              router.back();
            }}
          >
            Cancel
          </Button>
          
        </div>
      </form>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>
  )
}
