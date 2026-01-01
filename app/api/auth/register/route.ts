// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import { userDB } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const { name, email, password, photo, role } = await request.json();

        // Validate required fields
        if (!name || !email || !password) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await userDB.findByEmail(email);
        if (existingUser) {
            return NextResponse.json(
                { message: 'User already exists' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await userDB.create({
            name,
            email,
            password: hashedPassword,
            photo: photo || '',
            role: role || 'user',
            provider: 'credentials',
            verified: false,
            skills: [],
            location: '',
        });

        // Remove password from response
        const { password: _, ...userWithoutPassword } = newUser;

        return NextResponse.json(
            { 
                message: 'User created successfully',
                user: userWithoutPassword 
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { message: error.message || 'Internal server error' },
            { status: 500 }
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