'use client'

import { useEffect, useState } from 'react'

type Category = {
  _id: string
  name: string
  slug: { current: string }
}

export function CategoryNav({ categories }: { categories: Category[] }) {
  const [activeSlug, setActiveSlug] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      }
    )

    // Observe all category sections
    categories.forEach((cat) => {
      const element = document.getElementById(cat.slug.current)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [categories])

  return (
    <div className="sticky top-16 z-40 bg-cream/95 backdrop-blur-sm border-b border-espresso/10 mb-12">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex gap-6 overflow-x-auto no-scrollbar py-4">
          {categories.map((cat) => (
            <a
              key={cat._id}
              href={`#${cat.slug.current}`}
              className={`whitespace-nowrap text-sm font-medium transition-colors ${
                activeSlug === cat.slug.current
                  ? 'text-ember'
                  : 'text-espresso-light hover:text-espresso'
              }`}
            >
              {cat.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
