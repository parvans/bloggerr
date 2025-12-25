"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useEffect } from "react"

interface Props {
  value: string
  onChange: (value: string) => void
}

export default function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg max-w-none border rounded-b p-4 min-h-[200px] max-h-[400px] overflow-y-auto",
      },
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  if (!editor) return null

  return (
    <div className="border rounded">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b p-2 bg-gray-50">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          label="Bold"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          label="Italic"
        />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive("code")}
          label="Code"
        />

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          label="Undo"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          label="Redo"
        />
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  )
}

function ToolbarButton({
  onClick,
  active,
  label,
}: {
  onClick: () => void
  active?: boolean
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-2 py-1 text-sm border rounded ${
        active ? "bg-black text-white" : "bg-white"
      }`}
    >
      {label}
    </button>
  )
}
