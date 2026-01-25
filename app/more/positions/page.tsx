"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";
import { positionsOfResponsibility } from "@/lib/data";

export default function PositionsPage() {
    const timelineData = positionsOfResponsibility.map((exp: any) => ({
        title: exp.title,
        content: (
            <div className="flex flex-col">
                {exp.roles ? (
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-foreground">{exp.organization}</h3>
                        <div className="relative pl-6 border-l-2 border-muted ml-1 space-y-8">
                            {exp.roles.map((role: any, idx: number) => (
                                <div key={idx} className="relative">
                                    {/* Role Dot */}
                                    <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-muted border-2 border-background" />
                                    <h4 className="text-lg font-bold text-foreground">{role.role}</h4>
                                    <p className="text-sm text-muted-foreground mb-2">{role.duration}</p>
                                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                        {role.bullets.map((bullet: string, i: number) => (
                                            <li key={i}>{bullet}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                        <p className="text-muted-foreground mb-2">{exp.organization} • {exp.duration}</p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            {exp.bullets.map((bullet: string, i: number) => (
                                <li key={i}>{bullet}</li>
                            ))}
                        </ul>
                    </div>
                )}
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
