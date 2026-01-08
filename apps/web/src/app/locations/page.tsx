export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { locationsQuery } from '@/lib/sanity/queries'
import { Button } from '@/components/ui/Button'
import { Card, CardImage, CardContent } from '@/components/ui/Card'
import type { Location } from '@/lib/sanity/types'

export const metadata: Metadata = {
  title: 'Locations',
  description: 'Find Ember & Oak Coffee in Portland—Division Street and Alberta Arts District. Hours, directions, and what makes each spot special.',
}

async function getLocations() {
  return client.fetch<Location[]>(locationsQuery)
}

const featureLabels: Record<string, { label: string; icon: string }> = {
  wifi: { label: 'Free WiFi', icon: 'wifi' },
  outdoor: { label: 'Outdoor Seating', icon: 'sun' },
  accessible: { label: 'Wheelchair Accessible', icon: 'accessible' },
  'dog-friendly': { label: 'Dog Friendly Patio', icon: 'dog' },
  'drive-through': { label: 'Drive-Through', icon: 'car' },
  'meeting-room': { label: 'Meeting Room', icon: 'users' },
}

function FeatureIcon({ feature }: { feature: string }) {
  const icons: Record<string, React.ReactNode> = {
    wifi: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
      </svg>
    ),
    sun: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    accessible: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75z" />
      </svg>
    ),
    dog: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    ),
  }

  const iconName = featureLabels[feature]?.icon || 'sun'
  return <>{icons[iconName] || icons.sun}</>
}

function getImageUrl(image: Location['image']) {
  if (!image?.asset?._ref) return 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80'
  return `https://cdn.sanity.io/images/vef3nzbe/production/${image.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}?w=800`
}

export default async function LocationsPage() {
  const locations = await getLocations()

  return (
    <div className="py-12 md:py-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <h1 className="font-serif text-4xl md:text-5xl text-espresso mb-4">
          Find Us
        </h1>
        <p className="text-espresso-light max-w-2xl">
          Two spots in Portland. Same coffee, same people, slightly different vibes. Pick whichever's closest, or try both.
        </p>
      </div>

      {/* Locations */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="space-y-12">
          {locations.map((location) => (
            <Card key={location._id} className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <CardImage className="aspect-[4/3] lg:aspect-auto lg:h-full">
                  <img
                    src={getImageUrl(location.image)}
                    alt={`${location.name} location`}
                    className="w-full h-full object-cover"
                  />
                </CardImage>
                <CardContent className="p-6 md:p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="font-serif text-2xl md:text-3xl text-espresso">
                      {location.name}
                    </h2>
                    {location.isPrimary && (
                      <span className="text-xs uppercase tracking-wider bg-ember text-white px-2 py-1 rounded">
                        Original
                      </span>
                    )}
                  </div>

                  <p className="text-espresso-light mb-6">
                    {location.description}
                  </p>

                  {/* Address */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-ember mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      <div className="text-espresso-light">
                        <p>{location.address?.street}</p>
                        <p>{location.address?.city}, {location.address?.state} {location.address?.zip}</p>
                      </div>
                    </div>

                    {location.phone && (
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-ember flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                        <a href={`tel:${location.phone.replace(/\D/g, '')}`} className="text-espresso-light hover:text-ember transition-colors">
                          {location.phone}
                        </a>
                      </div>
                    )}

                    {location.email && (
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-ember flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        <a href={`mailto:${location.email}`} className="text-espresso-light hover:text-ember transition-colors">
                          {location.email}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Hours */}
                  {location.hours && location.hours.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-medium text-espresso mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-ember" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Hours
                      </h3>
                      <div className="space-y-1 text-sm text-espresso-light">
                        {location.hours.map((h, i) => (
                          <div key={i} className="flex justify-between">
                            <span>{h.days}</span>
                            <span className="font-mono">{h.hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  {location.features && location.features.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-6">
                      {location.features.map((feature) => (
                        <span
                          key={feature}
                          className="inline-flex items-center gap-1.5 text-xs text-espresso-light bg-cream-dark px-3 py-1.5 rounded-full"
                        >
                          <FeatureIcon feature={feature} />
                          {featureLabels[feature]?.label || feature}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Directions Button */}
                  <Button
                    href={`https://maps.google.com/?q=${encodeURIComponent(`${location.address?.street}, ${location.address?.city}, ${location.address?.state} ${location.address?.zip}`)}`}
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Get Directions
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Parking Note */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="bg-cream-dark rounded-xl p-6 md:p-8">
          <h3 className="font-serif text-lg text-espresso mb-2">A Note on Parking</h3>
          <p className="text-espresso-light text-sm">
            Division has street parking (2-hour limit) and a small lot behind the building. Alberta is street parking only, but the neighborhood's pretty bikeable if you're up for it. Both locations are accessible by TriMet.
          </p>
        </div>
      </div>
    </div>
  )
}
