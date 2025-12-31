import { connectDB } from "@/app/lib/dbConnect";
import { auth } from "@/middleware/auth";
import { ok } from "@/utils/response";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

  const user = await auth();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  const db = await connectDB();
  const payments = await db
    .collection("payments")
    .find({ taskerId: new ObjectId(user.id) })
    .toArray();

  return ok(payments);
}
