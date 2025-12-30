import { NextResponse } from "next/server";

import { auth } from "@/middleware/auth";
import { connectDB } from "@/app/lib/dbConnect";

export const runtime = "nodejs";

interface Params {
  params: { id: string };
}

// GET reviews of a user
export async function GET(req: Request, { params }: Params) {
  auth(req); // optional: only logged-in users can see

  const db = await connectDB();

  const reviews = await db
    .collection<Review>("reviews")
    .find({ userId: params.id })
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
