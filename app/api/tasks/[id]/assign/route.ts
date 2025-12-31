import { connectDB } from "@/app/lib/dbConnect";
import { auth } from "@/middleware/auth";
import { ok } from "@/utils/response";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export async function PUT(req: Request, { params }: any) {
  const db = await connectDB();
  const user = await auth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
const { id } = await params;
  const { taskerId } = await req.json();

  await db.collection("tasks").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        assignedTaskerId: new ObjectId(taskerId),
        status: "assigned",
      },
    }
  );

  return ok("Task assigned");
}
