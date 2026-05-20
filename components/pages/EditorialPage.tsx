import { getCopy } from '@/lib/editorial-copy'

interface EditorialPageProps {
  imageUrls: string[]
  pageNumber: number
  tripName: string
  pageIndex: number
}

export default function EditorialPage({ imageUrls, pageNumber, tripName, pageIndex }: EditorialPageProps) {
  const copy = getCopy(tripName, pageIndex)

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

      {/* Headline block */}
      <div className="px-5 pt-1.5 shrink-0">
        <h2 className="font-serif font-bold text-neutral-900 leading-tight"
          style={{ fontSize: 'clamp(16px, 4.5vw, 22px)' }}>
          {copy.headline}
        </h2>
        <p className="font-serif italic mt-1" style={{ fontSize: '10px', color: '#7A7068' }}>
          {copy.subhead}
        </p>
        {/* Accent rule */}
        <div className="mt-2 h-0.5 w-10" style={{ background: '#B08850' }} />
      </div>

      {/* Large primary photo — ~45% of page height */}
      <div className="mx-5 mt-3 overflow-hidden shrink-0" style={{ height: '40%', border: '1px solid #E8E3DC' }}>
        {imageUrls[0] && (
          <img src={imageUrls[0]} alt="" className="w-full h-full object-cover" draggable={false} />
        )}
      </div>

      {/* Bottom half: small photo + text */}
      <div className="flex-1 flex mx-5 mt-2 mb-4 gap-3 min-h-0">
        {/* Secondary photo */}
        {imageUrls[1] && (
          <div className="w-2/5 overflow-hidden shrink-0" style={{ border: '1px solid #E8E3DC' }}>
            <img src={imageUrls[1]} alt="" className="w-full h-full object-cover" draggable={false} />
          </div>
        )}

        {/* Text block */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          <p className="leading-relaxed" style={{ fontSize: '9px', color: '#3A3530', lineHeight: 1.65 }}>
            {copy.bodyText}
          </p>

          {/* Pull quote */}
          <div className="mt-2">
            <div className="h-px mb-2" style={{ background: '#D4CFC6' }} />
            <p className="font-serif italic leading-snug" style={{ fontSize: '9px', color: '#6B6258' }}>
              "{copy.pullQuote}"
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-5 right-5 h-px" style={{ background: '#D4CFC6' }} />
    </div>
  )
}
