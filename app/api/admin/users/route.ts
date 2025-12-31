import { connectDB } from "@/app/lib/dbConnect";
import { auth } from "@/middleware/auth";
import { roleGuard } from "@/middleware/role";
import { NextResponse } from "next/server";


export const runtime = "nodejs";

export async function GET(req: Request) {
  const user = auth(req);
  roleGuard(user, ["admin"]);

  const db = await connectDB();
  const users = await db
    .collection<User>("users")
    .find({}, { projection: { password: 0 } })
    .toArray();

  return NextResponse.json({ users });
}

// Types
interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "tasker";
  status?: "active" | "banned";
  createdAt: Date;
  [key: string]: any;
}
