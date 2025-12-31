import { connectDB } from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface Context {
  params: Promise<{ id: string }>;
}

// GET milestones for a task
export async function GET(req: Request, context: Context) {
  const { id } = await context.params;
  const db = await connectDB();
  const milestones = await db
    .collection("milestones")
    .find({ taskId: id })
    .toArray();
  return NextResponse.json({ milestones });
}
