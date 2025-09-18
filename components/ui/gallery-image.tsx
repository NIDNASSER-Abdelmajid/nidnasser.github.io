'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ZoomIn } from 'lucide-react'

type ImageItem = {
  src: string
  alt?: string
  description?: string
  location?: string
}

interface GalleryImageProps {
  image: ImageItem
  index: number
  onOpenModal: (index: number) => void
}

export function GalleryImage({ image, index }: Omit<GalleryImageProps, 'onOpenModal'>) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Use consistent loading strategy to avoid hydration issues
  const shouldPrioritize = index < 4
  const shouldEagerLoad = index < 6

  return (
    <div className="relative aspect-auto">
      <Image
        src={image.src}
        alt={image.alt || `Gallery image ${index + 1}`}
        width={400}
        height={600}
        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        priority={isClient ? shouldPrioritize : false}
        loading={isClient && shouldEagerLoad ? "eager" : "lazy"}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bTTHa92lDDtNZh9iGhQjCcuEj6cHxlmC6vJfIJyFEajVLz/fcW9MjrFqiMz6rBvqyNIf8lYd2ZT2+o6qcYGZv9nPP0xRvf5dO/vIqLPX04XHFN7xJLV5/wAhE3y73oKIdB/RTIz+8wPM6jgO42b8THrvXnb4eH/oi1eBLYHQo8dLGl+9ZKQ9JFAW0b/kCSSf7qXJIJB3P/9k="
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
        <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  )
}
