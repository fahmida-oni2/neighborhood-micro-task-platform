import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any) {
        try {
          // Check credentials
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password required");
          }

          // Connect to MongoDB
          const client = await clientPromise;
          const db = client.db("micro-platform");
          const usersCollection = db.collection("users");

          // Find user by email
          const user = await usersCollection.findOne({
            email: credentials.email.toLowerCase()
          });

          if (!user) {
            throw new Error("No user found");
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          // Return user object
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image || null,
            role: user.role || "user"
          };

        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  },

  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
    newUser: "/register"
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  debug: process.env.NODE_ENV === "development",

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };