import { ImageResponse } from "next/og";
import { OgCard } from "@/lib/og-image";

export const alt = "Verappan — Software Developer, Business Analyst, AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <OgCard
                eyebrow="Portfolio"
                title="Verappan"
                subtitle="Software Developer · Business Analyst · AI Engineer"
            />
        ),
        { ...size }
    );
}
