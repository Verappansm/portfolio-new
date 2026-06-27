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

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Open map"
            >
                <MapPin className="w-3.5 h-3.5" />
                My World
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
