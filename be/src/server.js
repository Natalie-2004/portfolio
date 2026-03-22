import "dotenv/config";
import cors from "cors";
import express from "express";
import nodemailer from "nodemailer";

const app = express();
const port = Number(process.env.PORT || 8080);
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_SECURE = String(process.env.SMTP_SECURE || "false") === "true";
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const CONTACT_TO = process.env.CONTACT_TO;
const CONTACT_FROM = process.env.CONTACT_FROM || "Portfolio Contact <no-reply@localhost>";

const transporter =
  SMTP_HOST && SMTP_USER && SMTP_PASS
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_SECURE,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      })
    : null;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const ipHits = new Map();

function getClientIp(req) {
  const fromHeader = req.headers["x-forwarded-for"];
  if (typeof fromHeader === "string") {
    return fromHeader.split(",")[0].trim();
  }
  return req.socket.remoteAddress || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const hits = ipHits.get(ip) || [];
  const recent = hits.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  ipHits.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function sanitize(str) {
  return str.replace(/\s+/g, " ").trim();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json({ limit: "50kb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "portfolio-be" });
});

app.post("/api/contact", async (req, res) => {
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    res.status(429).json({ ok: false, message: "Too many requests. Try again later." });
    return;
  }

  const website = typeof req.body?.website === "string" ? req.body.website : "";
  if (website.trim()) {
    // Honeypot: pretend success for bots.
    res.json({ ok: true });
    return;
  }

  const email = sanitize(String(req.body?.email || ""));
  const name = sanitize(String(req.body?.name || ""));
  const message = String(req.body?.message || "").trim();

  if (!email || !message) {
    res.status(400).json({ ok: false, message: "Email and message are required." });
    return;
  }
  if (!isValidEmail(email)) {
    res.status(400).json({ ok: false, message: "Invalid email format." });
    return;
  }
  if (message.length < 10 || message.length > 2000) {
    res
      .status(400)
      .json({ ok: false, message: "Message must be between 10 and 2000 characters." });
    return;
  }
  if (!transporter || !CONTACT_TO) {
    res.status(500).json({ ok: false, message: "Email service is not configured." });
    return;
  }

  try {
    const displayName = name || "Anonymous";
    const subject = `[Portfolio] New message from ${displayName}`;
    const text = [
      `Name: ${displayName}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n");

    await transporter.sendMail({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: email,
      subject,
      text,
    });

    res.json({ ok: true });
  } catch (error) {
    console.error("Contact mail send failed:", error);
    res.status(500).json({ ok: false, message: "Failed to send message." });
  }
});

app.listen(port, () => {
  console.log(`portfolio-be listening on http://localhost:${port}`);
});
