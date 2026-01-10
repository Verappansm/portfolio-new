"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Quote } from "lucide-react";
import { quotes } from "@/lib/data";

export default function QuotesPage() {
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
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Quotes</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Words of wisdom that inspire and guide my journey.
                    </p>
                </motion.div>

                {/* Quotes Grid */}
                <div className="max-w-3xl mx-auto space-y-8">
                    {quotes.map((quote, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-2xl border bg-card hover:shadow-lg transition-shadow"
                        >
                            <Quote className="h-8 w-8 mb-4 text-primary/50" />
                            <p className="text-xl md:text-2xl italic leading-relaxed">
                                "{quote}"
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
