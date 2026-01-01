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
}