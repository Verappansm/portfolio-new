import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import { blogs } from "@/lib/more-data";

export function generateStaticParams() {
    return blogs.map((b) => ({ slug: b.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const idx = blogs.findIndex((b) => b.slug === slug);
    if (idx === -1) notFound();

    const blog = blogs[idx];
    const prev = idx > 0 ? blogs[idx - 1] : null;
    const next = idx < blogs.length - 1 ? blogs[idx + 1] : null;

    return (
        <main className="min-h-screen py-20">
            <div className="container mx-auto px-6 max-w-3xl">

                {/* Back link */}
                <Link
                    href="/more/blog"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-12 transition-colors text-sm"
                >
                    <ArrowLeft className="h-4 w-4" />
                    All articles
                </Link>

                {/* Article header */}
                <header className="mb-12">
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

                    <div className="h-px bg-border mt-8" />
                </header>

                {/* Article body */}
                <article className="space-y-5">
                    {blog.content.map((block, i) => {
                        if (block.type === "heading") {
                            return (
                                <h2 key={i} className="text-xl md:text-2xl font-bold tracking-tight mt-10 mb-2 first:mt-0">
                                    {block.text}
                                </h2>
                            );
                        }
                        return (
                            <p key={i} className="text-base text-foreground/75 leading-loose">
                                {block.text}
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
    );
}
