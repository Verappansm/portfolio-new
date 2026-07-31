import type { Metadata } from "next";

const description = "The languages, frameworks, and tools Verappan builds with.";

export const metadata: Metadata = {
    title: "Tech Stack | Verappan",
    description,
    alternates: { canonical: "/tech-stack" },
    openGraph: { title: "Tech Stack | Verappan", description, url: "/tech-stack" },
    twitter: { title: "Tech Stack | Verappan", description },
};

export default function TechStackLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
