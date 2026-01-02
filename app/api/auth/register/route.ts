import { NextResponse } from 'next/server';
import { userDB } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { name, email, password, photo, role } = await request.json();

    // 1. Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 2. Password length validation
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // 3. Check if user already exists (using your db abstraction)
    const existingUser = await userDB.findByEmail(email.toLowerCase().trim());
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    // 4. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Determine profile image
    const profileImage = photo?.trim() || "https://static.thenounproject.com/png/363639-200.png";

    // 6. Create new user via userDB
    const newUser = await userDB.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      photo: profileImage,
      role: role || 'client',
      provider: 'credentials',
      verified: false,
      skills: [],
      location: '',
    });

    // 7. Success response (removing password from the returned object)
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      { 
        success: true,
        message: 'User created successfully',
        user: userWithoutPassword 
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { 
        success: false,
        message: error.message || 'Internal server error' 
      },
      { status: 500 }
    );
  }
}