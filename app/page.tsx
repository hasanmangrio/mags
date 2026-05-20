'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAllTrips, deleteTrip } from '@/lib/storage'
import { Trip } from '@/lib/types'
import TripCard from '@/components/TripCard'

export default function HomePage() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllTrips().then((t) => {
      setTrips(t)
      setLoading(false)
    })
  }, [])

  async function handleDelete(id: string) {
    await deleteTrip(id)
    setTrips((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white no-print">
        <div className="max-w-5xl mx-auto px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl tracking-tight text-neutral-900">Mags</h1>
            <p className="text-neutral-400 text-xs tracking-widest uppercase mt-0.5">
              Travel Photo Magazines
            </p>
          </div>
          <Link
            href="/new"
            className="px-5 py-2.5 bg-neutral-900 text-white text-xs tracking-widest uppercase hover:bg-neutral-700 transition-colors"
          >
            + New Magazine
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-12">
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-5 h-5 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : trips.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-28 border border-neutral-300 mb-8 flex items-center justify-center">
              <span className="text-neutral-300 text-3xl font-serif italic">M</span>
            </div>
            <h2 className="font-serif text-3xl text-neutral-800 mb-3">
              Your shelf is empty
            </h2>
            <p className="text-neutral-400 text-sm max-w-sm mb-8 leading-relaxed">
              Upload photos from a trip and Mags will turn them into a beautiful editorial
              magazine you can browse, share, and print.
            </p>
            <Link
              href="/new"
              className="px-8 py-3 bg-neutral-900 text-white text-xs tracking-widest uppercase hover:bg-neutral-700 transition-colors"
            >
              Create Your First Magazine
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="font-serif text-xl text-neutral-800">Your Magazines</h2>
              <span className="text-neutral-400 text-xs tracking-widest">
                {trips.length} issue{trips.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
              {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} onDelete={handleDelete} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
