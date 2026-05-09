"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import { blogs } from "@/lib/more-data";

export default function BlogPage() {
    const [featured, ...rest] = blogs;

    return (
        <main className="min-h-screen py-20">
            <div className="container mx-auto px-6 max-w-5xl">
                <Link
                    href="/more"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-10 transition-colors text-sm"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to More
                </Link>

                {/* Masthead */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-14"
                >
                    <div className="flex items-baseline gap-4 mb-2">
                        <h1 className="text-4xl md:text-7xl font-bold tracking-tight">Blog</h1>
                        <span className="text-muted-foreground/40 text-xs font-mono border border-border/40 px-2 py-0.5 rounded">
                            {blogs.length} articles
                        </span>
                    </div>
                    <div className="h-px bg-border mt-4" />
                </motion.div>

                {/* Featured article */}
                <motion.article
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-12 group"
                >
                    <Link href={`/more/blog/${featured.slug}`}>
                        <div className="relative rounded-2xl border bg-gradient-to-br from-primary/5 via-card to-card p-8 md:p-12 hover:border-primary/30 hover:shadow-xl transition-all duration-300 overflow-hidden">
                            <span
                                className="absolute -right-4 -top-6 text-[120px] font-black text-primary/5 leading-none select-none pointer-events-none"
                                aria-hidden
                            >
                                01
                            </span>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-5">
                                    <span className="text-xs font-semibold uppercase tracking-widest text-primary border border-primary/30 rounded-full px-3 py-1">
                                        Featured
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Clock className="w-3 h-3" />
                                        {featured.readingTime}
                                    </span>
                                    <time className="text-xs text-muted-foreground ml-auto">{featured.date}</time>
                                </div>
                                <h2 className="text-2xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors leading-snug">
                                    {featured.title}
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed mb-6 max-w-2xl">
                                    {featured.excerpt}
                                </p>
                                <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                                    Read Article
                                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </span>
                            </div>
                        </div>
                    </Link>
                </motion.article>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-xs uppercase tracking-widest text-muted-foreground/50">More Articles</span>
                    <div className="h-px flex-1 bg-border" />
                </div>

                {/* Article grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {rest.map((blog, i) => (
                        <motion.article
                            key={blog.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.08 }}
                            className="group"
                        >
                            <Link href={`/more/blog/${blog.slug}`}>
                                <div className="relative h-full rounded-2xl border bg-card p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 overflow-hidden">
                                    <span
                                        className="absolute right-3 top-2 text-5xl font-black text-muted-foreground/5 leading-none select-none pointer-events-none"
                                        aria-hidden
                                    >
                                        0{i + 2}
                                    </span>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Clock className="w-3 h-3" />
                                            {blog.readingTime}
                                        </span>
                                        <time className="text-xs text-muted-foreground ml-auto">{blog.date}</time>
                                    </div>
                                    <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors leading-snug">
                                        {blog.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                                        {blog.excerpt}
                                    </p>
                                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                                        Read more
                                        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </span>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </div>
        </main>
    );
}
