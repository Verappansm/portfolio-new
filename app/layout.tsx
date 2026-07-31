import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { GlobalBackground } from "@/components/global-background";
import { Analytics } from "@vercel/analytics/next";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const SITE_URL = "https://verappan.in";
const SITE_DESCRIPTION =
  "Verappan is a full-stack engineer and business analyst who has shipped enterprise code at Fidelity, built AI-powered systems, and delivered products end-to-end. Explore projects, work experience, writing, and more.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Verappan | Portfolio",
  description: SITE_DESCRIPTION,
  keywords: [
    "Verappan",
    "Verappan SM",
    "Software Developer",
    "Business Analyst",
    "AI Engineer",
    "Full Stack Developer",
    "VIT Chennai",
    "Fidelity Investments",
    "Portfolio",
  ],
  authors: [{ name: "Verappan", url: SITE_URL }],
  creator: "Verappan",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Verappan",
    title: "Verappan | Portfolio",
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verappan | Portfolio",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Verappan",
  url: SITE_URL,
  jobTitle: ["Software Developer", "Business Analyst", "AI Engineer"],
  description: SITE_DESCRIPTION,
  sameAs: [
    "https://www.linkedin.com/in/verappansm/",
    "https://github.com/Verappansm",
    "https://www.instagram.com/_._verappan_._/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalBackground />
          <Navbar />
          <div className="pt-16">
            {children}
          </div>
        </ThemeProvider>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
