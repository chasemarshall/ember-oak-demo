import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'headline', title: 'Headline', type: 'string' },
        { name: 'subheadline', title: 'Subheadline', type: 'text', rows: 2 },
        { name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } },
        { name: 'ctaText', title: 'CTA Button Text', type: 'string' },
        { name: 'ctaLink', title: 'CTA Button Link', type: 'string' },
      ],
    }),
    defineField({
      name: 'featuredSection',
      title: 'Featured Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string' },
        { name: 'subtitle', title: 'Subtitle', type: 'text' },
      ],
    }),
    defineField({
      name: 'storyPreview',
      title: 'Story Preview Section',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'excerpt', title: 'Excerpt', type: 'text', rows: 4 },
        { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'announcement',
      title: 'Announcement Banner',
      type: 'object',
      fields: [
        { name: 'enabled', title: 'Show Banner', type: 'boolean' },
        { name: 'text', title: 'Banner Text', type: 'string' },
        { name: 'link', title: 'Link', type: 'string' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Home Page' }
    },
  },
})
