interface CoverPageProps {
  imageUrl: string
  tripName: string
  subtitle?: string
  date: string
}

export default function CoverPage({ imageUrl, tripName, subtitle, date }: CoverPageProps) {
  const year = new Date(date).getFullYear() || new Date().getFullYear()

  return (
    <div className="relative w-full h-full overflow-hidden bg-black select-none">
      {/* Full-bleed hero photo */}
      <img
        src={imageUrl}
        alt={tripName}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />

      {/* Top masthead */}
      <div className="absolute top-0 left-0 right-0 px-8 pt-6 flex items-center justify-between">
        <span className="text-white/70 text-[10px] tracking-[0.3em] uppercase font-light">
          A Travel Story
        </span>
        <span className="text-white/70 text-[10px] tracking-[0.3em] uppercase font-light">
          {year}
        </span>
      </div>

      {/* Bottom title block */}
      <div className="absolute bottom-0 left-0 right-0 px-8 pb-10">
        {subtitle && (
          <p className="text-white/60 text-[11px] tracking-[0.25em] uppercase mb-3 font-light">
            {subtitle}
          </p>
        )}
        <h1 className="font-serif text-white text-5xl leading-none font-bold tracking-tight mb-3">
          {tripName}
        </h1>
        <div className="w-12 h-px bg-white/60 mb-3" />
        <p className="text-white/60 text-[11px] tracking-[0.2em] uppercase font-light">
          {new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </div>
    </div>
  )
}
