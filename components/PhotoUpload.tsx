'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface UploadedPhoto {
  file: File
  preview: string
  width: number
  height: number
}

interface PhotoUploadProps {
  onPhotosChange: (photos: UploadedPhoto[]) => void
}

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
      URL.revokeObjectURL(img.src)
    }
    img.src = URL.createObjectURL(file)
  })
}

export default function PhotoUpload({ onPhotosChange }: PhotoUploadProps) {
  const [photos, setPhotos] = useState<UploadedPhoto[]>([])

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const newPhotos = await Promise.all(
        acceptedFiles.map(async (file) => {
          const preview = URL.createObjectURL(file)
          const { width, height } = await getImageDimensions(file)
          return { file, preview, width, height }
        })
      )
      const updated = [...photos, ...newPhotos]
      setPhotos(updated)
      onPhotosChange(updated)
    },
    [photos, onPhotosChange]
  )

  const removePhoto = (index: number) => {
    URL.revokeObjectURL(photos[index].preview)
    const updated = photos.filter((_, i) => i !== index)
    setPhotos(updated)
    onPhotosChange(updated)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.heic', '.webp'] },
    multiple: true,
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-none p-12 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-neutral-800 bg-neutral-50'
            : 'border-neutral-300 hover:border-neutral-500'
        }`}
      >
        <input {...getInputProps()} />
        <div className="space-y-3">
          <div className="w-10 h-10 mx-auto border border-neutral-300 flex items-center justify-center">
            <span className="text-neutral-400 text-xl leading-none">+</span>
          </div>
          <p className="text-sm text-neutral-500 tracking-wide">
            {isDragActive ? 'Drop photos here' : 'Drag photos here or click to browse'}
          </p>
          <p className="text-xs text-neutral-400 tracking-wider uppercase">
            JPG · PNG · HEIC · WebP
          </p>
        </div>
      </div>

      {photos.length > 0 && (
        <div>
          <p className="text-xs text-neutral-400 tracking-widest uppercase mb-3">
            {photos.length} photo{photos.length !== 1 ? 's' : ''} selected
          </p>
          <div className="grid grid-cols-4 gap-2">
            {photos.map((photo, index) => (
              <div key={index} className="relative group aspect-square">
                <img
                  src={photo.preview}
                  alt=""
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removePhoto(index)
                  }}
                  className="absolute top-1 right-1 w-5 h-5 bg-black/70 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  ×
                </button>
                {index === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[8px] tracking-widest uppercase text-center py-1">
                    Cover
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export type { UploadedPhoto }
