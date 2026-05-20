'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Trip, Photo } from '@/lib/types'
import { getPhoto } from '@/lib/storage'

interface TripCardProps {
  trip: Trip
  onDelete: (id: string) => void
}

export default function TripCard({ trip, onDelete }: TripCardProps) {
  const [coverUrl, setCoverUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!trip.coverPhotoId) return
    getPhoto(trip.coverPhotoId).then((photo) => {
      if (photo) {
        const url = URL.createObjectURL(photo.data)
        setCoverUrl(url)
      }
    })
    return () => {
      if (coverUrl) URL.revokeObjectURL(coverUrl)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trip.coverPhotoId])

  return (
    <div className="group relative">
      <Link href={`/magazine/${trip.id}`} className="block">
        {/* Cover image */}
        <div className="aspect-[8.5/11] bg-neutral-200 overflow-hidden mb-3">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={trip.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              draggable={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-neutral-400 text-xs tracking-widest uppercase">No cover</span>
            </div>
          )}
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Trip info */}
        <div>
          <h3 className="font-serif text-neutral-900 text-lg leading-tight">{trip.name}</h3>
          <p className="text-neutral-400 text-xs tracking-widest uppercase mt-1">
            {new Date(trip.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            {' · '}
            {trip.photoCount} photo{trip.photoCount !== 1 ? 's' : ''}
          </p>
        </div>
      </Link>

      {/* Delete button */}
      <button
        onClick={(e) => {
          e.preventDefault()
          if (confirm(`Delete "${trip.name}"? This cannot be undone.`)) {
            onDelete(trip.id)
          }
        }}
        className="absolute top-2 left-2 w-6 h-6 bg-black/60 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-black"
      >
        ×
      </button>
    </div>
  )
}
