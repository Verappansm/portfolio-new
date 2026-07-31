import type { Metadata } from "next";

const description = "Professional certifications earned by Verappan across software development, cloud, and data.";

export const metadata: Metadata = {
    title: "Certifications | Verappan",
    description,
    alternates: { canonical: "/certifications" },
    openGraph: { title: "Certifications | Verappan", description, url: "/certifications" },
    twitter: { title: "Certifications | Verappan", description },
};

export default function CertificationsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
