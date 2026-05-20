'use client'

import { useRef, useEffect, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { Magazine as MagazineType, Trip, Photo } from '@/lib/types'
import CoverPage from './pages/CoverPage'
import BackCoverPage from './pages/BackCoverPage'
import FullBleedPage from './pages/FullBleedPage'
import DualPage from './pages/DualPage'
import GridPage from './pages/GridPage'
import EditorialPage from './pages/EditorialPage'
import TrioPage from './pages/TrioPage'

interface MagazineViewerProps {
  magazine: MagazineType
  trip: Trip
  photos: Photo[]
}

function blobToUrl(blob: Blob): string {
  return URL.createObjectURL(blob)
}

export default function MagazineViewer({ magazine, trip, photos }: MagazineViewerProps) {
  const bookRef = useRef<HTMLFlipBook>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [photoUrls, setPhotoUrls] = useState<Map<string, string>>(new Map())
  const [containerWidth, setContainerWidth] = useState(0)

  // Resolve blob URLs for all photos
  useEffect(() => {
    const urls = new Map<string, string>()
    photos.forEach((p) => {
      urls.set(p.id, blobToUrl(p.data))
    })
    setPhotoUrls(urls)
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [photos])

  useEffect(() => {
    const update = () => setContainerWidth(window.innerWidth)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const totalPages = magazine.pages.length
  const pageWidth = Math.min(420, (containerWidth - 120) / 2)
  const pageHeight = Math.round(pageWidth * (11 / 8.5))

  function getImageUrls(photoIds: string[]): string[] {
    return photoIds.map((id) => photoUrls.get(id) ?? '').filter(Boolean)
  }

  function renderPage(page: MagazineType['pages'][number], index: number) {
    const urls = getImageUrls(page.photoIds)
    const pageNum = index + 1

    switch (page.template) {
      case 'cover':
        return (
          <CoverPage
            imageUrl={urls[0] ?? ''}
            tripName={trip.name}
            subtitle={trip.subtitle}
            date={trip.date}
          />
        )
      case 'back-cover':
        return <BackCoverPage tripName={trip.name} date={trip.date} />
      case 'full-bleed':
        return <FullBleedPage imageUrl={urls[0] ?? ''} pageNumber={pageNum} />
      case 'dual':
        return <DualPage imageUrls={urls} pageNumber={pageNum} />
      case 'grid-4':
        return <GridPage imageUrls={urls} pageNumber={pageNum} />
      case 'editorial':
        return <EditorialPage imageUrls={urls} pageNumber={pageNum} tripName={trip.name} />
      case 'trio':
        return <TrioPage imageUrls={urls} pageNumber={pageNum} />
      default:
        return <FullBleedPage imageUrl={urls[0] ?? ''} pageNumber={pageNum} />
    }
  }

  const canGoBack = currentPage > 0
  const canGoForward = currentPage < totalPages - 1

  if (containerWidth === 0 || photoUrls.size === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8 select-none">
      {/* Book */}
      <div className="shadow-2xl">
        <HTMLFlipBook
          ref={bookRef}
          width={pageWidth}
          height={pageHeight}
          size="fixed"
          minWidth={200}
          maxWidth={600}
          minHeight={300}
          maxHeight={900}
          drawShadow
          flippingTime={700}
          usePortrait={false}
          startPage={0}
          showCover
          mobileScrollSupport={false}
          onFlip={(e: any) => setCurrentPage(e.data)}
          className="magazine-book"
          style={{}}
          startZIndex={0}
          autoSize={false}
          clickEventForward={false}
          useMouseEvents
          swipeDistance={30}
          showPageCorners
          disableFlipByClick={false}
          maxShadowOpacity={0.5}
        >
          {magazine.pages.map((page, index) => (
            <div
              key={page.id}
              className="page"
              style={{ width: pageWidth, height: pageHeight, overflow: 'hidden' }}
            >
              {renderPage(page, index)}
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Navigation controls */}
      <div className="flex items-center gap-8">
        <button
          onClick={() => bookRef.current?.pageFlip().flipPrev()}
          disabled={!canGoBack}
          className="px-5 py-2 text-sm tracking-widest uppercase text-neutral-500 hover:text-neutral-900 disabled:opacity-30 transition-colors border border-neutral-200 hover:border-neutral-400 disabled:cursor-not-allowed"
        >
          ← Prev
        </button>

        <span className="text-neutral-400 text-xs tracking-widest">
          {String(currentPage + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
        </span>

        <button
          onClick={() => bookRef.current?.pageFlip().flipNext()}
          disabled={!canGoForward}
          className="px-5 py-2 text-sm tracking-widest uppercase text-neutral-500 hover:text-neutral-900 disabled:opacity-30 transition-colors border border-neutral-200 hover:border-neutral-400 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>

      {/* Print button */}
      <button
        onClick={() => window.print()}
        className="text-xs text-neutral-400 hover:text-neutral-700 tracking-widest uppercase transition-colors underline underline-offset-4"
      >
        Print Magazine
      </button>
    </div>
  )
}
