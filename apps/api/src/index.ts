import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { initDb } from "./db";
import { login } from "./auth";
import { saveContact, getAllContacts } from "./contact";
import { Request, Response } from "express";

let clients: Response[] = [];

const app = express();
const PORT = 4000;

app.use(cors({ origin: ["http://localhost:3001", "http://localhost:3000"] }));
app.use(bodyParser.json());

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const token = await login(username, password);
  if (token) {
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

app.get("/api/contact", async (req, res) => {
  try {
    const contacts = await getAllContacts();
    res.json({ success: true, data: contacts });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

app.get("/api/contact/stream", (req: Request, res: Response) => {
  res.set({
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
  });
  res.flushHeaders();

  clients.push(res);

  req.on("close", () => {
    clients = clients.filter((client) => client !== res);
  });
});

function broadcastContactsUpdate() {
  clients.forEach((res) => {
    res.write(`event: update\ndata: ${JSON.stringify({ updated: true })}\n\n`);
  });
}

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const saved = await saveContact(name, email, message);
    res.json({ success: true, data: saved });

    broadcastContactsUpdate();
  } catch (err) {
    res.status(500).json({ error: "Failed to save contact" });
  }
});

(async () => {
  await initDb();
  app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
  });
})();
