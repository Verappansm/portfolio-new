"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { profileData } from "@/lib/data";

export function Navbar({ className }: { className?: string }) {
    const [activeSection, setActiveSection] = useState("home");
    const pathname = usePathname();
    const raf = useRef<number | null>(null);

    useEffect(() => {
        const sectionIds = ["home", "experience", "projects", "about"];

        const update = () => {
            const threshold = window.innerHeight * 0.5;
            let found = sectionIds[0];
            for (const id of sectionIds) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top < threshold) {
                    found = id;
                }
            }
            setActiveSection(found);
        };

        // Throttle via rAF so we never run more than once per frame
        const onScroll = () => {
            if (raf.current !== null) return;
            raf.current = requestAnimationFrame(() => {
                update();
                raf.current = null;
            });
        };

        document.addEventListener("scroll", onScroll, { passive: true });
        update(); // set initial state
        return () => {
            document.removeEventListener("scroll", onScroll);
            if (raf.current !== null) cancelAnimationFrame(raf.current);
        };
    }, []);

    const navLinks = [
        { name: "Home", href: "/#home", id: "home" },
        { name: "Experience", href: "/#experience", id: "experience" },
        { name: "Projects", href: "/#projects", id: "projects" },
        { name: "About", href: "/#about", id: "about" },
        { name: "More", href: "/more", id: "more" },
    ];

    const isActive = (id: string) => {
        if (id === "more") return pathname.startsWith("/more");
        if (pathname.startsWith("/more")) return false;
        return activeSection === id;
    };

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b",
                className
            )}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Left: Logo + Name */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                            V
                        </div>
                        <Link href="/" className="font-semibold text-lg hover:text-primary transition-colors">
                            {profileData.name}
                        </Link>
                    </div>

                    {/* Center: Navigation Links */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.id}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors relative pb-1",
                                    isActive(link.id)
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {link.name}
                                {/* Underline indicator — CSS transition, no Framer Motion */}
                                <span
                                    className={cn(
                                        "absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full origin-left transition-transform duration-300",
                                        isActive(link.id) ? "scale-x-100" : "scale-x-0"
                                    )}
                                />
                            </Link>
                        ))}
                    </nav>

                    {/* Right: Social Icons + Theme Toggle */}
                    <div className="flex items-center gap-2">
                        <Link
                            href={profileData.socials.github}
                            target="_blank"
                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Github className="w-4 h-4" />
                        </Link>
                        <Link
                            href={profileData.socials.linkedin}
                            target="_blank"
                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Linkedin className="w-4 h-4" />
                        </Link>
                        <Link
                            href={profileData.socials.instagram}
                            target="_blank"
                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Instagram className="w-4 h-4" />
                        </Link>
                        <Link
                            href={profileData.socials.email}
                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Mail className="w-4 h-4" />
                        </Link>
                        <div className="w-px h-6 bg-border mx-1" />
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}
