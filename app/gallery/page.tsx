import { Metadata } from 'next'
import path from 'path'
import { promises as fs } from 'fs'
import GalleryGrid from '../../components/ui/gallery-new'
import { AnimatedBackground } from '@/components/3d/animated-background'
import { Separator } from '@/components/ui/separator'
import { Camera, MapPin, Calendar, Images } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Gallery | Abdelmajid NIDNASSER',
  description: 'A photo gallery showcasing pictures I take.',
}

const SUPPORTED_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'])
const PREFERRED_FORMATS = ['.avif', '.webp', '.jpg', '.jpeg', '.png'] // Order of preference

async function findBestImageFormat(dir: string, baseName: string): Promise<string | null> {
  const nameWithoutExt = path.parse(baseName).name
  
  // Try formats in order of preference
  for (const ext of PREFERRED_FORMATS) {
    const testFile = `${nameWithoutExt}${ext}`
    const fullPath = path.join(dir, testFile)
    
    try {
      await fs.access(fullPath)
      return testFile // Return the filename, not the full path
    } catch {
      continue
    }
  }
  
  return null
}

type MetaRecord = { [filename: string]: { description?: string; location?: string } }
type ServerImageItem = { src: string; alt?: string; description?: string; location?: string; mtimeMs?: number }

const FALLBACK_LOCATIONS = [
  'Rabat',
  'Meknes',
  'Ain Karma',
  'Fes',
  'Casablanca',
  'Tangier',
  'Agadir',
  'Ifrane',
  'Chefchaouen',
  'Ouarzazate',
]

const FALLBACK_DESCRIPTIONS = [
  'Golden hour',
  'Street scene',
  'Quiet morning',
  'City lights',
  'Candid moment',
  'Seaside breeze',
  'Mountain trail',
  'Old medina',
  'Sunset silhouette',
  'Night reflections',
]

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

async function getImages(): Promise<ServerImageItem[]> {
  const dir = path.join(process.cwd(), 'public', 'gallery')
  try {
    // Load optional metadata.json if present
    let meta: MetaRecord = {}
    try {
      const metaPath = path.join(dir, 'metadata.json')
      const raw = await fs.readFile(metaPath, 'utf-8')
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        // Support array form: [{ file, description, location }]
        meta = parsed.reduce<MetaRecord>((acc, item) => {
          if (item && typeof item.file === 'string') {
            acc[item.file] = {
              description: item.description,
              location: item.location,
            }
          }
          return acc
        }, {})
      } else if (parsed && typeof parsed === 'object') {
        // Support object map form: { "file.jpg": { description, location } }
        meta = parsed as MetaRecord
      }
    } catch {
      // No metadata.json found or invalid JSON; proceed without metadata
    }

    const entries = await fs.readdir(dir, { withFileTypes: true })
    const allFiles = entries
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .filter((name) => SUPPORTED_EXT.has(path.extname(name).toLowerCase()))
    
    // Get unique base names (without extension) to avoid duplicates
    const baseNames = new Set<string>()
    allFiles.forEach(filename => {
      const baseName = path.parse(filename).name
      baseNames.add(baseName)
    })
    
    // Find the best format for each base name
    const bestFiles = await Promise.all(
      Array.from(baseNames).map(async (baseName) => {
        const bestFormat = await findBestImageFormat(dir, baseName)
        return bestFormat
      })
    )
    
    const files = bestFiles.filter(Boolean) as string[]
    
    const withStats = await Promise.all(
      files.map(async (name) => {
        let mtimeMs: number | undefined = undefined
        try {
          const st = await fs.stat(path.join(dir, name))
          mtimeMs = st.mtimeMs
        } catch {}
        const loc = meta[name]?.location as string | undefined
        const desc = meta[name]?.description as string | undefined
        const fallbackLoc = loc || pick(FALLBACK_LOCATIONS)
        const fallbackDesc = desc || `${pick(FALLBACK_DESCRIPTIONS)} in ${fallbackLoc}`
        return {
          src: `/gallery/${name}`,
          alt: fallbackDesc,
          description: fallbackDesc,
          location: fallbackLoc,
          mtimeMs,
        } satisfies ServerImageItem
      })
    )
    return withStats
  } catch {
    // Directory might not exist yet
    return []
  }
}

