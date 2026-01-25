"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowLeft, Lightbulb, UserSearch, HelpCircle, Sparkles } from "lucide-react";
import { randomFacts } from "@/lib/data";
import { cn } from "@/lib/utils";

// Floating Background Element
const FloatingElement = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.1, 1],
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
        }}
        transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay
        }}
        className={cn("absolute pointer-events-none", className)}
    >
        {children}
    </motion.div>
);

export default function FactsPage() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <main className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/30">
            {/* Liquid Background Blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] left-[-5%] w-[40vw] h-[40vw] bg-purple-500/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[20%] right-[-10%] w-[35vw] h-[35vw] bg-pink-500/10 blur-[100px] rounded-full" />
                <div className="absolute top-[40%] right-[10%] w-[20vw] h-[20vw] bg-blue-500/10 blur-[80px] rounded-full" />
            </div>

            {/* Floating Icons */}
            <FloatingElement className="top-1/4 right-[15%] text-primary/20" delay={1}>
                <HelpCircle size={120} strokeWidth={1} />
            </FloatingElement>
            <FloatingElement className="bottom-1/3 left-[10%] text-purple-500/20" delay={2}>
                <Sparkles size={80} strokeWidth={1} />
            </FloatingElement>
            <FloatingElement className="top-2/3 right-1/4 text-pink-500/20" delay={0.5}>
                <HelpCircle size={60} strokeWidth={1} />
            </FloatingElement>

            <div className="container mx-auto px-4 py-20 relative z-10">
                {/* Back Link */}
                <Link href="/more" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-12 transition-all hover:-translate-x-1 group">
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:scale-110" />
                    <span className="text-sm font-medium uppercase tracking-widest">Back to Discoveries</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left Side: Large Tilted Header & Thinking Figure */}
                    <div className="lg:col-span-5 sticky top-24 pt-10">
                        <motion.div
                            initial={{ opacity: 0, x: -50, rotate: -5 }}
                            animate={{ opacity: 1, x: 0, rotate: -8 }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className="relative"
                        >
                            <h1 className="text-7xl md:text-9xl font-black leading-none tracking-tighter select-none">
                                <span className="block text-foreground dark:text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.1)]">DID</span>
                                <span className="block text-primary drop-shadow-[0_0_20px_rgba(var(--primary),0.5)]">YOU</span>
                                <span className="block text-foreground dark:text-white italic relative">
                                    KNOW?
                                    <motion.span
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute -top-4 -right-8"
                                    >
                                        <Sparkles className="text-yellow-400 w-12 h-12" />
                                    </motion.span>
                                </span>
                            </h1>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-12 flex flex-col items-center lg:items-start"
                        >
                            <div className="relative group">
                                <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                                <div className="relative p-8 rounded-full border-2 border-dashed border-primary/30 bg-card/30 backdrop-blur-md">
                                    <UserSearch className="w-32 h-32 md:w-48 md:h-48 text-muted-foreground/40" strokeWidth={0.5} />
                                </div>
                            </div>
                            <p className="mt-8 text-xl text-muted-foreground max-w-sm text-center lg:text-left font-medium leading-relaxed italic border-l-4 border-primary pl-4">
                                "The universe is full of magical things, patiently waiting for our wits to grow sharper."
                            </p>
                        </motion.div>
                    </div>

                    {/* Right Side: Fact Bubbles */}
                    <div className="lg:col-span-7 space-y-6 pt-10 pb-20">
                        {randomFacts.map((fact, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30, x: i % 2 === 0 ? 20 : -20 }}
                                whileInView={{ opacity: 1, y: 0, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: i * 0.1 }}
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className={cn(
                                    "relative p-8 rounded-[2.5rem] border bg-card/40 backdrop-blur-xl transition-all duration-500 cursor-default overflow-hidden group mb-4",
                                    hoveredIndex === i ? "border-primary/50 shadow-[0_0_40px_rgba(var(--primary),0.15)] -translate-y-2 scale-[1.02]" : "border-border/50",
                                    i % 2 === 1 ? "lg:ml-12" : "lg:mr-12"
                                )}
                            >
                                {/* Bubble Glow Effect */}
                                <div className={cn(
                                    "absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                                    i % 2 === 1 ? "from-purple-500/5" : "from-pink-500/5"
                                )} />

                                <div className="flex gap-6 items-start relative z-10">
                                    <div className={cn(
                                        "w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110",
                                        i % 3 === 0 ? "bg-purple-500 shadow-purple-500/20" :
                                            i % 3 === 1 ? "bg-pink-500 shadow-pink-500/20" :
                                                "bg-blue-500 shadow-blue-500/20"
                                    )}>
                                        {i % 2 === 0 ? <Lightbulb className="w-8 h-8" /> : <HelpCircle className="w-8 h-8" />}
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">Fact #{i + 1}</span>
                                            <div className="h-px w-8 bg-primary/20" />
                                        </div>
                                        <p className="text-xl md:text-2xl font-semibold leading-snug tracking-tight group-hover:text-foreground transition-colors">
                                            {fact}
                                        </p>
                                    </div>
                                </div>

                                {/* Interactive corner element */}
                                <div className="absolute bottom-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Sparkles className="w-5 h-5 text-primary/40" />
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Custom Interactive Scroll Progress */}
            <motion.div
                className="fixed bottom-0 left-0 right-0 h-2 bg-primary/30 z-50 origin-[0%]"
                style={{ scaleX: useScroll().scrollYProgress }}
            />
        </main>
    );
}
