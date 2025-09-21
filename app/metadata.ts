import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Abdelmajid NIDNASSER — PhD Candidate & Data Engineer',
  description: 'Portfolio of Abdelmajid NIDNASSER, Computer Science Engineer & PhD Candidate and freelance AI & full‑stack engineer specializing in Python. Explore case studies, experience, and get in touch.',
  keywords: [
    'AI Architect',
    'Full-Stack Engineer', 
    'Machine Learning Engineer',
    'Python Developer',
    'PhD Candidate',
    'Computer Science Engineer',
    'PhD',
    'Freelancer',
    'INPT',
    'Morocco',
    'Rabat',
    'Portfolio',
    'Web Privacy'
  ],
  authors: [{ name: 'Abdelmajid NIDNASSER', url: 'https://nidnasser.me' }],
  creator: 'Abdelmajid NIDNASSER',
  publisher: 'Abdelmajid NIDNASSER',
  metadataBase: new URL('https://nidnasser.me'),
  alternates: {
    canonical: 'https://nidnasser.me',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nidnasser.me',
    siteName: 'Abdelmajid NIDNASSER Portfolio',
    title: 'Abdelmajid NIDNASSER — PhD Candidate & Data Engineer',
    description: 'Portfolio of Abdelmajid NIDNASSER, Computer Science Engineer & PhD Candidate and freelance AI & full‑stack engineer specializing in Python. Explore case studies, experience, and get in touch.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Abdelmajid NIDNASSER - PhD Candidate & Data Engineer',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@abdelmajid_nid',
    creator: '@abdelmajid_nid',
    title: 'Abdelmajid NIDNASSER — PhD Candidate & Data Engineer',
    description: 'Portfolio of Abdelmajid NIDNASSER, Computer Science Engineer & PhD Candidate and freelance AI & full‑stack engineer specializing in Python. Explore case studies, experience, and get in touch.',
    images: ['/og-image.jpg'],
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
  verification: {
    // Add verification IDs when available
    // google: 'google-verification-code',
    // yandex: 'yandex-verification-code',
    // yahoo: 'yahoo-verification-code',
  },
  category: 'technology',
  classification: 'Portfolio Website',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'theme-color': '#100C08',
    'color-scheme': 'dark',
  },
}

export default metadata
