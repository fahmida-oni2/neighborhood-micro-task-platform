import { connectDB } from "@/app/lib/dbConnect";
import { auth } from "@/middleware/auth";
import { roleGuard } from "@/middleware/role";
import { ok } from "@/utils/response";

export async function GET(req: Request) {
  const db = await connectDB();
  const user = auth(req);
  roleGuard(user, ["admin"]);

  const users = await db.collection("users").find().toArray();
  return ok(users);
}
