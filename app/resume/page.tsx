"use client";

import { Download, FileText, User, University, Code, Briefcase } from "lucide-react";
import Link from "next/link";
import { contactInfo, educationInfo, skillsData, experience, projectData } from "./share/data";
import {useEffect, useState} from "react";

export default function Resume() {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) setIsScrolled(true);
            else setIsScrolled(false);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <main className="min-h-screen pb-12 pt-6">
            <div className="container mx-auto px-4">

                <div className={`
                    flex flex-col items-center 
                    transition-all duration-300 ease-in-out
                    ${isScrolled ? "mb-8" : "mb-12 space-y-6"}
                `}>

                    {/* buttons */}
                    <div className={`
                        flex flex-col md:flex-row justify-center items-center gap-6 
                        transition-all duration-500 ease-in-out
                        ${isScrolled ? "opacity-0 h-0 overflow-hidden mb-0" : "opacity-100 h-auto"}
                    `}>
                        <a href="/api/media/docs/Natalie_resume.pdf" download target="_blank">
                            <button className="flex items-center gap-2 border border-accent text-accent px-6 py-2 rounded-full hover:bg-accent hover:text-primary transition font-bold text-sm tracking-wide uppercase">
                                <Download size={16} /> Download CV
                            </button>
                        </a>

                        {/* redirect to ats mode */}
                        <Link href="/resume/ats">
                            <button className="flex items-center gap-2 bg-white/10 text-white px-6 py-2 rounded-full hover:bg-white/20 transition font-bold text-sm tracking-wide uppercase">
                                <FileText size={16} /> ATS Friendly
                            </button>
                        </Link>
                    </div>

                    {/* name */}
                    <div className="text-center">
                        <h1 className={`
                            font-serif text-accent tracking-wider font-bold italic 
                            leading-none
                            transition-all duration-500 ease-in-out
                            ${isScrolled ? "text-4xl md:text-5xl mt-0" : "text-5xl md:text-7xl mt-4"}
                        `}>
                            Natalie Ye
                        </h1>
                    </div>

                    {/* contact info */}
                    <div className={`
                        flex flex-wrap justify-center items-center gap-y-2 text-sm md:text-base text-white/80
                        transition-all duration-500
                        ${isScrolled ? "mt-2" : "mt-4"}
                    `}>
                        {contactInfo.map((item, index) => (
                            <div key={index} className="flex items-center">
                                {item.href ? (
                                    <Link href={item.href} target="_blank" className="flex items-center gap-2 hover:text-accent hover:underline decoration-accent underline-offset-4 transition-all">
                                        <span className="text-accent">{item.icon}</span>
                                        <span>{item.text}</span>
                                    </Link>
                                ) : (
                                    <div className="flex items-center gap-2 cursor-default">
                                        <span className="text-accent">{item.icon}</span>
                                        <span>{item.text}</span>
                                    </div>
                                )}
                                {index < contactInfo.length - 1 && (
                                    <span className="mx-3 md:mx-4 w-[1px] h-4 bg-white/30 hidden sm:block"></span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                </div>

                {/* body */}
                <div className="flex flex-col space-y-12">

                    {/* summary */}
                    <section>
                        <h2 className="font-bold mb-4 flex items-center gap-3 text-2xl text-accent">
                            <User /> Profile Summary
                        </h2>
                        <p className="leading-relaxed text-white/70 text-lg">
                            Solution-driven Computer Science student with hands-on full-stack web development experience.
                            Proficient in React, TypeScript/JavaScript and Java, with recent internship work focused on user authentication and subscription systems at Risk Hub.
                        </p>
                    </section>

                    {/* edu */}
                    <section>
                        <h2 className="font-bold mb-4 flex items-center gap-3 text-2xl text-accent">
                            <University /> Education
                        </h2>
                        {educationInfo.map((edu, index) => (
                            <div key={index} className="mt-4">
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="text-xl font-bold leading-tight text-white">
                                        {edu.school}
                                    </h3>
                                    <span className="text-lg text-white/80">
                                        {edu.year}
                                    </span>
                                </div>
                                <div className="font-medium mb-1 text-accent text-base">
                                    {edu.degree}
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Skills */}
                    <section>
                        <h2 className="font-bold mb-4 flex items-center gap-3 text-2xl text-accent">
                            <Code /> Skills
                        </h2>
                        <div className="flex flex-col space-y-3 text-base text-lg">
                            <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                                <span className="font-bold text-white min-w-[110px]">Languages:</span>
                                <span className="text-white/80 leading-relaxed">
                                    {skillsData.languages.join(", ")}
                                </span>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                                <span className="font-bold text-white min-w-[110px]">Frameworks:</span>
                                <span className="text-white/80 leading-relaxed">
                                    {skillsData.frameworks.join(", ")}
                                </span>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                                <span className="font-bold text-white min-w-[110px]">Tools:</span>
                                <span className="text-white/80 leading-relaxed">
                                    {skillsData.tools.join(", ")}
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* experience */}
                    <section id="experience">
                        <h2 className="font-bold mb-6 flex items-center gap-3 text-2xl text-accent">
                            <Briefcase /> Experience
                        </h2>
                        <div className="space-y-10">
                            {experience.map((job, index) => {
                                const isMostRecent = index === 0;
                                return (
                                    <div
                                        key={index}
                                        className={`relative pl-8 border-l-2
                                        ${isMostRecent ? "border-accent" : "border-gray-300/40"}
                                      `}
                                    >

                                    <span className={
                                        `absolute -left-[9px] top-0 w-4 h-4 rounded-full 
                                        ${isMostRecent ? "bg-accent" : "bg-gray-300"}
                                    `}
                                    ></span>

                                    <div
                                        className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                                        <h3 className="text-xl font-bold text-white">{job.role}</h3>
                                        <span
                                            className="text-lg text-white/80 font-medium italic tabular-nums">{job.duration}</span>
                                    </div>

                                    <div className="mb-3 text-accent italic font-medium text-base">
                                        {job.company}<span className="text-white/60 mx-1 not-italic">,</span>{job.location}
                                    </div>

                                    <ul className="list-disc list-outside ml-5 space-y-1 text-white/60">
                                        {job.points.map((point, i) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                                )
                            })}
                        </div>
                    </section>

                </div>
        </main>
    )
}