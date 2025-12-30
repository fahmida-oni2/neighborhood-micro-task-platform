import { ObjectId } from "mongodb";
import { ok } from "@/utils/response";
import { connectDB } from "@/app/lib/dbConnect";

export async function POST(req: Request, { params }: any) {
  const db = await connectDB();
  const body = await req.json();

  await db.collection("evidence").insertOne({
    ...body,
    taskId: new ObjectId(params.id),
    createdAt: new Date(),
  });

  return ok("Evidence submitted");
}
