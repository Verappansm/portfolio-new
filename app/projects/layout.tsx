import type { Metadata } from "next";

const description =
    "A collection of software, AI, and full-stack projects built by Verappan — from fraud detection systems to developer tools and campus platforms.";

export const metadata: Metadata = {
    title: "Projects | Verappan",
    description,
    alternates: { canonical: "/projects" },
    openGraph: { title: "Projects | Verappan", description, url: "/projects" },
    twitter: { title: "Projects | Verappan", description },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
