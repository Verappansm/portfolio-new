"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";
import { positionsOfResponsibility } from "@/lib/data";

export default function PositionsPage() {
    const timelineData = positionsOfResponsibility.map((pos) => ({
        title: pos.title,
        content: (
            <div>
                <h3 className="text-xl font-bold text-foreground">{pos.role}</h3>
                <p className="text-muted-foreground mb-2">{pos.organization} • {pos.duration}</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {pos.bullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                    ))}
                </ul>
            </div>
        ),
    }));

    return (
        <main className="min-h-screen py-20">
            <div className="container mx-auto px-4">
                {/* Back Link */}
                <Link href="/more" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to More
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Positions of Responsibility</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Leadership roles and responsibilities I've held.
                    </p>
                </motion.div>

                {/* Timeline */}
                <Timeline data={timelineData} />
            </div>
        </main>
    );
}
