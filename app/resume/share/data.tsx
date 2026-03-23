import { LocateIcon, Phone, Mail } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

export const contactInfo = [
    {
        icon: <LocateIcon size={16} />,
        text: "North Sydney, NSW",
        href: null
    },
    {
        icon: <Phone size={16} />,
        text: "+61 416 896 732",
        href: null
    },
    {
        icon: <Mail size={16} />,
        text: "Email",
        href: "mailto:1103625169lixuan@gmail.com"
    },
    {
        icon: <FaLinkedin size={16} />,
        text: "natalieye2004",
        href: "https://www.linkedin.com/in/natalieye2004"
    },
];

export const educationInfo = [
    {
        school: "University Of New South Wales (UNSW)",
        degree: "Bachelor of Science (Computer Science)",
        year: "2023 - End of 2026",
    }
];

export const skillsData = {
    languages: ["Java", "Python", "C", "JavaScript/TypeScript", "Rust", "SQL/PostgreSQL"],
    frameworks: ["React", "Node.js", "Express.js", "Next.js", "Fastify", "Bootstrap5", "MongoDB"],
    tools: ["Docker", "Vercel", "Git", "SSH", "LaTeX", "Shell"]
};

export const experience = [
    {
        company: "Risk Hub",
        location: "Kirrawee NSW, Remote",
        role: "Full-Stack Web Developer Intern",
        techStack: "TypeScript, Fastify, jose, PostgreSQL, Stripe, JWT",
        duration: "Jun 2025 - Mar 2026",
        points: [
            "Developed a full-stack centralized user management application using TypeScript and Fastify within a 3-person agile team, serving authentication and subscription features for 200+ enterprise clients.",
            "Engineered a secure JWT-based authentication flow with the jose library to support SSO and seamless identity propagation across integrated applications, improving authentication efficiency by around 30%.",
            "Implemented a mechanism to synchronize real-time subscription status from PostgreSQL, resolving consistency issues between Stripe webhooks and user sessions."
        ],
    },
    {
        company: "Outlier",
        location: "US",
        role: "AI Trainer",
        techStack: "Python, JavaScript",
        duration: "Jul 2024 - Jul 2025",
        points: [
            "Reviewed and refined 300+ high quality AI-generated language contents and codes.",
            "Delivered structured feedback reports on code accuracy and semantic correctness."
        ],
    },
    {
        company: "Coles Group",
        location: "North Sydney",
        role: "Team Member",
        duration: "Nov 2022 - Mar 2024",
        points: [
            "Worked across departments (Deli, Bakery and Grocery) ensuring efficient store operations.",
            "Assisted to train new team members on food safety and operational procedures."
        ],
    },
    {
        company: "McDonald's",
        location: "Chatswood",
        role: "Team Member",
        duration: "Nov 2022 - Mar 2023",
        points: [
            "Served fast food and maintained efficient service in a fast-paced environment.",
            "Developed time management and multitasking skills while adhering to strict SOPs.",
        ]
    }
];

export const projectData = [
    {
        title: "Risk Hub Service",
        tech: "TypeScript, React, SQL",
        status: "In Progress",
        points: [
            "A commercial tool built for the startup to help users calculate insurance risks.",
            "Implemented complex form validation and dynamic data visualization."
        ]
    },
    {
        title: "Airbrb",
        tech: "React, JavaScript, Jest, UI/UX Design",
        status: "In Progress",
        points: [
            "Building a comprehensive booking system with calendar scheduling and map search.",
            "Implementing server-side rendering for optimal performance and SEO."
        ]
    },
    {
        title: "Personal Portfolio",
        tech: "Next.js, TypeScript, React, SQL, UI/UX Design",
        status: "Complete",
        points: [
            "A personal portfolio showcase",
        ]
    },
    {
        title: "YelpCamp",
        tech: "Node.js, Express.js, MongoDB, HTML/CSS",
        status: "Completed",
        points: [
            "Full-stack campground review platform with user authentication and RESTful API.",
            "Deployed on Render with a cloud database integration."
        ]
    },
    {
        title: "BitTrickle",
        tech: "Java, TCP, UDP",
        status: "Completed",
        points: [
            "Developed a peer-to-peer file-sharing system enabling reliable transfer over unreliable networks.",
            "Implemented custom handshake protocols and congestion control (Go-Back-N)."
        ]
    }
];