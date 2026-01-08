import { defineType } from 'sanity'

export default defineType({
  name: 'priceVariant',
  title: 'Price Variant',
  type: 'object',
  fields: [
    {
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          { title: 'Small (8oz)', value: 'small' },
          { title: 'Medium (12oz)', value: 'medium' },
          { title: 'Large (16oz)', value: 'large' },
        ],
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.positive(),
    },
  ],
  preview: {
    select: { size: 'size', price: 'price' },
    prepare({ size, price }) {
      const sizeLabels: Record<string, string> = {
        small: 'Small',
        medium: 'Medium',
        large: 'Large',
      }
      return { title: `${sizeLabels[size] || size}: $${price?.toFixed(2) || '0.00'}` }
    },
  },
})
