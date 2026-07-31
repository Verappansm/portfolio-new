"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { MapPin, X } from "lucide-react";

const LeafletMap = dynamic(() => import("@/components/leaflet-map"), {
    ssr: false,
    loading: () => (
        <div className="h-full w-full flex items-center justify-center text-sm text-muted-foreground">
            Loading map...
        </div>
    ),
});

export function MapModal() {
    const [open, setOpen] = useState(false);
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="group relative w-8 h-8 rounded-full overflow-hidden border border-border hover:border-foreground/40 hover:scale-110 transition-all shrink-0"
                aria-label="Open map of Verappan's world"
                title="My world — open map"
            >
                <svg viewBox="0 0 32 32" className="w-full h-full" aria-hidden="true">
                    <rect width="32" height="32" fill={isDark ? "#182226" : "#e2edf1"} />
                    <path
                        d="M0 11 H32 M0 21 H32 M11 0 V32 M21 0 V32"
                        stroke={isDark ? "#33454c" : "#bcd3db"}
                        strokeWidth="1"
                    />
                    <path
                        d="M1 27 L13 15 L20 23 L31 5"
                        stroke={isDark ? "#5b7f8c" : "#8fb0bd"}
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                    />
                </svg>
                <MapPin
                    className="absolute inset-0 m-auto w-4 h-4 text-rose-500 drop-shadow-sm group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    strokeWidth={1.5}
                />
                <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/10 dark:ring-white/10 pointer-events-none" />
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={() => setOpen(false)}
                >
                    <div
                        className="relative w-full max-w-2xl rounded-2xl overflow-hidden border border-border bg-background shadow-2xl"
                        style={{ height: "500px" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header pill */}
                        <div className="absolute top-3 left-3 z-[1000] px-3 py-1.5 rounded-full bg-background/90 border border-border text-xs font-medium">
                            📍 Verappan&apos;s World
                        </div>

                        {/* Close */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-3 right-3 z-[1000] flex items-center justify-center w-8 h-8 rounded-full bg-background/90 border border-border text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Close map"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <LeafletMap isDark={resolvedTheme === "dark"} />
                    </div>
                </div>
            )}
        </>
    );
}
