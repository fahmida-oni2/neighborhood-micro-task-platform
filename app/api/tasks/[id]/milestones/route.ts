import { connectDB } from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface Params {
  params: { id: string };
}

// GET milestones for a task
export async function GET(req: Request, { params }: Params) {
  const db = await connectDB();
  const milestones = await db
    .collection("milestones")
    .find({ taskId: params.id })
    .toArray();
  return NextResponse.json({ milestones });
}
