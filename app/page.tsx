"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Instagram, Mail, ExternalLink, Code, Briefcase, User, ChevronRight } from "lucide-react";

import { FloatingNav } from "@/components/ui/floating-navbar";
import { DotBackground } from "@/components/ui/dot-background";
import { Timeline } from "@/components/ui/timeline";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { Button } from "@/components/ui/button";

import {
  profileData,
  workExperience,
  positionsOfResponsibility,
  projects,
  techStack,
  stats,
  certifications,
  quotes,
  randomFacts,
  blogs,
  navItems,
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
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-muted-foreground mb-4"
              >
                Hi there 👋
              </motion.p>
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

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex gap-4 justify-center lg:justify-start"
              >
                <Link href={profileData.socials.linkedin} target="_blank" className="p-3 rounded-full bg-muted hover:bg-accent transition-colors">
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link href={profileData.socials.github} target="_blank" className="p-3 rounded-full bg-muted hover:bg-accent transition-colors">
                  <Github className="w-5 h-5" />
                </Link>
                <Link href={profileData.socials.instagram} target="_blank" className="p-3 rounded-full bg-muted hover:bg-accent transition-colors">
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link href={profileData.socials.email} className="p-3 rounded-full bg-muted hover:bg-accent transition-colors">
                  <Mail className="w-5 h-5" />
                </Link>
              </motion.div>
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
  const timelineData = workExperience.map((exp) => ({
    title: exp.title,
    content: (
      <div>
        <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
        <p className="text-muted-foreground mb-2">{exp.organization} • {exp.duration}</p>
        <ul className="list-disc list-inside text-sm text-muted-foreground">
          {exp.bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      </div>
    ),
  }));

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-16"
        >
          Work Experience
        </motion.h2>
        <Timeline data={timelineData} />
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
      </div>
    </section>
  );
}

// About Section with Expandable Tabs
function AboutSection() {
  const tabs = [
    { title: "Developer", icon: Code },
    { title: "Business", icon: Briefcase },
    { type: "separator" as const },
    { title: "About Me", icon: User },
  ];

  const summaries = [
    "As a Software Developer, I specialize in building scalable web applications using modern technologies like React, Next.js, and Python. I'm passionate about clean code, performance optimization, and creating exceptional user experiences.",
    "With a strong interest in Finance, I bring analytical thinking and data-driven decision making to every project. I've completed certifications in Financial Markets and apply quantitative analysis to solve business problems.",
    "I'm a multidisciplinary technologist who loves learning and building. When I'm not coding, you'll find me reading about emerging technologies, contributing to open source, or exploring the intersection of AI and finance.",
  ];

  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-16"
        >
          About
        </motion.h2>

        <div className="max-w-3xl mx-auto">
          <ExpandableTabs
            tabs={tabs}
            className="justify-center mb-8"
            onChange={(index) => setSelectedTab(index ?? 0)}
          />

          <motion.p
            key={selectedTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg text-muted-foreground text-center mb-12"
          >
            {summaries[selectedTab >= summaries.length ? 0 : selectedTab]}
          </motion.p>

          {/* Tech Stack */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8">Tech Stack</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(techStack).map(([category, items]) => (
                <div key={category} className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-semibold capitalize mb-2">{category}</h4>
                  <p className="text-sm text-muted-foreground">{items.join(", ")}</p>
                </div>
              ))}
            </div>
          </div>
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

// Footer
function Footer() {
  return (
    <footer className="py-12 border-t">
      <div className="container mx-auto px-4 text-center">
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} {profileData.name}. Built with Next.js & Tailwind CSS.
        </p>
        <div className="flex gap-4 justify-center mt-4">
          <Link href={profileData.socials.linkedin} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin className="w-5 h-5" />
          </Link>
          <Link href={profileData.socials.github} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github className="w-5 h-5" />
          </Link>
          <Link href={profileData.socials.email} className="text-muted-foreground hover:text-foreground transition-colors">
            <Mail className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function Home() {
  return (
    <main className="min-h-screen">
      <FloatingNav navItems={navItems} />
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <AboutSection />
      <StatsSection />
      <CertificationsSection />
      <BlogSection />
      <Footer />
    </main>
  );
}
