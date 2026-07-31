import type { MetadataRoute } from "next";
import { blogs } from "@/lib/more-data";

const SITE_URL = "https://verappan.in";

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes = [
        { route: "", priority: 1 },
        { route: "/projects", priority: 0.8 },
        { route: "/more", priority: 0.6 },
        { route: "/more/blog", priority: 0.7 },
        { route: "/more/poems", priority: 0.4 },
        { route: "/more/quotes", priority: 0.4 },
        { route: "/certifications", priority: 0.5 },
        { route: "/tech-stack", priority: 0.5 },
    ].map(({ route, priority }) => ({
        url: `${SITE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority,
    }));

    const blogRoutes = blogs.map((blog) => ({
        url: `${SITE_URL}/more/blog/${blog.slug}`,
        lastModified: new Date(blog.date),
        changeFrequency: "yearly" as const,
        priority: 0.6,
    }));

    return [...staticRoutes, ...blogRoutes];
}
