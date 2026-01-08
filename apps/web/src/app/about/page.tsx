export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { aboutPageQuery, staffQuery } from '@/lib/sanity/queries'
import { Button } from '@/components/ui/Button'
import { PortableText } from '@/components/shared/PortableText'
import { urlFor } from '@/lib/sanity/client'
import type { AboutPage, StaffMember } from '@/lib/sanity/types'

export const metadata: Metadata = {
  title: 'About',
  description: 'The story of Ember & Oak Coffee—from a former auto shop on Division Street to two Portland locations.',
}

async function getAboutData() {
  try {
    const [aboutPage, staff] = await Promise.all([
      client.fetch<AboutPage>(aboutPageQuery),
      client.fetch<StaffMember[]>(staffQuery),
    ])
    return { aboutPage, staff: staff ?? [] }
  } catch (error) {
    console.error('Failed to fetch about data:', error)
    return { aboutPage: null, staff: [] }
  }
}

function getImageUrl(image: { asset?: { _ref: string } } | undefined) {
  if (!image?.asset) return null
  return urlFor(image).width(400).url()
}

export default async function AboutPage() {
  const { aboutPage, staff } = await getAboutData()

  return (
    <div className="py-12 md:py-20">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 mb-16 md:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl text-espresso mb-6">
              {aboutPage?.headline || 'Good Coffee Takes Time. So Do Good Things.'}
            </h1>
            {aboutPage?.story ? (
              <PortableText value={aboutPage.story} />
            ) : (
              <div className="space-y-4 text-espresso-light leading-relaxed">
                <p>In 2018, Maya Chen left her job as a food scientist at a major coffee company. Not because she didn't love coffee—she loved it too much.</p>
                <p>She found a former auto repair shop on Division Street with good bones and terrible plumbing. Eight months later, Ember & Oak opened its doors.</p>
              </div>
            )}
            <p className="mt-6 font-serif text-espresso italic">
              — Maya Chen, Founder
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80"
              alt="Maya roasting coffee"
              className="rounded-xl shadow-lg w-full"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      {aboutPage?.values && aboutPage.values.length > 0 && (
        <section className="bg-cream-dark py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl text-espresso mb-12 text-center">
              What We Believe
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {aboutPage.values.map((value) => (
                <div key={value.title} className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
                  <h3 className="font-serif text-xl text-espresso mb-3">
                    {value.title}
                  </h3>
                  <p className="text-espresso-light">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Timeline */}
      {aboutPage?.timeline && aboutPage.timeline.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl text-espresso mb-12 text-center">
              Our Story So Far
            </h2>
            <div className="space-y-8">
              {aboutPage.timeline.map((item) => (
                <div key={`${item.year}-${item.title}`} className="flex gap-6">
                  <div className="flex-shrink-0 w-16">
                    <span className="font-mono text-ember font-bold">{item.year}</span>
                  </div>
                  <div className="pb-8 border-l-2 border-cream-dark pl-6 -ml-px">
                    <h3 className="font-serif text-lg text-espresso mb-1">
                      {item.title}
                    </h3>
                    <p className="text-espresso-light text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team */}
      {staff && staff.length > 0 && (
        <section className="bg-espresso text-cream py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl mb-4 text-center">
              The People
            </h2>
            <p className="text-cream/70 text-center mb-12 max-w-xl mx-auto">
              We're a small team. Everyone makes drinks, everyone cleans. No one's above taking out the trash.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {staff.map((person) => (
                <div key={person._id} className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-cream/20">
                    {person.photo ? (
                      <img
                        src={getImageUrl(person.photo) || ''}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-cream/50 text-4xl font-serif">
                        {person.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 className="font-serif text-lg mb-1">{person.name}</h3>
                  <p className="text-ember text-sm mb-3">{person.role}</p>
                  <p className="text-cream/70 text-sm mb-3">{person.bio}</p>
                  <div className="text-xs text-cream/50 space-y-1">
                    {person.favoriteOrder && (
                      <p><span className="text-cream/70">Order:</span> {person.favoriteOrder}</p>
                    )}
                    {person.funFact && (
                      <p><span className="text-cream/70">Fun fact:</span> {person.funFact}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-espresso mb-4">
            Stop By Sometime
          </h2>
          <p className="text-espresso-light mb-8">
            We're at Division Street and Alberta. Drop by, grab a coffee, and let us know how we're doing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/locations">Find a Location</Button>
            <Button href="/contact" variant="outline">Get in Touch</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
