export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { categoriesQuery, menuItemsQuery } from '@/lib/sanity/queries'
import { Card, CardImage, CardContent, CardTitle, CardDescription } from '@/components/ui/Card'
import { TagBadge } from '@/components/ui/Badge'
import { urlFor } from '@/lib/sanity/client'
import type { Category, MenuItem } from '@/lib/sanity/types'
import { CategoryNav } from './CategoryNav'

export const metadata: Metadata = {
  title: 'Menu',
  description: 'House-roasted espresso, local pastries, and drinks made to order. View the full Ember & Oak Coffee menu.',
}

async function getMenuData() {
  try {
    const [categories, menuItems] = await Promise.all([
      client.fetch<Category[]>(categoriesQuery),
      client.fetch<MenuItem[]>(menuItemsQuery),
    ])
    return { categories: categories ?? [], menuItems: menuItems ?? [] }
  } catch (error) {
    console.error('Failed to fetch menu data:', error)
    return { categories: [], menuItems: [] }
  }
}

function formatPrice(price: number) {
  return `$${price.toFixed(2)}`
}

function formatVariants(variants: { size: string; price: number }[] | undefined) {
  if (!variants || variants.length === 0) return null
  const sizeLabels: Record<string, string> = {
    small: 'S',
    medium: 'M',
    large: 'L',
  }
  return variants.map(v => `${sizeLabels[v.size] || v.size}: ${formatPrice(v.price)}`).join(' / ')
}

function getImageUrl(image: MenuItem['image']) {
  if (!image?.asset) return 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80'
  return urlFor(image).width(600).url()
}

export default async function MenuPage() {
  const { categories, menuItems } = await getMenuData()

  // Group items by category
  const itemsByCategory = categories.map(cat => ({
    ...cat,
    items: menuItems.filter(item => item.category?._id === cat._id),
  }))

  return (
    <div className="py-12 md:py-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <h1 className="font-serif text-4xl md:text-5xl text-espresso mb-4">
          Menu
        </h1>
        <p className="text-espresso-light max-w-2xl">
          Everything's made to order. We roast our beans in-house, source our oat milk from the Willamette Valley, and bake what we can ourselves. The rest comes from friends.
        </p>
      </div>

      {/* Category Navigation */}
      <CategoryNav categories={categories} />

      {/* Menu Sections */}
      <div className="max-w-7xl mx-auto px-4 space-y-16">
        {itemsByCategory.map((category) => (
          <section key={category._id} id={category.slug.current} className="scroll-mt-36">
            <h2 className="font-serif text-2xl md:text-3xl text-espresso mb-8 pb-2 border-b border-espresso/10">
              {category.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item) => (
                <Card key={item._id} hover className="group">
                  <CardImage className="aspect-[4/3]">
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.tags && item.tags.length > 0 && (
                      <div className="absolute top-3 left-3 flex gap-2">
                        {item.tags.slice(0, 2).map((tag) => (
                          <TagBadge key={tag} tag={tag} />
                        ))}
                      </div>
                    )}
                  </CardImage>
                  <CardContent>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <CardTitle>{item.name}</CardTitle>
                      <div className="text-right flex-shrink-0">
                        {item.variants && item.variants.length > 0 ? (
                          <span className="font-mono text-xs text-oak">
                            {formatVariants(item.variants)}
                          </span>
                        ) : (
                          <span className="font-mono text-sm text-oak">
                            {formatPrice(item.price)}
                          </span>
                        )}
                      </div>
                    </div>
                    <CardDescription className="line-clamp-3">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Note */}
      <div className="max-w-7xl mx-auto px-4 mt-16">
        <div className="bg-cream-dark rounded-xl p-6 md:p-8">
          <p className="text-espresso-light text-sm">
            <strong className="text-espresso">A note on allergies:</strong> Our kitchen handles nuts, dairy, gluten, and soy. If you have allergies, please let your barista know and we'll do our best to accommodate you. We can make most drinks with oat, almond, or coconut milk.
          </p>
        </div>
      </div>
    </div>
  )
}
