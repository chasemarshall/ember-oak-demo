import { groq } from 'next-sanity'

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    shopName,
    tagline,
    logo,
    socialLinks,
    footerText,
    seo
  }
`

// Home Page
export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    hero,
    featuredSection,
    storyPreview,
    announcement
  }
`

// About Page
export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    headline,
    story,
    heroImage,
    values,
    timeline
  }
`

// Categories
export const categoriesQuery = groq`
  *[_type == "category"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    icon
  }
`

// Menu Items
export const menuItemsQuery = groq`
  *[_type == "menuItem" && available == true] | order(category->order asc, name asc) {
    _id,
    name,
    slug,
    description,
    price,
    variants,
    image,
    tags,
    featured,
    category->{
      _id,
      name,
      slug
    }
  }
`

// Featured Menu Items
export const featuredItemsQuery = groq`
  *[_type == "menuItem" && featured == true && available == true] | order(name asc) [0...6] {
    _id,
    name,
    slug,
    description,
    price,
    variants,
    image,
    tags,
    category->{
      name
    }
  }
`

// Menu Items by Category
export const menuItemsByCategoryQuery = groq`
  *[_type == "menuItem" && available == true && category->slug.current == $category] | order(name asc) {
    _id,
    name,
    slug,
    description,
    price,
    variants,
    image,
    tags,
    featured,
    category->{
      _id,
      name,
      slug
    }
  }
`

// Staff Members
export const staffQuery = groq`
  *[_type == "staffMember"] | order(order asc) {
    _id,
    name,
    role,
    bio,
    photo,
    favoriteOrder,
    funFact
  }
`

// Locations
export const locationsQuery = groq`
  *[_type == "location"] | order(isPrimary desc, name asc) {
    _id,
    name,
    slug,
    address,
    coordinates,
    hours,
    phone,
    email,
    image,
    description,
    features,
    isPrimary
  }
`

// Single Location
export const locationBySlugQuery = groq`
  *[_type == "location" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    address,
    coordinates,
    hours,
    phone,
    email,
    image,
    description,
    features,
    isPrimary
  }
`

// Primary Location (for footer, etc.)
export const primaryLocationQuery = groq`
  *[_type == "location" && isPrimary == true][0] {
    name,
    address,
    phone,
    email,
    hours
  }
`

// Events
export const eventsQuery = groq`
  *[_type == "event" && date >= now()] | order(date asc) {
    _id,
    title,
    slug,
    shortDescription,
    date,
    endDate,
    recurring,
    image,
    featured,
    location->{
      name
    }
  }
`

// Upcoming Events (limited)
export const upcomingEventsQuery = groq`
  *[_type == "event" && date >= now()] | order(date asc) [0...3] {
    _id,
    title,
    slug,
    shortDescription,
    date,
    image,
    location->{
      name
    }
  }
`

// Single Event
export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    shortDescription,
    date,
    endDate,
    recurring,
    image,
    featured,
    location->{
      name,
      address,
      slug
    }
  }
`
