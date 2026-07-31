import type { Metadata } from "next";

const description = "Quotes Verappan returns to again and again.";

export const metadata: Metadata = {
    title: "Quotes | Verappan",
    description,
    alternates: { canonical: "/more/quotes" },
    openGraph: { title: "Quotes | Verappan", description, url: "/more/quotes" },
    twitter: { title: "Quotes | Verappan", description },
};

export default function QuotesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
