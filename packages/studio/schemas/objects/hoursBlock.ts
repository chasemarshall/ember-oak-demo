import { defineType } from 'sanity'

export default defineType({
  name: 'hoursBlock',
  title: 'Hours Block',
  type: 'object',
  fields: [
    {
      name: 'days',
      title: 'Days',
      type: 'string',
      description: 'e.g., "Monday - Friday" or "Saturday"',
    },
    {
      name: 'hours',
      title: 'Hours',
      type: 'string',
      description: 'e.g., "7:00 AM - 6:00 PM" or "Closed"',
    },
  ],
  preview: {
    select: { days: 'days', hours: 'hours' },
    prepare({ days, hours }) {
      return { title: `${days}: ${hours}` }
    },
  },
})
