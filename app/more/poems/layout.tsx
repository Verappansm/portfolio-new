import type { Metadata } from "next";

const description = "Poems written between the code — a personal collection by Verappan.";

export const metadata: Metadata = {
    title: "Poems | Verappan",
    description,
    alternates: { canonical: "/more/poems" },
    openGraph: { title: "Poems | Verappan", description, url: "/more/poems" },
    twitter: { title: "Poems | Verappan", description },
};

export default function PoemsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
