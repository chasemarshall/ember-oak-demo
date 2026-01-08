import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Ember & Oak Coffee. Questions, feedback, catering, or just want to say hi.',
}

const contactInfo = {
  email: 'hello@emberandoak.coffee',
  phone: '(503) 555-0147',
  address: {
    street: '3847 SE Division Street',
    city: 'Portland',
    state: 'OR',
    zip: '97202',
  },
}

const faqs = [
  {
    question: 'Do you do catering?',
    answer: "Yes! We can do coffee service for events, meetings, and private parties. Email us at catering@emberandoak.coffee with details about your event and we'll put together a quote.",
  },
  {
    question: 'Can I buy your beans online?',
    answer: "Not yet, but we're working on it. For now, you can pick them up at either location. We rotate our single-origins monthly and always have The Division blend in stock.",
  },
  {
    question: 'Do you have dairy-free options?',
    answer: 'Absolutely. We have oat milk (Misty Morning from Willamette Valley), almond milk, and coconut milk. Oat is our favorite for lattes. No extra charge.',
  },
  {
    question: 'Are you hiring?',
    answer: "We're always looking for good people. Drop off a resume at either location or email jobs@emberandoak.coffee. Coffee experience helps but isn't required—we can teach you to pull shots.",
  },
]

export default function ContactPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div>
            <h1 className="font-serif text-4xl md:text-5xl text-espresso mb-4">
              Get in Touch
            </h1>
            <p className="text-espresso-light mb-8">
              Questions, feedback, or just want to say hi? We read everything and try to respond within a day or two.
            </p>

            <ContactForm />
          </div>

          {/* Contact Info & FAQ */}
          <div className="space-y-12">
            {/* Direct Contact */}
            <div>
              <h2 className="font-serif text-2xl text-espresso mb-6">
                Or Reach Out Directly
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-ember/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-ember" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-espresso">Email</p>
                    <a href={`mailto:${contactInfo.email}`} className="text-espresso-light hover:text-ember transition-colors">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-ember/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-ember" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-espresso">Phone</p>
                    <a href={`tel:${contactInfo.phone.replace(/\D/g, '')}`} className="text-espresso-light hover:text-ember transition-colors">
                      {contactInfo.phone}
                    </a>
                    <p className="text-xs text-espresso-light/70 mt-1">Division Street location</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-ember/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-ember" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-espresso">Visit Us</p>
                    <p className="text-espresso-light">
                      {contactInfo.address.street}<br />
                      {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zip}
                    </p>
                    <Button href="/locations" variant="ghost" size="sm" className="mt-2 -ml-2 text-ember">
                      All Locations →
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="font-serif text-2xl text-espresso mb-6">
                Common Questions
              </h2>
              <div className="space-y-6">
                {faqs.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="font-medium text-espresso mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-espresso-light text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <h2 className="font-serif text-2xl text-espresso mb-4">
                Follow Along
              </h2>
              <p className="text-espresso-light text-sm mb-4">
                We post new roasts, events, and the occasional latte art we're proud of.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-espresso flex items-center justify-center text-cream hover:bg-ember transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-espresso flex items-center justify-center text-cream hover:bg-ember transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
