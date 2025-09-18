"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  ArrowUp, 
  Mail, 
  Download,
  ExternalLink,
  Plus,
  X
} from "lucide-react";
import Link from "next/link";

const quickActions = [
  {
    icon: MessageCircle,
    label: "Chat Now",
    href: "/contact",
    color: "bg-blue-500 hover:bg-blue-600 text-white",
    description: "Start a conversation"
  },
  {
    icon: Mail,
    label: "Email Me",
    href: "mailto:abdelmajidnidnasser1@gmail.com",
    color: "bg-green-500 hover:bg-green-600 text-white",
    description: "Send an email"
  },
  {
    icon: Download,
    label: "Resume",
    href: "/resume",
    color: "bg-purple-500 hover:bg-purple-600 text-white",
    description: "View my resume"
  },
  {
    icon: ExternalLink,
    label: "Hire Me",
    href: "https://freelancer.com/u/NIDNASSER",
    color: "bg-accent hover:bg-accent/90 text-accent-foreground",
    description: "Start a project",
    external: true
  }
];

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showFAB, setShowFAB] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setShowScrollTop(scrolled > 300);
      setShowFAB(scrolled > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  if (!showFAB) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Quick Actions Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 space-y-3"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "spring" as const,
              stiffness: 260,
              damping: 20,
            }}
          >
            {/* Scroll to Top */}
            {showScrollTop && (
              <motion.div 
                className="flex items-center"
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{
                  type: "spring" as const,
                  stiffness: 260,
                  damping: 20
                }}
              >
                <Badge 
                  variant="outline" 
                  className="mr-3 bg-card/90 backdrop-blur-sm border-border text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Back to top
                </Badge>
                <Button
                  onClick={handleScrollToTop}
                  size="sm"
                  className="h-10 w-10 rounded-full bg-card/90 backdrop-blur-sm border border-border hover:bg-accent hover:text-accent-foreground shadow-lg group"
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </motion.div>
            )}

            {/* Quick Action Buttons */}
            {quickActions.map((action) => (
              <motion.div 
                key={action.label} 
                className="flex items-center group"
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{
                  type: "spring" as const,
                  stiffness: 260,
                  damping: 20
                }}
              >
                <Badge 
                  variant="outline" 
                  className="mr-3 bg-card/90 backdrop-blur-sm border-border text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                >
                  {action.description}
                </Badge>
                <Button
                  asChild={!action.external}
                  size="sm"
                  className={`h-10 w-10 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${action.color}`}
                  onClick={() => setIsOpen(false)}
                >
                  {action.external ? (
                    <a href={action.href} target="_blank" rel="noopener noreferrer">
                      <action.icon className="h-4 w-4" />
                      <span className="sr-only">{action.label}</span>
                    </a>
                  ) : (
                    <Link href={action.href}>
                      <action.icon className="h-4 w-4" />
                      <span className="sr-only">{action.label}</span>
                    </Link>
                  )}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ 
          type: "spring" as const, 
          stiffness: 260, 
          damping: 20,
          delay: 0.2
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-12 w-12 rounded-full bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 shadow-2xl relative overflow-hidden group"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Icon */}
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-10"
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Plus className="h-5 w-5" />
            )}
          </motion.div>

          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-100 transition-transform duration-300" />
        </Button>
      </motion.div>

      {/* Availability Indicator */}
      <motion.div
        className="absolute -top-1 -right-1 z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          delay: 0.5, 
          type: "spring" as const, 
          stiffness: 260, 
          damping: 20 
        }}
      >
        <div className="w-3 h-3 bg-green-400 rounded-full border-2 border-background">
          <div className="w-full h-full bg-green-400 rounded-full animate-ping" />
        </div>
      </motion.div>
    </div>
  );
}
