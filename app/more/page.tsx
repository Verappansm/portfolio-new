"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Quote, Lightbulb, BookOpen, ChevronRight, Users } from "lucide-react";
import { quotes, randomFacts, blogs } from "@/lib/data";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

export default function MorePage() {
    return (
        <main className="min-h-screen py-20 relative">
            <div className="container mx-auto px-4 relative z-10">
                {/* Back Link */}
                <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">More</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Explore quotes, random facts, positions of responsibility, and blog articles.
                    </p>
                </motion.div>

                {/* Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
                    <Link href="/more/quotes">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="p-8 rounded-2xl border bg-card/50 backdrop-blur-md hover:shadow-xl transition-all group cursor-pointer h-full"
                        >
                            <Quote className="h-10 w-10 mb-4 text-primary" />
                            <h2 className="text-2xl font-bold mb-2">Quotes</h2>
                            <p className="text-muted-foreground mb-4">Inspirational quotes that guide my work and life.</p>
                            <span className="inline-flex items-center text-sm text-primary group-hover:translate-x-1 transition-transform">
                                Explore <ChevronRight className="h-4 w-4 ml-1" />
                            </span>
                        </motion.div>
                    </Link>

                    <Link href="/more/facts">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="p-8 rounded-2xl border bg-card/50 backdrop-blur-md hover:shadow-xl transition-all group cursor-pointer h-full"
                        >
                            <Lightbulb className="h-10 w-10 mb-4 text-primary" />
                            <h2 className="text-2xl font-bold mb-2">Random Facts</h2>
                            <p className="text-muted-foreground mb-4">Did you know? Fun facts about me and my interests.</p>
                            <span className="inline-flex items-center text-sm text-primary group-hover:translate-x-1 transition-transform">
                                Discover <ChevronRight className="h-4 w-4 ml-1" />
                            </span>
                        </motion.div>
                    </Link>


                    <Link href="/more/blog">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="p-8 rounded-2xl border bg-card/50 backdrop-blur-md hover:shadow-xl transition-all group cursor-pointer h-full"
                        >
                            <BookOpen className="h-10 w-10 mb-4 text-primary" />
                            <h2 className="text-2xl font-bold mb-2">Blog</h2>
                            <p className="text-muted-foreground mb-4">Articles on tech, finance, and personal growth.</p>
                            <span className="inline-flex items-center text-sm text-primary group-hover:translate-x-1 transition-transform">
                                Read <ChevronRight className="h-4 w-4 ml-1" />
                            </span>
                        </motion.div>
                    </Link>
                </div>

                {/* Quick Preview */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-8 text-center text-white">Quick Preview</h2>

                    {/* Random Quote */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="p-8 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-white/10 backdrop-blur-sm mb-8"
                    >
                        <Quote className="h-8 w-8 mb-4 text-purple-500" />
                        <p className="text-xl italic mb-4 text-white">"{quotes[Math.floor(Math.random() * quotes.length)]}"</p>
                    </motion.div>

                    {/* Random Fact */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="p-8 rounded-2xl bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-white/10 backdrop-blur-sm mb-8"
                    >
                        <Lightbulb className="h-8 w-8 mb-4 text-orange-500" />
                        <p className="text-lg text-white">💡 {randomFacts[Math.floor(Math.random() * randomFacts.length)]}</p>
                    </motion.div>

                    {/* Latest Blog */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-white/10 backdrop-blur-sm"
                    >
                        <BookOpen className="h-8 w-8 mb-4 text-blue-500" />
                        <p className="text-sm text-muted-foreground mb-2">Latest Article</p>
                        <h3 className="text-xl font-bold mb-2 text-white">{blogs[0].title}</h3>
                        <p className="text-muted-foreground">{blogs[0].excerpt}</p>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
