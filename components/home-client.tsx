"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  ExternalLink,
  Code,
  Briefcase,
  User,
  ArrowRight,
  Keyboard,
  Newspaper,
  FileText,
  ShieldCheck,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { DotBackground } from "@/components/ui/dot-background";
import { Timeline } from "@/components/ui/timeline";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import type { LiveStats } from "@/lib/stats-server";

import {
  profileData,
  workExperience,
  positionsOfResponsibility,
  projects,
  backgroundRoles,
  research,
} from "@/lib/data";

// Hero Section with Animated Roles
function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = profileData.roles;

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section id="home" className="min-h-screen relative">
      <DotBackground className="min-h-screen">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left: Text Content */}
            <div className="flex-1 lg:flex-[3] text-center lg:text-left">

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="text-xs font-mono tracking-[0.3em] uppercase text-muted-foreground/50 mb-4"
              >
                — hey, I'm
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground"
              >
                {profileData.name}
              </motion.h1>

              {/* Animated Role */}
              <div className="h-12 md:h-16 mb-8 overflow-hidden">
                <motion.div
                  key={roleIndex}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="text-2xl md:text-4xl font-semibold text-muted-foreground"
                >
                  {roles[roleIndex]}
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-4"
              >
                {profileData.bio}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="text-sm text-muted-foreground/50 italic max-w-2xl mx-auto lg:mx-0 mb-8"
              >
                Friendly neighbourhood engineer who does Whatever it takes.
              </motion.p>

            </div>

            {/* Right: Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 lg:flex-[2] flex flex-col items-center lg:items-end"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 group">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl opacity-50 animate-pulse" />
                <Image
                  src={profileData.avatarSrc}
                  alt={profileData.name}
                  fill
                  className="rounded-full object-cover border-4 border-background shadow-2xl relative z-10"
                  priority
                />
                <div className="absolute top-1/2 -translate-y-1/2 right-full mr-4 z-20 pointer-events-none opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-200">
                  <span className="whitespace-nowrap text-xs font-mono text-muted-foreground/70 italic bg-card/90 backdrop-blur-sm border border-border/40 px-3 py-1.5 rounded-full shadow-sm">
                    One of the better variants.
                  </span>
                </div>
              </div>
              <p className="mt-6 text-sm text-muted-foreground italic text-center max-w-sm">
                {profileData.motto}
              </p>
            </motion.div>
          </div>
        </div>
      </DotBackground>
    </section>
  );
}

// Experience Section
function ExperienceSection() {
  const [activeTab, setActiveTab] = useState<"work" | "positions">("work");

  const timelineData = useMemo(() => {
    const data = activeTab === "work" ? workExperience : positionsOfResponsibility;
    return data.map((exp: any) => ({
      title: exp.title,
      content: (
        <motion.div
          key={`${activeTab}-${exp.organization}-${exp.role || "multi"}`}
          initial={{ opacity: 0, x: activeTab === "work" ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
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
        </motion.div>
      ),
    }));
  }, [activeTab]);

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto flex flex-col items-center md:items-start mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-semibold tracking-tight text-center md:text-left mb-12"
          >
            Experience
          </motion.h2>

          {/* Toggle Switch */}
          <div className="relative flex bg-muted/50 p-1 rounded-full border border-border">
            <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
            <button
              onClick={() => setActiveTab("work")}
              className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "work"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Work Experience
            </button>
            <button
              onClick={() => setActiveTab("positions")}
              className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "positions"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Positions of Responsibility
            </button>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <Timeline data={timelineData} />
        </div>
      </div>
    </section>
  );
}


// Projects Section
function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-semibold tracking-tight text-center md:text-left mb-12"
          >
            Projects
          </motion.h2>
        </div>
        <BentoGrid className="max-w-6xl mx-auto">
          {projects.map((project, i) => (
            <BentoGridItem
              key={i}
              title={project.title}
              description={project.description}
              className={i === 0 || i === 3 ? "md:col-span-2" : ""}
              header={
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                      {tech}
                    </span>
                  ))}
                </div>
              }
              icon={
                <div className="flex gap-2 mt-4">
                  {project.github && (
                    <Link href={project.github} target="_blank">
                      <Button variant="outline" size="sm">
                        <Github className="w-4 h-4 mr-1" /> GitHub
                      </Button>
                    </Link>
                  )}
                  {project.live && (
                    <Link href={project.live} target="_blank">
                      <Button size="sm">
                        <ExternalLink className="w-4 h-4 mr-1" /> Live
                      </Button>
                    </Link>
                  )}
                </div>
              }
            />
          ))}
        </BentoGrid>

        {/* More Projects Link - Aligned with the Bento Grid */}
        <div className="max-w-6xl mx-auto mt-8 flex justify-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/projects">
              <Button variant="outline" size="lg" className="gap-2">
                View All Projects <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// About Section - Two Column Layout
