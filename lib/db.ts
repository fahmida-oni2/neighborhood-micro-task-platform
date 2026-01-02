// lib/db.ts
import { Db, MongoClient, ObjectId } from 'mongodb';
import clientPromise from './mongodb';

// Database and Collection Names
const DB_NAME = process.env.MONGODB_DB || 'micro-platform';
const USERS_COLLECTION = 'users';

// User Interface
export interface IUser {
    _id?: ObjectId;
    name: string;
    email: string;
    password?: string;
    photo?: string;
    role: 'client'| 'tasker' | 'admin';
    provider: 'credentials' | 'google';
    verified: boolean;
    location?: string;
    skills?: string[];
    createdAt: Date;
    updatedAt: Date;
}

// Helper function to get database connection
export async function getDB(): Promise<Db> {
    const client = await clientPromise;
    return client.db(DB_NAME);
}

// User operations
export const userDB = {
    // Find user by email
    async findByEmail(email: string): Promise<IUser | null> {
        const db = await getDB();
        return db.collection<IUser>(USERS_COLLECTION).findOne({ email });
    },

    // Find user by ID
    async findById(id: string): Promise<IUser | null> {
        const db = await getDB();
        return db.collection<IUser>(USERS_COLLECTION).findOne({ 
            _id: new ObjectId(id) 
        });
    },

    // Create new user
    async create(userData: Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>): Promise<IUser> {
        const db = await getDB();
        const now = new Date();
        
        const user: IUser = {
            ...userData,
            createdAt: now,
            updatedAt: now,
        };

        const result = await db.collection<IUser>(USERS_COLLECTION).insertOne(user);
        return { ...user, _id: result.insertedId };
    },

    // Update user
    async update(id: string, updates: Partial<IUser>): Promise<boolean> {
        const db = await getDB();
        const result = await db.collection<IUser>(USERS_COLLECTION).updateOne(
            { _id: new ObjectId(id) },
            { 
                $set: { 
                    ...updates,
                    updatedAt: new Date() 
                } 
            }
        );
        return result.modifiedCount > 0;
    },

    // Find or create user for Google
    async findOrCreateGoogleUser(googleUser: {
        email: string;
        name: string;
        image?: string;
    }): Promise<IUser> {
        const db = await getDB();
        
        const existingUser = await this.findByEmail(googleUser.email);
        
        if (existingUser) {
            // Update photo if not present
            if (!existingUser.photo && googleUser.image) {
                await this.update(existingUser._id!.toString(), { 
                    photo: googleUser.image 
                });
                existingUser.photo = googleUser.image;
            }
            return existingUser;
        }

        // Create new user
        return this.create({
            name: googleUser.name,
            email: googleUser.email,
            photo: googleUser.image || '',
            role: 'client',
            provider: 'google',
            verified: true,
            skills: [],
            location: '',
        });
    }
};