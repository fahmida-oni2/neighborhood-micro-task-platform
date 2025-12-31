import { connectDB } from "@/app/lib/dbConnect";
import { auth } from "@/middleware/auth";
import { roleGuard } from "@/middleware/role";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const user = await auth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  roleGuard(user, ["admin"]);

  const db = await connectDB();
  const tasks = await db.collection<Task>("tasks").find({}).toArray();

  return NextResponse.json({ tasks });
}

// Types
interface Task {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  budget: number;
  status: string;
  clientId: string;
  taskerId?: string;
  createdAt: Date;
  [key: string]: any;
}
