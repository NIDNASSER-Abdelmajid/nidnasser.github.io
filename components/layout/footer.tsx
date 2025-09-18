import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, X } from "lucide-react";

// Minimal custom Freelancer logo (origami-style bird) in single color to match icon set
const XLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 1024 1024"
    fill="currentColor"
    role="img"
    aria-label="X"
    className={className}
  >
    <path d="M818 800 498.11 333.745l.546.437L787.084 0h-96.385L455.738 272 269.15 0H16.367l298.648 435.31-.036-.037L0 800h96.385l261.222-302.618L565.217 800zM230.96 72.727l448.827 654.546h-76.38L154.217 72.727z" />
  </svg>
);


export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground font-mono font-bold text-lg">
                AN
              </div>
              <span className="font-semibold text-foreground">Abdelmajid NIDNASSER</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              PhD Candidate & Data Engineer building reliable, AI‑powered products for startups and teams worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/projects" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                Projects
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                About
              </Link>
              <Link href="/experience" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                Experience
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Connect</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" asChild>
                <Link href="https://github.com/NIDNASSER-Abdelmajid" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link href="https://linkedin.com/in/abdelmajid-nidnasser" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link href="https://x.com/Abdelmajid_nid" target="_blank" rel="noopener noreferrer">
                  <XLogo className="h-4 w-4" />
                  <span className="sr-only">X</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Abdelmajid NIDNASSER. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
