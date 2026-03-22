"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import TransitionLink from "./TransitionLink";

function normalizePath(p: string) {
  const x = p.split("#")[0].split("?")[0] || "/";
  return (x.replace(/\/$/, "") || "/");
}

const links = [
    { name: "Home", path: "/"},
    { name: "Resume", path: "/resume" },
    { name: "Projects", path: "/project" },
    { name: "Experience", path: "/resume#experience" },
    // TODO: credit: https://nebbee.artstation.com/projects/GXJnP1
    { name: "About", path: "/about" },
]

const Nav = () => {
    const pathname = usePathname();
    const [hash, setHash] = useState("");

    useEffect(() => {
      setHash(typeof window !== "undefined" ? window.location.hash : "");
      const onHash = () => setHash(window.location.hash);
      window.addEventListener("hashchange", onHash);
      return () => window.removeEventListener("hashchange", onHash);
    }, [pathname]);

    const linkActive = (linkPath: string) => {
      if (normalizePath(linkPath) !== normalizePath(pathname)) return false;
      const h = linkPath.includes("#") ? linkPath.slice(linkPath.indexOf("#")) : "";
      if (!h) {
        if (linkPath === "/resume") return hash === "" || hash === "#";
        return true;
      }
      return hash === h;
    };

    return (
        <nav className="flex gap-4 md:gap-8 font-sans">
            {links.map((link, index) => {
                return (
                    <TransitionLink
                        href={link.path}
                        key={index}
                        scroll={true}
                        className={
                        `${linkActive(link.path) ? "text-accent border-b-2 border-accent" : ""
                        } capitalize font-medium hover:text-accent transition-all`}
                        >

                        <span className="hidden min-[800px]:inline">
                            {link.name}
                        </span>

                        <span className="min-[800px]:hidden">
                            {link.name[0]}
                        </span>
                    </TransitionLink>
                );
            })}
        </nav>
    )
}

export default Nav;