interface FullBleedPageProps {
  imageUrl: string
  pageNumber: number
}

export default function FullBleedPage({ imageUrl, pageNumber }: FullBleedPageProps) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-black select-none">
      <img
        src={imageUrl}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      <div className="absolute bottom-4 right-5 text-white/40 text-[9px] tracking-widest">
        {String(pageNumber).padStart(2, '0')}
      </div>
    </div>
  )
}
