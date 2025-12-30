import { connectDB } from "@/app/lib/dbConnect";
import { auth } from "@/middleware/auth";
import { ok } from "@/utils/response";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  const db = await connectDB();
  const user = auth(req);
  const body = await req.json();

  const task = {
    ...body,
    clientId: new ObjectId(user.id),
    status: "open",
    createdAt: new Date(),
  };

  await db.collection("tasks").insertOne(task);
  return ok(task);
}

export async function GET() {
  const db = await connectDB();
  const tasks = await db
    .collection("tasks")
    .find({ status: "open" })
    .toArray();

  return ok(tasks);
}
