import { NextResponse } from "next/server";

import { auth } from "@/middleware/auth";
import { connectDB } from "@/app/lib/dbConnect";

export const runtime = "nodejs";

interface Context {
  params: Promise<{ id: string }>;
}

// GET reviews of a user
export async function GET(req: Request, context: Context) {
const user = await auth();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

  const db = await connectDB();
const { id } = await context.params;
  const reviews = await db
    .collection<Review>("reviews")
    .find({ userId: id })
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json({ reviews });
}

// Types
interface Review {
  _id: string;
  userId: string; // reviewee
  reviewerId: string;
  rating: number; // 1-5
  comment?: string;
  createdAt: Date;
}
