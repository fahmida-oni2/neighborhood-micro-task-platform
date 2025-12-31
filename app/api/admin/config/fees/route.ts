export const runtime = "nodejs";

import { connectDB } from "@/app/lib/dbConnect";
import { auth } from "@/middleware/auth";
import { roleGuard } from "@/middleware/role";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const user = await auth();
  if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  roleGuard(user, ["admin"]);

  const { commission } = await req.json(); // e.g., 0.1 for 10%
  const db = await connectDB();

  await db
    .collection("config")
    .updateOne(
      { name: "platform" },
      { $set: { commission } },
      { upsert: true }
    );

  return NextResponse.json({ message: "Platform fee updated" });
}
