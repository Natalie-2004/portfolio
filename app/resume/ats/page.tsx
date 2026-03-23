"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const ATS_RESUME_TEXT = `Natalie Ye
North Sydney, NSW | +61 416 896 732 | 1103625169lixuan@gmail.com | LinkedIn | GitHub

Education
Bachelor of Science (BSc) in Computer Science
University of New South Wales (UNSW), Sydney, NSW
Feb 2023 - Nov 2026

Technical Skills
Languages: Java, Python, C, JavaScript/TypeScript, Rust, SQL/PostgreSQL
Frameworks and Tools: React, Node.js, Express/Next.js, Fastify, Bootstrap5, MongoDB
Development Tools: Docker, Vercel, Git, SSH, LaTeX, Shell

Experience
Full-Stack Web Developer Intern
Risk Hub, Kirrawee NSW, Remote
June 2025 - March 2026
- Developed a full-stack centralized user management application using TypeScript and Fastify within a 3-person agile team, serving authentication and subscription features for 200+ enterprise clients.
- Engineered a secure JWT-based authentication flow using the jose library to enable Single Sign-On (SSO) and ensure seamless identity propagation across multiple integrated applications, improving about 30% of authentication efficiency.
- Implemented a mechanism to synchronize real-time subscription status from PostgreSQL, resolving data consistency issues between Stripe payment webhooks and user sessions.

AI Trainer (Language)
Outlier, US, Remote
July 2024 - May 2025
- Reviewed and refined 300+ AI-generated code and text samples, maintaining consistent quality standards across technical content types.
- Delivered structured feedback reports on code accuracy and semantic correctness, contributing to AI model performance improvements.

Technical Projects
Yelp Camp | JavaScript, Node.js, Express.js, MongoDB | Link | Feb 2025 - May 2025
- Built campground review platform with 6+ RESTful API endpoints supporting complete CRUD operations for users, campgrounds, and reviews.
- Implemented Passport.js authentication with session management, enabling secure user access control for 20+ active test users.
- Developed middleware for error handling and input validation, achieving 40% fewer API response errors during user testing phase.

BitTrickle | JAVA, UDP, TCP | Oct 2024 - Nov 2024
- Developed P2P file-sharing system with 5+ core commands and real-time peer discovery functionality.
- Implemented error handling middleware and input validation, ensuring robust API responses and secure data processing for user interactions.
- Built heartbeat protocol and authentication mechanisms, maintaining 95%+ system uptime with automatic peer reconnection capabilities.

Co-curriculum and Certificates
- Certificates: Cambridge IGCSE Computer Science, NSW Government Digital Job Simulation, WWCC.
- Volunteers: Sydney Royal Easter Show and Vivid Festival - Logistics coordination and visitor engagement, demonstrating strong interpersonal skills in high-volume environments.
`;

async function copyToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  // Fallback for older browsers / blocked permissions
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
}

export default function AtsResumePage() {
  const atsText = useMemo(() => ATS_RESUME_TEXT, []);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [isCopying, setIsCopying] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onCopy = async () => {
    try {
      setIsCopying(true);
      setCopyState("idle");
      await copyToClipboard(atsText);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1600);
    } catch {
      setCopyState("error");
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <section className="w-full py-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center gap-4">
          <h1
            className={`
              font-serif text-accent tracking-wider font-bold italic 
              leading-none
              transition-all duration-500 ease-in-out
              ${isScrolled ? "text-4xl md:text-5xl mt-0" : "text-5xl md:text-7xl mt-4"}
            `}
          >
            ATS Resume
          </h1>

          <p className="text-white/70 text-sm leading-relaxed max-w-[720px]">
            Plain-text, recruiter/ATS friendly version. Use the copy button to paste into forms.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-3">
            <button
              onClick={onCopy}
              disabled={isCopying}
              className="px-5 py-2 rounded-full font-bold tracking-wide uppercase text-sm bg-accent text-primary hover:bg-accent-hover transition disabled:opacity-60"
            >
              {isCopying ? "Copying..." : "Copy"}
            </button>
            <a
              href="/api/media/docs/Natalie_resume.pdf"
              download
              target="_blank"
              className="px-5 py-2 rounded-full font-bold tracking-wide uppercase text-sm border border-white/30 text-white hover:border-accent hover:text-accent transition"
            >
              Download PDF
            </a>
            <Link
              href="/resume"
              className="px-5 py-2 rounded-full font-bold tracking-wide uppercase text-sm border border-white/30 text-white hover:border-accent hover:text-accent transition"
            >
              Back
            </Link>
          </div>
        </div>

        {copyState !== "idle" && (
          <div
            className={`text-sm font-medium ${
              copyState === "copied" ? "text-accent" : "text-red-300"
            }`}
            aria-live="polite"
          >
            {copyState === "copied" ? "Copied to clipboard." : "Copy failed. Please select the text and copy manually."}
          </div>
        )}

        <div className="border border-white/10 rounded-xl bg-white/5 p-5">
          <pre className="whitespace-pre-wrap break-words text-sm leading-relaxed text-white/85 font-mono">
            {atsText}
          </pre>
        </div>
      </div>
    </section>
  );
}

