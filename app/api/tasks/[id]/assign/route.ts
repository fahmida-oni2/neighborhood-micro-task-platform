import { connectDB } from "@/app/lib/dbConnect";
import { auth } from "@/middleware/auth";
import { ok } from "@/utils/response";
import { ObjectId } from "mongodb";


export async function PUT(req: Request, { params }: any) {
  const db = await connectDB();
  auth(req);

  const { taskerId } = await req.json();

  await db.collection("tasks").updateOne(
    { _id: new ObjectId(params.id) },
    {
      $set: {
        assignedTaskerId: new ObjectId(taskerId),
        status: "assigned",
      },
    }
  );

  return ok("Task assigned");
}
