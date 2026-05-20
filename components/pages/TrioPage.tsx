import { getCopy, getLocation } from '@/lib/editorial-copy'

interface TrioPageProps {
  imageUrls: string[]
  pageNumber: number
  tripName: string
  pageIndex: number
}

export default function TrioPage({ imageUrls, pageNumber, tripName, pageIndex }: TrioPageProps) {
  const copy = getCopy(tripName, pageIndex)
  const location = getLocation(tripName)

  return (
    <div className="relative w-full h-full flex flex-col select-none"
      style={{ background: '#FEFDF9' }}>

      {/* Running header */}
      <div className="flex justify-between items-center px-5 pt-4 shrink-0">
        <span className="text-[8px] tracking-[0.3em] uppercase" style={{ color: '#B08850' }}>
          {copy.sectionLabel}
        </span>
        <span className="text-[8px] tracking-[0.3em]" style={{ color: '#C0BAB0' }}>
          {String(pageNumber).padStart(2, '0')}
        </span>
      </div>

      {/* Headline */}
      <div className="px-5 pt-1 pb-2 shrink-0">
        <div className="flex items-end gap-3">
          <h2 className="font-serif font-bold text-neutral-900 leading-none"
            style={{ fontSize: 'clamp(18px, 5vw, 26px)' }}>
            {location}
          </h2>
          <div className="flex-1 h-px mb-1" style={{ background: '#B08850' }} />
        </div>
        <p className="font-serif italic mt-1" style={{ fontSize: '9px', color: '#8A8278' }}>
          {copy.subhead}
        </p>
      </div>

      {/* Large top photo — ~50% height */}
      <div className="mx-5 overflow-hidden shrink-0" style={{ flex: '2', border: '1px solid #E8E3DC' }}>
        {imageUrls[0] && (
          <img src={imageUrls[0]} alt="" className="w-full h-full object-cover" draggable={false} />
        )}
      </div>

      {/* Caption for top photo */}
      <p className="px-5 pt-1 font-serif italic shrink-0"
        style={{ fontSize: '9px', color: '#8A8278' }}>
        {copy.caption1}
      </p>

      {/* Two smaller photos */}
      <div className="flex mx-5 mt-1.5 gap-1.5 shrink-0" style={{ flex: '1' }}>
        <div className="flex-1 overflow-hidden" style={{ border: '1px solid #E8E3DC' }}>
          {imageUrls[1] && (
            <img src={imageUrls[1]} alt="" className="w-full h-full object-cover" draggable={false} />
          )}
        </div>
        <div className="flex-1 overflow-hidden" style={{ border: '1px solid #E8E3DC' }}>
          {imageUrls[2] && (
            <img src={imageUrls[2]} alt="" className="w-full h-full object-cover" draggable={false} />
          )}
        </div>
      </div>

      {/* Captions for bottom two */}
      <div className="flex mx-5 mt-1 mb-4 gap-1.5 shrink-0">
        <p className="flex-1 font-serif italic" style={{ fontSize: '8px', color: '#8A8278' }}>
          {copy.caption2}
        </p>
        <p className="flex-1 font-serif italic" style={{ fontSize: '8px', color: '#8A8278' }}>
          {copy.caption3}
        </p>
      </div>

      <div className="absolute bottom-0 left-5 right-5 h-px" style={{ background: '#D4CFC6' }} />
    </div>
  )
}
