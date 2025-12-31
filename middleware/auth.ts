// import * as jwt from "jsonwebtoken";

// export function auth(req: Request) {
//   const authHeader = req.headers.get("authorization");

//   if (!authHeader) {
//     throw new Error("Unauthorized");
//   }

//   const token = authHeader.split(" ")[1];
//   if (!token) {
//     throw new Error("Invalid token format");
//   }

//   return jwt.verify(token, process.env.JWT_SECRET!) as any;
// }

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 

/**
 * Helper to get the user from the NextAuth session.
 * Use this inside your API routes.
 */
export async function getAuthUser() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return null;
  }

  return session.user; // This will contain name, email, and role (if configured)
}
export { getAuthUser as auth };