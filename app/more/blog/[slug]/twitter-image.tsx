import { ImageResponse } from "next/og";
import { OgCard } from "@/lib/og-image";
import { blogs } from "@/lib/more-data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blog = blogs.find((b) => b.slug === slug);
    return [
        {
            id: "twitter",
            size,
            contentType,
            alt: blog ? blog.title : "Verappan — Blog",
        },
    ];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blog = blogs.find((b) => b.slug === slug);

    return new ImageResponse(
        (
            <OgCard
                eyebrow="Blog"
                title={blog?.title ?? "Verappan"}
                subtitle={blog ? `${blog.readingTime} · ${blog.date}` : undefined}
                footer="verappan.in/more/blog"
            />
        ),
        { ...size }
    );
}
