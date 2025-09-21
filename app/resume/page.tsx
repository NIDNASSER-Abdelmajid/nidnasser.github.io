// Client component for interactive resume page
'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { AnimatedBackground } from '@/components/3d/animated-background'
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Calendar,
  Building,
  GraduationCap,
  Award,
  Code,
  Star,
  ExternalLink
} from 'lucide-react'

const personalInfo = {
  name: 'Abdelmajid NIDNASSER',
  title: 'PhD Candidate & Data Engineer',
  email: 'abdelmajidnidnasser1@gmail.com',
  location: 'Rabat, Morocco',
  website: 'https://nidnasser.me',
  freelancer: 'https://www.freelancer.com/u/NIDNASSER',
  portfolioAlt: 'http://nidnasser.me/',
  linkedin: 'linkedin.com/in/abdelmajid-nidnasser',
  github: 'github.com/NIDNASSER-Abdelmajid',
}

const professionalSummary = `PhD Candidate and Computer Science Engineer specializing in Web Privacy and Data Protection. My research explores innovative approaches to safeguarding user data and enhancing online privacy while bridging cutting-edge research with practical applications. In parallel, I work as a Generative AI freelancer, delivering impactful AI-driven solutions tailored to diverse client needs, consistently ensuring high-quality outcomes and strong collaboration.`

const experience = [
  {
    title: 'Gen AI Engineer',
    company: 'Freelancer.com',
    location: 'Remote',
    period: 'Nov 2022 - Present',
    achievements: [
      "Delivered 45+ client projects leveraging Generative AI and data-driven solutions, consistently aligning with client goals and business needs",
      "Developed AI-powered applications and privacy-focused systems that enhanced user experience while safeguarding sensitive data",
      "Earned a perfect 5.0-star rating across 48 client reviews by combining technical excellence with clear, reliable communication",
      "Achieved 100% on-time delivery and 100% on-budget project completion, ensuring strong client trust and repeat collaborations"
    ],
  },
  {
    title: 'Research Engineer',
    company: 'College of Computing - Mohammed VI Polytechnic University',
    location: 'Rabat, Morocco',
    period: 'Jan 2025 - Sept 2025',
    achievements: [
    "Designed and built a scalable data pipeline to support ad detection and privacy-focused analysis from 100K+ websites scraped via a custom crawler based on Tranco lists",
    "Engineered robust ETL processes to ingest, clean, and enrich web data using automated classification across 12 categories and 35 subcategories",
    "Collected and structured network-level and DOM-based signals to identify ad-related elements using community filter lists and advanced scraping methods",
    "Extracted and stored 'Why This Ad' metadata at scale to analyze targeting strategies, contributing to user transparency on ad personalization",
    "Built a semi-automated data cleaning framework to handle inconsistencies and noise, improving data quality for downstream processing and modeling",
    "Integrated OCR capabilities for extracting text from ad images, enriching feature sets for analysis",
    "Developed batch and real-time processing workflows to support machine learning pipelines for ad classification and detection",
    "Contributed to the creation of a Chrome extension prototype backed by engineered data flows and inference pipelines, enabling real-time blocking of targeted ads"
    ],
  },
  {
    title: 'Founder & Data Engineer',
    company: 'Tech Startup: ONDE\'Child (National Observatory for Children\'s rights Program)',
    location:'Rabat, Morocco',
    period: 'Jan 2024 - Jul 2025',
    achievements: [
      "Co-founded a tech startup focused on building intelligent digital platforms to support national child protection programs",
      "Led the design and deployment of machine learning solutions integrated into the core platform, contributing to early risk detection and case prioritization",
      "Designed AI models for classification and risk assessment trained on structured and semi-structured data from institutional sources",
      "Engineered robust data pipelines for ingestion, cleaning, and transformation of heterogeneous data sources, enabling efficient model training and real-time analysis",
      "Developed RESTful APIs to operationalize ML models and embed them into the platform’s backend architecture",
      "Built NLP tools for automatic analysis and classification of case reports, improving speed and consistency in decision-making by child protection officers"
    ],
  },
  {
    title: 'Data Engineer & Business Intelligence Consultant',
    company: 'Leyton',
    location: 'Casablanca, Morocco',
    period: 'Jun 2023 - Jan 2024',
    achievements: [
      "Designed and implemented ETL pipelines to extract and transform financial data from Salesforce, Odoo, SAP, and other internal systems using Python and Apache Spark",
      "Automated data workflows to support timely and accurate delivery of processed data for analytics and reporting needs",
      "Built and maintained scalable data warehouses and data marts using star and snowflake schemas for financial domains such as revenue, expenses, and customer insights",
      "Developed complex SQL queries for data transformation, aggregation, and performance tuning",
      "Created interactive dashboards and reports in Power BI & Tableau to track KPIs including revenue trends, customer lifetime value (CLV), churn, and profitability",
      "Collaborated with business teams to gather requirements and design data models aligned with financial and strategic goals",
      "Ensured data quality through validation rules, exception handling, and consistent data governance practices",
      "Enabled self-service BI through intuitive dashboards and structured semantic layers for non-technical users",
      "Worked cross-functionally with finance, operations, and compliance teams to deliver reliable insights for budgeting and decision-making"
    ],
  }
]

