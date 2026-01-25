"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { profileData } from "@/lib/data";
import { motion } from "framer-motion";

export function Navbar({ className }: { className?: string }) {
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const sections = ["home", "experience", "projects", "about"];
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -70% 0px",
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const navLinks = [
        { name: "Home", href: "/#home", id: "home" },
        { name: "Experience", href: "/#experience", id: "experience" },
        { name: "Projects", href: "/#projects", id: "projects" },
        { name: "About", href: "/#about", id: "about" },
    ];

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
                                    "text-sm font-medium transition-colors relative group",
                                    activeSection === link.id
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {link.name}
                                {activeSection === link.id && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                        <Link
                            href="/more"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            More
                        </Link>
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
