'use client'

import { useActionState } from 'react'
import { Button } from '@/components/ui/Button'
import { submitContactForm, type ContactFormState } from './actions'

export function ContactForm() {
  const [state, formAction, isPending] = useActionState<ContactFormState, FormData>(
    submitContactForm,
    null
  )

  if (state?.success) {
    return (
      <div className="bg-sage/10 border border-sage/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-2">
          <svg className="w-6 h-6 text-sage" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="font-serif text-xl text-espresso">Message Sent!</h3>
        </div>
        <p className="text-espresso-light">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-6">
      {state?.success === false && (
        <div className="bg-ember/10 border border-ember/30 rounded-lg p-4 text-ember">
          {state.message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-espresso mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            disabled={isPending}
            className="w-full px-4 py-3 rounded-lg border border-espresso/20 bg-white text-espresso placeholder:text-espresso-light/50 focus:outline-none focus:ring-2 focus:ring-ember focus:border-transparent transition-shadow disabled:opacity-50"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-espresso mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            disabled={isPending}
            className="w-full px-4 py-3 rounded-lg border border-espresso/20 bg-white text-espresso placeholder:text-espresso-light/50 focus:outline-none focus:ring-2 focus:ring-ember focus:border-transparent transition-shadow disabled:opacity-50"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-espresso mb-2">
          What's this about?
        </label>
        <select
          id="subject"
          name="subject"
          disabled={isPending}
          className="w-full px-4 py-3 rounded-lg border border-espresso/20 bg-white text-espresso focus:outline-none focus:ring-2 focus:ring-ember focus:border-transparent transition-shadow disabled:opacity-50"
        >
          <option value="general">General Question</option>
          <option value="feedback">Feedback</option>
          <option value="catering">Catering Inquiry</option>
          <option value="events">Event / Partnership</option>
          <option value="press">Press / Media</option>
          <option value="jobs">Jobs / Careers</option>
          <option value="other">Something Else</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-espresso mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          disabled={isPending}
          className="w-full px-4 py-3 rounded-lg border border-espresso/20 bg-white text-espresso placeholder:text-espresso-light/50 focus:outline-none focus:ring-2 focus:ring-ember focus:border-transparent transition-shadow resize-none disabled:opacity-50"
          placeholder="Tell us what's on your mind..."
        />
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isPending}>
        {isPending ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
