'use client'

import { useState } from 'react'
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
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      
      <div className="relative z-10 py-16">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Get In Touch
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Let&apos;s Work Together
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to bring your ideas to life? I&apos;m here to help you build something amazing.
              Choose your preferred way to reach out.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-6">Contact Information</h2>
                <p className="text-muted-foreground mb-6">
                  Choose your preferred way to reach out
                </p>
                <div className="space-y-4">
                  {contactMethods.map((method) => (
                    <div key={method.title} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <method.icon className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{method.title}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{method.description}</p>
                        {method.action ? (
                          <a
                            href={method.action}
                            className="text-sm text-primary hover:underline"
                          >
                            {method.value}
                          </a>
                        ) : (
                          <p className="text-sm text-foreground">{method.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Connect Online</h3>
                <div className="flex space-x-3">
                  {socialLinks.map((link) => (
                    <Button key={link.name} variant="outline" size="icon" asChild>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        <link.icon className="w-4 h-4" />
                        <span className="sr-only">{link.name}</span>
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Send a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and I&apos;ll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground">
                        Thank you for reaching out. I&apos;ll get back to you soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                            Name
                          </label>
                          <Input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                            Email
                          </label>
                          <Input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                          Subject
                        </label>
                        <Input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          placeholder="What's this about?"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          placeholder="Tell me about your project..."
                        />
                      </div>
                      <Button
                        type="submit"
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
                            Send Message
                            <Send className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Services Section */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Here&apos;s how I can help you achieve your goals
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/20 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{service.timeline}</span>
                      </div>
                      <span className="font-medium text-primary">{service.price}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Whether you need a full-stack application, AI integration, or backend development,
                I&apos;m here to help you build something amazing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="mailto:redaelhadfi1@gmail.com">
                    Start a Project
                    <Mail className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/resume">
                    View Resume
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
