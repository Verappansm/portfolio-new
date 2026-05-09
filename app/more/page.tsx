"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Quote, Feather, ArrowUpRight } from "lucide-react";
import { quotes, blogs, poems } from "@/lib/more-data";

const cards = [
    {
        href: "/more/blog",
        icon: BookOpen,
        label: "Blog",
        tagline: "Technical writing & opinions",
        meta: `${blogs.length} articles`,
        preview: blogs[0]?.title,
        previewSub: blogs[0]?.readingTime,
        accent: "from-sky-500/15 to-cyan-500/5",
        iconBg: "bg-sky-500/10 text-sky-400",
        borderHover: "hover:border-sky-500/30",
        wide: true,
    },
    {
        href: "/more/poems",
        icon: Feather,
        label: "Poems",
        tagline: "Words written between the code",
        meta: `${poems.length} poems`,
        preview: `"${poems[0]?.stanzas[0][0]}"`,
        previewSub: poems[0]?.title,
        accent: "from-rose-500/15 to-orange-500/5",
        iconBg: "bg-rose-500/10 text-rose-400",
        borderHover: "hover:border-rose-500/30",
        wide: false,
    },
    {
        href: "/more/quotes",
        icon: Quote,
        label: "Quotes",
        tagline: "Words I return to again and again",
        meta: `${quotes.length} quotes`,
        preview: `"${quotes[0]?.text}"`,
        previewSub: `— ${quotes[0]?.author}`,
        accent: "from-violet-500/15 to-purple-500/5",
        iconBg: "bg-violet-500/10 text-violet-400",
        borderHover: "hover:border-violet-500/30",
        wide: false,
    },
];

export default function MorePage() {
    return (
        <main className="min-h-screen py-14">
            <div className="container mx-auto px-6 flex flex-col items-center">
                {/* Back link — left-aligned above centered content */}
                <div className="w-full max-w-6xl mb-10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Link>
                </div>

                {/* Single-line subheading — no "More" heading */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-muted-foreground text-base text-center mb-14 whitespace-nowrap"
                >
                    The parts of me that don't fit on a résumé — writing, poetry, and the words I live by.
                </motion.p>

                {/* Bento grid — centered, max-w-6xl */}
                <div className="w-full max-w-6xl space-y-4">
                    {/* Blog — full width featured card */}
                    {(() => {
                        const card = cards[0];
                        const Icon = card.icon;
                        return (
                            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                                <Link href={card.href}>
                                    <div className={`group relative rounded-2xl border bg-gradient-to-br ${card.accent} ${card.borderHover} p-8 md:p-10 transition-all duration-300 hover:shadow-xl overflow-hidden`}>
                                        <span className="absolute right-8 top-1/2 -translate-y-1/2 text-[110px] font-black text-foreground/[0.03] leading-none select-none pointer-events-none hidden md:block">
                                            BLOG
                                        </span>
                                        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className={`p-2 rounded-xl ${card.iconBg}`}><Icon className="w-5 h-5" /></div>
                                                    <span className="text-xs text-muted-foreground/60 font-mono">{card.meta}</span>
                                                </div>
                                                <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">{card.label}</h2>
                                                <p className="text-muted-foreground mb-6">{card.tagline}</p>
                                                <div className="rounded-xl border border-border/40 bg-background/40 backdrop-blur-sm px-5 py-4 max-w-lg">
                                                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50 mb-1">Latest post</p>
                                                    <p className="font-semibold text-sm leading-snug mb-1">{card.preview}</p>
                                                    <p className="text-xs text-muted-foreground/60">{card.previewSub}</p>
                                                </div>
                                            </div>
                                            <div className="shrink-0">
                                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                                    Read articles
                                                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })()}

                    {/* Poems + Quotes — side by side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {cards.slice(1).map((card, i) => {
                            const Icon = card.icon;
                            return (
                                <motion.div key={card.href} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + i * 0.07 }}>
                                    <Link href={card.href}>
                                        <div className={`group relative h-full rounded-2xl border bg-gradient-to-br ${card.accent} ${card.borderHover} p-7 transition-all duration-300 hover:shadow-xl overflow-hidden`}>
                                            <div className="flex items-center justify-between mb-5">
                                                <div className={`p-2 rounded-xl ${card.iconBg}`}><Icon className="w-4 h-4" /></div>
                                                <span className="text-xs text-muted-foreground/50 font-mono">{card.meta}</span>
                                            </div>
                                            <h2 className="text-2xl font-bold mb-1 tracking-tight">{card.label}</h2>
                                            <p className="text-sm text-muted-foreground mb-5">{card.tagline}</p>
                                            <div className="rounded-xl border border-border/40 bg-background/40 backdrop-blur-sm px-4 py-3">
                                                <p className="text-sm italic text-muted-foreground/80 line-clamp-2 leading-relaxed">{card.preview}</p>
                                                {card.previewSub && <p className="text-xs text-muted-foreground/40 mt-1 not-italic">{card.previewSub}</p>}
                                            </div>
                                            <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
                                                Explore <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
}
