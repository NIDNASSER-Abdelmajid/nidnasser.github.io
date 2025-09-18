"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Vote, School } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ProjectCard, ProjectData } from "@/components/ui/project-card";

// Projects updated to reflect your latest work.
const projects: ProjectData[] = [
    {
        id: "ai-career-toolkit",
        title: "AI-Powered Career Toolkit",
        description: "A full-stack career platform using Django and React to generate AI-powered resumes and provide interview preparation.",
        status: "In Development",
        tags: ["React", "Django", "OpenAI API", "JWT", "Docker", "AWS"],
        icon: Bot,
        color: "text-purple-400",
        bgColor: "bg-purple-400/10",
        borderColor: "border-purple-400/20",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop&auto=format&q=80",
    liveHref: "#", // Placeholder until deployment
    githubHref: "#" // Disabled: no public repository yet
    },
    {
        id: "ensa-khouribga-website",
        title: "ENSA Khouribga University Website",
        description:
            "A modern, responsive website for ENSA Khouribga University to showcase academic programs, attract new students, and highlight faculty excellence.",
        status: "Live",
        tags: ["Next.js", "React", "Tailwind CSS", "CMS"],
        icon: School,
        color: "text-blue-400",
        bgColor: "bg-blue-400/10",
        borderColor: "border-blue-400/20",
        liveHref: "#",
        githubHref: "#", 
        image: "/ensa.png",
    },
    {
        id: "real-time-voting-system",
        title: "Distributed Real-Time Voting System",
        description: "Engineered a fault-tolerant, distributed backend capable of processing thousands of votes per second using Kafka for real-time data streaming.",
        status: "Conceptual Project",
        tags: ["Java", "Kafka", "React", "Docker"],
        icon: Vote,
        color: "text-green-400",
        bgColor: "bg-green-400/10",
        borderColor: "border-green-400/20",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&auto=format&q=80",
    liveHref: "#", // No live demo yet
    githubHref: "#" // Disabled: concept/no repo
    },
];

export function FeaturedProjects() {
    return (
        <section className="py-24 bg-background/50 backdrop-blur-sm">
            <div className="container mx-auto max-w-7xl px-4">
                {/* Section Header */}
                <motion.div
                    className="text-center space-y-6 mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <motion.h2
                        className="text-4xl lg:text-5xl font-bold tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        My Featured{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient">
                            Projects
                        </span>
                    </motion.h2>
                    <motion.p
                        className="text-lg text-muted-foreground max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        A selection of my work that demonstrates my skills in software engineering, from concept to deployment.
                    </motion.p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard 
                            key={project.id}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>

                {/* Updated Button */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    <Button asChild size="lg" className="font-semibold">
                        <Link href="/projects">
                            View All Projects <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}