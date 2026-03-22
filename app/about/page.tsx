"use client";

import Image from "next/image";
import { Code2, Gamepad2, Heart, Info, Sparkles, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

function Pill({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold tracking-wide text-white/80 transition-colors duration-300 group-hover:border-black/20 group-hover:bg-black/10 group-hover:text-black/80">
            {children}
        </span>
    );
}

function Card({
                  icon,
                  title,
                  children,
              }: {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section
            className={`
                group rounded-3xl border border-white/10 bg-white/5 p-8
                transition-all duration-300 ease-out
                hover:bg-accent hover:border-accent hover:scale-[1.01] hover:shadow-lg
            `}
        >
            <h3
                className={`
                    mb-4 flex items-center gap-3 text-2xl font-bold text-white
                    transition-colors duration-300
                    group-hover:text-black
                `}
            >
                <span className="text-accent transition-colors duration-300 group-hover:text-black">
                    {icon}
                </span>
                {title}
            </h3>
            <div className="space-y-3 text-white/70 transition-colors duration-300 group-hover:text-black/80 leading-relaxed">
                {children}
            </div>
        </section>
    );
}

export default function About() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const skillMetrics = [
        { name: "TypeScript", years: 3, projects: 12, confidence: 87 },
        { name: "React / Next.js", years: 3, projects: 10, confidence: 85 },
        { name: "Java + Spring Boot", years: 2, projects: 7, confidence: 78 },
        { name: "Node.js / Express", years: 2, projects: 8, confidence: 80 },
        { name: "PostgreSQL", years: 2, projects: 6, confidence: 75 },
        { name: "Docker + CI", years: 1, projects: 5, confidence: 68 },
    ];

    const acknowledgements = [
        { title: "Artwork Credit", credit: "Bee Bates — Hollow Knight fan art used for my avatar" },
        { title: "UI Inspiration", credit: "Miya (from RedNote) — visual design inspiration" },
    ];

    type SteamGame = {
        title: string;
        src: string;
        hours?: number;
        hoursLabel?: string;
        achievements?: { unlocked: number; total: number };
    };

    const steamStats: SteamGame[] = [
        { title: "Stardew Valley", hours: 268.3, achievements: { unlocked: 46, total: 49 }, src: "/about/steam/stardew-valley.jpg" },
        { title: "Hollow Knight", hours: 171, achievements: { unlocked: 63, total: 63 }, src: "/about/steam/hollow-knight.avif" },
        { title: "Oxygen Not Included", hours: 134.3, achievements: { unlocked: 27, total: 50 }, src: "/about/steam/oxygen-not-included.webp" },
        { title: "Terraria", hours: 118.1, achievements: { unlocked: 114, total: 137 }, src: "/about/steam/terraria.jpg" },
        { title: "Civ6", hours: 117.7, achievements: { unlocked: 56, total: 320 }, src: "/about/steam/civ6.webp" },
        { title: "Hollow Knight: Silksong", hours: 106.5, achievements: { unlocked: 49, total: 52 }, src: "/about/steam/hollow-knight-silksong.avif" },
        { title: "Elden Ring", hours: 100, achievements: { unlocked: 38, total: 42 }, src: "/about/steam/elden-ring.jpg" },
        { title: "Slay the Spire", hours: 83, achievements: { unlocked: 25, total: 46 }, src: "/about/steam/slay-the-spire.jpg" },
    ];

    const steamStatsByPlaytime = [...steamStats].sort((a, b) => {
        const ha = typeof a.hours === "number" && Number.isFinite(a.hours) ? a.hours : 0;
        const hb = typeof b.hours === "number" && Number.isFinite(b.hours) ? b.hours : 0;
        return hb - ha;
    });

    const maxHours = (() => {
        const nums = steamStatsByPlaytime
            .map((g) => g.hours)
            .filter((n): n is number => typeof n === "number" && Number.isFinite(n));
        return nums.length ? Math.max(...nums) : 1;
    })();

    return (
        <section className="max-w-5xl mx-auto">
            <div className="flex flex-col items-center transition-all duration-300 ease-in-out">
                <h1
                    className={`
                        text-center font-serif font-bold italic leading-none tracking-wider
                        transition-all duration-500 ease-in-out
                        ${isScrolled ? "mb-8 text-4xl md:text-5xl mt-0" : "mb-12 text-5xl md:text-7xl mt-4"}
                    `}
                >
                    <span className="text-white">More About </span>
                    <span className="text-accent">ME</span>
                </h1>
            </div>

            <div className="grid gap-6">
                <Card icon={<Sparkles />} title="Heya!">
                    <p>
                        I&apos;m a Computer Science student at UNSW (graduating 2026) and a full-stack developer. Here are some things about me.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                        <Pill>UNSW CS • 2026</Pill>
                        <Pill>Gamer</Pill>
                        <Pill>Badminton Lover</Pill>
                        <Pill>Swimer</Pill>
                        <Pill>DIY PCs</Pill>
                        <Pill>Animes</Pill>
                    </div>
                </Card>

                {/* <Card icon={<Code2 />} title="Skills">
                    <p>
                        I enjoy building full-stack features end-to-end, from polished frontend interactions to backend APIs and data models.
                        I care a lot about clean structure, maintainable code, and thoughtful UI details.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {skillMetrics.map((skill) => (
                            <div
                                key={skill.name}
                                className="rounded-xl border border-white/10 bg-white/5 p-3 transition-colors duration-300 group-hover:border-black/20 group-hover:bg-black/10"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <h4 className="font-semibold text-white transition-colors duration-300 group-hover:text-black">
                                        {skill.name}
                                    </h4>
                                    <span className="text-xs font-bold text-accent transition-colors duration-300 group-hover:text-black">
                                        {skill.confidence}%
                                    </span>
                                </div>

                                <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-accent transition-[width] duration-500"
                                        style={{ width: `${skill.confidence}%` }}
                                    />
                                </div>

                                <p className="mt-2 text-xs text-white/65 transition-colors duration-300 group-hover:text-black/65">
                                    {skill.years} years • {skill.projects} projects
                                </p>
                            </div>
                        ))}
                    </div>
                </Card> */}

                <Card icon={<Gamepad2 />} title="Gaming">
                    <p>
                        I&apos;ve been a Steam user for 7 years. I like tracking progress—hours played and achievement completion help me stay motivated and consistent.
                    </p>

                    <div className="pt-2">

                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {steamStatsByPlaytime.map((g) => {
                                const hours = typeof g.hours === "number" && Number.isFinite(g.hours) ? g.hours : null;
                                const achievements = g.achievements && g.achievements.total > 0 ? g.achievements : null;

                                const hoursPct = hours != null ? Math.max(0, Math.min(100, (hours / maxHours) * 100)) : 0;
                                const achPct = achievements
                                    ? Math.max(0, Math.min(100, (achievements.unlocked / achievements.total) * 100))
                                    : 0;

                                return (
                                    <div
                                        key={g.title}
                                        className={`
                                            group/game
                                            relative overflow-hidden rounded-2xl
                                            border border-white/10 bg-white/5 p-4
                                            transition-all duration-300 will-change-transform
                                            hover:z-10 hover:scale-[1.04]
                                            hover:border-accent hover:shadow-[0_0_0_1px_rgba(0,255,153,0.22),0_22px_70px_rgba(0,0,0,0.65)] hover:-translate-y-1
                                            group-hover:border-black/20 group-hover:bg-black/10
                                        `}
                                    >
                                        {/* Poster preview area */}
                                        <div
                                            className="group/poster relative mb-4 overflow-hidden rounded-xl border border-white/10 bg-black/20 aspect-[16/9]"
                                        >
                                            <Image
                                                src={g.src}
                                                alt={`${g.title} poster`}
                                                fill
                                                sizes="(max-width: 1024px) 100vw, 50vw"
                                                className="object-cover transition-transform duration-500 ease-out group-hover/poster:scale-[1.10]"
                                                priority={false}
                                            />

                                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/25" />
                                        </div>

                                        <div className="relative">
                                            <h4 className="font-bold text-white leading-snug transition-colors duration-300 group-hover:text-black">
                                                {g.title}
                                            </h4>

                                            <div className="mt-4 space-y-3">
                                                {hours != null ? (
                                                    <div>
                                                        <div className="flex items-center justify-between text-xs">
                                                            <span className="text-white/60 transition-colors duration-300 group-hover:text-black/60">
                                                                Hours
                                                            </span>
                                                            <span className="text-white/70 transition-colors duration-300 group-hover:text-black/70">
                                                                {hours.toFixed(hours % 1 === 0 ? 0 : 1)}h
                                                            </span>
                                                        </div>
                                                        <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                                                            <div
                                                                className="h-full rounded-full bg-accent transition-[width] duration-500"
                                                                style={{ width: `${hoursPct}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="text-xs text-white/60 transition-colors duration-300 group-hover:text-black/60">
                                                        Hours: {g.hoursLabel ?? "—"}
                                                    </div>
                                                )}

                                                {achievements && (
                                                    <div>
                                                        <div className="flex items-center justify-between text-xs">
                                                            <span className="text-white/60 transition-colors duration-300 group-hover:text-black/60">
                                                                Achievements
                                                            </span>
                                                            <span className="text-white/70 transition-colors duration-300 group-hover:text-black/70">
                                                                {achievements.unlocked}/{achievements.total}
                                                            </span>
                                                        </div>
                                                        <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                                                            <div
                                                                className="h-full rounded-full bg-accent transition-[width] duration-500"
                                                                style={{ width: `${achPct}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Card>

                <Card icon={<Trophy />} title="Sports">
                    <p>
                        I&apos;ve been an avid badminton player since Year 8. It&apos;s how I balance screen time with physical agility.
                        I also attend a weekly social club—good practice for consistency, focus, and staying sharp outside the keyboard.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                        <Pill>Badminton • since Yr 8</Pill>
                        <Pill>Weekly social club</Pill>
                    </div>
                </Card>

                <Card icon={<Heart />} title="Volunteering">
                    <p>
                        I volunteered at two major Sydney events in 2024: the{" "}
                        <span className="text-white/90 font-medium transition-colors group-hover:text-black">
                            Sydney Royal Easter Show
                        </span>{" "}
                        and{" "}
                        <span className="text-white/90 font-medium transition-colors group-hover:text-black">
                            Vivid Sydney
                        </span>
                        . Both were fast-paced, people-facing roles that sharpened communication and staying calm under pressure.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                        <Pill>Royal Easter Show</Pill>
                        <Pill>Vivid Sydney</Pill>
                    </div>
                </Card>

                <Card icon={<Info />} title="Credits">
                    <div className="space-y-2">
                        {acknowledgements.map((item) => (
                            <p key={item.title}>
                                <span className="text-white/90 font-medium transition-colors duration-300 group-hover:text-black">
                                    {item.title}:
                                </span>{" "}
                                {item.credit}
                            </p>
                        ))}
                    </div>
                </Card>
            </div>
        </section>
    );
}

