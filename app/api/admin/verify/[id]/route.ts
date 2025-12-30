import { connectDB } from "@/app/lib/dbConnect";
import { auth } from "@/middleware/auth";
import { roleGuard } from "@/middleware/role";
import { NextResponse } from "next/server";


export const runtime = "nodejs";

interface Params {
  params: { id: string };
}

interface VerifyPayload {
  badge: string; // verifiedID | topRated | backgroundCheck
}

export async function PUT(req: Request, { params }: Params) {
  const user = auth(req);
  roleGuard(user, ["admin"]);

  const body: VerifyPayload = await req.json();
  const db = await connectDB();

  await db.collection("users").updateOne(
    { id: params.id },
    { $set: { [body.badge]: true } }
  );

  return NextResponse.json({ message: `User verified with badge: ${body.badge}` });
}
