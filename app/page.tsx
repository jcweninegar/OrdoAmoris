"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

export default function HomePage() {
  const [content, setContent] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      const res = await fetch("/api/reflection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
      if (res.ok) {
        setContent("");
        router.push("/today");
      } else if (res.status === 401) {
        signIn();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Put your life in order</h1>
      <p className="text-gray-600">
        Enter your thoughts, tasks, and intentions for the day. When you submit,
        we’ll help you reflect on them through the lens of faith.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-40 p-3 border rounded-md border-gray-300"
          placeholder="Brain dump your thoughts here..."
        />
        <div className="flex justify-between items-center">
          {session ? (
            <button
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white rounded"
            >
              Reflect
            </button>
          ) : (
            <button
              type="button"
              onClick={() => signIn()}
              className="px-4 py-2 bg-gray-800 text-white rounded"
            >
              Sign in to save
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
