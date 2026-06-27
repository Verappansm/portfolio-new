"use client";

import { ArrowUp } from "lucide-react";

export function ScrollToTopButton() {
    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Scroll to top"
        >
            <ArrowUp className="w-3.5 h-3.5" />
            Top
        </button>
    );
}
