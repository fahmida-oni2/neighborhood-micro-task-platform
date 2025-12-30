import * as jwt from "jsonwebtoken";

export function auth(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new Error("Invalid token format");
  }

  return jwt.verify(token, process.env.JWT_SECRET!) as any;
}
