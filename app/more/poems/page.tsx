"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useAnimationControls } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { poems } from "@/lib/more-data";
import { cn } from "@/lib/utils";

export default function PoemsPage() {
    const [poemIndex, setPoemIndex] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);
    const rightControls = useAnimationControls();

    const poem = poems[poemIndex];

    /*
     * Book page flip: only the RIGHT page turns.
     * transformOrigin is "left center" (the spine).
     * Forward (d > 0): right edge swings left toward spine (rotateY: -90),
     *   content swaps invisible, new page comes from behind (rotateY: 90 → 0).
     * Backward (d < 0): right edge swings right (rotateY: 90),
     *   content swaps invisible, new page comes from opposite side (-90 → 0).
     */
    async function flip(targetIndex: number, d: number) {
        setIsFlipping(true);
        const foldAngle = d > 0 ? -90 : 90;

        await rightControls.start({
            rotateY: foldAngle,
            transition: { duration: 0.27, ease: [0.4, 0, 1, 1] },
        });

        setPoemIndex(targetIndex);
        rightControls.set({ rotateY: -foldAngle });

        await rightControls.start({
            rotateY: 0,
            transition: { duration: 0.27, ease: [0, 0, 0.6, 1] },
        });

        setIsFlipping(false);
    }

    function navigate(d: number) {
        const next = poemIndex + d;
        if (next < 0 || next >= poems.length || isFlipping) return;
        flip(next, d);
    }

    function jumpTo(i: number) {
        if (i === poemIndex || isFlipping) return;
        flip(i, i > poemIndex ? 1 : -1);
    }

    return (
        <main className="min-h-screen py-14 relative">
            {/* Warm ambient glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/3 left-1/4 w-[45vw] h-[45vw] bg-rose-500/4 blur-[140px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] bg-amber-500/4 blur-[110px] rounded-full" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <Link href="/more" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors text-sm">
                    <ArrowLeft className="h-4 w-4" />
                    Back to More
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-2">Poems</h1>
                    <p className="text-muted-foreground/60 text-sm tracking-wide">Written between the code.</p>
                </motion.div>

                <div className="max-w-6xl mx-auto">
                    <div className="relative">
                        {/* Drop shadow beneath spread */}
                        <div className="absolute -bottom-4 inset-x-6 h-10 bg-black/20 dark:bg-black/50 blur-2xl rounded-full pointer-events-none" />

                        {/*
                         * The book spread is a plain grid — NOT a motion element.
                         * Only the right page (motion.div below) rotates.
                         * No overflow-hidden here, which would flatten child 3D.
                         */}
                        <div
                            className="grid grid-cols-1 md:grid-cols-2 shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
                            style={{ perspective: "1500px" }}
                        >
                            {/* ── LEFT PAGE — title, fades on poem change ── */}
                            <motion.div
                                key={`left-${poemIndex}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="relative min-h-[500px] bg-[#faf8f5] dark:bg-[#1c1a17] border border-black/8 dark:border-white/5 md:border-r-0 rounded-tl-sm rounded-bl-sm max-md:rounded-bl-none max-md:rounded-tr-sm overflow-hidden"
                            >
                                <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
                                    <span
                                        className="absolute -bottom-4 -left-2 text-[90px] md:text-[120px] font-black text-black/5 dark:text-white/5 leading-none select-none pointer-events-none uppercase"
                                        aria-hidden
                                    >
                                        {poem.title.split(" ")[0]}
                                    </span>

                                    <div className="relative z-10">
                                        <p className="text-[10px] uppercase tracking-[0.4em] text-black/30 dark:text-white/30 mb-8">
                                            / {String(poemIndex + 1).padStart(2, "0")}
                                        </p>
                                        <h2 className="text-2xl md:text-3xl font-bold leading-tight text-black/80 dark:text-white/85 tracking-tight mb-2">
                                            {poem.title}
                                        </h2>
                                        <p className="text-xs text-black/30 dark:text-white/30 font-mono">{poem.year}</p>
                                    </div>

                                    <div className="relative z-10 flex items-center gap-3">
                                        <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
                                        <span className="text-black/20 dark:text-white/20 text-sm">✦</span>
                                        <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
                                    </div>

                                    <p className="relative z-10 text-xs text-black/20 dark:text-white/20 font-serif italic self-end">
                                        {poemIndex * 2 + 1}
                                    </p>
                                </div>
                            </motion.div>

                            {/* ── RIGHT PAGE — the page that flips like a book ── */}
                            {/*
                             * transformOrigin: "left center" = spine edge.
                             * rotateY folds this page toward/away from the spine.
                             * overflow-hidden is on this element (child of perspective),
                             * not on an ancestor — so it does NOT flatten the 3D.
                             */}
                            <motion.div
                                animate={rightControls}
                                initial={{ rotateY: 0 }}
                                style={{
                                    transformOrigin: "left center",
                                    transformPerspective: 1500,
                                    willChange: "transform",
                                }}
                                className="relative min-h-[500px] bg-[#faf8f5] dark:bg-[#1c1a17] border border-black/8 dark:border-white/5 rounded-tr-sm rounded-br-sm max-md:rounded-tr-none max-md:rounded-bl-sm overflow-hidden"
                            >
                                <div className="absolute inset-0 flex flex-col p-8 md:p-12">
                                    {/* Fixed-height scroll window */}
                                    <div className="relative" style={{ height: "360px", flexShrink: 0 }}>
                                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#faf8f5] dark:from-[#1c1a17] to-transparent pointer-events-none z-10" />
                                        <div className="hide-scrollbar overflow-y-auto h-full space-y-7 pb-12">
                                            {poem.stanzas.map((stanza, si) => (
                                                <div key={si} className="space-y-1.5">
                                                    {stanza.map((line, li) => (
                                                        <p key={li} className="text-sm md:text-base leading-loose tracking-wide text-black/75 dark:text-white/80">
                                                            {line}
                                                        </p>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <p className="text-xs text-black/20 dark:text-white/20 font-serif italic self-end mt-auto pt-3">
                                        {poemIndex * 2 + 2}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-8 px-1">
                        <button
                            onClick={() => navigate(-1)}
                            disabled={poemIndex === 0 || isFlipping}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-20 disabled:pointer-events-none transition-colors group"
                        >
                            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                            Previous poem
                        </button>

                        <div className="flex items-center gap-2">
                            {poems.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => jumpTo(i)}
                                    aria-label={`Poem ${i + 1}`}
                                    className={cn(
                                        "h-1.5 rounded-full transition-all duration-300",
                                        i === poemIndex
                                            ? "w-6 bg-rose-400"
                                            : "w-1.5 bg-muted-foreground/25 hover:bg-muted-foreground/50"
                                    )}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => navigate(1)}
                            disabled={poemIndex === poems.length - 1 || isFlipping}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-20 disabled:pointer-events-none transition-colors group"
                        >
                            Next poem
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>

                    {/* Poem index */}
                    <div className="mt-8 border-t border-border/40 pt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {poems.map((p, i) => (
                            <button
                                key={i}
                                onClick={() => jumpTo(i)}
                                className={cn(
                                    "text-left px-4 py-3 rounded-xl border transition-all text-sm",
                                    i === poemIndex
                                        ? "border-rose-400/40 bg-rose-500/5 text-foreground"
                                        : "border-border/40 text-muted-foreground hover:border-border hover:text-foreground"
                                )}
                            >
                                <span className="font-mono text-[10px] text-muted-foreground/50 block mb-0.5">{String(i + 1).padStart(2, "0")}</span>
                                <span className="font-medium">{p.title}</span>
                                <span className="text-muted-foreground/40 text-xs block">{p.year}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
