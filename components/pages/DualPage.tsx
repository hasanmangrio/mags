import { getCopy } from '@/lib/editorial-copy'

interface DualPageProps {
  imageUrls: string[]
  pageNumber: number
  tripName: string
  pageIndex: number
}

export default function DualPage({ imageUrls, pageNumber, tripName, pageIndex }: DualPageProps) {
  const copy = getCopy(tripName, pageIndex)

  return (
    <div className="relative w-full h-full flex flex-col select-none"
      style={{ background: '#FEFDF9' }}>

      {/* Running header */}
      <div className="flex justify-between items-center px-5 pt-4 pb-2 shrink-0">
        <span className="text-[8px] tracking-[0.3em] uppercase" style={{ color: '#B08850' }}>
          {copy.sectionLabel}
        </span>
        <span className="text-[8px] tracking-[0.3em]" style={{ color: '#C0BAB0' }}>
          {String(pageNumber).padStart(2, '0')}
        </span>
      </div>

      {/* Headline */}
      <div className="px-5 pb-2 shrink-0">
        <h2 className="font-serif text-neutral-900 leading-tight font-bold"
          style={{ fontSize: 'clamp(14px, 3.5vw, 18px)' }}>
          {copy.headline}
        </h2>
        {/* Accent rule */}
        <div className="w-6 h-0.5 mt-2" style={{ background: '#B08850' }} />
      </div>

      {/* Photo 1 */}
      <div className="flex-1 mx-5 mt-2 overflow-hidden" style={{ border: '1px solid #E8E3DC' }}>
        {imageUrls[0] && (
          <img src={imageUrls[0]} alt="" className="w-full h-full object-cover" draggable={false} />
        )}
      </div>

      {/* Caption 1 */}
      <p className="px-5 pt-1.5 pb-1 font-serif italic shrink-0"
        style={{ fontSize: '9px', color: '#8A8278', lineHeight: 1.4 }}>
        {copy.caption1}
      </p>

      {/* Photo 2 */}
      <div className="flex-1 mx-5 overflow-hidden" style={{ border: '1px solid #E8E3DC' }}>
        {imageUrls[1] && (
          <img src={imageUrls[1]} alt="" className="w-full h-full object-cover" draggable={false} />
        )}
      </div>

      {/* Caption 2 */}
      <p className="px-5 pt-1.5 pb-4 font-serif italic shrink-0"
        style={{ fontSize: '9px', color: '#8A8278', lineHeight: 1.4 }}>
        {copy.caption2}
      </p>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-5 right-5 h-px" style={{ background: '#D4CFC6' }} />
    </div>
  )
}
