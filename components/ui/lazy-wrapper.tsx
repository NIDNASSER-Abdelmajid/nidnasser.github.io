'use client'

import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'

interface LazyWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  className?: string
}

export function LazyWrapper({ children, fallback, className }: LazyWrapperProps) {
  const defaultFallback = (
    <motion.div 
      className={`flex items-center justify-center min-h-[200px] ${className || ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-cyan-400 rounded-full"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  )

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  )
}

// Higher-order component for lazy loading
export function withLazyLoading<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  displayName?: string
) {
  const LazyComponent = lazy(() => Promise.resolve({ default: WrappedComponent }))
  
  const Component = (props: P) => (
    <LazyWrapper>
      <LazyComponent {...props} />
    </LazyWrapper>
  )
  
  Component.displayName = displayName || `LazyLoaded(${WrappedComponent.displayName || WrappedComponent.name})`
  
  return Component
}
