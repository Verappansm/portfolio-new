"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Instagram, Mail, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { profileData } from "@/lib/data";

export function Footer() {
    const [viewCount, setViewCount] = useState<number | null>(null);

    useEffect(() => {
        // Simple client-side visitor counter using localStorage
        const storedCount = localStorage.getItem("visitor_count");
        let count = storedCount ? parseInt(storedCount) : 1000; // Start from 1000 for aesthetics

        // Only increment once per session
        const sessionVisited = sessionStorage.getItem("has_visited");
        if (!sessionVisited) {
            count += 1;
            localStorage.setItem("visitor_count", count.toString());
            sessionStorage.setItem("has_visited", "true");
        }

        setViewCount(count);
    }, []);

    return (
        <footer className="relative py-12 border-t bg-background overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2" />

            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center gap-8">

                    {/* Visitor Counter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative group"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:opacity-100 transition-opacity opacity-0" />
                        <div className="relative flex flex-col items-center p-6 rounded-2xl border bg-card/50 backdrop-blur-sm shadow-2xl">
                            <div className="flex items-center gap-3 mb-2">
                                <Users className="w-5 h-5 text-primary animate-pulse" />
                                <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Global Visitors</span>
                            </div>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={viewCount}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent tabular-nums"
                                >
                                    {viewCount?.toLocaleString() ?? "----"}
                                </motion.div>
                            </AnimatePresence>
                            <div className="mt-2 h-1 w-32 bg-muted rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Social Links */}
                    <div className="flex gap-4 justify-center">
                        {[
                            { href: profileData.socials.linkedin, icon: Linkedin, label: "LinkedIn" },
                            { href: profileData.socials.github, icon: Github, label: "GitHub" },
                            { href: profileData.socials.instagram, icon: Instagram, label: "Instagram" },
                            { href: profileData.socials.email, icon: Mail, label: "Email" },
                        ].map((social, i) => (
                            <motion.div
                                key={social.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link
                                    href={social.href}
                                    target={social.href.startsWith("http") ? "_blank" : undefined}
                                    className="p-3 rounded-xl border bg-card hover:border-primary hover:text-primary transition-all group relative"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border whitespace-nowrap">
                                        {social.label}
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Copyright */}
                    <div className="text-center space-y-2">
                        <p className="text-muted-foreground text-sm">
                            © {new Date().getFullYear()} <span className="text-foreground font-semibold">{profileData.name}</span>.
                            Built with passion & <span className="text-pink-500">Glow</span>.
                        </p>
                        <p className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.2em]">
                            Next.js • Tailwind • Framer Motion
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
