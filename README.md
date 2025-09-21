# Abdelmajid NIDNASSER - Portfolio Website

A premium, credibility-first portfolio website for Abdelmajid NIDNASSER, PhD Candidate & Data Engineer with passione to Gen Ai and Machine Learning. Built with Next.js, shadcn/ui, and a custom dark theme to showcase expertise in AI, machine learning, and full-stack development.

## 🚀 Live Demo

[View Live Portfolio](https://nidnasser.me) (Replace with actual URL)

## ✨ Features

### 🎨 Design & UX
- **Premium Dark Theme** - Custom color scheme (#100C08) with professional aesthetic
- **Responsive Design** - Optimized for all devices and screen sizes
- **Modern UI Components** - Built with shadcn/ui for consistent, accessible design
- **Smooth Animations** - Framer Motion animations for enhanced user experience
- **Print-Friendly Resume** - Optimized resume page for PDF generation

### 📱 Pages & Sections
- **Homepage** - Hero, trust indicators, featured projects, services, testimonials
- **Projects** - Filterable portfolio with detailed case studies
- **About** - Personal story, values, technical expertise, achievements
- **Experience** - Professional timeline, education, certifications, skills
- **Contact** - Interactive form with services, availability, and social links
- **Resume** - Professional PDF-ready resume with download functionality

### 🔧 Technical Features
- **Next.js App Router** - Modern routing with SSG optimization
- **TypeScript** - Type-safe development with better IDE support
- **Tailwind CSS** - Utility-first styling with custom design system
- **Component Library** - Reusable UI components with shadcn/ui
- **SEO Optimized** - Metadata, structured data, and performance optimized
- **Contact Form** - Interactive form with validation and submission handling

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Deployment:** Vercel (recommended)

## � Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NIDNASSER-Abdelmajid/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 📁 Project Structure

```
portfolio/
├── app/                          # Next.js App Router
│   ├── about/                    # About page
│   ├── contact/                  # Contact page
│   ├── experience/               # Experience & timeline
│   ├── projects/                 # Projects listing
│   │   └── [slug]/              # Individual project pages
│   ├── resume/                   # Resume/CV page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/                   # React components
│   ├── layout/                   # Header, Footer
│   ├── sections/                 # Homepage sections
│   └── ui/                       # shadcn/ui components
├── public/                       # Static assets
│   ├── avatars/                  # Testimonial images
│   ├── projects/                 # Project screenshots
│   └── about/                    # Profile images
└── lib/                          # Utilities & configurations
```

## 🎨 Customization Guide

### 1. Personal Information
Update your details in the following components:
- `components/layout/header.tsx` - Navigation and branding
- `components/layout/footer.tsx` - Contact info and social links
- `components/sections/hero.tsx` - Main headline and CTA
- `app/about/page.tsx` - Personal story and background
- `app/resume/page.tsx` - Professional resume data

### 2. Projects & Portfolio
Add your projects in:
- `app/projects/page.tsx` - Project listings and filtering
- `app/projects/[slug]/page.tsx` - Individual project details
- `public/projects/` - Project screenshots and images

### 3. Experience & Skills
Update your professional background:
- `app/experience/page.tsx` - Work history, education, certifications
- `components/sections/what-i-do.tsx` - Services and expertise areas

### 4. Content & Copy
Customize all text content:
- `components/sections/testimonials.tsx` - Client testimonials
- `app/contact/page.tsx` - Contact form and service offerings
- All page metadata for SEO optimization

### 5. Styling & Theme
Modify the design system:
- `tailwind.config.js` - Colors, fonts, and design tokens
- `app/globals.css` - Global styles and CSS variables
- Individual component styles throughout the codebase

### 6. Assets & Media
Replace placeholder images:
- `public/avatars/` - Testimonial profile pictures
- `public/projects/` - Project screenshots and galleries  
- `public/about/` - Personal profile images
- Add your resume PDF to `public/` directory

## 📧 Contact Form Setup

The contact form requires backend integration. Options include:

1. **Vercel Functions** - Serverless API routes
2. **Formspree** - Third-party form handling service
3. **Netlify Forms** - Built-in form processing
4. **Custom API** - Your own backend service

Update the form submission logic in `app/contact/page.tsx`.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with automatic builds on every push

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder to [Netlify](https://netlify.com)

### Other Platforms
The project works on any platform supporting static hosting or Node.js.

## 📈 Performance & SEO

- **Lighthouse Score:** 95+ across all metrics
- **Core Web Vitals:** Optimized for loading, interactivity, visual stability
- **SEO:** Meta tags, structured data, semantic HTML
- **Accessibility:** WCAG compliant with proper ARIA labels

## 🤝 Contributing

This is a personal portfolio template. Feel free to:
1. Fork the repository
2. Customize for your own use
3. Share improvements via pull requests
4. Report issues or suggestions

## 📄 License

MIT License - feel free to use this template for your own portfolio.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Lucide](https://lucide.dev/) - Icon library
- [Vercel](https://vercel.com/) - Deployment platform

---

Built with ❤️ by [Abdelmajid NIDNASSER](https://nidnasser.me)
