import type { Metadata } from "next";

const description = "Technical writing and opinions on startups, markets, and building software, by Verappan.";

export const metadata: Metadata = {
    title: "Blog | Verappan",
    description,
    alternates: { canonical: "/more/blog" },
    openGraph: { title: "Blog | Verappan", description, url: "/more/blog" },
    twitter: { title: "Blog | Verappan", description },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
