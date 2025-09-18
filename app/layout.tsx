import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { PerformanceMonitor } from "@/components/ui/performance-monitor";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Abdelmajid NIDNASSER — PhD Candidate & Data Engineer",
  description: "Portfolio of Abdelmajid NIDNASSER, a passionate Computer Science Engineer and PhD Candidate specializing in AI-driven systems, Natural Language Processing, and scalable data solutions. Explore my research, publications, projects, and collaborations.",
  keywords: ["Software Engineer", "Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Portfolio", "Developer", "PhD Candidate", "Research"],
  authors: [{ name: "Abdelmajid NIDNASSER" }],
  creator: "Abdelmajid NIDNASSER",
  metadataBase: new URL("https://abdelmajidnidnasser.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abdelmajidnidnasser.com",
    siteName: "Abdelmajid NIDNASSER Portfolio",
    title: "Abdelmajid NIDNASSER — PhD Candidate & Data Engineer",
    description: "Portfolio of Abdelmajid NIDNASSER, a passionate Computer Science Engineer and PhD Candidate specializing in AI-driven systems, Natural Language Processing, and scalable data solutions. Explore my research, publications, projects, and collaborations.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Abdelmajid NIDNASSER — PhD Candidate & Data Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdelmajid NIDNASSER — PhD Candidate & Data Engineer",
    description: "Portfolio of Abdelmajid NIDNASSER, a passionate Computer Science Engineer and PhD Candidate specializing in AI-driven systems, Natural Language Processing, and scalable data solutions. Explore my research, publications, projects, and collaborations.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <CursorGlow />
          <PerformanceMonitor />
        </ThemeProvider>
      </body>
    </html>
  );
}
