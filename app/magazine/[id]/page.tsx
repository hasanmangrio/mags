'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { getTrip, getMagazine, getPhotosByTrip } from '@/lib/storage'
import { Trip, Magazine as MagazineType, Photo } from '@/lib/types'

// Client-only — react-pageflip uses canvas/DOM APIs
const MagazineViewer = dynamic(() => import('@/components/MagazineViewer'), { ssr: false })

interface PageProps {
  params: Promise<{ id: string }>
}

export default function MagazinePage({ params }: PageProps) {
  const { id } = use(params)
  const [trip, setTrip] = useState<Trip | null>(null)
  const [magazine, setMagazine] = useState<MagazineType | null>(null)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function load() {
      const [t, m, p] = await Promise.all([
        getTrip(id),
        getMagazine(id),
        getPhotosByTrip(id),
      ])
      if (!t || !m) {
        setNotFound(true)
      } else {
        setTrip(t)
        setMagazine(m)
        setPhotos(p)
      }
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-6 h-6 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="font-serif text-2xl text-neutral-800">Magazine not found</p>
        <Link href="/" className="text-sm text-neutral-400 tracking-widest uppercase hover:text-neutral-700 transition-colors">
          ← Back to shelf
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white no-print">
        <div className="max-w-5xl mx-auto px-8 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-neutral-400 text-xs tracking-widest uppercase hover:text-neutral-700 transition-colors"
          >
            ← Shelf
          </Link>
          <div className="text-center">
            <p className="font-serif text-lg text-neutral-900">{trip!.name}</p>
            <p className="text-neutral-400 text-[10px] tracking-widest uppercase">
              {new Date(trip!.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className="w-16" /> {/* Spacer */}
        </div>
      </header>

      <main className="overflow-hidden">
        <MagazineViewer
          magazine={magazine!}
          trip={trip!}
          photos={photos}
        />
      </main>
    </div>
  )
}
