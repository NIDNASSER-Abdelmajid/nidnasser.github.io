'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, MapPin, Download, ZoomIn, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'

type ImageItem = {
  src: string
  alt?: string
  description?: string
  location?: string
}

interface GalleryGridProps {
  images: ImageItem[]
}

export default function GalleryGrid({ images = [] }: GalleryGridProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [imageLoading, setImageLoading] = useState(false)
  const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set())

  // Preload adjacent images when modal opens
  useEffect(() => {
    if (selectedImageIndex !== null) {
      const toPreload = []
      
      // Preload previous image
      if (selectedImageIndex > 0) {
        toPreload.push(selectedImageIndex - 1)
      }
      
      // Preload next image
      if (selectedImageIndex < images.length - 1) {
        toPreload.push(selectedImageIndex + 1)
      }

      toPreload.forEach(index => {
        if (!preloadedImages.has(index)) {
          const img = new window.Image()
          img.src = images[index].src
          img.onload = () => {
            setPreloadedImages(prev => new Set([...prev, index]))
          }
        }
      })
    }
  }, [selectedImageIndex, images, preloadedImages])

  const openModal = (index: number) => {
    setSelectedImageIndex(index)
    setImageLoading(true)
    document.body.style.overflow = 'hidden'
    document.body.classList.add('modal-open')
  }

  const closeModal = () => {
    setSelectedImageIndex(null)
    setImageLoading(false)
    document.body.style.overflow = 'auto'
    document.body.classList.remove('modal-open')
  }

  const goToPrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setImageLoading(true)
      setSelectedImageIndex(selectedImageIndex - 1)
    }
  }

  const goToNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
      setImageLoading(true)
      setSelectedImageIndex(selectedImageIndex + 1)
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null || imageLoading) return
      
      if (e.key === 'Escape') {
        setSelectedImageIndex(null)
        setImageLoading(false)
        document.body.style.overflow = 'auto'
        document.body.classList.remove('modal-open')
      }
      if (e.key === 'ArrowLeft' && selectedImageIndex > 0) {
        setImageLoading(true)
        setSelectedImageIndex(selectedImageIndex - 1)
      }
      if (e.key === 'ArrowRight' && selectedImageIndex < images.length - 1) {
        setImageLoading(true)
        setSelectedImageIndex(selectedImageIndex + 1)
      }
    }

    if (selectedImageIndex !== null) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedImageIndex, images.length, imageLoading])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto'
      document.body.classList.remove('modal-open')
    }
  }, [])

  const handleDownload = async (src: string, filename?: string) => {
    try {
      const response = await fetch(src)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename || 'image.jpg'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to download image:', error)
    }
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">No images to display</p>
      </div>
    )
  }

  return (
    <>
      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
        {images.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="break-inside-avoid group cursor-pointer"
            onClick={() => openModal(index)}
          >
            <div className="relative overflow-hidden rounded-lg bg-card/50 border border-border/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
              {/* Image */}
              <div className="relative aspect-auto">
                <Image
                  src={image.src}
                  alt={image.alt || `Gallery image ${index + 1}`}
                  width={400}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bTTHa92lDDDtNZh9iGhQjCcuEj6cHxlmC6vJfIJyFEajVLz/fcW9MjrFqiMz6rBvqyNIf8lYd2ZT2+o6qcYGZv9nPP0xRvf5dO/vIqLPX04XHFN7xJLV5/wAhE3y73oKIdB/RTIz+8wPM6jgO42b8THrvXnb4eH/oi1eBLYHQo8dLGl+9ZKQ9JFAW0b/kCSSf7qXJIJB3P/9k="
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {image.location && (
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mb-2 border-transparent bg-secondary text-secondary-foreground">
                    <MapPin className="w-3 h-3 mr-1" />
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
        ))}
      </div>

      {/* Modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[999999] bg-black/95 backdrop-blur-sm"
          onClick={closeModal}
          tabIndex={0}
        >
          {/* Modal Content Container */}
          <div className="h-full flex flex-col p-2 md:p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3 flex-shrink-0">
              <div className="flex items-center space-x-2 md:space-x-3">
                {images[selectedImageIndex].location && (
                  <div className="inline-flex items-center rounded-full border px-2 md:px-2.5 py-0.5 text-xs font-semibold border-white/20 bg-black/40 text-white backdrop-blur">
                    <MapPin className="w-3 h-3 mr-1" />
                    {images[selectedImageIndex].location}
                  </div>
                )}
                <div className="text-xs md:text-sm text-white/80">
                  {selectedImageIndex + 1} / {images.length}
                </div>
              </div>
              
              <div className="flex items-center space-x-1 md:space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDownload(
                      images[selectedImageIndex].src,
                      images[selectedImageIndex].src.split('/').pop()
                    )
                  }}
                  className="p-1.5 md:p-2 rounded-lg bg-black/40 hover:bg-black/60 text-white backdrop-blur border border-white/20 transition-colors"
                  title="Download"
                >
                  <Download className="w-3 h-3 md:w-4 md:h-4" />
                </button>
                <button
                  onClick={closeModal}
                  className="p-1.5 md:p-2 rounded-lg bg-black/40 hover:bg-black/60 text-white backdrop-blur border border-white/20 transition-colors"
                  title="Close"
                >
                  <X className="w-3 h-3 md:w-4 md:h-4" />
                </button>
              </div>
            </div>

            {/* Image Container */}
            <div className="flex-1 flex items-center justify-center relative min-h-0">
              {/* Loading spinner */}
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-lg z-10">
                  <div className="flex flex-col items-center space-y-3">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                    <p className="text-white text-sm">Loading image...</p>
                  </div>
                </div>
              )}
              
              <div
                className="relative max-w-full max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={images[selectedImageIndex].src}
                  alt={images[selectedImageIndex].alt || `Gallery image ${selectedImageIndex + 1}`}
                  width={1200}
                  height={800}
                  className={`max-w-[90vw] max-h-[60vh] md:max-h-[70vh] w-auto h-auto object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${
                    imageLoading ? 'opacity-50' : 'opacity-100'
                  }`}
                  sizes="90vw"
                  priority
                  onLoadingComplete={() => setImageLoading(false)}
                  onError={() => setImageLoading(false)}
                />
              </div>
            </div>

            {/* Footer - Description */}
            {images[selectedImageIndex].description && (
              <div className="mt-3 flex-shrink-0">
                <div className="max-w-4xl mx-auto p-3 md:p-4 rounded-lg bg-black/70 backdrop-blur-md border border-white/30">
                  <div className="max-h-16 md:max-h-20 overflow-y-auto gallery-description-scroll">
                    <p className="text-xs md:text-sm text-white text-center leading-relaxed">
                      {images[selectedImageIndex].description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          {selectedImageIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (!imageLoading) goToPrevious()
              }}
              disabled={imageLoading}
              className={`fixed left-2 md:left-4 top-1/2 -translate-y-1/2 z-[1000000] p-2 md:p-3 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur border border-white/30 transition-colors ${
                imageLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              title="Previous"
            >
              <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
            </button>
          )}
          
          {selectedImageIndex < images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (!imageLoading) goToNext()
              }}
              disabled={imageLoading}
              className={`fixed right-2 md:right-4 top-1/2 -translate-y-1/2 z-[1000000] p-2 md:p-3 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur border border-white/30 transition-colors ${
                imageLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              title="Next"
            >
              <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
            </button>
          )}
        </div>
      )}
    </>
  )
}
