'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ZoomIn } from 'lucide-react'

type ImageItem = {
  src: string
  alt?: string
  description?: string
  location?: string
}

interface LazyImageProps {
  image: ImageItem
  index: number
  onOpenModal: (index: number) => void
}

export function LazyImage({ image, index, onOpenModal }: LazyImageProps) {
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Start loading 50px before it comes into view
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={imgRef}
      className="break-inside-avoid group cursor-pointer"
      onClick={() => onOpenModal(index)}
    >
      <div className="relative overflow-hidden rounded-lg bg-card/50 border border-border/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-auto">
          {isInView ? (
            <Image
              src={image.src}
              alt={image.alt || `Gallery image ${index + 1}`}
              width={400}
              height={600}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bTTHa92lDDtNZh9iGhQjCcuEj6cHxlmC6vJfIJyFEajVLz/fcW9MjrFqiMz6rBvqyNIf8lYd2ZT2+o6qcYGZv9nPP0xRvf5dO/vIqLPX04XHFN7xJLV5/wAhE3y73oKIdB/RTIz+8wPM6jgO42b8THrvXnb4eH/oi1eBLYHQo8dLGl+9ZKQ9JFAW0b/kCSSf7qXJIJB3P/9k="
            />
          ) : (
            // Placeholder skeleton
            <div className="w-full h-60 bg-muted/50 animate-pulse rounded" />
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {image.location && (
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mb-2 border-transparent bg-secondary text-secondary-foreground">
              <span className="w-3 h-3 mr-1">📍</span>
              {image.location}
            </div>
          )}
          {image.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {image.description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
