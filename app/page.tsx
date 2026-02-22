"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Instagram, Mail, ExternalLink, Code, Briefcase, User, ChevronRight, ArrowRight } from "lucide-react";

import { DotBackground } from "@/components/ui/dot-background";
import { Timeline } from "@/components/ui/timeline";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";

import {
  profileData,
  workExperience,
  positionsOfResponsibility,
  projects,
  techStack,
  coreTechnologies,
  stats,
  certifications,
  quotes,
  randomFacts,
  blogs,
  navItems,
  backgroundRoles,
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
            <div className="flex-1 text-center lg:text-left">

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
              >
                This is{" "}
                <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                  {profileData.name}
                </span>
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
                className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8"
              >
                {profileData.bio}
              </motion.p>

            </div>

            {/* Right: Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 flex flex-col items-center"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full blur-2xl opacity-30 animate-pulse" />
                <Image
                  src={profileData.avatarSrc}
                  alt={profileData.name}
                  fill
                  className="rounded-full object-cover border-4 border-background shadow-2xl relative z-10"
                  priority
                />
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
        <div className="flex flex-col items-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-center mb-8"
          >
            Experience
          </motion.h2>

          {/* Toggle Switch */}
          <div className="flex bg-muted/50 p-1 rounded-full border border-border">
            <button
              onClick={() => setActiveTab("work")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "work"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Work Experience
            </button>
            <button
              onClick={() => setActiveTab("positions")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "positions"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Positions of Responsibility
            </button>
          </div>
        </div>

        <div className="relative">
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
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-16"
        >
          Projects
        </motion.h2>
        <BentoGrid className="max-w-5xl mx-auto">
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
        <div className="max-w-5xl mx-auto mt-8 flex justify-end">
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
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-16"
        >
          Background
        </motion.h2>

        <div className="max-w-6xl mx-auto mb-12 flex justify-center">
          <ExpandableTabs
            tabs={tabs}
            onChange={(index) => setActiveTab(index)}
            initialSelected={0}
          />
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

// Stats Section
function StatsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-16"
        >
          Stats & Achievements
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-6 rounded-xl border bg-card text-center group hover:shadow-lg transition-shadow"
            >
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
              <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.name}</div>
              <div className="text-xs text-muted-foreground/60">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Certifications Section
function CertificationsSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-16"
        >
          Certifications
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold mb-2">{cert.name}</h3>
              <p className="text-sm text-muted-foreground">{cert.issuer}</p>
              <p className="text-xs text-muted-foreground/60">{cert.year}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Blog Section
function BlogSection() {
  return (
    <section id="blog" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-16"
        >
          Blog
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {blogs.map((blog, i) => (
            <motion.article
              key={blog.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Link href={blog.link} className="block p-6 rounded-xl border bg-card hover:shadow-lg transition-all">
                <time className="text-xs text-muted-foreground">{blog.date}</time>
                <h3 className="text-xl font-bold mt-2 mb-3 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-muted-foreground text-sm">{blog.excerpt}</p>
                <span className="inline-flex items-center mt-4 text-sm text-primary">
                  Read more <ChevronRight className="w-4 h-4 ml-1" />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}


// Main Page Component
export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <AboutSection />
      <StatsSection />
      <Footer />
    </main>
  );
}
