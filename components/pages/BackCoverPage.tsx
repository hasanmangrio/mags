import { getCopy } from '@/lib/editorial-copy'

interface BackCoverPageProps {
  tripName: string
  date: string
}

export default function BackCoverPage({ tripName, date }: BackCoverPageProps) {
  const copy = getCopy(tripName, 999)
  const year = new Date(date).getFullYear() || new Date().getFullYear()

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none"
      style={{ background: '#1A1814' }}>

      {/* Decorative top rule */}
      <div className="absolute top-0 left-0 right-0 flex">
        <div className="flex-1 h-0.5" style={{ background: '#B08850' }} />
      </div>

      <div className="flex flex-col items-center px-10 text-center">
        <div className="w-px h-10 mb-8" style={{ background: 'rgba(255,255,255,0.15)' }} />

        <span className="text-[8px] tracking-[0.4em] uppercase mb-6" style={{ color: '#B08850' }}>
          A Travel Story
        </span>

        {/* Pull quote */}
        <p className="font-serif italic leading-relaxed mb-6"
          style={{ fontSize: 'clamp(11px, 2.5vw, 14px)', color: 'rgba(255,255,255,0.75)' }}>
          "{copy.pullQuote}"
        </p>

        <div className="w-8 h-px mb-6" style={{ background: '#B08850' }} />

        <h2 className="font-serif font-bold text-white leading-tight mb-1"
          style={{ fontSize: 'clamp(18px, 5vw, 24px)' }}>
          {tripName}
        </h2>

        <p className="text-[9px] tracking-[0.25em] uppercase mt-2"
          style={{ color: 'rgba(255,255,255,0.35)' }}>
          {new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>

        <div className="w-px h-10 mt-8" style={{ background: 'rgba(255,255,255,0.15)' }} />
      </div>

      {/* Bottom branding */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <div className="flex items-center justify-center gap-2">
          <div className="flex-1 max-w-12 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <p className="text-[8px] tracking-[0.4em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Mags · {year}
          </p>
          <div className="flex-1 max-w-12 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
        </div>
      </div>
    </div>
  )
}
