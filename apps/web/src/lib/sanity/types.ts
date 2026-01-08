import type { PortableTextBlock } from '@portabletext/types'

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface SiteSettings {
  shopName: string
  tagline?: string
  logo?: SanityImage
  socialLinks?: {
    instagram?: string
    facebook?: string
    twitter?: string
  }
  footerText?: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: SanityImage
  }
}

export interface HomePage {
  hero?: {
    headline?: string
    subheadline?: string
    backgroundImage?: SanityImage
    ctaText?: string
    ctaLink?: string
  }
  featuredSection?: {
    title?: string
    subtitle?: string
  }
  storyPreview?: {
    heading?: string
    excerpt?: string
    image?: SanityImage
  }
  announcement?: {
    enabled?: boolean
    text?: string
    link?: string
  }
}

export interface AboutPage {
  headline?: string
  story?: PortableTextBlock[]
  heroImage?: SanityImage
  values?: Array<{
    title: string
    description: string
  }>
  timeline?: Array<{
    year: string
    title: string
    description: string
  }>
}

export interface Category {
  _id: string
  name: string
  slug: { current: string }
  description?: string
  icon?: string
}

export interface PriceVariant {
  size: 'small' | 'medium' | 'large'
  price: number
}

export interface MenuItem {
  _id: string
  name: string
  slug?: { current: string }
  description?: string
  price: number
  variants?: PriceVariant[]
  image?: SanityImage
  tags?: string[]
  featured?: boolean
  category?: {
    _id: string
    name: string
    slug: { current: string }
  }
}

export interface StaffMember {
  _id: string
  name: string
  role: string
  bio?: string
  photo?: SanityImage
  favoriteOrder?: string
  funFact?: string
}

export interface HoursBlock {
  days: string
  hours: string
}

export interface Location {
  _id: string
  name: string
  slug?: { current: string }
  address?: {
    street?: string
    city?: string
    state?: string
    zip?: string
  }
  coordinates?: {
    lat?: number
    lng?: number
  }
  hours?: HoursBlock[]
  phone?: string
  email?: string
  image?: SanityImage
  description?: string
  features?: string[]
  isPrimary?: boolean
}

export interface Event {
  _id: string
  title: string
  slug?: { current: string }
  description?: PortableTextBlock[]
  shortDescription?: string
  date: string
  endDate?: string
  recurring?: 'none' | 'weekly' | 'monthly'
  image?: SanityImage
  featured?: boolean
  location?: {
    name: string
    address?: Location['address']
    slug?: { current: string }
  }
}
