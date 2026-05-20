import { getCopy, getLocation } from '@/lib/editorial-copy'

interface GridPageProps {
  imageUrls: string[]
  pageNumber: number
  tripName: string
  pageIndex: number
}

export default function GridPage({ imageUrls, pageNumber, tripName, pageIndex }: GridPageProps) {
  const copy = getCopy(tripName, pageIndex)
  const location = getLocation(tripName)
  const captions = [copy.caption1, copy.caption2, copy.caption3, copy.caption4]

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

      {/* Headline + rule */}
      <div className="px-5 pt-1 pb-2 shrink-0">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif font-bold text-neutral-900 leading-none"
            style={{ fontSize: 'clamp(15px, 4vw, 20px)' }}>
            {location}
          </h2>
          <span className="font-serif italic text-[10px]" style={{ color: '#8A8278' }}>
            {copy.subhead}
          </span>
        </div>
        {/* Full-width accent rule */}
        <div className="mt-2 h-px" style={{ background: '#B08850' }} />
      </div>

      {/* 2×2 photo grid */}
      <div className="flex-1 mx-5 grid grid-cols-2 grid-rows-2 gap-1.5 overflow-hidden">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="relative overflow-hidden" style={{ border: '1px solid #E8E3DC' }}>
            {imageUrls[i] ? (
              <img src={imageUrls[i]} alt="" className="w-full h-full object-cover" draggable={false} />
            ) : (
              <div className="w-full h-full" style={{ background: '#EDE8E0' }} />
            )}
            {/* Corner number */}
            <span className="absolute bottom-1 right-1.5 text-white/60 font-mono"
              style={{ fontSize: '8px' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
          </div>
        ))}
      </div>

      {/* Captions row */}
      <div className="mx-5 mt-2 mb-4 grid grid-cols-2 gap-x-2 gap-y-0.5 shrink-0">
        {captions.map((cap, i) => (
          <p key={i} className="font-serif italic leading-snug"
            style={{ fontSize: '8px', color: '#8A8278' }}>
            <span className="not-italic font-sans mr-1" style={{ color: '#B08850', fontSize: '7px' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            {cap}
          </p>
        ))}
      </div>

      <div className="absolute bottom-0 left-5 right-5 h-px" style={{ background: '#D4CFC6' }} />
    </div>
  )
}
