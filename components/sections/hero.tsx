"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

// Tech stack updated to reflect your core skills listed in the resume
const techStack = [
    "Python",
    "JavaScript",
    "SQL",
    "PostgreSQL",
    "Selenium",
];

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-padding">
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 bg-background">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
                        backgroundSize: "50px 50px",
                    }}
                />
            </div>

            <div className="container-max">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left Column - Content */}
                    <motion.div
                        className="lg:col-span-7 space-y-8"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <Badge
                            variant="secondary"
                            className="px-6 py-3 text-sm font-medium bg-gradient-to-r from-accent/10 to-primary/10 text-primary border-primary/20 hover:border-primary/40 transition-all duration-300 backdrop-blur-sm hover:scale-105"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <span>Open to collaborative research and development</span>
                            </div>
                        </Badge>

                        <div className="space-y-6">
                            <motion.h1
                                className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tighter"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                            >
                                <span className="block">Hi, I&apos;m Abdelmajid NIDNASSER.</span>
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient">
                                    Researching in Web Privacy & Data Protection
                                </span>
                            </motion.h1>
                            <motion.p
                                className="text-lg md:text-xl text-muted-foreground max-w-2xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            >
                                A computer science engineer and PhD candidate, I specialize in conducting research in web privacy and data protection. </motion.p>
                        </div>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                        >
                            <Button size="lg" asChild className="shadow-lg shadow-primary/20 hover:shadow-primary/40">
                                <a href="#contact">
                                    Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
                                </a>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <a href="/resume">
                                    View Resume <ArrowRight className="ml-2 h-5 w-5" />
                                </a>
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Visuals & Profile */}
                    <motion.div
                        className="lg:col-span-5 space-y-6"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        {/* --- NEW GIF VISUAL --- */}
                        <motion.div
                            className="rounded-lg overflow-hidden border-2 border-primary/20 shadow-xl"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                        >
                            <Image
                                src="https://user-images.githubusercontent.com/74038190/225813708-98b745f2-7d22-48cf-9150-083f1b00d6c9.gif"
                                alt="Coding animation"
                                width={800} // set an appropriate width
                                height={600} // set an appropriate height
                                className="w-full h-auto object-cover"
                                />
                        </motion.div>

                        {/* Tech Stack */}
                        <div>
                            <h3 className="text-center text-sm font-semibold text-muted-foreground mb-4">
                                CORE TECHNOLOGIES
                            </h3>
                            <div className="flex flex-wrap justify-center gap-3">
                                {techStack.map((tech) => (
                                    <Badge key={tech} variant="secondary" className="px-3 py-1 text-xs font-mono">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}