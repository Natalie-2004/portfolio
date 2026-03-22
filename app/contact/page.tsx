"use client";

import { Mail, Send } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");

  const remaining = useMemo(() => Math.max(0, 2000 - message.length), [message.length]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitState === "submitting") return;

    setSubmitState("submitting");
    setFeedback("");

    try {
      const base =
        process.env.NEXT_PUBLIC_CONTACT_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:8080";
      const res = await fetch(`${base}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });

      const json = (await res.json().catch(() => null)) as { ok?: boolean; message?: string } | null;
      if (!res.ok || !json?.ok) {
        throw new Error(json?.message || "Failed to send message.");
      }

      setSubmitState("success");
      setFeedback("Message sent. Thanks for reaching out!");
      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
    } catch (err) {
      setSubmitState("error");
      setFeedback(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section className="max-w-3xl mx-auto pb-10">
      <div className="mb-10 text-center">
        <h1 className="text-5xl md:text-7xl font-serif font-bold italic tracking-wider text-accent leading-none">
          Contact
        </h1>
        <p className="mt-4 text-white/70 max-w-xl mx-auto">
          Leave a note like a mini message board. Open to any kind of chat. I will read every message and get it back ASAP :)
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-5"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <label className="space-y-2">
            <span className="text-sm text-white/80">Name (optional)</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              maxLength={80}
              className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm text-white/80">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              type="email"
              required
              maxLength={120}
              className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent"
            />
          </label>
        </div>

        <label className="block space-y-2">
          <span className="text-sm text-white/80">Message</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message..."
            required
            minLength={10}
            maxLength={2000}
            rows={7}
            className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent resize-y"
          />
          <div className="text-xs text-white/50">{remaining} chars left</div>
        </label>

        <input
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden
        />

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={submitState === "submitting"}
            className="inline-flex items-center gap-2 rounded-full bg-accent text-primary px-6 py-3 font-bold disabled:opacity-70"
          >
            {submitState === "submitting" ? <Mail size={16} /> : <Send size={16} />}
            {submitState === "submitting" ? "Sending..." : "Send message"}
          </button>

          {feedback && (
            <p className={submitState === "success" ? "text-accent text-sm" : "text-red-300 text-sm"}>
              {feedback}
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
