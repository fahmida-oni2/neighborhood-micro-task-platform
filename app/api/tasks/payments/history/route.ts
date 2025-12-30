import { connectDB } from "@/app/lib/dbConnect";
import { auth } from "@/middleware/auth";
import { ok } from "@/utils/response";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
  const db = await connectDB();
  const user = auth(req);

  const payments = await db
    .collection("payments")
    .find({ taskerId: new ObjectId(user.id) })
    .toArray();

  return ok(payments);
}
