'use client'

import { PortableText as BasePortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { SanityImage } from './SanityImage'
import type { SanityImage as SanityImageType } from '@/lib/sanity/types'

interface PortableTextProps {
  value: PortableTextBlock[]
  className?: string
}

const components = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-serif text-2xl md:text-3xl text-espresso mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-serif text-xl md:text-2xl text-espresso mt-6 mb-3">
        {children}
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-espresso-light leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-ember pl-4 my-6 italic text-espresso-light">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode
      value?: { href?: string }
    }) => (
      <a
        href={value?.href}
        className="text-ember underline underline-offset-2 hover:text-ember-dark transition-colors"
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-espresso">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
  },
  types: {
    image: ({ value }: { value: SanityImageType & { alt?: string } }) => (
      <div className="my-8">
        <SanityImage
          image={value}
          alt={value.alt || ''}
          width={800}
          height={500}
          className="rounded-lg w-full"
        />
      </div>
    ),
  },
}

export function PortableText({ value, className = '' }: PortableTextProps) {
  if (!value) return null

  return (
    <div className={`prose-coffee ${className}`}>
      <BasePortableText value={value} components={components} />
    </div>
  )
}
