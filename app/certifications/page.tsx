"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Award } from "lucide-react";
import { certifications } from "@/lib/data";

export default function CertificationsPage() {
    return (
        <main className="min-h-screen py-20">
            <div className="container mx-auto px-4">
                {/* Back Link */}
                <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Certifications</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Professional certifications and courses I've completed.
                    </p>
                </motion.div>

                {/* Certifications Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {certifications.map((cert, i) => (
                        <motion.div
                            key={cert.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                                    <Award className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{cert.name}</h3>
                                    <p className="text-muted-foreground">{cert.issuer}</p>
                                    <p className="text-sm text-muted-foreground/60 mt-1">{cert.year}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
