import React from "react";
import Link from "next/link";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { profileData } from "@/lib/data";
import { MapModal } from "@/components/map-modal";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";

export function Footer() {
    const socials = [
        { href: profileData.socials.linkedin, icon: Linkedin, label: "LinkedIn" },
        { href: profileData.socials.github, icon: Github, label: "GitHub" },
        { href: profileData.socials.instagram, icon: Instagram, label: "Instagram" },
        { href: profileData.socials.email, icon: Mail, label: "Email" },
    ];

    return (
        <footer className="border-t">
            <div className="container mx-auto px-6 py-7">
                {/* Row 1 — 3-col grid so rows stay aligned */}
                <div className="grid grid-cols-3 items-center mb-5">
                    <div className="flex justify-start">
                        <MapModal />
                    </div>
                    <div className="flex justify-center items-center gap-5">
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
                    <div className="flex justify-end">
                        <ScrollToTopButton />
                    </div>
                </div>

                {/* Row 2 — same 3-col grid, columns snap under row 1 */}
                <div className="grid grid-cols-3 items-center text-xs text-muted-foreground/60">
                    <p className="italic">&ldquo;Part of the journey is the end.&rdquo;</p>
                    <p className="text-center">© 2026 Verappan</p>
                    <p className="text-right">Powered by an unhealthy sleep schedule · Deployed on Vercel</p>
                </div>
            </div>
        </footer>
    );
}
