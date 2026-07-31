export function OgCard({
    eyebrow,
    title,
    subtitle,
    footer = "verappan.in",
}: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    footer?: string;
}) {
    return (
        <div
            style={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "72px",
                backgroundColor: "#0b0b14",
                backgroundImage:
                    "radial-gradient(circle at 20% 20%, rgba(139,92,246,0.35), transparent 45%), radial-gradient(circle at 80% 85%, rgba(244,63,94,0.18), transparent 45%)",
                color: "#ffffff",
                fontFamily: "sans-serif",
            }}
        >
            <div style={{ display: "flex", flexDirection: "column" }}>
                {eyebrow && (
                    <div
                        style={{
                            display: "flex",
                            fontSize: 28,
                            letterSpacing: 6,
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.5)",
                            marginBottom: 20,
                        }}
                    >
                        {eyebrow}
                    </div>
                )}
                <div style={{ display: "flex", fontSize: 72, fontWeight: 700, lineHeight: 1.15, maxWidth: 1000 }}>
                    {title}
                </div>
                {subtitle && (
                    <div style={{ display: "flex", fontSize: 32, marginTop: 24, color: "rgba(255,255,255,0.65)" }}>
                        {subtitle}
                    </div>
                )}
            </div>
            <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.4)", letterSpacing: 2 }}>
                {footer}
            </div>
        </div>
    );
}
