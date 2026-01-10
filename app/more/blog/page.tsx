"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { blogs } from "@/lib/data";

export default function BlogPage() {
    return (
        <main className="min-h-screen py-20">
            <div className="container mx-auto px-4">
                {/* Back Link */}
                <Link href="/more" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to More
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Blog</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Thoughts, tutorials, and insights on technology and finance.
                    </p>
                </motion.div>

                {/* Blog Grid - Newspaper Style */}
                <div className="max-w-4xl mx-auto">
                    {/* Featured Article */}
                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-12 p-8 rounded-2xl border bg-card hover:shadow-lg transition-shadow group"
                    >
                        <time className="text-sm text-muted-foreground">{blogs[0].date}</time>
                        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 group-hover:text-primary transition-colors">
                            {blogs[0].title}
                        </h2>
                        <p className="text-lg text-muted-foreground mb-4">{blogs[0].excerpt}</p>
                        <Link href={blogs[0].link} className="inline-flex items-center text-primary hover:underline">
                            Read Article <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                    </motion.article>

                    {/* Other Articles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {blogs.slice(1).map((blog, i) => (
                            <motion.article
                                key={blog.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow group"
                            >
                                <time className="text-xs text-muted-foreground">{blog.date}</time>
                                <h3 className="text-xl font-bold mt-2 mb-3 group-hover:text-primary transition-colors">
                                    {blog.title}
                                </h3>
                                <p className="text-muted-foreground text-sm mb-4">{blog.excerpt}</p>
                                <Link href={blog.link} className="inline-flex items-center text-sm text-primary hover:underline">
                                    Read more <ChevronRight className="h-4 w-4 ml-1" />
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
