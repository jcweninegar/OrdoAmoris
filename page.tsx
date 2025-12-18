import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

export default async function TodayPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const prisma = new PrismaClient();
  const latest = await prisma.reflection.findFirst({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
  const content = latest?.content ?? "You haven’t reflected today. Head back to the home page to add a brain dump.";
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-gray-800">Today</h1>
      <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
    </div>
  );
}