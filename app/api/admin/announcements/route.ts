import { connectDB } from "@/app/lib/dbConnect";
import { auth } from "@/middleware/auth";
import { roleGuard } from "@/middleware/role";
import { NextResponse } from "next/server";


export const runtime = "nodejs";

interface AnnouncementPayload {
  title: string;
  message: string;
}

export async function POST(req: Request) {
  const user = await auth();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  roleGuard(user, ["admin"]);
  const body: AnnouncementPayload = await req.json();
  const db = await connectDB();

  await db.collection<Announcement>("announcements").insertOne({
    ...body,
    adminId: user.id,
    createdAt: new Date(),
  });

  return NextResponse.json({ message: "Announcement posted" });
}

// Types
interface Announcement extends AnnouncementPayload {
  adminId: string;
  createdAt: Date;
}
