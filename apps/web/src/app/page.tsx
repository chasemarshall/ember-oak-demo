export const dynamic = 'force-dynamic'

import { client } from '@/lib/sanity'
import { homePageQuery, featuredItemsQuery, upcomingEventsQuery, primaryLocationQuery } from '@/lib/sanity/queries'
import { Button } from '@/components/ui/Button'
import { Card, CardImage, CardContent, CardTitle, CardDescription } from '@/components/ui/Card'
import { TagBadge } from '@/components/ui/Badge'
import type { HomePage, MenuItem, Event, Location } from '@/lib/sanity/types'

// Fetch data from Sanity
async function getHomeData() {
  const [homePage, featuredItems, upcomingEvents, primaryLocation] = await Promise.all([
    client.fetch<HomePage>(homePageQuery),
    client.fetch<MenuItem[]>(featuredItemsQuery),
    client.fetch<Event[]>(upcomingEventsQuery),
    client.fetch<Location>(primaryLocationQuery),
  ])
  return { homePage, featuredItems, upcomingEvents, primaryLocation }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatTime(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

export default async function HomePage() {
  const { homePage, featuredItems, upcomingEvents, primaryLocation } = await getHomeData()

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=80)` }}
        >
          <div className="absolute inset-0 bg-espresso/60" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream mb-6">
            {homePage?.hero?.headline || 'Good Coffee Takes Time'}
          </h1>
          <p className="text-cream/90 text-lg md:text-xl mb-8 max-w-xl mx-auto">
            {homePage?.hero?.subheadline || 'House-roasted beans, local ingredients, and a space to slow down.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={homePage?.hero?.ctaLink || '/menu'} size="lg">
              {homePage?.hero?.ctaText || 'View Menu'}
            </Button>
            <Button href="/locations" variant="outline" size="lg" className="border-cream text-cream hover:bg-cream hover:text-espresso">
              Find Us
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-espresso mb-4">
              {homePage?.featuredSection?.title || "What We're Pouring"}
            </h2>
            <p className="text-espresso-light max-w-xl mx-auto">
              {homePage?.featuredSection?.subtitle || "A few favorites from our menu. Everything's made to order, nothing sits on a warmer."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <Card key={item._id} hover>
                <CardImage className="aspect-[4/3]">
                  <img
                    src={item.image ? `https://cdn.sanity.io/images/vef3nzbe/production/${item.image.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}?w=600` : 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80'}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </CardImage>
                <CardContent>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle>{item.name}</CardTitle>
                    <span className="font-mono text-sm text-oak">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <CardDescription className="line-clamp-2 mb-3">
                    {item.description}
                  </CardDescription>
                  <div className="flex gap-2">
                    {item.tags?.map((tag) => (
                      <TagBadge key={tag} tag={tag} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button href="/menu" variant="outline">
              Full Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Story Preview */}
      <section className="py-16 md:py-24 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-serif text-3xl md:text-4xl text-espresso mb-6">
                {homePage?.storyPreview?.heading || 'Started in a Garage'}
              </h2>
              <p className="text-espresso-light leading-relaxed mb-8">
                {homePage?.storyPreview?.excerpt || "In 2018, Maya Chen left her job as a food scientist at a major coffee company. She found a former auto repair shop on Division Street with good bones and terrible plumbing. Eight months later, Ember & Oak opened its doors."}
              </p>
              <Button href="/about" variant="secondary">
                Our Story
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80"
                alt="Inside Ember & Oak Coffee"
                className="w-full rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Location Preview */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80"
                alt="Ember & Oak storefront"
                className="w-full rounded-xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-espresso mb-6">
                Come Say Hello
              </h2>
              <div className="space-y-4 text-espresso-light mb-8">
                <p className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-1 text-ember flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span>
                    {primaryLocation?.address
                      ? `${primaryLocation.address.street}, ${primaryLocation.address.city}, ${primaryLocation.address.state}`
                      : '3847 SE Division Street, Portland, OR'}
                  </span>
                </p>
                <p className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-1 text-ember flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{primaryLocation?.hours?.[0]?.hours || 'Mon-Fri: 6:30am - 6pm'}</span>
                </p>
              </div>
              <Button href="/locations">
                All Locations
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 md:py-24 bg-espresso text-cream px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              What's Happening
            </h2>
            <p className="text-cream/70">
              Live music, tastings, and the occasional throwdown.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {upcomingEvents.map((event) => (
              <div
                key={event._id}
                className="bg-cream/10 rounded-lg p-6 hover:bg-cream/15 transition-colors"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-center bg-ember rounded-lg px-3 py-2">
                    <div className="text-xs uppercase tracking-wider text-cream/80">
                      {formatDate(event.date).split(' ')[0]}
                    </div>
                    <div className="text-2xl font-serif">
                      {formatDate(event.date).split(' ')[1]}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg">{event.title}</h3>
                    <p className="text-cream/60 text-sm">{formatTime(event.date)}</p>
                  </div>
                </div>
                <p className="text-cream/70 text-sm">
                  {event.shortDescription}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button href="/events" variant="outline" className="border-cream text-cream hover:bg-cream hover:text-espresso">
              All Events
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
