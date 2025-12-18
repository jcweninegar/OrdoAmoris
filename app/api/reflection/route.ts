import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getReflections, addReflection } from "@/lib/data";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }
  const body = await req.json();
  const content: string = body?.content?.trim();
  if (!content) {
    return NextResponse.json({ error: "Content required" }, { status: 400 });
  }
  const newReflection = {
    id: Date.now().toString(),
    content,
    createdAt: new Date().toISOString(),
  };
  await addReflection(session.user?.id as string, newReflection);
  return NextResponse.json({ success: true, reflection: newReflection });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json([], { status: 401 });
  }
  const reflections = await getReflections(session.user?.id as string);
  reflections.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return NextResponse.json(reflections);
}
