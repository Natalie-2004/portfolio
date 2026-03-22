"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const BAR_COUNT = 8;
const STAGGER = 0.082;
const DURATION = 0.68;
const EASE = [0.76, 0, 0.24, 1] as const;

type Phase = "idle" | "cover" | "reveal";

function pathOnly(href: string): string {
  try {
    const u = new URL(href, typeof window !== "undefined" ? window.location.origin : "http://localhost");
    return u.pathname.endsWith("/") && u.pathname !== "/" ? u.pathname.slice(0, -1) : u.pathname;
  } catch {
    return href.split("#")[0].split("?")[0] || "/";
  }
}

type PageTransitionContextValue = {
  navigate: (href: string) => void;
};

const PageTransitionContext = createContext<PageTransitionContextValue | null>(
  null
);

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error("usePageTransition must be used within PageTransitionProvider");
  }
  return ctx;
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const pendingHref = useRef<string | null>(null);
  const phaseRef = useRef<Phase>("idle");
  const busyRef = useRef(false);

  const setPhaseSafe = (p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  };

  const navigate = useCallback((href: string) => {
    if (busyRef.current && phaseRef.current !== "idle") return;

    const targetPath = pathOnly(href);

    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
      const normTarget = targetPath.replace(/\/$/, "") || "/";
      const normCurrent = currentPath === "" ? "/" : currentPath;

      // Same page: hash-only or exact — skip transition
      if (normTarget === normCurrent) {
        router.push(href);
        return;
      }
    }

    if (busyRef.current) return;
    busyRef.current = true;
    pendingHref.current = href;
    setPhaseSafe("cover");
  }, [router]);

  const onCoverBarComplete = useCallback(
    (index: number) => {
      if (phaseRef.current !== "cover" || index !== BAR_COUNT - 1) return;
      const href = pendingHref.current;
      if (href) router.push(href);
      setPhaseSafe("reveal");
    },
    [router]
  );

  const onRevealBarComplete = useCallback((index: number) => {
    if (phaseRef.current !== "reveal") return;
    // Reveal stagger: right→left columns; left column (index 0) finishes last
    if (index !== 0) return;
    pendingHref.current = null;
    busyRef.current = false;
    setPhaseSafe("idle");
  }, []);

  return (
    <PageTransitionContext.Provider value={{ navigate }}>
      {children}

      <div
        className={`fixed inset-0 z-[100] flex flex-row pointer-events-none [&>*+*]:-ml-px ${
          phase !== "idle" ? "pointer-events-auto" : ""
        }`}
        aria-hidden
      >
        {Array.from({ length: BAR_COUNT }, (_, i) => (
          <motion.div
            key={i}
            className="h-full min-w-0 flex-1 shrink-0 basis-0 bg-[#f2f4f7]"
            initial={false}
            animate={
              phase === "idle"
                ? { y: "-100%" }
                : phase === "cover"
                  ? { y: "0%" }
                  : { y: "100%" }
            }
            transition={
              phase === "idle"
                ? { duration: 0 }
                : {
                    duration: DURATION,
                    ease: EASE,
                    delay:
                      phase === "cover"
                        ? i * STAGGER
                        : (BAR_COUNT - 1 - i) * STAGGER,
                  }
            }
            style={{ willChange: "transform" }}
            onAnimationComplete={() => {
              if (phaseRef.current === "cover") onCoverBarComplete(i);
              if (phaseRef.current === "reveal") onRevealBarComplete(i);
            }}
          />
        ))}
      </div>
    </PageTransitionContext.Provider>
  );
}
