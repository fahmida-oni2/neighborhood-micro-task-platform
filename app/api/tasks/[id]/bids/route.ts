import { connectDB } from "@/app/lib/dbConnect";
import { ok } from "@/utils/response";
import { ObjectId } from "mongodb";


export async function GET(_: any, { params }: any) {
  const db = await connectDB();
  const task = await db
    .collection("tasks")
    .findOne({ _id: new ObjectId(params.id) });

  return ok(task?.bids || []);
}
