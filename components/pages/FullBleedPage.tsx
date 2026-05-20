import { getCopy } from '@/lib/editorial-copy'

interface FullBleedPageProps {
  imageUrl: string
  pageNumber: number
  tripName: string
  pageIndex: number
}

export default function FullBleedPage({ imageUrl, pageNumber, tripName, pageIndex }: FullBleedPageProps) {
  const copy = getCopy(tripName, pageIndex)

  return (
    <div className="relative w-full h-full overflow-hidden bg-black select-none">
      <img
        src={imageUrl}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/40 to-transparent" />

      {/* Bottom gradient + text */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent pt-16 pb-5 px-6">
        {/* Accent rule */}
        <div className="w-8 h-0.5 mb-3" style={{ background: '#B08850' }} />

        <h2 className="font-serif text-white italic leading-tight mb-2"
          style={{ fontSize: 'clamp(16px, 4vw, 22px)' }}>
          {copy.headline}
        </h2>

        <p className="text-white/60 text-[9px] tracking-[0.2em] uppercase mb-3">
          {copy.caption1}
        </p>
      </div>

      {/* Running header */}
      <div className="absolute top-3 left-0 right-0 flex justify-between px-5">
        <span className="text-white/35 text-[8px] tracking-[0.3em] uppercase">{tripName}</span>
        <span className="text-white/35 text-[8px] tracking-[0.3em]">{String(pageNumber).padStart(2, '0')}</span>
      </div>
    </div>
  )
}
