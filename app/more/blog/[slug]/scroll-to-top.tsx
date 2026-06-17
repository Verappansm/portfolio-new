"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 300);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className={`fixed bottom-8 right-8 z-50 flex items-center justify-center w-11 h-11 rounded-full border border-border/50 bg-card text-muted-foreground shadow-sm hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all duration-200 ${
                visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"
            }`}
        >
            <ArrowUp className="w-4 h-4" />
        </button>
    );
}
