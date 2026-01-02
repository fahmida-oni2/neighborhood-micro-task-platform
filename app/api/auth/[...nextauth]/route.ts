import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { userDB } from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Please enter email and password");
                }

                const user = await userDB.findByEmail(credentials.email);

                if (!user) {
                    throw new Error("No user found with this email");
                }

                // Check if user has password (Google users don't)
                if (!user.password) {
                    throw new Error("Please sign in with Google");
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);

                if (!isValid) {
                    throw new Error("Invalid password");
                }

                return {
                    id: user._id!.toString(),
                    name: user.name,
                    email: user.email,
                    image: user.photo || '',
                    role: user.role,
                };
            }
        })
    ],
    callbacks: {
        async signIn({ user, account }: { user: any; account: any }) {
            if (account.provider === "google") {
                try {
                    const dbUser = await userDB.findOrCreateGoogleUser({
                        email: user.email!,
                        name: user.name!,
                        image: user.image,
                    });
                    
                    user.id = dbUser._id!.toString();
                    user.role = dbUser.role;
                } catch (error) {
                    console.error("Error in Google sign-in:", error);
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, user }: { token: any; user: any }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            if (session?.user) {
                session.user.id = token.id;
                session.user.role = token.role;
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