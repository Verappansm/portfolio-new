"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { techStack } from "@/lib/data";

export default function TechStackPage() {
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
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Tech Stack</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Technologies and tools I work with.
                    </p>
                </motion.div>

                {/* Tech Stack Categories */}
                <div className="max-w-4xl mx-auto space-y-10">
                    {Object.entries(techStack).map(([category, items], categoryIndex) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: categoryIndex * 0.1 }}
                        >
                            <h2 className="text-lg font-semibold capitalize mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary" />
                                {category.replace(/([A-Z])/g, ' $1').trim()}
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {items.map((tech: string) => (
                                    <span
                                        key={tech}
                                        className="px-4 py-2 text-sm rounded-full border bg-card hover:bg-accent transition-colors font-medium"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
