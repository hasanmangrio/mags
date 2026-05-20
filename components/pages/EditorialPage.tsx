interface EditorialPageProps {
  imageUrls: string[]
  pageNumber: number
  tripName: string
}

export default function EditorialPage({ imageUrls, pageNumber, tripName }: EditorialPageProps) {
  return (
    <div className="relative w-full h-full bg-white select-none flex flex-col">
      {/* Large primary photo — top 60% */}
      <div className="h-[60%] overflow-hidden bg-neutral-100 mx-4 mt-4">
        {imageUrls[0] && (
          <img
            src={imageUrls[0]}
            alt=""
            className="w-full h-full object-cover"
            draggable={false}
          />
        )}
      </div>

      {/* Text / caption area */}
      <div className="flex-1 px-6 pt-4 flex gap-3">
        {/* Secondary photo */}
        {imageUrls[1] && (
          <div className="w-[45%] overflow-hidden bg-neutral-100 shrink-0">
            <img
              src={imageUrls[1]}
              alt=""
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        )}

        {/* Caption block */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="w-6 h-px bg-neutral-300 mb-3" />
          <p className="font-serif text-neutral-800 text-sm leading-relaxed italic">
            {tripName}
          </p>
          <div className="w-6 h-px bg-neutral-300 mt-3" />
        </div>
      </div>

      <div className="absolute bottom-4 right-5 text-neutral-400 text-[9px] tracking-widest">
        {String(pageNumber).padStart(2, '0')}
      </div>
    </div>
  )
}