export default async function GalleryPage() {
  let images: ServerImageItem[] = []
  try {
    images = await getImages()
  } catch (error) {
    console.error('Error loading images:', error)
    images = []
  }
  
  const uniqueLocations = new Set(images.map((i) => i.location).filter(Boolean) as string[])
  const lastUpdatedMs = images.length ? Math.max(...images.map((i) => i.mtimeMs || 0)) : 0
  const lastUpdated = lastUpdatedMs ? new Date(lastUpdatedMs).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' }) : null

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <AnimatedBackground />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              {/* Main Title */}
              <div className="flex flex-col items-center justify-center mb-6">
                {/* Camera Icon with Pulse Animation */}
                <div className="relative mb-4">
                  <Camera className="w-12 h-12 md:w-14 md:h-14 text-primary animate-pulse" />
                  {/* Flash Effect */}
                  <div className="absolute inset-0 w-12 h-12 md:w-14 md:h-14 bg-primary/20 rounded-full animate-ping"></div>
                  {/* Shutter Effect */}
                  <div className="absolute inset-0 w-12 h-12 md:w-14 md:h-14 border-2 border-primary/30 rounded-full animate-spin-slow"></div>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                  Photo Gallery
                </h1>
              </div>
              
              {/* Subtitle */}
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                A curated collection of moments captured through my lens, 
                showcasing the beauty of everyday life and travel adventures.
              </p>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto mb-8">
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4 md:p-6 transition-all hover:bg-card/70 animate-fade-up hover:scale-105" style={{ animationDelay: '0.1s' }}>
                  <div className="flex items-center justify-center mb-2">
                    <Images className="w-5 h-5 md:w-6 md:h-6 text-primary mr-2" />
                    <span className="text-2xl md:text-3xl font-bold text-foreground">{images.length}</span>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground">Photos</p>
                </div>
                
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4 md:p-6 transition-all hover:bg-card/70 animate-fade-up hover:scale-105" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center justify-center mb-2">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary mr-2" />
                    <span className="text-2xl md:text-3xl font-bold text-foreground">{uniqueLocations.size}</span>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground">Locations</p>
                </div>
                
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4 md:p-6 transition-all hover:bg-card/70 animate-fade-up hover:scale-105" style={{ animationDelay: '0.3s' }}>
                  <div className="flex items-center justify-center mb-2">
                    <Calendar className="w-5 h-5 md:w-6 md:h-6 text-primary mr-2" />
                    <span className="text-sm md:text-base font-bold text-foreground">{lastUpdated || 'N/A'}</span>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground">Last Updated</p>
                </div>
              </div>

              {/* Decorative Separator */}
              <div className="flex items-center justify-center my-8">
                <Separator className="max-w-xs opacity-30" />
                <div className="mx-4 w-2 h-2 bg-primary rounded-full"></div>
                <Separator className="max-w-xs opacity-30" />
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="pb-20 md:pb-28 lg:pb-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {images.length === 0 ? (
              <div className="text-center py-20 md:py-32">
                {/* Animated Loading State */}
                <div className="relative inline-block mb-6">
                  <Camera className="w-16 h-16 md:w-20 md:h-20 text-muted-foreground/50 mx-auto animate-pulse" />
                  {/* Camera Flash Effect */}
                  <div className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 bg-primary/30 rounded-full mx-auto animate-camera-flash"></div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-semibold text-muted-foreground mb-4 animate-fade-up">
                  No images found
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
                  Create the folder <code className="font-mono bg-muted px-2 py-1 rounded text-sm">public/gallery</code> and add your images.
                </p>
                <p className="text-sm text-muted-foreground/70 animate-fade-up" style={{ animationDelay: '0.4s' }}>
                  Supported formats: JPG, PNG, WebP, AVIF, GIF
                </p>
              </div>
            ) : (
              <div className="space-y-8 animate-photo-develop">
                {/* Gallery Title */}
                <div className="text-center animate-fade-up" style={{ animationDelay: '0.5s' }}>
                  <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
                    Latest Captures
                  </h2>
                  <p className="text-muted-foreground">
                    Click on any image to view it in full resolution
                  </p>
                </div>
                
                {/* Gallery Grid */}
                <div className="mt-8 md:mt-12 animate-fade-up" style={{ animationDelay: '0.7s' }}>
                  <GalleryGrid images={images} />
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}