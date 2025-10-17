import jwt from "jsonwebtoken";
import { openDb } from "./db";

const JWT_SECRET = "super-secret-key";

export async function login(
  username: string,
  password: string
): Promise<string | null> {
  const db = await openDb();
  const user = await db.get(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    username,
    password
  );
  if (user) {
    return jwt.sign({ userId: user.id, username }, JWT_SECRET, {
      expiresIn: "1d",
    });
  }
  return null;
}
