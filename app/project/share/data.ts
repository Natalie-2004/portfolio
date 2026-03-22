export type ProjectImage = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
};

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

export const projectDataDetail = [
    {
        slug: "hub-service-foundation",
        title: "Hub Service Foundation",
        context: "Company Project",
        duration: "Jun 2025 – Present",
        tech: ["React", "TypeScript", "Fastify", "JWT", "Stripe", "PostgreSQL", "Redis"],
        status: "In Progress",

        summary:
            "Hub gateway service in front of internal tools (including NeedsCalc), used by ~200 paid users (no public link/code due to company policy).",

        overview: `
Implemented the Hub gateway/BFF that verifies user identity, enforces membership-gated access, and proxies trusted requests to downstream tools (e.g., NeedsCalc).
Due to company policy/NDA, no live demo link or source code is shared.
    `,

        role: [
            "Full Stack Web Developer",
            "Implemented Hub gateway foundations (auth/session, membership gating, trusted proxy to downstream tools)",
            "Worked in a small agile team (design discussions, peer reviews, iterative delivery)",
        ],

        challenges: [
            "Centralizing auth/session while keeping downstream services private from direct access",
            "Enforcing membership-gated access to protected routes without leaking client-controlled headers",
            "Supporting paid upgrade flows (checkout + webhook) safely in a production setting",
        ],

        solutions: [
            "Implemented token verification and identity normalization, then injected internal trust headers (`x-internal-auth`, `x-user-id`) and `X-Request-Id` for correlation",
            "Added a secure BFF/proxy path (`/api/needs-calculator/*`) to route trusted requests to the Needs backend",
            "Implemented Stripe checkout + webhook handling to upgrade membership access",
        ],

        outcomes: [
            "Supported a production workflow for ~200 paid users with centralized access control and consistent proxying to internal tools",
            "Improved operational safety via request correlation IDs and configurable routing toggles for rollout/rollback",
        ],

        visuals: null, // company project
        links: null,
    },
    {
        slug: "needs-calculator",
        title: "Needs Calculator",
        context: "Company Project",
        duration: "Jun 2025 – Present",
        tech: ["TypeScript", "React", "Vite", "Fastify", "Zod", "PostgreSQL", "JWT", "TanStack Query"],
        status: "In Progress",

        summary:
            "Insurance needs calculator app (frontend + backend) integrated with Hub gateway (no public link/code due to company policy).",

        overview: `
NeedsCalc provides the calculator UI and APIs; auth and membership policy are handled by the Hub gateway.
My contribution focused on refactoring and hardening existing flows while keeping behavior stable for production users.
Due to company policy/NDA, no live demo link or source code is shared.
    `,

        role: [
            "Full Stack Web Developer",
            "Refactored existing calculator flows (validation, calculation, and data persistence integration)",
            "Worked in a small agile team (reviews, bugfixes, iterative improvements)",
        ],

        challenges: [
            "Refactoring a large multi-step form without breaking existing advisor workflows",
            "Keeping complex validation + calculations maintainable and performant",
            "Ensuring backend endpoints are protected and only accept Hub-trusted requests",
        ],

        solutions: [
            "Refactored validation to be schema-driven (Zod) and aligned frontend/backend contracts",
            "Improved responsiveness via debounced recalculation and targeted state updates",
            "Maintained strict trust boundary: backend accepts only Hub-trusted calls using `x-internal-auth` + `x-user-id`",
        ],

        outcomes: [
            "Reduced regressions during refactors by keeping rules centralized and easier to reason about",
            "Improved maintainability and stability of calculator flows used by production users (~200 paid users across the platform)",
        ],

        visuals: null,
        links: null,
    },
];

