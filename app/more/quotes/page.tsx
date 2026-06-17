"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { quotes } from "@/lib/more-data";

/* ── Constellation connections ──────────────────────────────────────────── */
type Pos = { x: number; y: number };

/* Deterministic star connections: each node connects to a few non-adjacent others */
function buildConnections(n: number): [number, number][] {
    const seen = new Set<string>();
    const pairs: [number, number][] = [];
    for (const step of [4, 7, 11, 16]) {
        for (let i = 0; i < n; i++) {
            const j = (i + step) % n;
            const a = Math.min(i, j), b = Math.max(i, j);
            const key = `${a}-${b}`;
            if (!seen.has(key)) {
                seen.add(key);
                pairs.push([a, b]);
            }
        }
    }
    return pairs;
}

const CONNECTIONS = buildConnections(quotes.length);

/* ── Marquee ─────────────────────────────────────────────────────────────── */
function QuoteMarquee() {
    const doubled = [...quotes, ...quotes];
    return (
        <div className="overflow-hidden border-y border-border/40 py-3 bg-muted/10 mb-12">
            <div className="animate-marquee-scroll" style={{ display: "flex", width: "max-content", gap: "3rem" }}>
                {doubled.map((q, i) => (
                    <span key={i} className="shrink-0 flex items-center gap-2 text-xs text-muted-foreground/40 italic">
                        <span className="text-primary/30 text-sm leading-none">"</span>
                        {q.text}
                        <span className="text-primary/30 text-sm leading-none">"</span>
                        <span className="not-italic text-muted-foreground/20 ml-1">— {q.author}</span>
                        <span className="mx-6 text-muted-foreground/15 not-italic">✦</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

/* ── Page ───────────────────────────────────────────────────────────────── */
export default function QuotesPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [lines, setLines] = useState<[Pos, Pos][]>([]);
    const [containerH, setContainerH] = useState(0);

    useEffect(() => {
        const measure = () => {
            const container = containerRef.current;
            if (!container) return;
            const cRect = container.getBoundingClientRect();
            setContainerH(cRect.height);

            const positions: Pos[] = cardRefs.current.map(el => {
                if (!el) return { x: 0, y: 0 };
                const r = el.getBoundingClientRect();
                return {
                    x: r.left - cRect.left + r.width / 2,
                    y: r.top - cRect.top + r.height / 2,
                };
            });

            setLines(CONNECTIONS.map(([a, b]) => [positions[a], positions[b]]));
        };

        const frame = requestAnimationFrame(measure);
        window.addEventListener("resize", measure);
        return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", measure); };
    }, []);

    return (
        <main className="min-h-screen py-16">
            <div className="container mx-auto px-6">
                <Link
                    href="/more"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-10 transition-colors text-sm"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to More
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-14">
                    <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-3">Quotes</h1>
                    <p className="text-muted-foreground text-base max-w-lg leading-relaxed">
                        Words I keep coming back to. The ones that changed how I think.
                    </p>
                </motion.div>
            </div>

            <QuoteMarquee />

            {/* Constellation grid */}
            <div className="container mx-auto px-4 max-w-screen-xl">
                <div className="relative" ref={containerRef}>

                    {/* SVG constellation lines — rendered after card positions are measured */}
                    {lines.length > 0 && (
                        <svg
                            className="absolute inset-0 w-full pointer-events-none"
                            style={{ height: containerH, zIndex: 0 }}
                            aria-hidden
                        >
                            {lines.map(([a, b], i) => (
                                <line
                                    key={i}
                                    x1={a.x} y1={a.y}
                                    x2={b.x} y2={b.y}
                                    stroke="currentColor"
                                    strokeWidth="0.75"
                                    strokeOpacity="0.14"
                                    className="text-primary"
                                    strokeLinecap="round"
                                />
                            ))}
                        </svg>
                    )}

                    {/* Cards — masonry columns */}
                    <div className="relative z-10 columns-2 md:columns-3 gap-3">
                        {quotes.map((q, i) => (
                            <motion.div
                                key={i}
                                ref={el => { cardRefs.current[i] = el as HTMLDivElement | null; }}
                                className="break-inside-avoid mb-3"
                                initial={{ opacity: 0, y: 8 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-20px" }}
                                transition={{ duration: 0.4, delay: (i % 12) * 0.03 }}
                            >
                                <div className="relative rounded-xl border border-border/35 bg-card/50 px-4 py-3.5 hover:border-primary/25 hover:bg-card/80 transition-all duration-200 group">
                                    {/* Star dot */}
                                    <div className="absolute -top-[3px] -right-[3px] w-[6px] h-[6px] rounded-full bg-primary/25 group-hover:bg-primary/50 transition-colors" />

                                    {/* Ordinal */}
                                    <span className="text-[9px] font-mono text-muted-foreground/25 block mb-1.5 leading-none">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>

                                    {/* Quote text */}
                                    <p className="text-sm leading-relaxed text-foreground/75 mb-2.5">
                                        {q.text}
                                    </p>

                                    {/* Author */}
                                    <span className="text-[10px] text-muted-foreground/45 italic">
                                        — {q.author}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
