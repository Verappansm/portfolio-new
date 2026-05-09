import React from "react";
import Link from "next/link";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { profileData } from "@/lib/data";

export function Footer() {
    const socials = [
        { href: profileData.socials.linkedin, icon: Linkedin, label: "LinkedIn" },
        { href: profileData.socials.github, icon: Github, label: "GitHub" },
        { href: profileData.socials.instagram, icon: Instagram, label: "Instagram" },
        { href: profileData.socials.email, icon: Mail, label: "Email" },
    ];

    return (
        <footer className="border-t py-8">
            <div className="container mx-auto px-4 flex flex-col items-center gap-4">
                <div className="flex items-center gap-5">
                    {socials.map((s) => (
                        <Link
                            key={s.label}
                            href={s.href}
                            target={s.href.startsWith("http") ? "_blank" : undefined}
                            rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            aria-label={s.label}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <s.icon className="w-5 h-5" />
                        </Link>
                    ))}
                </div>
                <p className="text-xs text-muted-foreground">© 2026 Verappan</p>
            </div>
        </footer>
    );
}
