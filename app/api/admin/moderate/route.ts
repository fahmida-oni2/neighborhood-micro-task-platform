export const runtime = "nodejs";

import { connectDB } from "@/app/lib/dbConnect";
import { auth } from "@/middleware/auth";
import { roleGuard } from "@/middleware/role";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = auth(req);
  roleGuard(user, ["admin"]);

  const db = await connectDB();
  const { type, itemId, action } = await req.json();

  await db.collection("moderation_logs").insertOne({
    type,
    itemId,
    action,
    adminId: user.id,
    createdAt: new Date(),
  });

  // optionally update the original collection
  if (action === "approve") {
    await db
      .collection(type)
      .updateOne({ _id: itemId }, { $set: { approved: true } });
  } else if (action === "reject") {
    await db
      .collection(type)
      .updateOne({ _id: itemId }, { $set: { approved: false } });
  }

  return NextResponse.json({ message: "Moderation action done" });
}
