"use client"

import Image from 'next/image'
import { useEffect, useMemo, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Download, ExternalLink, Link as LinkIcon, SortAsc, SortDesc, MapPin } from 'lucide-react'

type ImageItem = { src: string; alt?: string; description?: string; location?: string }

export default function GalleryGrid({ images = [] }: { images?: ImageItem[] }) {
  const [active, setActive] = useState<number | null>(null)
  const [sortAsc, setSortAsc] = useState(true)
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState<string>('all')
  const [dense, setDense] = useState(false)
  const [shuffleKey, setShuffleKey] = useState(0)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  const locations = useMemo(() => {
    const safeImages = images || []
    return Array.from(new Set(safeImages.map((i) => i.location).filter(Boolean) as string[])).sort()
  }, [images])

  const filtered = useMemo(() => {
    const safeImages = images || []
    const q = query.trim().toLowerCase()
    return safeImages.filter((i) => {
      const matchesQuery = !q || `${i.description || ''} ${i.location || ''}`.toLowerCase().includes(q)
      const matchesLoc = location === 'all' || i.location === location
      return matchesQuery && matchesLoc
    })
  }, [images, query, location])

  const sorted = useMemo(() => {
    const list = [...filtered]
    list.sort((a, b) => {
      const ka = (a.description || a.alt || '').toLowerCase()
      const kb = (b.description || b.alt || '').toLowerCase()
      return sortAsc ? ka.localeCompare(kb) : kb.localeCompare(ka)
    })
    // If shuffleKey changed, apply a Fisher-Yates shuffle deterministically based on the key
    if (shuffleKey) {
      let seed = shuffleKey
      const rand = () => {
        // simple LCG for determinism across renders
        seed = (seed * 1664525 + 1013904223) % 4294967296
        return seed / 4294967296
      }
      for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1))
        ;[list[i], list[j]] = [list[j], list[i]]
      }
    }
    return list
  }, [filtered, sortAsc, shuffleKey])

  const open = useCallback((idx: number) => setActive(idx), [])
  const close = useCallback(() => setActive(null), [])
  const next = useCallback(() => setActive((i) => (i === null ? 0 : (i + 1) % sorted.length)), [sorted.length])
  const prev = useCallback(() => setActive((i) => (i === null ? 0 : (i - 1 + sorted.length) % sorted.length)), [sorted.length])

  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, close, next, prev])

  // Lock background scroll when lightbox is open
  useEffect(() => {
    if (active !== null) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [active])

  return (
    <div>
  <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-12 text-sm">
        <div className="md:col-span-6">
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search description or location..."
              className="flex-1 bg-transparent outline-none placeholder:text-white/50"
            />
          </div>
        </div>
        <div className="md:col-span-3">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2"
          >
            <option value="all">All locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-3 flex items-center justify-end gap-2">
          <button
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition"
            onClick={() => setSortAsc((v) => !v)}
          >
            {sortAsc ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            Sort {sortAsc ? 'A→Z' : 'Z→A'}
          </button>
          <button
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition"
            onClick={() => setDense((v) => !v)}
            aria-pressed={dense}
          >
            {dense ? 'Comfortable' : 'Compact'}
          </button>
          <button
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition"
            onClick={() => setShuffleKey((k) => (k + 1) | 0)}
          >
            Shuffle
          </button>
        </div>
      </div>

      <motion.div
        className={`columns-1 sm:columns-2 lg:columns-3 ${dense ? 'gap-4' : 'gap-6'} [column-fill:balance]`}
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03 } } }}
      >
        {sorted.map((img, idx) => (
          <motion.button
            key={img.src}
            onClick={() => open(idx)}
            className="group mb-5 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-sm transition-transform hover:shadow-xl hover:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
          >
            <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
              <Image src={img.src} alt={img.alt || img.description || 'Photo'} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              {(img.description || img.location) && (
                <div className="absolute inset-x-3 bottom-3 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 p-2.5 text-left opacity-0 group-hover:opacity-100 transition-opacity">
                  {img.description && (
                    <div className="text-xs sm:text-[13px] text-white/95 leading-tight line-clamp-2">{img.description}</div>
                  )}
                  {img.location && (
                    <div className="mt-1 inline-flex items-center gap-1.5 text-[11px] text-white/80">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="truncate">{img.location}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {active !== null && sorted[active] && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button onClick={close} aria-label="Close" className="absolute top-4 right-4 p-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10">
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous" className="absolute left-4 md:left-8 p-2 rounded-md bg-white/10 hover:bg-white/20 text-white">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next" className="absolute right-4 md:right-8 p-2 rounded-md bg-white/10 hover:bg-white/20 text-white">
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              className="relative w-[92vw] max-w-6xl h-[62vh] md:h-[78vh] bg-white/5 rounded-lg border border-white/10"
              initial={{ scale: 0.98, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => setTouchStartX(e.touches[0]?.clientX ?? null)}
              onTouchEnd={(e) => {
                if (touchStartX === null) return
                const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX
                if (dx > 40) prev()
                if (dx < -40) next()
                setTouchStartX(null)
              }}
            >
              {/* Index indicator */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[5] pointer-events-none p-3">
                <div className="rounded-full bg-white/10 border border-white/10 backdrop-blur px-2.5 py-1 text-xs text-white/90">
                  {active + 1} / {sorted.length}
                </div>
              </div>

              {/* Top-right actions */}
              <div className="absolute top-3 right-3 z-[6] flex items-center gap-1.5">
                <a
                  href={sorted[active].src}
                  download
                  aria-label="Download"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-white/10 hover:bg-white/20 text-white border border-white/10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Download className="w-4 h-4" />
                </a>
                <a
                  href={sorted[active].src}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open in new tab"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-white/10 hover:bg-white/20 text-white border border-white/10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  aria-label="Copy link"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-white/10 hover:bg-white/20 text-white border border-white/10"
                  onClick={async (e) => {
                    e.stopPropagation()
                    try {
                      await navigator.clipboard.writeText(window.location.origin + sorted[active].src)
                    } catch {}
                  }}
                >
                  <LinkIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Large click zones for navigation */}
              <div className="absolute inset-y-0 left-0 w-1/3 cursor-w-resize" onClick={(e) => { e.stopPropagation(); prev(); }} />
              <div className="absolute inset-y-0 right-0 w-1/3 cursor-e-resize" onClick={(e) => { e.stopPropagation(); next(); }} />
              <Image src={sorted[active].src} alt={sorted[active].alt || sorted[active].description || 'Photo'} fill className="object-contain" />

              {(sorted[active].description || sorted[active].location) && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <div className="mx-auto max-w-2xl pointer-events-auto rounded-lg bg-black/35 backdrop-blur border border-white/10 px-4 py-3 sm:px-5 sm:py-3.5 text-center">
                    {sorted[active].description && (
                      <div className="text-white/95 text-[15px] sm:text-base font-medium leading-relaxed">
                        {sorted[active].description}
                      </div>
                    )}
                    {sorted[active].location && (
                      <div className="mt-1 inline-flex items-center justify-center gap-1.5 text-xs text-white/80">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="truncate">{sorted[active].location}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
