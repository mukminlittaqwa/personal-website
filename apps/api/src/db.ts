import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import fs from "fs";

sqlite3.verbose();

function ensureDbDir(dbPath: string) {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export async function openDb() {
  const dbPath = path.join(__dirname, "..", "db.sqlite");
  console.log(`Opening SQLite DB at: ${dbPath}`);

  ensureDbDir(dbPath);

  try {
    return await open({
      filename: dbPath,
      driver: sqlite3.Database,
      mode: sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    });
  } catch (err) {
    console.error("Failed to open DB:", err);
    throw err;
  }
}

export async function initDb() {
  try {
    const db = await openDb();
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
      );
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const existing = await db.get(
      "SELECT * FROM users WHERE username = ?",
      "admin"
    );
    if (!existing) {
      await db.run(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        "admin",
        "password123"
      );
    }
    console.log("DB initialized successfully");
  } catch (err) {
    console.error("DB init failed:", err);
    process.exit(1);
  }
}
