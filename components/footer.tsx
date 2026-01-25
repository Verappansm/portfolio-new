import React from "react";
import Link from "next/link";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { profileData } from "@/lib/data";

export function Footer() {
    return (
        <footer className="relative py-12 border-t bg-background">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center gap-8">
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
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Copyright */}
                    <div className="text-center space-y-2">
                        <p className="text-muted-foreground text-sm">
                            © {new Date().getFullYear()} <span className="text-foreground font-semibold">{profileData.name}</span>.
                            All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
