"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

// ── Text scramble hook ──────────────────────────────────────────────────────
function ScrambleText({ text, active, speed = 0.45 }: { text: string; active: boolean; speed?: number }) {
    const [display, setDisplay] = useState(text);
    const frameRef = useRef<number>(0);
    const iterRef = useRef<number>(0);
    const CHARS = "!_@#$%^&*|<>?/~";

    useEffect(() => {
        cancelAnimationFrame(frameRef.current);
        if (!active) {
            iterRef.current = 0;
            setDisplay(text);
            return;
        }
        iterRef.current = 0;
        const tick = () => {
            iterRef.current += speed;
            setDisplay(
                text.split("").map((char, i) => {
                    if (/[\s\-—'.]/.test(char)) return char;
                    if (i < iterRef.current) return char;
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                }).join("")
            );
            if (iterRef.current < text.length) {
                frameRef.current = requestAnimationFrame(tick);
            } else {
                setDisplay(text);
            }
        };
        frameRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frameRef.current);
    }, [active, text]);

    return <>{display}</>;
}

// ── Status config ───────────────────────────────────────────────────────────
const STATUS_LABEL: Record<string, string> = {
    "live":         "LIVE",
    "internship":   "INTERN",
    "r&d":          "R&D",
    "study":        "STUDY",
    "university":   "UNI",
    "hackathon":    "HACKATHON",
    "clone":        "CLONE",
    "side-project": "SIDE",
    "freelance":    "FREELANCE",
};

const STATUS_COLOR: Record<string, string> = {
    "live":         "text-emerald-500",
    "internship":   "text-blue-400",
    "r&d":          "text-amber-400",
    "study":        "text-violet-400",
    "university":   "text-orange-400",
    "hackathon":    "text-pink-400",
    "clone":        "text-muted-foreground/40",
    "side-project": "text-muted-foreground/40",
    "freelance":    "text-cyan-400",
};

// ── Category config ─────────────────────────────────────────────────────────
const CATEGORY_LABEL: Record<string, string> = {
    "full-stack":   "FULL STACK",
    "gen-ai":       "GEN AI",
    "ai-agent":     "AI AGENT",
    "ml-pipeline":  "ML PIPELINE",
    "frontend":     "FRONTEND",
    "backend":      "BACKEND",
    "cli-tool":     "CLI TOOL",
    "automation":   "AUTOMATION",
    "data-science": "DATA SCIENCE",
    "mobile":       "MOBILE",
    "chrome-ext":   "CHROME EXT",
};

const ALL_FILTER = "all";
const uniqueCategories = Array.from(new Set(projects.map((p) => p.category)));

export default function ProjectsPage() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [activeFilter, setActiveFilter] = useState(ALL_FILTER);

    const filtered = activeFilter === ALL_FILTER
        ? projects
        : projects.filter((p) => p.category === activeFilter);

    const handleFilterChange = (cat: string) => {
        setActiveFilter(cat);
        setHoveredIndex(null);
        setExpandedIndex(null);
    };

    const isHighlighted = (i: number) => {
        const hasActive = hoveredIndex !== null || expandedIndex !== null;
        if (!hasActive) return true;
        return hoveredIndex === i || expandedIndex === i;
    };

    const isRevealed = (i: number) => hoveredIndex === i || expandedIndex === i;

    return (
        <>
            <main className="py-14">
                <div className="container mx-auto px-6 max-w-6xl">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <div className="mb-8">
                        <h1 className="text-2xl md:text-4xl font-semibold tracking-tight">Projects</h1>
                        <p className="text-sm text-muted-foreground mt-1">{projects.length} things built.</p>
                    </div>

                    {/* Category filter pills */}
                    <div className="flex flex-wrap gap-2 mb-10">
                        <button
                            onClick={() => handleFilterChange(ALL_FILTER)}
                            className={cn(
                                "px-3 py-1 text-[10px] font-mono tracking-widest rounded-full border transition-colors",
                                activeFilter === ALL_FILTER
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border/40 text-muted-foreground/50 hover:border-primary/40 hover:text-muted-foreground"
                            )}
                        >
                            ALL
                        </button>
                        {uniqueCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleFilterChange(cat)}
                                className={cn(
                                    "px-3 py-1 text-[10px] font-mono tracking-widest rounded-full border transition-colors",
                                    activeFilter === cat
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-border/40 text-muted-foreground/50 hover:border-primary/40 hover:text-muted-foreground"
                                )}
                            >
                                {CATEGORY_LABEL[cat] ?? cat.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {/* Column headers — desktop only */}
                    <div className="hidden md:grid items-center gap-4 mb-1 pb-2 border-b border-border/20 text-[9px] font-mono uppercase tracking-widest text-muted-foreground/25"
                        style={{ gridTemplateColumns: "2rem 1fr 5rem 8rem 9rem" }}
                    >
                        <span />
                        <span>Project</span>
                        <span>Status</span>
                        <span>Type</span>
                        <span className="text-right">Links</span>
                    </div>

                    {/* Project list */}
                    <div
                        className="divide-y divide-border/20"
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <AnimatePresence mode="popLayout">
                            {filtered.map((project, i) => {
                                const globalNum = projects.indexOf(project) + 1;
                                return (
                                    <motion.div
                                        key={project.slug}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: isHighlighted(i) ? 1 : 0.14 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                        onMouseEnter={() => setHoveredIndex(i)}
                                        onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                                        className="cursor-default"
                                    >
                                        <div className={cn(
                                            "py-5 pl-3 transition-all duration-200 border-l-2",
                                            isRevealed(i) ? "border-primary" : "border-transparent"
                                        )}>
                                            {/* ── Desktop row (grid columns) ── */}
                                            <div
                                                className="hidden md:grid items-center gap-4"
                                                style={{ gridTemplateColumns: "2rem 1fr 5rem 8rem 9rem" }}
                                            >
                                                {/* Number */}
                                                <span className="text-[10px] font-mono text-muted-foreground/25">
                                                    {String(globalNum).padStart(2, "0")}
                                                </span>

                                                {/* Title with scramble */}
                                                <span className={cn(
                                                    "text-sm font-medium transition-colors duration-150",
                                                    isRevealed(i) ? "text-foreground" : "text-foreground/70"
                                                )}>
                                                    <ScrambleText text={project.title} active={hoveredIndex === i} />
                                                </span>

                                                {/* Status */}
                                                <span className={cn(
                                                    "text-[9px] font-mono tracking-wider",
                                                    STATUS_COLOR[project.status] ?? "text-muted-foreground/40"
                                                )}>
                                                    {STATUS_LABEL[project.status] ?? project.status.toUpperCase()}
                                                </span>

                                                {/* Category */}
                                                <span className="text-[9px] font-mono text-muted-foreground/40 tracking-wider">
                                                    {CATEGORY_LABEL[project.category] ?? project.category.toUpperCase()}
                                                </span>

                                                {/* Links + date */}
                                                <div className="flex items-center justify-end gap-3">
                                                    {project.github && (
                                                        <Link
                                                            href={project.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="text-muted-foreground/35 hover:text-foreground transition-colors"
                                                            aria-label="GitHub"
                                                        >
                                                            <Github className="w-[18px] h-[18px]" />
                                                        </Link>
                                                    )}
                                                    {project.live && (
                                                        <Link
                                                            href={project.live}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground/35 hover:text-primary transition-colors"
                                                        >
                                                            LIVE <ExternalLink className="w-3 h-3" />
                                                        </Link>
                                                    )}
                                                    <span className="text-[10px] font-mono text-muted-foreground/25 w-16 text-right">
                                                        {project.date}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* ── Mobile row ── */}
                                            <div className="md:hidden flex items-center gap-3">
                                                <span className="text-[10px] font-mono text-muted-foreground/25 w-5 shrink-0">
                                                    {String(globalNum).padStart(2, "0")}
                                                </span>
                                                <span className={cn(
                                                    "flex-1 text-sm font-medium",
                                                    isRevealed(i) ? "text-foreground" : "text-foreground/70"
                                                )}>
                                                    {project.title}
                                                </span>
                                                <span className={cn(
                                                    "text-[9px] font-mono tracking-wider shrink-0",
                                                    STATUS_COLOR[project.status] ?? "text-muted-foreground/40"
                                                )}>
                                                    {STATUS_LABEL[project.status]}
                                                </span>
                                                <div className="flex items-center gap-2 ml-auto shrink-0">
                                                    {project.github && (
                                                        <Link href={project.github} target="_blank" rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="text-muted-foreground/35 hover:text-foreground transition-colors">
                                                            <Github className="w-[18px] h-[18px]" />
                                                        </Link>
                                                    )}
                                                    {project.live && (
                                                        <Link href={project.live} target="_blank" rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="text-muted-foreground/35 hover:text-primary transition-colors">
                                                            <ExternalLink className="w-4 h-4" />
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>

                                            {/* ── Tier 2: hover → short description ── */}
                                            <AnimatePresence>
                                                {isRevealed(i) && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                                        className="overflow-hidden"
                                                    >
                                                        <p className="pt-3 pl-9 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                                                            <ScrambleText text={project.description} active={isRevealed(i)} speed={1.5} />
                                                        </p>

                                                        {/* ── Tier 3: click → full description + all tech ── */}
                                                        <AnimatePresence>
                                                            {expandedIndex === i && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: "auto", opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                                                    className="overflow-hidden"
                                                                >
                                                                    <div className="pl-9 pt-3">
                                                                        <div className="h-px bg-border/30 mb-3" />
                                                                        <p className="text-sm text-muted-foreground/65 leading-relaxed max-w-2xl">
                                                                            {project.fullDescription}
                                                                        </p>
                                                                        <div className="flex flex-wrap gap-1.5 mt-3">
                                                                            {project.techStack.map((tech) => (
                                                                                <span key={tech} className="px-2 py-0.5 text-[10px] rounded-full bg-primary/8 text-primary/70">
                                                                                    {tech}
                                                                                </span>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
