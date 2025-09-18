'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Homepage error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Something went wrong!
          </h1>
          
          <p className="text-muted-foreground mb-8">
            We encountered an unexpected error while loading the page. 
            This might be a temporary issue.
          </p>

          {process.env.NODE_ENV === 'development' && (
            <div className="bg-card border rounded-lg p-4 mb-8 text-left">
              <h3 className="font-semibold text-sm mb-2">Error Details:</h3>
              <pre className="text-xs text-muted-foreground overflow-auto">
                {error.message}
              </pre>
              {error.digest && (
                <p className="text-xs text-muted-foreground mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={reset} className="flex-1 sm:flex-none">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button variant="outline" asChild className="flex-1 sm:flex-none">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              If the problem persists, please{' '}
              <a 
                href="mailto:abdelmajidnidnasser1@gmail.com" 
                className="text-accent hover:underline"
              >
                contact me
              </a>
              {' '}and I&apos;ll look into it.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
