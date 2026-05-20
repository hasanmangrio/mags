export interface Photo {
  id: string
  tripId: string
  filename: string
  data: Blob
  width: number
  height: number
  aspectRatio: number
  order: number
}

export interface Trip {
  id: string
  name: string
  subtitle?: string
  date: string
  createdAt: string
  photoCount: number
  coverPhotoId?: string
}

export type PageTemplate =
  | 'cover'
  | 'full-bleed'
  | 'dual'
  | 'grid-4'
  | 'editorial'
  | 'trio'
  | 'back-cover'

export interface MagazinePage {
  id: string
  template: PageTemplate
  photoIds: string[]
  position: number
}

export interface Magazine {
  id: string
  tripId: string
  pages: MagazinePage[]
}
