"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { contactInfo, educationInfo, experience, projectData, skillsData } from "../share/data";

function safeTrim(s: string) {
  return s.replace(/\s+/g, " ").trim();
}

function bullets(lines: string[], indent = "") {
  return lines.map((l) => `${indent}- ${safeTrim(l)}`).join("\n");
}

function buildAtsText() {
  const name = "Natalie Ye";
  const title = "Software Developer";

  const contacts = contactInfo
    .map((c) => {
      if (!c.href) return safeTrim(String(c.text));
      if (c.href.startsWith("mailto:")) return safeTrim(c.href.replace("mailto:", ""));
      return safeTrim(c.href);
    })
    .filter(Boolean);

  const sections: string[] = [];

  sections.push(name);
  sections.push(title);
  sections.push(contacts.join(" | "));
  sections.push("");

  sections.push("PROFILE SUMMARY");
  sections.push(
    safeTrim(
      "Solution-driven Computer Science student with about 1 year of experience in full-stack web development. Proficient in React, TypeScript/JavaScript and Java. Currently building scalable web solutions at Risk Hub."
    )
  );
  sections.push("");

  sections.push("EDUCATION");
  for (const edu of educationInfo) {
    sections.push(`${safeTrim(edu.school)} — ${safeTrim(edu.degree)} (${safeTrim(edu.year)})`);
  }
  sections.push("");

  sections.push("SKILLS");
  sections.push(`Languages: ${skillsData.languages.join(", ")}`);
  sections.push(`Frameworks: ${skillsData.frameworks.join(", ")}`);
  sections.push(`Tools: ${skillsData.tools.join(", ")}`);
  sections.push("");

  sections.push("EXPERIENCE");
  for (const job of experience) {
    const header = `${safeTrim(job.role)} — ${safeTrim(job.company)} (${safeTrim(job.location)}) | ${safeTrim(job.duration)}`;
    sections.push(header);
    if ("techStack" in job && typeof (job as any).techStack === "string" && (job as any).techStack.trim()) {
      sections.push(`Tech: ${safeTrim((job as any).techStack)}`);
    }
    sections.push(bullets(job.points, ""));
    sections.push("");
  }

  sections.push("PROJECTS");
  for (const p of projectData) {
    const header = `${safeTrim(p.title)} | ${safeTrim(p.tech)} | ${safeTrim(p.status)}`;
    sections.push(header);
    sections.push(bullets(p.points, ""));
    sections.push("");
  }

  return sections.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

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
  const atsText = useMemo(() => buildAtsText(), []);
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
              href="/Natalie_resume.pdf"
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