function AboutSection() {
  const [activeTab, setActiveTab] = useState(0);

  const activeRole = backgroundRoles[activeTab];

  const tabs = backgroundRoles.map((role) => ({
    title: role.title,
    icon: role.title === "Software Developer" ? Code : role.title === "Business Analyst" ? Briefcase : User,
  }));

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-semibold tracking-tight text-center md:text-left mb-12"
          >
            Background
          </motion.h2>
        </div>

        <div className="max-w-6xl mx-auto mb-12 flex justify-center md:justify-start">
          <div className="relative flex items-center gap-2 p-1.5 rounded-2xl border bg-background shadow-sm">
            <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
            {tabs.map((tab, i) => (
              <button
                key={tab.title}
                onClick={() => setActiveTab(i)}
                className={cn(
                  "relative z-10 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200",
                  activeTab === i
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.title}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Background Text */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <p className="text-xl font-semibold text-primary">
                {activeRole.subtitle}
              </p>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {activeRole.description}
              </div>
            </div>

          </motion.div>

          {/* Right Column - Core Technologies & Certifications */}
          <motion.div
            key={`content-${activeTab}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            {/* Core Technologies */}
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                / Core Technologies
              </p>
              <div className="flex flex-wrap gap-3">
                {activeRole.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 text-sm rounded-full border bg-card hover:bg-accent transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <Link href="/tech-stack" className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:underline">
                View All Tech Stack <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Certifications Preview */}
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                / Certifications
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeRole.certifications.slice(0, 4).map((cert) => (
                  <div
                    key={cert.name}
                    className="p-4 rounded-lg border bg-card group transition-all hover:border-primary/50"
                  >
                    <p className="font-medium line-clamp-2 mb-1">{cert.name}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                      {cert.link && (
                        <Link
                          href={cert.link}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Verify <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/certifications" className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:underline">
                View All Certifications <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// GitHub-style contribution heatmap, rendered from raw daily data so the
// colors are the site's own primary token rather than a fixed external palette.
function ContributionHeatmap({ weeks }: { weeks: LiveStats["github"]["weeks"] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [weeks]);

  const levelClass = (level: number | undefined) => {
    switch (level) {
      case 1: return "bg-primary/25";
      case 2: return "bg-primary/50";
      case 3: return "bg-primary/75";
      case 4: return "bg-primary";
      default: return "bg-muted-foreground/15";
    }
  };

  if (weeks.length === 0) {
    return <div className="h-[88px] flex items-center text-xs text-muted-foreground/50">Heatmap unavailable</div>;
  }

  return (
    <div ref={scrollRef} className="overflow-x-auto hide-scrollbar -mx-1 px-1">
      <div className="flex gap-[3px] w-max">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day, di) => (
              <div
                key={di}
                title={day ? `${day.date}: ${day.count} contributions` : undefined}
                className={cn(
                  "w-[9px] h-[9px] rounded-[2px]",
                  day ? levelClass(day.level) : "bg-transparent"
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Stats & Achievements Section — live platform stats (refreshed daily, server-side)
// plus static research achievements (paper + patent).
function StatsSection({ stats }: { stats: LiveStats }) {
  const cardClass =
    "relative p-6 rounded-xl border bg-card group hover:shadow-lg transition-shadow flex flex-col";

  const CardHeader = ({
    icon,
    label,
    href,
    linkLabel = "Profile",
  }: {
    icon: React.ReactNode;
    label: string;
    href: string;
    linkLabel?: string;
  }) => (
    <div className="flex items-center justify-between mb-3 relative z-10">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        {icon} {label}
      </div>
      <Link
        href={href}
        target="_blank"
        className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1"
      >
        {linkLabel} <ExternalLink className="w-3 h-3" />
      </Link>
    </div>
  );

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-semibold tracking-tight text-center md:text-left mb-12"
          >
            Stats & Achievements
          </motion.h2>
        </div>

        <div className="max-w-6xl mx-auto space-y-4">
          {/* Row 1 — live, ticking stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* GitHub — wide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={cn(cardClass, "md:col-span-2 lg:col-span-2")}
            >
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
              <CardHeader icon={<Github className="w-4 h-4" />} label="GitHub" href={stats.github.profile} />
              <div className="relative z-10 flex items-baseline gap-4 mb-3">
                <div>
                  <span className="text-3xl font-bold text-primary">{stats.github.contributions ?? "200+"}</span>
                  <span className="text-xs text-muted-foreground/60 ml-1.5">this year</span>
                </div>
                <div className="text-border">·</div>
                <div>
                  <span className="text-xl font-semibold text-foreground/70">{stats.github.allTime ?? "240+"}</span>
                  <span className="text-xs text-muted-foreground/60 ml-1.5">all-time</span>
                </div>
              </div>
              <div className="relative z-10">
                <ContributionHeatmap weeks={stats.github.weeks} />
              </div>
            </motion.div>

            {/* LeetCode */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className={cardClass}
            >
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
              <CardHeader icon={<Code className="w-4 h-4" />} label="LeetCode" href={stats.leetcode.profile} />
              <div className="relative z-10 flex-1 flex flex-col justify-center">
                <div className="text-5xl font-bold text-primary mb-1">
                  {stats.leetcode.total ?? "150+"}
                  <span className="text-sm font-normal text-muted-foreground ml-2">solved</span>
                </div>
                <div className="flex gap-1.5 text-xs mt-3">
                  <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    Easy {stats.leetcode.easy ?? "—"}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    Med {stats.leetcode.medium ?? "—"}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400">
                    Hard {stats.leetcode.hard ?? "—"}
                  </span>
                </div>
              </div>
              {stats.leetcode.ranking && (
                <p className="relative z-10 text-xs text-muted-foreground/50 pt-3 mt-3 border-t border-border/40">
                  Global rank #{stats.leetcode.ranking.toLocaleString("en-US")}
                </p>
              )}
            </motion.div>

            {/* Monkeytype */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={cardClass}
            >
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
              <CardHeader icon={<Keyboard className="w-4 h-4" />} label="Monkeytype" href={stats.monkeytype.profile} />
              <div className="relative z-10 flex-1 flex flex-col justify-center">
                <div className="text-5xl font-bold text-primary">
                  {stats.monkeytype.wpm ?? 90}
                  <span className="text-sm font-normal text-muted-foreground ml-2">WPM</span>
                </div>
              </div>
              {stats.monkeytype.accuracy && (
                <p className="relative z-10 text-xs text-muted-foreground/50 pt-3 mt-3 border-t border-border/40">
                  {stats.monkeytype.accuracy}% accuracy
                </p>
              )}
            </motion.div>
          </div>

          {/* Row 2 — static achievements */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Medium */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={cardClass}
            >
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
              <CardHeader icon={<Newspaper className="w-4 h-4" />} label="Medium" href={stats.medium.profile} />
              <div className="relative z-10 flex items-baseline gap-2 mb-3">
                <span className="text-3xl font-bold text-primary">{stats.medium.articles ?? "5+"}</span>
                <span className="text-xs text-muted-foreground/60">articles published</span>
              </div>
              {stats.medium.latestTitle && stats.medium.latestLink && (
                <Link
                  href={stats.medium.latestLink}
                  target="_blank"
                  className="relative z-10 block border-t border-border/50 pt-3 group/article"
                >
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground/40 mb-1">Latest</p>
                  <p className="text-xs text-foreground/80 leading-snug line-clamp-2 group-hover/article:text-primary transition-colors">
                    {stats.medium.latestTitle}
                  </p>
                </Link>
              )}
            </motion.div>

            {/* Published paper — wide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className={cn(cardClass, "md:col-span-2 lg:col-span-2")}
            >
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
              <CardHeader
                icon={<FileText className="w-4 h-4" />}
                label="Published Research"
                href={research.paper.link}
                linkLabel="Read paper"
              />
              <p
                title={research.paper.title}
                className="relative z-10 font-medium leading-snug mb-2 line-clamp-2"
              >
                {research.paper.title}
              </p>
              <p className="relative z-10 text-xs text-muted-foreground mb-3">{research.paper.journal}</p>
              <div className="relative z-10 flex-1 flex flex-wrap items-center content-end gap-1.5">
                {research.paper.badges.map((badge) => (
                  <span
                    key={badge}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                  >
                    {badge}
                  </span>
                ))}
                <span className="text-[13px] font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  +{research.paper.underReview} under review
                </span>
              </div>
            </motion.div>

            {/* Patent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={cardClass}
            >
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
              <CardHeader
                icon={<ShieldCheck className="w-4 h-4" />}
                label="Patent"
                href={research.patent.statusLink}
                linkLabel="Status"
              />
              <p
                title={research.patent.title}
                className="relative z-10 font-medium leading-snug mb-1 line-clamp-2 text-sm"
              >
                {research.patent.title}
              </p>
              <p className="relative z-10 text-xs text-muted-foreground/60 font-mono mb-3">
                App. No. {research.patent.id}
              </p>
              <div className="relative z-10 flex-1 flex flex-wrap items-end gap-1.5">
                {research.patent.badges.map((badge) => (
                  <span
                    key={badge}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Client Component — receives daily-cached live stats from the server page
export function HomeClient({ stats }: { stats: LiveStats }) {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <AboutSection />
      <StatsSection stats={stats} />
      <Footer />
    </main>
  );
}
