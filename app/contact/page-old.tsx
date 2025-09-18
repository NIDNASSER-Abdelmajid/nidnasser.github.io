'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { AnimatedBackground } from '@/components/3d/animated-background'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  Send, 
  CheckCircle,
  MessageSquare,
  Briefcase,
  Coffee,
  Github,
  Linkedin
} from 'lucide-react'

const contactMethods = [
  {
    title: 'Email',
    description: 'Send me a message anytime',
    value: 'abdelmajidnidnasser1@gmail.com',
    icon: Mail,
    action: 'mailto:abdelmajidnidnasser1@gmail.com',
    primary: true,
  },
  {
    title: 'Phone',
    description: 'Call during business hours',
    value: '+212 767648267',
    icon: Phone,
    action: 'tel:+212767648267',
    primary: false,
  },
  {
    title: 'Location',
    description: 'Based in Rabat, Morocco',
    value: 'Available for remote work',
    icon: MapPin,
    action: null,
    primary: false,
  },
]

const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/abdelmajid-nidnasser',
    icon: Linkedin,
    description: 'Professional network',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/NIDNASSER-Abdelmajid',
    icon: Github,
    description: 'Code repositories',
  },
  {
    name: 'Freelancer.com',
    url: 'https://www.freelancer.com/u/NIDNASSER',
    icon: Briefcase,
    description: '5.0★ rating with 48+ reviews',
  },
]

const services = [
  {
    title: 'Backend Development',
    description: 'Python/Django REST APIs, database design, and scalable backend systems with AWS deployment.',
    icon: Briefcase,
    timeline: '1-4 weeks',
    price: '$30/hour',
  },
  {
    title: 'Data Science & AI',
    description: 'Machine learning models, computer vision, OCR solutions, and data extraction automation.',
    icon: MessageSquare,
    timeline: '2-6 weeks',
    price: 'Project-based',
  },
  {
    title: 'Full-Stack Solutions',
    description: 'Complete web applications with React/Next.js frontend and Python backend integration.',
    icon: Coffee,
    timeline: '2-8 weeks',
    price: 'Custom quote',
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    projectType: 'general',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background relative overflow-x-hidden flex items-center justify-center">
        {/* 3D Animated Background */}
        <div className="fixed top-0 left-0 w-full h-full -z-10">
          <AnimatedBackground />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Message Sent!</h1>
            <p className="text-muted-foreground mb-8">
              Thank you for reaching out. I&apos;ll get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setIsSubmitted(false)}>
                Send Another Message
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* 3D Animated Background */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <AnimatedBackground />
      </div>
      
      <div className="relative z-10">
        {/* Header Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              Let&apos;s Connect
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Ready to Start Something Amazing?
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Whether you&apos;re looking to build an AI solution, need a reliable full-stack developer, 
              or want to discuss a potential collaboration, I&apos;d love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary">
                <Clock className="w-3 h-3 mr-1" />
                24h Response Time
              </Badge>
              <Badge variant="secondary">
                <Calendar className="w-3 h-3 mr-1" />
                Free Consultation
              </Badge>
              <Badge variant="secondary">
                <MapPin className="w-3 h-3 mr-1" />
                Remote Available
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Send Me a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and I&apos;ll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Full Name *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email Address *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                          Project Type
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="ai-ml">AI/ML Project</option>
                          <option value="fullstack">Full-Stack Development</option>
                          <option value="consulting">Consulting</option>
                          <option value="mentoring">Mentoring</option>
                          <option value="collaboration">Collaboration</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                          Subject *
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          placeholder="Brief description of your project or inquiry"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          placeholder="Tell me more about your project, timeline, budget, and any specific requirements..."
                        />
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>

                      <p className="text-sm text-muted-foreground text-center">
                        By sending this message, you agree that I may contact you regarding your inquiry. 
                        Your information will never be shared with third parties.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info Sidebar */}
              <div className="space-y-8">
                {/* Contact Methods */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>
                      Choose your preferred way to reach out
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {contactMethods.map((method) => (
                      <div key={method.title} className="flex items-start">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                          method.primary ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        }`}>
                          <method.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{method.title}</h4>
                          <p className="text-sm text-muted-foreground mb-1">
                            {method.description}
                          </p>
                          {method.action ? (
                            <Link 
                              href={method.action} 
                              className="text-sm font-medium text-primary hover:underline"
                            >
                              {method.value}
                            </Link>
                          ) : (
                            <p className="text-sm font-medium">{method.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Services */}
                <Card>
                  <CardHeader>
                    <CardTitle>Services & Rates</CardTitle>
                    <CardDescription>
                      What I can help you with
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {services.map((service) => (
                      <div key={service.title}>
                        <div className="flex items-center mb-2">
                          <service.icon className="w-4 h-4 text-primary mr-2" />
                          <h4 className="font-semibold text-sm">{service.title}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {service.description}
                        </p>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Timeline: {service.timeline}</span>
                          <span className="font-medium">{service.price}</span>
                        </div>
                        <div className="border-b mt-3 last:border-b-0" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Social Links */}
                <Card>
                  <CardHeader>
                    <CardTitle>Connect on Social</CardTitle>
                    <CardDescription>
                      Follow my journey and latest updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {socialLinks.map((social) => (
                      <Button 
                        key={social.name} 
                        variant="outline" 
                        className="w-full justify-start" 
                        asChild
                      >
                        <Link href={social.url} target="_blank" rel="noopener noreferrer">
                          <social.icon className="w-4 h-4 mr-3" />
                          <div className="text-left">
                            <div className="font-medium">{social.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {social.description}
                            </div>
                          </div>
                        </Link>
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                {/* Availability */}
                <Card>
                  <CardHeader>
                    <CardTitle>Availability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Current Status</span>
                        <Badge variant="default" className="text-xs">
                          Available
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Response Time</span>
                        <span className="text-muted-foreground">Within 24h</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Time Zone</span>
                        <span className="text-muted-foreground">GMT+1</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Next Available</span>
                        <span className="text-muted-foreground">Immediately</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2">How quickly can you start a project?</h3>
                <p className="text-sm text-muted-foreground">
                  I can typically start within 1-2 weeks, depending on my current commitments and the project scope.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Do you work with international clients?</h3>
                <p className="text-sm text-muted-foreground">
                  Absolutely! I work with clients globally and am experienced in remote collaboration across time zones.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What&apos;s your preferred project size?</h3>
                <p className="text-sm text-muted-foreground">
                  I work on projects of all sizes, from small AI prototypes to large-scale web applications.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Do you provide ongoing maintenance?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, I offer maintenance packages and can provide ongoing support for projects I&apos;ve developed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}
