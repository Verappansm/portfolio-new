"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

export function GlobalBackground() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || resolvedTheme !== "dark") {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none opacity-50">
            <CanvasRevealEffect
                animationSpeed={2}
                containerClassName="bg-transparent"
                colors={[
                    [255, 255, 255],
                    [255, 255, 255],
                ]}
                dotSize={1}
                opacities={[0.2, 0.2, 0.3, 0.3, 0.4, 0.4, 0.5, 0.6, 0.8, 1]}
            />
            <div className="absolute inset-0 bg-black/40" />
        </div>
    );
}
