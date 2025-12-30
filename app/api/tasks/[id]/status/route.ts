import { connectDB } from "@/app/lib/dbConnect";
import { ok } from "@/utils/response";
import { ObjectId } from "mongodb";


export async function PATCH(req: Request, { params }: any) {
  const db = await connectDB();
  const { status } = await req.json();

  await db.collection("tasks").updateOne(
    { _id: new ObjectId(params.id) },
    { $set: { status } }
  );

  return ok("Status updated");
}
