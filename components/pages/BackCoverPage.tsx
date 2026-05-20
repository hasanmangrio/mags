interface BackCoverPageProps {
  tripName: string
  date: string
}

export default function BackCoverPage({ tripName, date }: BackCoverPageProps) {
  return (
    <div className="relative w-full h-full bg-neutral-900 flex flex-col items-center justify-center select-none">
      {/* Decorative lines */}
      <div className="w-px h-16 bg-white/20 mb-10" />

      <p className="text-white/30 text-[9px] tracking-[0.4em] uppercase mb-6">A Travel Story</p>

      <h2 className="font-serif text-white text-2xl font-bold tracking-tight text-center px-8 mb-6">
        {tripName}
      </h2>

      <div className="w-8 h-px bg-white/30 mb-6" />

      <p className="text-white/30 text-[9px] tracking-[0.3em] uppercase">
        {new Date(date).getFullYear()}
      </p>

      <div className="w-px h-16 bg-white/20 mt-10" />

      {/* Bottom branding */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-white/20 text-[9px] tracking-[0.3em] uppercase">mags</p>
      </div>
    </div>
  )
}
