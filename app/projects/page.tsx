"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { projects } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { GlowingEffect } from "@/components/ui/glowing-effect";

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
        >
            <div className="relative rounded-2xl border bg-card p-6 hover:shadow-xl transition-all duration-300">
                <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={2}
                />

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">{project.date}</p>
                    </div>
                    <div className="flex gap-2">
                        {project.github && (
                            <Link href={project.github} target="_blank">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Github className="h-4 w-4" />
                                </Button>
                            </Link>
                        )}
                        {project.live && (
                            <Link href={project.live} target="_blank">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <ExternalLink className="h-4 w-4" />
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-4">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Expand Button */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full justify-between"
                >
                    {isExpanded ? "Show less" : "Read more"}
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>

                {/* Expanded Content */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-4 border-t mt-4">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {project.fullDescription}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

export default function ProjectsPage() {
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
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Projects</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        A collection of projects I've worked on, ranging from machine learning to full-stack web applications.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.slug} project={project} index={i} />
                    ))}
                </div>
            </div>
        </main>
    );
}
