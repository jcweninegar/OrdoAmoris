"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function NavBar() {
  const { data: session, status } = useSession();

  return (
    <nav className="w-full bg-white shadow mb-4">
      <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold text-gray-800">
          Order of Loves
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/">Home</Link>
          <Link href="/ordo">Ordo</Link>
          <Link href="/today">Today</Link>
          {status === "loading" ? null : session ? (
            <button
              onClick={() => signOut()}
              className="px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded"
            >
              Sign out
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className="px-2 py-1 text-sm text-white bg-gray-800 rounded"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
