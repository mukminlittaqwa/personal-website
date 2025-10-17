import { openDb } from "./db";

export async function saveContact(
  name: string,
  email: string,
  message: string
): Promise<void> {
  const db = await openDb();
  await db.run(
    "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
    name,
    email,
    message
  );
  console.log(`email save nih boss ku ${email}: ${message}`);
}

export async function getAllContacts() {
  const db = await openDb();
  const contacts = await db.all("SELECT * FROM contacts ORDER BY id DESC");
  return contacts;
}
