'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import type { SanityImage as SanityImageType } from '@/lib/sanity/types'

interface SanityImageProps {
  image: SanityImageType | undefined
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
  sizes?: string
}

export function SanityImage({
  image,
  alt,
  width = 800,
  height = 600,
  fill = false,
  className = '',
  priority = false,
  sizes = '100vw',
}: SanityImageProps) {
  if (!image?.asset) {
    return (
      <div
        className={`bg-cream-dark flex items-center justify-center ${className}`}
        style={fill ? undefined : { width, height }}
      >
        <span className="text-oak text-sm">No image</span>
      </div>
    )
  }

  const imageUrl = urlFor(image)
    .width(width)
    .height(height)
    .auto('format')
    .quality(80)
    .url()

  const blurUrl = urlFor(image).width(20).height(15).blur(50).url()

  // Calculate object position from hotspot if available
  const objectPosition = image.hotspot
    ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
    : 'center'

  if (fill) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        style={{ objectPosition }}
        priority={priority}
        sizes={sizes}
        placeholder="blur"
        blurDataURL={blurUrl}
      />
    )
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={`object-cover ${className}`}
      style={{ objectPosition }}
      priority={priority}
      sizes={sizes}
      placeholder="blur"
      blurDataURL={blurUrl}
    />
  )
}
