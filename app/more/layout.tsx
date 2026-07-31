import type { Metadata } from "next";

const description = "The parts of Verappan that don't fit on a résumé — writing, poetry, and the words he lives by.";

export const metadata: Metadata = {
    title: "More | Verappan",
    description,
    alternates: { canonical: "/more" },
    openGraph: { title: "More | Verappan", description, url: "/more" },
    twitter: { title: "More | Verappan", description },
};

export default function MoreLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
