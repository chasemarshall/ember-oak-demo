export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { eventsQuery } from '@/lib/sanity/queries'
import { Button } from '@/components/ui/Button'
import { Card, CardImage, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { urlFor } from '@/lib/sanity/client'
import type { Event } from '@/lib/sanity/types'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Live music, coffee tastings, latte art throwdowns, and more at Ember & Oak Coffee in Portland.',
}

async function getEvents() {
  try {
    const events = await client.fetch<Event[]>(eventsQuery)
    return events ?? []
  } catch (error) {
    console.error('Failed to fetch events:', error)
    return []
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return {
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    day: date.getDate(),
    weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
    time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    full: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  }
}

function getImageUrl(image: Event['image']) {
  if (!image?.asset) return 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80'
  return urlFor(image).width(600).url()
}

function RecurringBadge({ recurring }: { recurring: string | undefined }) {
  if (!recurring || recurring === 'none') return null

  const labels: Record<string, string> = {
    weekly: 'Every Week',
    monthly: 'Monthly',
  }

  return (
    <Badge variant="oak" size="sm">
      {labels[recurring] || recurring}
    </Badge>
  )
}

export default async function EventsPage() {
  const events = await getEvents()

  const featuredEvents = events.filter(e => e.featured)
  const upcomingEvents = events.filter(e => !e.featured)

  return (
    <div className="py-12 md:py-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <h1 className="font-serif text-4xl md:text-5xl text-espresso mb-4">
          What's Happening
        </h1>
        <p className="text-espresso-light max-w-2xl">
          We host tastings, live music, workshops, and the occasional competition. Most events are free—we just ask that you buy a coffee if you're sticking around.
        </p>
      </div>

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mb-16">
          <h2 className="font-serif text-2xl text-espresso mb-6">Featured</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredEvents.map((event) => {
              const date = formatDate(event.date)
              return (
                <Card key={event._id} className="overflow-hidden group">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <CardImage className="aspect-[4/3] md:aspect-auto md:h-full">
                      <img
                        src={getImageUrl(event.image)}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </CardImage>
                    <CardContent className="p-6 flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-ember text-cream text-center px-3 py-2 rounded-lg">
                          <div className="text-xs uppercase tracking-wider opacity-80">{date.month}</div>
                          <div className="text-2xl font-serif">{date.day}</div>
                        </div>
                        <div>
                          <p className="text-sm text-espresso-light">{date.weekday}</p>
                          <p className="font-mono text-sm text-oak">{date.time}</p>
                        </div>
                      </div>
                      <h3 className="font-serif text-xl text-espresso mb-2">{event.title}</h3>
                      <p className="text-espresso-light text-sm mb-4 flex-grow">
                        {event.shortDescription}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-espresso-light">{event.location?.name}</span>
                        <RecurringBadge recurring={event.recurring} />
                      </div>
                    </CardContent>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>
      )}

      {/* All Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="max-w-7xl mx-auto px-4">
          <h2 className="font-serif text-2xl text-espresso mb-6">Upcoming</h2>
          <div className="space-y-4">
            {upcomingEvents.map((event) => {
              const date = formatDate(event.date)
              return (
                <div
                  key={event._id}
                  className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-4 md:gap-6"
                >
                  {/* Date */}
                  <div className="flex md:flex-col items-center gap-3 md:gap-1 md:w-20 flex-shrink-0">
                    <div className="bg-cream-dark text-espresso text-center px-3 py-2 rounded-lg md:w-full">
                      <div className="text-xs uppercase tracking-wider text-espresso-light">{date.month}</div>
                      <div className="text-2xl font-serif">{date.day}</div>
                    </div>
                    <span className="md:hidden text-sm text-espresso-light">{date.weekday} at {date.time}</span>
                  </div>

                  {/* Image (mobile hidden, shown on larger screens) */}
                  <div className="hidden lg:block w-40 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={getImageUrl(event.image)}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-serif text-lg text-espresso">{event.title}</h3>
                      <RecurringBadge recurring={event.recurring} />
                    </div>
                    <p className="text-espresso-light text-sm mb-3 line-clamp-2">
                      {event.shortDescription}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-espresso-light">
                      <span className="hidden md:inline">{date.weekday} at {date.time}</span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        {event.location?.name}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* No Events Message */}
      {events.length === 0 && (
        <section className="max-w-7xl mx-auto px-4">
          <div className="bg-cream-dark rounded-xl p-8 text-center">
            <p className="text-espresso-light">
              No upcoming events at the moment. Check back soon!
            </p>
          </div>
        </section>
      )}

      {/* Host Your Own */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
        <div className="bg-espresso text-cream rounded-xl p-8 md:p-12 text-center">
          <h2 className="font-serif text-2xl md:text-3xl mb-4">
            Want to Host Something?
          </h2>
          <p className="text-cream/70 mb-6 max-w-xl mx-auto">
            We love partnering with local artists, musicians, and organizations. If you've got an idea for an event, reach out. We've got the space, the coffee, and usually a decent sound system.
          </p>
          <Button href="/contact" variant="outline" className="border-cream text-cream hover:bg-cream hover:text-espresso">
            Get in Touch
          </Button>
        </div>
      </section>
    </div>
  )
}
