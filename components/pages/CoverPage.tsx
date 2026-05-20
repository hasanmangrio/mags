import { getCopy, getLocation } from '@/lib/editorial-copy'

interface CoverPageProps {
  imageUrl: string
  tripName: string
  subtitle?: string
  date: string
}

export default function CoverPage({ imageUrl, tripName, subtitle, date }: CoverPageProps) {
  const year = new Date(date).getFullYear() || new Date().getFullYear()
  const month = new Date(date).toLocaleDateString('en-US', { month: 'long' })
  const copy = getCopy(tripName, 0)
  const location = getLocation(tripName)

  return (
    <div className="relative w-full h-full overflow-hidden bg-black select-none">
      {/* Full-bleed hero */}
      <img
        src={imageUrl}
        alt={tripName}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />

      {/* Top masthead */}
      <div className="absolute top-0 left-0 right-0 px-6 pt-5">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-white/40" />
          <span className="text-white text-[11px] tracking-[0.4em] uppercase font-light px-3">
            Mags
          </span>
          <div className="flex-1 h-px bg-white/40" />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-white/50 text-[8px] tracking-[0.3em] uppercase">A Travel Story</span>
          <span className="text-white/50 text-[8px] tracking-[0.3em] uppercase">{month} {year}</span>
        </div>
      </div>

      {/* Bottom title block */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
        {/* Cover lines */}
        <div className="mb-4 space-y-1">
          {copy.coverLines.slice(0, 2).map((line, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1 h-1 bg-accent rounded-full shrink-0" style={{ background: '#B08850' }} />
              <span className="text-white/70 text-[9px] tracking-[0.15em] uppercase">{line}</span>
            </div>
          ))}
        </div>

        <div className="w-full h-px bg-white/30 mb-3" />

        {subtitle && (
          <p className="text-white/60 text-[9px] tracking-[0.3em] uppercase mb-2">{subtitle}</p>
        )}

        <h1 className="font-serif text-white leading-none font-bold tracking-tight mb-1"
          style={{ fontSize: 'clamp(28px, 8vw, 44px)' }}>
          {location}
        </h1>

        {tripName.includes(',') && (
          <p className="font-serif text-white/70 italic text-sm mb-3">
            {tripName.split(',').slice(1).join(',').trim()}
          </p>
        )}

        <div className="w-full h-px bg-white/30 mt-1" />
      </div>
    </div>
  )
}
