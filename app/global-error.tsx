'use client'

import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="bg-background text-foreground">
        <div className="min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-10 h-10 text-destructive" />
              </div>
              
              <h1 className="text-2xl font-bold text-foreground mb-4">
                Application Error
              </h1>
              
              <p className="text-muted-foreground mb-8">
                Something went wrong with the application. Please try refreshing the page.
              </p>
              
              <Button onClick={reset} size="lg">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>

              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  If the problem persists, please contact{' '}
                  <a 
                    href="mailto:abdelmajidnidnasser1@gmail.com" 
                    className="text-accent hover:underline"
                  >
                    abdelmajidnidnasser1@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
