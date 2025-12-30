import { connectDB } from "@/app/lib/dbConnect";
import { auth } from "@/middleware/auth";
import { ok } from "@/utils/response";

export async function POST(req: Request) {
  const db = await connectDB();
  const user = auth(req);
  const body = await req.json();

  await db.collection("messages").insertOne({
    ...body,
    senderId: user.id,
    createdAt: new Date(),
  });

  return ok("Message sent");
}