const education = [
  {
    degree: 'Engineering Degree in Innovation & AMOA',
    school: 'National Institute of Posts and Telecommunications (INPT)',
    location: 'Rabat, Morocco',
    period: '2022 - 2025',
    details: [
      'Data and Business Engineering Specialization',
      'Focus on AI, Machine Learning, and Information Systems',
    ],
  },
  {
    degree: "Preparatory Classes for Engineering Studies",
    school: "Lycée Reda Slaoui",
    location: "Agadir, Morocco",
    period: "2020 - 2022",
    details: [
        "Intensive preparation in Mathematics, Physics, and Computer Science",
        "Focused on problem-solving, analytical thinking, and foundational engineering concepts"
    ],
  },
]

const skills = {
  'Programming Languages': ['Python', 'JavaScript', 'SQL'],
  'Databases': ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite'],
  'Data & Machine Learning': ['Apache Spark', 'PySpark', 'Pandas', 'Scikit-learn', 'XGBoost', 'LightGBM', 'ETL Processes'],
  'Data Visualization & BI': ['Matplotlib', 'Seaborn', 'Plotly', 'Tableau', 'Power BI', 'Looker', 'Creating Intuitive Dashboards'],
  'Web Scraping & Data Extraction': ['Scrapy', 'BeautifulSoup', 'Selenium', 'Custom Crawlers', 'Network-level Analysis', 'DOM-based Analysis'],
  'Project Management & Collaboration': ['Agile/Scrum Methodologies', 'Cross-functional Team Communication', 'Business Requirements Gathering', 'Documentation']
};


const certifications = [
  'HCIA-AI V3.5 Certificate - Huawei (2025)',
  'Oracle Cloud Infrastructure 2024 Generative AI Certified - Oracle (2024)',
  'McKinsey Forward Program - McKinsey & Company (2023)',
  'Foundation of Project Management - Google (2023)',
  'English Proficiency (C2) - EF SET (2022)',
]

const achievements = [
  "Voices of Deep Tech MEA for 2025",
  "3rd place in Business Game x Inetum Consulting",
  "3rd place in ISIC Rabat Hackathon on cyber violence for the project 'Web Shelter'",
  "1st place in Hult Prize local competition at ENSAM Rabat",
  "3rd place in ONDE E-Toufoula Hackathon"
]


