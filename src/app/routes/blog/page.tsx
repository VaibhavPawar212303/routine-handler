"use client"

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import Link from "@tiptap/extension-link";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";

export default function CreateBlog() {
  const [formData, setFormData] = useState({ title: "", content: "" });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Strike,
      Heading.configure({ levels: [1, 2, 3] }),
      Blockquote,
      Code,
      CodeBlock,
      Link.configure({ openOnClick: true }),
      BulletList,
      OrderedList,
      ListItem,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, content: editor.getHTML() }));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Blog Created:", formData);
    setFormData({ title: "", content: "" });
    editor?.commands.clearContent();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-5 text-black">
      <h1 className="text-2xl font-bold text-center mb-4">Create a New Blog Post</h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="font-semibold">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
        />

        <label className="font-semibold">Content:</label>

        {/* Toolbar with Active State Highlighting */}
        <div className="flex flex-wrap space-x-2 border-b border-gray-300 pb-2 mb-2">
          {editor && (
            <>
              {/* Formatting */}
              <button
                className={`${editor.isActive("bold") ? "bg-blue-500 text-white" : "bg-gray-200"} p-1 rounded`}
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                B
              </button>
              <button
                className={`${editor.isActive("italic") ? "bg-blue-500 text-white" : "bg-gray-200"} p-1 rounded`}
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                I
              </button>
              <button
                className={`${editor.isActive("underline") ? "bg-blue-500 text-white" : "bg-gray-200"} p-1 rounded`}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
              >
                U
              </button>
              <button
                className={`${editor.isActive("strike") ? "bg-blue-500 text-white" : "bg-gray-200"} p-1 rounded`}
                onClick={() => editor.chain().focus().toggleStrike().run()}
              >
                S
              </button>

              {/* Headings */}
              <button
                className={`${editor.isActive("heading", { level: 1 }) ? "bg-blue-500 text-white" : "bg-gray-200"} p-1 rounded`}
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              >
                H1
              </button>
              <button
                className={`${editor.isActive("heading", { level: 2 }) ? "bg-blue-500 text-white" : "bg-gray-200"} p-1 rounded`}
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              >
                H2
              </button>
              <button
                className={`${editor.isActive("heading", { level: 3 }) ? "bg-blue-500 text-white" : "bg-gray-200"} p-1 rounded`}
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              >
                H3
              </button>

              {/* Lists */}
              <button
                className={`${editor.isActive("bulletList") ? "bg-blue-500 text-white" : "bg-gray-200"} p-1 rounded`}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                • List
              </button>
              <button
                className={`${editor.isActive("orderedList") ? "bg-blue-500 text-white" : "bg-gray-200"} p-1 rounded`}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                1. List
              </button>

              {/* Blockquote & Code */}
              <button
                className={`${editor.isActive("blockquote") ? "bg-blue-500 text-white" : "bg-gray-200"} p-1 rounded`}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
              >
                ❝
              </button>
              <button
                className={`${editor.isActive("codeBlock") ? "bg-blue-500 text-white" : "bg-gray-200"} p-1 rounded`}
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              >
                Code
              </button>

              {/* Text Alignment */}
              <button
                className={`${editor.isActive({ textAlign: "left" }) ? "bg-blue-500 text-white" : "bg-gray-200"} p-1 rounded`}
                onClick={() => editor.chain().focus().setTextAlign("left").run()}
              >
                ⬅
              </button>
              <button
                className={`${editor.isActive({ textAlign: "center" }) ? "bg-blue-500 text-white" : "bg-gray-200"} p-1 rounded`}
                onClick={() => editor.chain().focus().setTextAlign("center").run()}
              >
                ⬜
              </button>
              <button
                className={`${editor.isActive({ textAlign: "right" }) ? "bg-blue-500 text-white" : "bg-gray-200"} p-1 rounded`}
                onClick={() => editor.chain().focus().setTextAlign("right").run()}
              >
                ➡
              </button>
            </>
          )}
        </div>

        {/* Editor Content */}
        <div className="p-2 min-h-[150px]">
          <EditorContent editor={editor} />
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
          Create Blog
        </button>
      </form>
    </div>
  );
}

