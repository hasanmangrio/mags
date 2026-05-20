'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import Link from 'next/link'
import PhotoUpload, { UploadedPhoto } from '@/components/PhotoUpload'
import { saveTrip, savePhoto, saveMagazine } from '@/lib/storage'
import { generateMagazine } from '@/lib/layout-engine'
import { Photo, Trip } from '@/lib/types'

export default function NewMagazinePage() {
  const router = useRouter()
  const [tripName, setTripName] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0])
  const [photos, setPhotos] = useState<UploadedPhoto[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState('')

  const handlePhotosChange = useCallback((updated: UploadedPhoto[]) => {
    setPhotos(updated)
  }, [])

  async function handleCreate() {
    if (!tripName.trim()) {
      setError('Please enter a name for your trip.')
      return
    }
    if (photos.length === 0) {
      setError('Please add at least one photo.')
      return
    }

    setIsCreating(true)
    setError('')

    try {
      const tripId = uuidv4()

      // Save each photo to IndexedDB
      const savedPhotos: Photo[] = await Promise.all(
        photos.map(async (p, i) => {
          const photo: Photo = {
            id: uuidv4(),
            tripId,
            filename: p.file.name,
            data: p.file,
            width: p.width,
            height: p.height,
            aspectRatio: p.width / p.height,
            order: i,
          }
          await savePhoto(photo)
          return photo
        })
      )

      // Save trip
      const trip: Trip = {
        id: tripId,
        name: tripName.trim(),
        subtitle: subtitle.trim() || undefined,
        date,
        createdAt: new Date().toISOString(),
        photoCount: savedPhotos.length,
        coverPhotoId: savedPhotos[0]?.id,
      }
      await saveTrip(trip)

      // Generate magazine layout
      const magazine = generateMagazine(tripId, savedPhotos)
      await saveMagazine(magazine)

      router.push(`/magazine/${tripId}`)
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
      setIsCreating(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="max-w-2xl mx-auto px-8 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-xl text-neutral-900 hover:text-neutral-600 transition-colors">
            Mags
          </Link>
          <span className="text-neutral-400 text-xs tracking-widest uppercase">New Magazine</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-8 py-12">
        <div className="mb-10">
          <h2 className="font-serif text-3xl text-neutral-900 mb-2">Create a Magazine</h2>
          <p className="text-neutral-400 text-sm">
            Name your trip, upload your photos, and we'll build the layout.
          </p>
        </div>

        <div className="space-y-8">
          {/* Trip name */}
          <div>
            <label className="text-xs tracking-widest uppercase text-neutral-500 block mb-2">
              Trip Name *
            </label>
            <input
              type="text"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              placeholder="e.g. Lake Como, Italy"
              className="w-full border border-neutral-300 px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-800 font-serif text-lg"
            />
          </div>

          {/* Subtitle (optional) */}
          <div>
            <label className="text-xs tracking-widest uppercase text-neutral-500 block mb-2">
              Subtitle <span className="normal-case text-neutral-400">(optional)</span>
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. Summer Escape · June 2024"
              className="w-full border border-neutral-300 px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-800 text-sm"
            />
          </div>

          {/* Date */}
          <div>
            <label className="text-xs tracking-widest uppercase text-neutral-500 block mb-2">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-neutral-300 px-4 py-3 text-neutral-900 focus:outline-none focus:border-neutral-800 text-sm"
            />
          </div>

          {/* Photos */}
          <div>
            <label className="text-xs tracking-widest uppercase text-neutral-500 block mb-2">
              Photos *
            </label>
            <PhotoUpload onPhotosChange={handlePhotosChange} />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {/* Create button */}
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={handleCreate}
              disabled={isCreating}
              className="px-8 py-3 bg-neutral-900 text-white text-xs tracking-widest uppercase hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-3"
            >
              {isCreating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Building your magazine…
                </>
              ) : (
                'Create Magazine'
              )}
            </button>
            <Link href="/" className="text-neutral-400 text-xs tracking-widest uppercase hover:text-neutral-700 transition-colors">
              Cancel
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