export default function ResumePage() {
  useEffect(() => {
    document.title = 'Resume | Abdelmajid NIDNASSER - PhD Candidate & Data Engineer'
  }, [])

  return (
    <div className="min-h-screen relative bg-transparent print:bg-white">
      <AnimatedBackground variant="resume" />

      {/* Resume Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-xl opacity-40 group-hover:opacity-60 transition-opacity print:hidden" />
          <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl border border-border/60 shadow-xl print:border-0 print:shadow-none print:bg-white print:backdrop-blur-none">
          <div className="p-8 print:p-6">
            {/* Personal Info Header */}
            <header className="text-center mb-10 print:mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">{personalInfo.name}</h1>
              <h2 className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-5">{personalInfo.title}</h2>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  {personalInfo.email}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {personalInfo.location}
                </div>
              </div>
              
              {/* Link bar redesigned (website removed as requested) */}
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                <Link
                  href={personalInfo.freelancer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-muted/60 to-muted/30 backdrop-blur-sm border border-border/50 text-[11px] sm:text-xs font-medium text-foreground/85 hover:text-foreground hover:from-primary/15 hover:to-accent/15 transition-all shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-primary/80 group-hover:text-primary transition-colors" />
                  <span className="tracking-wide">freelancer.com/u/NIDNASSER</span>
                </Link>
                <Link
                  href={personalInfo.portfolioAlt}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-muted/60 to-muted/30 backdrop-blur-sm border border-border/50 text-[11px] sm:text-xs font-medium text-foreground/85 hover:text-foreground hover:from-primary/15 hover:to-accent/15 transition-all shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-primary/80 group-hover:text-primary transition-colors" />
                  <span className="tracking-wide">abdelmajid.dev</span>
                </Link>
                <Link
                  href={`https://${personalInfo.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-muted/60 to-muted/30 backdrop-blur-sm border border-border/50 text-[11px] sm:text-xs font-medium text-foreground/85 hover:text-foreground hover:from-primary/15 hover:to-accent/15 transition-all shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  <Linkedin className="w-3.5 h-3.5 text-primary/80 group-hover:text-primary transition-colors" />
                  <span className="tracking-wide">linkedin.com/in/abdelmajid-nidnasser</span>
                </Link>
                <Link
                  href={`https://${personalInfo.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-muted/60 to-muted/30 backdrop-blur-sm border border-border/50 text-[11px] sm:text-xs font-medium text-foreground/85 hover:text-foreground hover:from-primary/15 hover:to-accent/15 transition-all shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  <Github className="w-3.5 h-3.5 text-primary/80 group-hover:text-primary transition-colors" />
                  <span className="tracking-wide">github.com/NIDNASSER-Abdelmajid</span>
                </Link>
              </div>

              {/* Quick Stats removed per request to remove numbers */}

              <div className="mt-6 flex justify-center gap-4 print:hidden">
                <Button size="sm" variant="outline" onClick={() => window.print()} className="text-xs">Print / PDF</Button>
                <Button size="sm" asChild className="text-xs">
                  <Link href="/contact">Hire Me</Link>
                </Button>
              </div>
            </header>

            {/* Professional Summary */}
            <section className="mb-10">
              <h3 className="text-xl font-bold text-foreground mb-5 flex items-center relative">
                <span className="absolute -left-4 top-1/2 -translate-y-1/2 hidden sm:block w-2 h-6 bg-gradient-to-b from-primary to-accent rounded" />
                <Star className="w-5 h-5 mr-2 text-primary drop-shadow" />
                Professional Summary
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base" style={{textAlign: 'justify'}}>
                {professionalSummary}
              </p>
            </section>

            <Separator className="my-8" />

            {/* Experience */}
            <section className="mb-10">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
                <Building className="w-5 h-5 mr-2 text-primary" />
                Professional Experience
              </h3>
              <div className="relative pl-4 sm:pl-6 before:content-[''] before:absolute before:top-0 before:left-1 before:w-px before:h-full before:bg-border">
                {experience.map((job, index) => (
                  <div key={index} className="relative pb-10 last:pb-0 pl-2 sm:pl-1">
                    {/* Timeline bullet improved alignment */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-foreground">{job.title}</h4>
                        <div className="flex flex-wrap items-center text-muted-foreground text-xs gap-x-3 gap-y-1">
                          <span className="inline-flex items-center"><Building className="w-3.5 h-3.5 mr-1" />{job.company}</span>
                          <span className="inline-flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" />{job.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mt-1 sm:mt-0">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        {job.period}
                      </div>
                    </div>
                    <ul className="mt-2 space-y-1.5 text-[13px] leading-relaxed text-muted-foreground">
                      {job.achievements.map((achievement, idx) => (
                        <li key={idx} className="pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary/60" style={{ textAlign: 'justify' }}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <Separator className="my-8" />

            {/* Education */}
            <section className="mb-10">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-primary" />
                Education
              </h3>
              <div className="relative pl-4 sm:pl-6 before:content-[''] before:absolute before:top-0 before:left-1 before:w-px before:h-full before:bg-border">
                {education.map((edu, index) => (
                  <div key={index} className="relative pb-10 last:pb-0 pl-2 sm:pl-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <div>
                        <h4 className="text-base font-semibold text-foreground">{edu.degree}</h4>
                        <div className="flex flex-wrap items-center text-muted-foreground text-xs gap-x-3 gap-y-1">
                          <span className="inline-flex items-center"><Building className="w-3.5 h-3.5 mr-1" />{edu.school}</span>
                          <span className="inline-flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" />{edu.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mt-1 sm:mt-0">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        {edu.period}
                      </div>
                    </div>
                    <ul className="mt-2 space-y-1.5 text-[13px] leading-relaxed text-muted-foreground">
                      {edu.details.map((detail, idx) => (
                        <li key={idx} className="pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent/60">{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <Separator className="my-8" />

            {/* Skills */}
      <section className="mb-10">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
                <Code className="w-5 h-5 mr-2 text-primary" />
                Technical Skills
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(skills).map(([category, skillList]) => (
                  <div key={category}>
                    <h4 className="font-semibold text-foreground mb-3">{category}</h4>
          <div className="flex flex-wrap gap-1">
                      {skillList.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-[10px] tracking-wide uppercase rounded-md bg-muted/70 hover:bg-muted">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <Separator className="my-8" />

            {/* Certifications & Achievements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <section>
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-primary" />
                  Certifications
                </h3>
                <ul className="space-y-2">
                  {certifications.map((cert, index) => (
                    <li key={index} className="flex items-start group">
                      <div className="w-2 h-2 bg-gradient-to-br from-primary to-accent rounded-full mr-3 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{cert}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-primary" />
                  Key Achievements
                </h3>
                <ul className="space-y-2">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start group">
                      <div className="w-2 h-2 bg-gradient-to-br from-primary to-accent rounded-full mr-3 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Footer */}
            <footer className="mt-14 pt-8 border-t border-border/60 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                References available upon request
              </p>
              <div className="flex justify-center gap-4 print:hidden">
                <Button variant="outline" asChild>
                  <Link href="/projects">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Projects
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Me
                  </Link>
                </Button>
              </div>
            </footer>
          </div>
        </div>
      </div>
      </div>{/* end container */}

      {/* Additional Actions */}
      <section className="py-16 bg-card print:hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Let&apos;s Connect
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Interested in working together? I&apos;d love to discuss how my skills and experience 
              can contribute to your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/projects">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Portfolio
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
  </div>
  )
}
