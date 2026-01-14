"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { name: "Home", path: "/"},
    { name: "Projects", path: "/projects" },
    { name: "Experience", path: "/experience" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
]

const Nav = () => {
    const pathname = usePathname();
    return (
        <nav className="flex gap-4 md:gap-8 font-sans">
            {links.map((link, index) => {
                return (
                    <Link
                        href={link.path}
                        key={index}
                        className={
                        `${link.path === pathname && "text-accent border-b-2 border-accent"
                        } capitalize font-medium hover:text-accent transition-all`}
                        >

                        <span className="hidden min-[800px]:inline">
                            {link.name}
                        </span>

                        <span className="min-[800px]:hidden">
                            {link.name[0]}
                        </span>
                    </Link>
                );
            })}
        </nav>
    )
}

export default Nav;