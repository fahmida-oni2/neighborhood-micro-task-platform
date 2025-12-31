import { NextResponse } from "next/server";

import { auth } from "@/middleware/auth";
import { connectDB } from "@/app/lib/dbConnect";

export const runtime = "nodejs";

interface Task {
  _id?: string;
  title: string;
  description: string;
  category: string;
  location: string;
  budget: number;
  status?: "open" | "assigned" | "inProgress" | "completed" | "paid";
  clientId: string;
  taskerId?: string;
  createdAt?: Date;
}

// GET all tasks
export async function GET() {
  const db = await connectDB();
  const tasks = await db.collection<Task>("tasks").find({}).toArray();
  return NextResponse.json({ tasks });
}

// POST create new task
export async function POST(req: Request) {
 const user = await auth();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  const db = await connectDB();

  const body: Task = await req.json();
  const newTask: Task = {
    ...body,
    clientId: user.id,
    status: "open",
    createdAt: new Date(),
  };

  const result = await db.collection<Task>("tasks").insertOne(newTask);
  return NextResponse.json({ message: "Task created", taskId: result.insertedId });
}
