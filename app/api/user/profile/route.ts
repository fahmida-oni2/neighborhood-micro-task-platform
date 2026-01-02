import { NextResponse } from "next/server";
import { auth } from "@/middleware/auth";
import { connectDB } from "@/app/lib/dbConnect";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";

// GET user profile
export async function GET(req: Request) {
  const user = await auth();
  if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  const db = await connectDB();

  const profile = await db.collection<User>("users").findOne(
    { _id: new ObjectId(user.id)},
    { projection: { password: 0 } } // hide password
  );

  if (!profile) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(profile);
}

// PUT update profile
export async function PUT(req: Request) {
 const user = await auth();

    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  const db = await connectDB();

  const body = await req.json();

const updateFields: any = {};
  if (body.name) updateFields.name = body.name;
  if (body.location !== undefined) updateFields.location = body.location;
  if (Array.isArray(body.skills)) updateFields.skills = body.skills;
  if (body.photo) updateFields.photo = body.photo;
  await db.collection<User>("users").updateOne(
    { _id: new ObjectId(user.id) },
    { $set: { ...updateFields, updatedAt: new Date() } }
  );

  const updatedProfile = await db.collection<User>("users").findOne(
    { _id: new ObjectId(user.id) },
    { projection: { password: 0 } }
  );

  return NextResponse.json({ message: "Profile updated", profile: updatedProfile });
}

// Types
interface User {
  _id: ObjectId | string;
  name: string;
  email: string;
  photo: string;
  role: "client" | "tasker" | "admin";
  location?: string;
  skills?: string[];
  serviceArea?: string;
  profilePhoto?: string;
  createdAt: Date;
  [key: string]: any;
}

