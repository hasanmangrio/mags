interface TrioPageProps {
  imageUrls: string[]
  pageNumber: number
}

export default function TrioPage({ imageUrls, pageNumber }: TrioPageProps) {
  return (
    <div className="relative w-full h-full bg-neutral-100 select-none p-3 flex flex-col gap-2">
      {/* Top: one large photo */}
      <div className="flex-[2] overflow-hidden bg-neutral-200">
        {imageUrls[0] && (
          <img
            src={imageUrls[0]}
            alt=""
            className="w-full h-full object-cover"
            draggable={false}
          />
        )}
      </div>

      {/* Bottom: two photos side by side */}
      <div className="flex-1 flex gap-2">
        <div className="flex-1 overflow-hidden bg-neutral-200">
          {imageUrls[1] && (
            <img
              src={imageUrls[1]}
              alt=""
              className="w-full h-full object-cover"
              draggable={false}
            />
          )}
        </div>
        <div className="flex-1 overflow-hidden bg-neutral-200">
          {imageUrls[2] && (
            <img
              src={imageUrls[2]}
              alt=""
              className="w-full h-full object-cover"
              draggable={false}
            />
          )}
        </div>
      </div>

      <div className="absolute bottom-4 right-5 text-neutral-400 text-[9px] tracking-widest">
        {String(pageNumber).padStart(2, '0')}
      </div>
    </div>
  )
}
