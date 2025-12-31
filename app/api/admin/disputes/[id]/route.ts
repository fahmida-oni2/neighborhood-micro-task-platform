import { connectDB } from "@/app/lib/dbConnect";
import { auth } from "@/middleware/auth";
import { roleGuard } from "@/middleware/role";
import { NextResponse } from "next/server";


export const runtime = "nodejs";

interface Context {
  params: Promise<{ id: string }>;
}

interface DisputePayload {
  status: "resolved" | "pending";
  resolution: string;
}

export async function PUT(req: Request, context: Context) {
  const user = auth(req);
  roleGuard(user, ["admin"]);

 const { id } = await context.params;
  const body: DisputePayload = await req.json();
  const db = await connectDB();

  await db.collection<Dispute>("disputes").updateOne(
    { _id: id },
    {
      $set: {
        status: body.status,
        resolution: body.resolution,
        resolvedAt: new Date(),
        adminId: user.id,
      },
    }
  );

  return NextResponse.json({ message: "Dispute updated" });
}

// Types
interface Dispute {
  _id: string;
  userId: string;
  taskId: string;
  status: string;
  resolution?: string;
  createdAt: Date;
  resolvedAt?: Date;
  adminId?: string;
}
