interface GridPageProps {
  imageUrls: string[]
  pageNumber: number
}

export default function GridPage({ imageUrls, pageNumber }: GridPageProps) {
  return (
    <div className="relative w-full h-full bg-neutral-100 select-none p-3">
      <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="overflow-hidden bg-neutral-200">
            {imageUrls[i] && (
              <img
                src={imageUrls[i]}
                alt=""
                className="w-full h-full object-cover"
                draggable={false}
              />
            )}
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 right-5 text-neutral-400 text-[9px] tracking-widest">
        {String(pageNumber).padStart(2, '0')}
      </div>
    </div>
  )
}
