"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import React from "react";

interface Props {
  children: React.ReactNode;
  session?: Session | null;
}

/**
 * Wraps the NextAuth SessionProvider so it can be used in server components.
 */
export default function AuthProvider({ children, session }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
