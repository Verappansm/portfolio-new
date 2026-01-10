"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { profileData } from "@/lib/data";

export function Navbar({ className }: { className?: string }) {
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
                        {/* Logo placeholder */}
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                            V
                        </div>
                        <Link href="/" className="font-semibold text-lg">
                            {profileData.name}
                        </Link>
                    </div>

                    {/* Center: Navigation Links */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/#home" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Home
                        </Link>
                        <Link href="/#experience" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Experience
                        </Link>
                        <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Projects
                        </Link>
                        <Link href="/#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            About
                        </Link>
                        <Link href="/more" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
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
