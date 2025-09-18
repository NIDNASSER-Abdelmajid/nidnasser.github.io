"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, ShieldCheck, Cloud, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

// Services updated to highlight research expertise in AI, privacy, and data-driven systems.
const services = [
    {
        icon: BrainCircuit,
        title: "AI & Generative Models",
        description:
            "Conducting advanced research on Large Language Models (LLMs), privacy-preserving AI, and generative systems. I focus on developing context-aware, ethical, and high-performing AI solutions.",
        features: [
            "LLM Fine-Tuning & Evaluation",
            "Privacy-Preserving Machine Learning",
            "Natural Language Processing (NLP)",
            "Generative AI Research & Applications",
        ],
        color: "text-green-400",
        bgColor: "bg-green-400/10",
        borderColor: "border-green-400/20",
    },
    {
        icon: ShieldCheck,
        title: "Web Privacy & Data Protection",
        description:
            "Designing systems to detect, analyze, and mitigate privacy risks in web environments. I focus on safeguarding sensitive data while ensuring compliance and user transparency.",
        features: [
            "Ad & Tracker Detection",
            "Network-Level & DOM Analysis",
            "Privacy-Focused Data Pipelines",
            "Data Protection & Compliance",
        ],
        color: "text-blue-400",
        bgColor: "bg-blue-400/10",
        borderColor: "border-blue-400/20",
    },
    {
        icon: Cloud,
        title: "Data Engineering & Research Infrastructure",
        description:
            "Building scalable data pipelines and processing workflows to support advanced AI research and analytics. I integrate batch and real-time data systems to enable reproducible and efficient experiments.",
        features: [
            "ETL & Data Pipeline Design",
            "Batch & Real-Time Workflows",
            "Data Cleaning & Quality Assurance",
            "Research-Ready Data Warehouses",
        ],
        color: "text-purple-400",
        bgColor: "bg-purple-400/10",
        borderColor: "border-purple-400/20",
    },
];

export function WhatIDo() {
    return (
        <section className="py-24 bg-background/70 backdrop-blur-lg">
            <div className="container mx-auto max-w-7xl px-4">
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
                        My Research{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient">
                            Expertise
                        </span>
                    </motion.h2>
                    <motion.p
                        className="text-lg text-muted-foreground max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        I conduct advanced AI and data-driven research, focusing on privacy, ethical AI, and generative models, delivering reproducible results and cutting-edge solutions.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            className="h-full"
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.2 + index * 0.1,
                                ease: "easeOut",
                            }}
                            viewport={{ once: true }}
                        >
                            <Card
                                className={`
                h-full flex flex-col bg-card/50 border-2 ${service.borderColor} 
                hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 
                shadow-lg hover:shadow-primary/10
              `}
                            >
                                <CardHeader className="flex-shrink-0">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div
                                            className={`p-3 rounded-lg border ${service.borderColor} ${service.bgColor}`}
                                        >
                                            <service.icon
                                                className={`w-7 h-7 ${service.color}`}
                                            />
                                        </div>
                                        <CardTitle
                                            className={`text-2xl font-bold ${service.color}`}
                                        >
                                            {service.title}
                                        </CardTitle>
                                    </div>
                                    <CardDescription className="text-base text-muted-foreground">
                                        {service.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="flex-grow flex flex-col justify-end pt-4">
                                    <div className="space-y-3">
                                        {service.features.map((feature) => (
                                            <div
                                                key={feature}
                                                className="flex items-center gap-3"
                                            >
                                                <CheckCircle
                                                    className={`w-5 h-5 ${service.color}`}
                                                />
                                                <span className="text-sm text-foreground">
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
