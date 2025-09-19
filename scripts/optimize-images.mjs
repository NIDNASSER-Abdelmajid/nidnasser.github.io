#!/usr/bin/env node

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const GALLERY_DIR = './public/gallery';
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'];

async function optimizeImage(imagePath, outputPath, format = 'webp') {
  try {
    const image = sharp(imagePath);
    
    let processor = image;
    
    if (format === 'webp') {
      processor = processor.webp({ 
        quality: 85, 
        effort: 6 // Higher effort for better compression
      });
    } else if (format === 'avif') {
      processor = processor.avif({ 
        quality: 80, 
        effort: 6 
      });
    }
    
    await processor.toFile(outputPath);
    
    const originalStat = await stat(imagePath);
    const optimizedStat = await stat(outputPath);
    
    const savings = ((originalStat.size - optimizedStat.size) / originalStat.size * 100).toFixed(1);
    
    console.log(`✅ Optimized: ${imagePath}`);
    console.log(`   Original: ${(originalStat.size / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Optimized: ${(optimizedStat.size / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Savings: ${savings}%\n`);
    
    return { original: originalStat.size, optimized: optimizedStat.size };
  } catch (error) {
    console.error(`❌ Error optimizing ${imagePath}:`, error.message);
    return null;
  }
}

async function main() {
  if (!existsSync(GALLERY_DIR)) {
    console.error(`Gallery directory ${GALLERY_DIR} does not exist`);
    process.exit(1);
  }
  
  try {
    const files = await readdir(GALLERY_DIR);
    const imageFiles = files.filter(file => 
      SUPPORTED_FORMATS.some(ext => file.toLowerCase().endsWith(ext))
    );
    
    if (imageFiles.length === 0) {
      console.log('No images found to optimize');
      return;
    }
    
    console.log(`Found ${imageFiles.length} images to optimize\n`);
    
    let totalOriginal = 0;
    let totalOptimized = 0;
    let optimizedCount = 0;
    
    // Create WebP versions
    for (const file of imageFiles) {
      const imagePath = join(GALLERY_DIR, file);
      const webpPath = join(GALLERY_DIR, file.replace(/\.(jpe?g|png)$/i, '.webp'));
      
      // Skip if WebP already exists
      if (existsSync(webpPath)) {
        console.log(`⏭️  WebP already exists: ${webpPath}`);
        continue;
      }
      
      const result = await optimizeImage(imagePath, webpPath, 'webp');
      
      if (result) {
        totalOriginal += result.original;
        totalOptimized += result.optimized;
        optimizedCount++;
      }
    }
    
    // Create AVIF versions for even better compression (optional)
    for (const file of imageFiles) {
      const imagePath = join(GALLERY_DIR, file);
      const avifPath = join(GALLERY_DIR, file.replace(/\.(jpe?g|png)$/i, '.avif'));
      
      // Skip if AVIF already exists
      if (existsSync(avifPath)) {
        console.log(`⏭️  AVIF already exists: ${avifPath}`);
        continue;
      }
      
      const result = await optimizeImage(imagePath, avifPath, 'avif');
      
      if (result) {
        // Don't add to totals to avoid double counting
        console.log(`📊 AVIF created as alternative format`);
      }
    }
    
    if (optimizedCount > 0) {
      const totalSavings = ((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1);
      
      console.log('\n📈 OPTIMIZATION SUMMARY:');
      console.log(`Images processed: ${optimizedCount}`);
      console.log(`Original total: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB`);
      console.log(`Optimized total: ${(totalOptimized / 1024 / 1024).toFixed(2)}MB`);
      console.log(`Total savings: ${totalSavings}%`);
      console.log(`\n✨ Your images are now optimized for faster loading!`);
      console.log(`\n💡 Tip: Next.js will automatically serve the best format (AVIF > WebP > JPEG) based on browser support.`);
    } else {
      console.log('\n✅ All images are already optimized!');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
