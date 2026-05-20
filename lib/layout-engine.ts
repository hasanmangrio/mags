import { v4 as uuidv4 } from 'uuid'
import { Photo, MagazinePage, Magazine, PageTemplate } from './types'

// Sequence of templates for varied editorial rhythm
const EDITORIAL_SEQUENCE: PageTemplate[] = [
  'full-bleed',
  'dual',
  'editorial',
  'grid-4',
  'trio',
  'full-bleed',
  'editorial',
  'dual',
]

function pickTemplate(photosLeft: number, index: number): { template: PageTemplate; count: number } {
  if (photosLeft === 1) return { template: 'full-bleed', count: 1 }
  if (photosLeft === 2) return { template: 'dual', count: 2 }
  if (photosLeft === 3) return { template: 'trio', count: 3 }

  // For 4+ photos, follow the editorial sequence for variety
  const template = EDITORIAL_SEQUENCE[index % EDITORIAL_SEQUENCE.length]
  const count = template === 'grid-4' ? 4 : template === 'trio' ? 3 : template === 'dual' ? 2 : 1
  if (count > photosLeft) {
    return pickTemplate(photosLeft, index + 1)
  }
  return { template, count }
}

export function generateMagazine(tripId: string, photos: Photo[]): Magazine {
  if (photos.length === 0) {
    return { id: tripId, tripId, pages: [] }
  }

  const pages: MagazinePage[] = []

  // Cover page uses the first photo
  pages.push({
    id: uuidv4(),
    template: 'cover',
    photoIds: [photos[0].id],
    position: 0,
  })

  // Interior pages
  let remaining = photos.slice(1)
  let seqIndex = 0

  while (remaining.length > 0) {
    const { template, count } = pickTemplate(remaining.length, seqIndex)
    pages.push({
      id: uuidv4(),
      template,
      photoIds: remaining.slice(0, count).map((p) => p.id),
      position: pages.length,
    })
    remaining = remaining.slice(count)
    seqIndex++
  }

  // Back cover (no photos)
  pages.push({
    id: uuidv4(),
    template: 'back-cover',
    photoIds: [],
    position: pages.length,
  })

  return { id: tripId, tripId, pages }
}
