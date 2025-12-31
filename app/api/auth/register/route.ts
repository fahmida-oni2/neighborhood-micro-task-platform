import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, photo } = await request.json();

    // Validation - Only required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("micro-platform");
    const usersCollection = db.collection("users");

    // Check if user exists
    const existingUser = await usersCollection.findOne({
      email: email.toLowerCase()
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password with bcryptjs
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Determine profile image
    const profileImage = photo?.trim() || "https://static.thenounproject.com/png/363639-200.png";

    // Create user
    const result = await usersCollection.insertOne({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      image: profileImage, // Use provided photo or default
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log("User created with ID:", result.insertedId);

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful!',
        userId: result.insertedId
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { 
        success: false,
        message: error.message || 'Registration failed' 
      },
      { status: 500 }
    );
  }
}