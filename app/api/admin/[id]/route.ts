import { ObjectId } from "mongodb";
import { ok } from "@/utils/response";
import { connectDB } from "@/app/lib/dbConnect";

export async function PUT(_: any, { params }: any) {
  const db = await connectDB();

  await db.collection("users").updateOne(
    { _id: new ObjectId(params.id) },
    { $set: { isVerified: true } }
  );

  return ok("User verified");
}
