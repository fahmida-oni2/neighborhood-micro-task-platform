import { NextResponse } from "next/server";
import { auth } from "@/middleware/auth";
import { connectDB } from "@/app/lib/dbConnect";

export const runtime = "nodejs";

// GET user profile
export async function GET(req: Request) {
  const user = auth(req); // tasker or client
  const db = await connectDB();

  const profile = await db.collection<User>("users").findOne(
    { _id: user.id },
    { projection: { password: 0 } } // hide password
  );

  if (!profile) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(profile);
}

// PUT update profile
export async function PUT(req: Request) {
  const user = auth(req);
  const db = await connectDB();

  const body: UpdateProfilePayload = await req.json();

  const updateFields: Partial<User> = {};

  if (body.name) updateFields.name = body.name;
  if (body.location) updateFields.location = body.location;
  if (body.skills) updateFields.skills = body.skills;
  if (body.profilePhoto) updateFields.profilePhoto = body.profilePhoto;
  if (body.serviceArea) updateFields.serviceArea = body.serviceArea;

  await db.collection<User>("users").updateOne(
    { _id: user.id },
    { $set: updateFields }
  );

  const updatedProfile = await db.collection<User>("users").findOne(
    { _id: user.id },
    { projection: { password: 0 } }
  );

  return NextResponse.json({ message: "Profile updated", profile: updatedProfile });
}

// Types
interface User {
  _id: string;
  name: string;
  email: string;
  role: "client" | "tasker" | "admin";
  location?: string;
  skills?: string[];
  serviceArea?: string;
  profilePhoto?: string;
  createdAt: Date;
  [key: string]: any;
}

interface UpdateProfilePayload {
  name?: string;
  location?: string;
  skills?: string[];
  profilePhoto?: string;
  serviceArea?: string;
}
