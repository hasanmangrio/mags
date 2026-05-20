interface DualPageProps {
  imageUrls: string[]
  pageNumber: number
}

export default function DualPage({ imageUrls, pageNumber }: DualPageProps) {
  return (
    <div className="relative w-full h-full bg-neutral-100 select-none flex flex-col p-3 gap-3">
      {imageUrls[0] && (
        <div className="flex-1 overflow-hidden">
          <img
            src={imageUrls[0]}
            alt=""
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
      )}
      {imageUrls[1] && (
        <div className="flex-1 overflow-hidden">
          <img
            src={imageUrls[1]}
            alt=""
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
      )}
      <div className="absolute bottom-4 right-5 text-neutral-400 text-[9px] tracking-widest">
        {String(pageNumber).padStart(2, '0')}
      </div>
    </div>
  )
}
