"use client";

import { Loader2, ArrowUpRight } from "lucide-react";
import { projectData } from "./share/data";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProjectGalleryModal from "./components/ProjectGalleryModal";
import type { ProjectImage } from "./share/data";

type ProjectCardData = {
    slug: string;
    title: string;
    tech: string;
    status: string;
    detail: boolean;
    showStatus?: boolean;
    points: string[];
    images?: ProjectImage[];
};

const DOUBLE_STRUCK_DIGITS: Record<string, string> = {
    "0": "𝟘",
    "1": "𝟙",
    "2": "𝟚",
    "3": "𝟛",
    "4": "𝟜",
    "5": "𝟝",
    "6": "𝟞",
    "7": "𝟟",
    "8": "𝟠",
    "9": "𝟡",
};

function toDoubleStruck(n: number) {
    return n
        .toString()
        .padStart(2, "0")
        .split("")
        .map((d) => DOUBLE_STRUCK_DIGITS[d] ?? d)
        .join("");
}

export default function Project() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
    const [projects, setProjects] = useState<ProjectCardData[]>(projectData);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        let cancelled = false;

        const loadProjects = async () => {
            try {
                const response = await fetch("/api/projects");
                if (!response.ok) return;
                const payload = (await response.json()) as ProjectCardData[];
                if (!cancelled && payload.length > 0) {
                    setProjects(payload);
                }
            } catch {
                // Keep local static fallback data when DB/API is unavailable.
            }
        };

        void loadProjects();
        return () => {
            cancelled = true;
        };
    }, []);

    const activeProject = activeProjectIndex !== null ? projects[activeProjectIndex] : null;

    const closeGallery = () => {
        setActiveProjectIndex(null);
    };

    const openGallery = (index: number) => {
        setActiveProjectIndex(index);
    };

    return (
        <section className="max-w-5xl mx-auto">
            <div className="flex flex-col items-center transition-all duration-300 ease-in-out">
                <h1
                    className={`
                        text-center font-serif text-accent tracking-wider font-bold italic leading-none
                        transition-all duration-500 ease-in-out
                        ${isScrolled ? "mb-8 text-4xl md:text-5xl mt-0" : "mb-12 text-5xl md:text-7xl mt-4"}
                    `}
                >
                    Projects
                </h1>
            </div>

            <div className="flex flex-col gap-6">
                {projects.map((project, index) => {
                    const hasGallery = Boolean(project.images?.length);
                    const card = (
                        <div
                            className={`
                            relative flex flex-col md:flex-row items-start gap-6 md:gap-10 p-8 rounded-3xl
                            border border-white/10 bg-white/5 
                            transition-all duration-300 ease-out
                            
                            hover:bg-accent hover:border-accent hover:scale-[1.01] hover:shadow-lg
                        `}>

                            <div className="flex-shrink-0">
                                <span className={`
                                    text-7xl font-black font-serif
                                    text-white/30
                                    transition-colors duration-300
                                    
                                    group-hover:text-white
                                `}>
                                    {toDoubleStruck(index + 1)}
                                </span>
                            </div>

                            <div className="flex-grow w-full">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className={`
                                            font-bold text-2xl mb-1
                                            text-white
                                            transition-colors duration-300
                                            
                                            /* Hover: darker title */
                                            group-hover:text-black
                                        `}>
                                            {project.title}
                                        </h3>
                                        <span className={`
                                            text-sm font-mono
                                            text-accent
                                            transition-colors duration-300
                                            
                                            /* Hover: darker tech text */
                                            group-hover:text-black/70
                                        `}>
                                            {project.tech}
                                        </span>
                                    </div>

                                    {/* Top-right status */}
                                    <div className="flex flex-col items-end gap-2">
                                        {project.detail && (
                                            <ArrowUpRight
                                                className={`
                                                    text-white/50 transition-all duration-300 
                                                    group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1
                                                `}
                                            />
                                        )}

                                        {project.status === "In Progress" && project.showStatus !== false && (
                                            <span className={`
                                                flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-1 rounded
                                                border transition-colors duration-300
                                                
                                                /* Default: yellow */}
                                                text-yellow-400 border-yellow-400/20 bg-yellow-400/5
                                                
                                                /* Hover: dark style */}
                                                group-hover:bg-black/10 group-hover:text-black group-hover:border-black/20
                                            `}>
                                                <Loader2 size={10} className="animate-spin" /> WIP
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Bullet list */}
                                <ul className={`
                                    list-disc list-outside ml-5 space-y-2 text-base
                                    text-white/60
                                    transition-colors duration-300
                                    
                                    /* Hover: darker text */
                                    group-hover:text-black/80
                                `}>
                                    {project.points.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );

                    if (hasGallery) {
                        return (
                            <button
                                type="button"
                                key={index}
                                className="block w-full text-left group cursor-pointer"
                                onClick={() => openGallery(index)}
                                aria-label={`Open ${project.title} gallery`}
                            >
                                {card}
                            </button>
                        );
                    }

                    return project.detail ? (
                        <Link
                            href={`/project/${project.slug}`}
                            key={index}
                            className="block group"
                        >
                            {card}
                        </Link>
                    ) : (
                        <div key={index} className="block group cursor-default">
                            {card}
                        </div>
                    );
                })}
            </div>

            <ProjectGalleryModal
                title={activeProject?.title ?? ""}
                images={activeProject?.images ?? []}
                open={Boolean(activeProject)}
                onClose={closeGallery}
            />
        </section>
    )
}