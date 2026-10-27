import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory store for waitlist (in a real app, use a database)
  const waitlist: any[] = [];
  const announcements: any[] = [];
  const newsItems: any[] = [];

  // Explicit XML Sitemap endpoint (Guaranteed XML, never HTML)
  app.get("/sitemap.xml", (req, res) => {
    res.type("application/xml");
    res.sendFile(path.join(process.cwd(), "public", "sitemap.xml"));
  });

  app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    res.sendFile(path.join(process.cwd(), "public", "robots.txt"));
  });

  app.get("/llms.txt", (req, res) => {
    res.type("text/plain");
    res.sendFile(path.join(process.cwd(), "public", "llms.txt"));
  });

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/waitlist", (req, res) => {
    const { email, behavior, loiterTime } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const newEntry = { id: Date.now(), email, behavior, loiterTime, timestamp: new Date() };
    waitlist.push(newEntry);
    res.json({ success: true, entry: newEntry });
  });

  app.get("/api/waitlist", (req, res) => {
    res.json(waitlist);
  });

  app.post("/api/admin/bulk-message", (req, res) => {
    const { message } = req.body;
    // Simulate sending bulk message
    console.log(`[AGI Agent] Sending bulk message to ${waitlist.length} users:`, message);
    res.json({ success: true, count: waitlist.length });
  });

  app.post("/api/admin/news", (req, res) => {
    const { type, title, url, content } = req.body;
    const newItem = { id: Date.now(), type, title, url, content, date: new Date() };
    newsItems.push(newItem);
    res.json({ success: true, item: newItem });
  });

  app.get("/api/news", (req, res) => {
    res.json(newsItems);
  });

  app.post("/api/admin/announcement", (req, res) => {
    const { title, content, mediaUrl } = req.body;
    const newAnnouncement = { id: Date.now(), title, content, mediaUrl, date: new Date() };
    announcements.unshift(newAnnouncement);
    res.json({ success: true, announcement: newAnnouncement });
  });

  app.get("/api/announcements", (req, res) => {
    res.json(announcements);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
