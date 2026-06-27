import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import { blogs } from "@/lib/more-data";
import { Footer } from "@/components/footer";
import ScrollToTop from "./scroll-to-top";

export function generateStaticParams() {
    return blogs.map((b) => ({ slug: b.slug }));
}

function renderInline(text: string) {
    const parts = text.split(/(\*\*[^*]+\*\*|_[^_]+_)/g);
    return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={i} className="font-semibold text-foreground/90">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("_") && part.endsWith("_")) {
            return <em key={i} className="italic">{part.slice(1, -1)}</em>;
        }
        return <span key={i}>{part}</span>;
    });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const idx = blogs.findIndex((b) => b.slug === slug);
    if (idx === -1) notFound();

    const blog = blogs[idx];
    const prev = idx > 0 ? blogs[idx - 1] : null;
    const next = idx < blogs.length - 1 ? blogs[idx + 1] : null;

    return (
        <>
            <main className="py-14">
                <ScrollToTop />
                <div className="container mx-auto px-6 max-w-3xl">

                    {/* Back link */}
                    <Link
                        href="/more/blog"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors text-sm"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        All articles
                    </Link>

                    {/* Article header */}
                    <header className="mb-10">
                        <div className="flex flex-wrap items-center gap-4 mb-6 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                {blog.readingTime}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                {blog.date}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-snug mb-5">
                            {blog.title}
                        </h1>

                        <p className="text-lg text-muted-foreground leading-relaxed border-l-4 border-primary/30 pl-4">
                            {blog.excerpt}
                        </p>

                        {"link" in blog && blog.link && (
                            <a
                                href={blog.link as string}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 mt-5 text-xs text-muted-foreground/60 hover:text-primary transition-colors"
                            >
                                Originally published on Medium ↗
                            </a>
                        )}

                        <div className="h-px bg-border mt-8" />
                    </header>

                    {/* Article body */}
                    <article className="space-y-4">
                        {blog.content.map((block, i) => {
                            if (block.type === "heading") {
                                return (
                                    <h2 key={i} className="text-xl md:text-2xl font-bold tracking-tight mt-10 mb-1 first:mt-0">
                                        {renderInline(block.text)}
                                    </h2>
                                );
                            }
                            if (block.type === "subheading") {
                                return (
                                    <h3 key={i} className="text-base md:text-lg font-semibold tracking-tight mt-7 mb-1">
                                        {renderInline(block.text)}
                                    </h3>
                                );
                            }
                            if (block.type === "listItem") {
                                return (
                                    <div key={i} className="flex gap-3 pl-2">
                                        <span className="text-muted-foreground/40 shrink-0 mt-1.5 text-xs select-none">—</span>
                                        <p className="text-base text-foreground/75 leading-loose">{renderInline(block.text)}</p>
                                    </div>
                                );
                            }
                            return (
                                <p key={i} className="text-base text-foreground/75 leading-loose">
                                    {renderInline(block.text)}
                                </p>
                            );
                        })}
                    </article>

                    {/* Prev / Next navigation */}
                    <div className="mt-16 pt-8 border-t grid grid-cols-2 gap-4">
                        {prev ? (
                            <Link href={`/more/blog/${prev.slug}`} className="group flex flex-col gap-1 p-4 rounded-xl border hover:border-primary/30 transition-all">
                                <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50 flex items-center gap-1">
                                    <ArrowLeft className="w-3 h-3" /> Previous
                                </span>
                                <span className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                                    {prev.title}
                                </span>
                            </Link>
                        ) : <div />}

                        {next ? (
                            <Link href={`/more/blog/${next.slug}`} className="group flex flex-col gap-1 p-4 rounded-xl border hover:border-primary/30 transition-all text-right ml-auto w-full">
                                <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50 flex items-center justify-end gap-1">
                                    Next <ArrowRight className="w-3 h-3" />
                                </span>
                                <span className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                                    {next.title}
                                </span>
                            </Link>
                        ) : <div />}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
