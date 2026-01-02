
import { connectDB } from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {

    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "client") {
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" },
        { status: 403 }
      );
    }

    // 3. Database operation
    const db = await connectDB();
    const users = await db
      .collection<User>("users")
      .find({}, { projection: { password: 0 } })
      .toArray();

    return NextResponse.json({ users });
  } catch (error: any) {
    console.error("User Fetch Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Types
interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "client" | "tasker";
  status?: "active" | "banned";
  createdAt: Date;
  [key: string]: any;
}
