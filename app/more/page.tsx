"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Quote, Feather, ArrowUpRight } from "lucide-react";
import { quotes, blogs, poems } from "@/lib/more-data";
import { Footer } from "@/components/footer";

const cards = [
    {
        href: "/more/blog",
        icon: BookOpen,
        label: "Blogs",
        tagline: "Technical writing & opinions",
        meta: `${blogs.length} articles`,
        preview: blogs[0]?.title,
        previewSub: blogs[0]?.readingTime,
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
        wide: false,
    },
];

export default function MorePage() {
    return (
        <>
            <main className="py-6">
                <div className="container mx-auto px-6 max-w-6xl">
                    {/* Back link */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-3"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Link>

                    {/* Subheading */}
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-muted-foreground mb-5"
                    >
                        The parts of me that don&apos;t fit on a résumé — writing, poetry, and the words I live by.
                    </motion.p>

                    {/* Bento grid */}
                    <div className="space-y-3">
                        {/* Blog — full width */}
                        {(() => {
                            const card = cards[0];
                            const Icon = card.icon;
                            return (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                                    <Link href={card.href}>
                                        <div className="group relative rounded-2xl border bg-gradient-to-br from-primary/5 to-transparent hover:border-primary/30 p-5 md:p-6 transition-all duration-300 hover:shadow-lg overflow-hidden">
                                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[80px] font-black text-foreground/[0.03] leading-none select-none pointer-events-none hidden md:block">
                                                BLOG
                                            </span>
                                            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-5">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div className="p-2 rounded-xl bg-primary/10 text-primary"><Icon className="w-4 h-4" /></div>
                                                        <span className="text-xs text-muted-foreground/60 font-mono">{card.meta}</span>
                                                    </div>
                                                    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-1">{card.label}</h2>
                                                    <p className="text-sm text-muted-foreground mb-3">{card.tagline}</p>
                                                    <div className="rounded-xl border border-border/40 bg-background/40 backdrop-blur-sm px-4 py-3 max-w-lg">
                                                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50 mb-1">Latest post</p>
                                                        <p className="font-medium text-sm leading-snug mb-0.5">{card.preview}</p>
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

                        {/* Poems + Quotes */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {cards.slice(1).map((card, i) => {
                                const Icon = card.icon;
                                return (
                                    <motion.div key={card.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06 }}>
                                        <Link href={card.href}>
                                            <div className="group relative h-full rounded-2xl border bg-gradient-to-br from-primary/5 to-transparent hover:border-primary/30 p-4 md:p-5 transition-all duration-300 hover:shadow-lg overflow-hidden">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="p-2 rounded-xl bg-primary/10 text-primary"><Icon className="w-4 h-4" /></div>
                                                    <span className="text-xs text-muted-foreground/50 font-mono">{card.meta}</span>
                                                </div>
                                                <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-1">{card.label}</h2>
                                                <p className="text-sm text-muted-foreground mb-3">{card.tagline}</p>
                                                <div className="rounded-xl border border-border/40 bg-background/40 backdrop-blur-sm px-3 py-2.5">
                                                    <p className="text-sm italic text-muted-foreground/80 line-clamp-2 leading-relaxed">{card.preview}</p>
                                                    {card.previewSub && <p className="text-xs text-muted-foreground/40 mt-1 not-italic">{card.previewSub}</p>}
                                                </div>
                                                <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
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
            <Footer />
        </>
    );
}