export const projectData: ProjectCardData[] = [
    {
        slug: "hub-service-foundation",
        title: "Hub Service Foundation",
        tech: "TypeScript, Fastify, Stripe, PostgreSQL/Redis, Vercel",
        status: "In Progress",
        detail: false,
        showStatus: false,
        images: [
            {
                src: "/images/projects/hub-service/hub-service-01.png",
                alt: "Hub Service directory page",
                width: 2048,
                height: 1120,
            },
            {
                src: "/images/projects/hub-service/hub-service-02.png",
                alt: "Hub Service upgrade plan page",
                width: 2048,
                height: 1120,
            },
        ],
        points: [
            "Hub gateway/BFF in front of internal tools; verifies identity/session and enforces membership-gated access (~200 paid users).",
            "Proxies trusted requests to downstream apps (e.g., NeedsCalc) and handles Stripe checkout + webhook membership upgrades."
        ]
    },
    {
        slug: "needs-calculator",
        title: "Needs Calculator",
        tech: "React, TypeScript, Fastify, Zod, PostgreSQL",
        status: "In Progress",
        detail: false,
        showStatus: false,
        images: [
            {
                src: "/images/projects/needs-calc/needs-calc-01.png",
                alt: "Needs Calculator client info page",
                width: 2048,
                height: 1120,
            },
            {
                src: "/images/projects/needs-calc/needs-calc-02.png",
                alt: "Needs Calculator detailed calculations page",
                width: 2048,
                height: 1120,
            },
        ],
        points: [
            "Insurance needs calculator app (frontend + backend) integrated with Hub for centralized auth/membership.",
            "Primary contribution: refactoring and hardening multi-step validation + calculation flows while keeping behavior stable."
        ]
    },
    {
        slug: "personal-portfolio",
        title: "Personal Portfolio",
        tech: "Next.js, TypeScript, React, SQL, UI/UX Design",
        status: "Complete",
        detail: false,
        images: [
            {
                src: "/images/projects/personal-portfolio/personal-portfolio-01.png",
                alt: "Personal portfolio homepage screenshot",
                width: 2048,
                height: 1280,
            },
        ],
        points: [
            "A personal project showcase my passon in coding.",
        ]
    },
    {
        slug: "airbrb",
        title: "Airbnb",
        tech: "React, JavaScript, Jest, UI/UX Design",
        status: "In Progress",
        detail: false,
        points: [
            "Building a comprehensive booking system with calendar scheduling and map search.",
            "Implementing server-side rendering for optimal performance and SEO."
        ]
    },
    {
        slug: "bittrickle",
        title: "BitTrickle",
        tech: "Java, TCP, UDP",
        status: "Completed",
        detail: false,
        images: [
            {
                src: "/images/projects/bittrickle/bittrickle-01.png",
                alt: "BitTrickle file sharing architecture diagram",
                width: 2048,
                height: 1280,
            },
            {
                src: "/images/projects/bittrickle/bittrickle-02.png",
                alt: "BitTrickle socket connection flow",
                width: 2048,
                height: 1280,
            },
            {
                src: "/images/projects/bittrickle/bittrickle-03.png",
                alt: "BitTrickle message format table",
                width: 2048,
                height: 1280,
            },
            {
                src: "/images/projects/bittrickle/bittrickle-04.png",
                alt: "BitTrickle terminal interaction example",
                width: 2048,
                height: 1280,
            },
            {
                src: "/images/projects/bittrickle/bittrickle-05.png",
                alt: "BitTrickle additional project screenshot",
                width: 2048,
                height: 1280,
            },
            {
                src: "/images/projects/bittrickle/bittrickle-06.png",
                alt: "BitTrickle additional project screenshot 2",
                width: 2048,
                height: 1280,
            },
            {
                src: "/images/projects/bittrickle/bittrickle-07.png",
                alt: "BitTrickle additional project screenshot 3",
                width: 2048,
                height: 1280,
            },
            {
                src: "/images/projects/bittrickle/bittrickle-08.png",
                alt: "BitTrickle additional project screenshot 4",
                width: 2048,
                height: 1280,
            },
        ],
        points: [
            "Developed a peer-to-peer file-sharing system enabling reliable transfer over unreliable networks.",
            "Implemented custom handshake protocols and congestion control."
        ]
    },
    {
        slug: "yelpcamp",
        title: "YelpCamp",
        tech: "Node.js, Express.js, MongoDB, HTML/CSS",
        status: "Completed",
        detail: false,
        points: [
            "Full-stack campground review platform with user authentication and RESTful API.",
            "Deployed on Render with a cloud database integration."
        ]
    }
];

