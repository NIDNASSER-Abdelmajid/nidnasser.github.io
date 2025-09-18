"use client"

import { motion } from 'framer-motion'

export function GalleryHero({
  imagesCount,
  locationsCount,
  lastUpdated,
}: {
  imagesCount: number
  locationsCount: number
  lastUpdated?: string | null
}) {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent"
      >
        My Photo Gallery
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-lg lg:text-xl text-muted-foreground"
      >
        Moments, places, and light — curated from my lens. Drop images into <code className="font-mono">public/gallery</code> and optional metadata.json.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm"
      >
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
          {imagesCount} {imagesCount === 1 ? 'photo' : 'photos'}
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
          {locationsCount} {locationsCount === 1 ? 'location' : 'locations'}
        </div>
        {lastUpdated && (
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
            Updated {lastUpdated}
          </div>
        )}
      </motion.div>
    </div>
  )
}
