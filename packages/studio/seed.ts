import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'vef3nzbe',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

async function seed() {
  console.log('Seeding Sanity...')

  // Site Settings
  console.log('Creating site settings...')
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    shopName: 'Ember & Oak Coffee',
    tagline: 'Good coffee takes time.',
    footerText: 'Neighborhood coffee, roasted in-house. Portland, Oregon since 2018.',
    socialLinks: {
      instagram: 'https://instagram.com/emberandoak',
      facebook: 'https://facebook.com/emberandoak',
    },
    seo: {
      metaTitle: 'Ember & Oak Coffee | Portland, Oregon',
      metaDescription: 'Neighborhood coffee shop in Portland, Oregon. House-roasted beans, local ingredients, and a space to slow down.',
    },
  })

  // Home Page
  console.log('Creating home page...')
  await client.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    hero: {
      headline: 'Good Coffee Takes Time',
      subheadline: 'House-roasted beans, local ingredients, and a space to slow down.',
      ctaText: 'View Menu',
      ctaLink: '/menu',
    },
    featuredSection: {
      title: "What We're Pouring",
      subtitle: "A few favorites from our menu. Everything's made to order, nothing sits on a warmer.",
    },
    storyPreview: {
      heading: 'Started in a Garage',
      excerpt: "In 2018, Maya Chen left her job as a food scientist at a major coffee company. She found a former auto repair shop on Division Street with good bones and terrible plumbing. Eight months later, Ember & Oak opened its doors.",
    },
    announcement: {
      enabled: false,
      text: '',
      link: '',
    },
  })

  // About Page
  console.log('Creating about page...')
  await client.createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',
    headline: 'Good Coffee Takes Time. So Do Good Things.',
    story: [
      {
        _type: 'block',
        _key: 'block1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: "In 2018, Maya Chen left her job as a food scientist at a major coffee company. Not because she didn't love coffee—she loved it too much. She was tired of watching beans get roasted to anonymity and milk alternatives treated as afterthoughts.",
          },
        ],
      },
      {
        _type: 'block',
        _key: 'block2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'She found a former auto repair shop on Division Street with good bones and terrible plumbing. Her brother Daniel, a contractor with more optimism than sense, said he could have it ready in three months. It took eight.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'block3',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span3',
            text: "The first year was brutal. Maya burned through savings, learned to fix an espresso machine at 5 AM, and discovered that \"regulars\" are made, not found. But slowly, Ember & Oak became what she'd imagined: a place where coffee is a craft, not a commodity.",
          },
        ],
      },
      {
        _type: 'block',
        _key: 'block4',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span4',
            text: "Today, we roast our own beans in small batches, source oat milk from a farm in Willamette Valley, and make pastries that Maya's grandmother would recognize—if not entirely approve of. (She still thinks American coffee is too weak.)",
          },
        ],
      },
      {
        _type: 'block',
        _key: 'block5',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span5',
            text: "We're not trying to change the world. We're just trying to make your morning a little better.",
          },
        ],
      },
    ],
    values: [
      {
        _key: 'value1',
        title: 'Quality Over Quantity',
        description: "We roast in small batches, brew fresh every 30 minutes, and would rather run out than serve something that's been sitting.",
      },
      {
        _key: 'value2',
        title: 'Know Your Farmer',
        description: "Direct relationships with growers in Guatemala, Ethiopia, and Colombia. We visit when we can, video call when we can't.",
      },
      {
        _key: 'value3',
        title: 'Local First',
        description: 'Oat milk from Willamette Valley. Pastries from Pine Street Bakery. Chocolate from Woodblock. If someone nearby makes it better, we buy from them.',
      },
      {
        _key: 'value4',
        title: 'No Shortcuts',
        description: 'House-made syrups. 18-hour cold brew. Chai spiced fresh. The extra effort shows up in the cup.',
      },
    ],
    timeline: [
      { _key: 'tl1', year: '2018', title: 'Division Street Opens', description: 'After eight months of renovation (three months over schedule), we opened our doors in a former auto repair shop.' },
      { _key: 'tl2', year: '2019', title: 'Started Roasting', description: 'Installed our first roaster—a 12kg Probat—and started roasting all our espresso in-house.' },
      { _key: 'tl3', year: '2021', title: 'Survived the Pandemic', description: 'Switched to takeout-only, launched delivery, and somehow made it through. Our regulars kept us alive.' },
      { _key: 'tl4', year: '2023', title: 'Alberta Opens', description: 'Our second location in the Alberta Arts District. Smaller, cozier, surrounded by galleries.' },
      { _key: 'tl5', year: '2024', title: 'Still Here', description: "Six years in. Same espresso machine. Same mission. A few more gray hairs on Maya's head." },
    ],
  })

  // Categories
  console.log('Creating categories...')
  const categories = [
    { _id: 'category-espresso', name: 'Espresso', slug: { current: 'espresso' }, icon: 'coffee', order: 1 },
    { _id: 'category-drip', name: 'Drip & Cold', slug: { current: 'drip-cold' }, icon: 'coffee', order: 2 },
    { _id: 'category-notcoffee', name: 'Not Coffee', slug: { current: 'not-coffee' }, icon: 'leaf', order: 3 },
    { _id: 'category-food', name: 'Pastries & Food', slug: { current: 'food' }, icon: 'pastry', order: 4 },
  ]

  for (const cat of categories) {
    await client.createOrReplace({ ...cat, _type: 'category' })
  }

  // Menu Items
  console.log('Creating menu items...')
  const menuItems = [
    // Espresso
    {
      _id: 'menu-division',
      name: 'The Division',
      slug: { current: 'the-division' },
      category: { _type: 'reference', _ref: 'category-espresso' },
      description: 'Our signature blend—Guatemala and Ethiopia, roasted in-house. Notes of dark chocolate, cherry, and just enough brightness to wake you up without shouting.',
      price: 3.50,
      variants: [
        { _key: 'sm', size: 'small', price: 3.50 },
        { _key: 'md', size: 'medium', price: 4.25 },
        { _key: 'lg', size: 'large', price: 5.00 },
      ],
      tags: ['staff-pick'],
      available: true,
      featured: true,
    },
    {
      _id: 'menu-cortado',
      name: 'Cortado',
      slug: { current: 'cortado' },
      category: { _type: 'reference', _ref: 'category-espresso' },
      description: "Equal parts espresso and steamed milk. Simple. Perfect. No customizations because it doesn't need them.",
      price: 4.50,
      tags: [],
      available: true,
      featured: false,
    },
    {
      _id: 'menu-oat-latte',
      name: 'Oat Milk Latte',
      slug: { current: 'oat-milk-latte' },
      category: { _type: 'reference', _ref: 'category-espresso' },
      description: 'Made with Misty Morning oat milk from the Willamette Valley. Creamy without being cloying.',
      price: 5.00,
      variants: [
        { _key: 'sm', size: 'small', price: 5.00 },
        { _key: 'md', size: 'medium', price: 5.75 },
        { _key: 'lg', size: 'large', price: 6.50 },
      ],
      tags: ['vegan', 'dairy-free'],
      available: true,
      featured: true,
    },
    {
      _id: 'menu-lavender-latte',
      name: 'Lavender Honey Latte',
      slug: { current: 'lavender-honey-latte' },
      category: { _type: 'reference', _ref: 'category-espresso' },
      description: "Local wildflower honey and house-made lavender syrup. Sweet, floral, a little unexpected. Maya's answer to 'can you make it less bitter?'",
      price: 5.50,
      variants: [
        { _key: 'sm', size: 'small', price: 5.50 },
        { _key: 'md', size: 'medium', price: 6.25 },
        { _key: 'lg', size: 'large', price: 7.00 },
      ],
      tags: ['seasonal'],
      available: true,
      featured: true,
    },
    {
      _id: 'menu-redeye',
      name: 'Red Eye',
      slug: { current: 'red-eye' },
      category: { _type: 'reference', _ref: 'category-espresso' },
      description: "Drip coffee with a shot of espresso. For days when one caffeine delivery system isn't enough.",
      price: 4.75,
      tags: [],
      available: true,
      featured: false,
    },
    // Drip & Cold
    {
      _id: 'menu-drip',
      name: 'House Drip',
      slug: { current: 'house-drip' },
      category: { _type: 'reference', _ref: 'category-drip' },
      description: "Rotating single-origin, brewed fresh every 30 minutes. Ask your barista what's on—they're excited to tell you.",
      price: 2.75,
      variants: [
        { _key: 'sm', size: 'small', price: 2.75 },
        { _key: 'md', size: 'medium', price: 3.25 },
        { _key: 'lg', size: 'large', price: 3.75 },
      ],
      tags: ['vegan'],
      available: true,
      featured: false,
    },
    {
      _id: 'menu-coldbrew',
      name: 'Cold Brew',
      slug: { current: 'cold-brew' },
      category: { _type: 'reference', _ref: 'category-drip' },
      description: 'Steeped 18 hours, served over ice. Strong enough to be dangerous, smooth enough to forget that.',
      price: 4.50,
      tags: ['vegan'],
      available: true,
      featured: true,
    },
    {
      _id: 'menu-nitro',
      name: 'Nitro Cold Brew',
      slug: { current: 'nitro-cold-brew' },
      category: { _type: 'reference', _ref: 'category-drip' },
      description: 'Cold brew on tap, infused with nitrogen. Creamy, cascading, caffeinated.',
      price: 5.50,
      tags: ['vegan', 'staff-pick'],
      available: true,
      featured: false,
    },
    {
      _id: 'menu-iced-americano',
      name: 'Iced Americano',
      slug: { current: 'iced-americano' },
      category: { _type: 'reference', _ref: 'category-drip' },
      description: "Espresso, water, ice. The 'I want coffee but it's 90 degrees' drink.",
      price: 3.75,
      variants: [
        { _key: 'sm', size: 'small', price: 3.75 },
        { _key: 'md', size: 'medium', price: 4.50 },
      ],
      tags: ['vegan'],
      available: true,
      featured: false,
    },
    // Not Coffee
    {
      _id: 'menu-matcha',
      name: 'Matcha Latte',
      slug: { current: 'matcha-latte' },
      category: { _type: 'reference', _ref: 'category-notcoffee' },
      description: 'Ceremonial-grade matcha from Uji, Japan. Earthy, grassy, nothing like the stuff from a powder.',
      price: 5.25,
      variants: [
        { _key: 'sm', size: 'small', price: 5.25 },
        { _key: 'md', size: 'medium', price: 6.00 },
      ],
      tags: ['vegan'],
      available: true,
      featured: false,
    },
    {
      _id: 'menu-london-fog',
      name: 'London Fog',
      slug: { current: 'london-fog' },
      category: { _type: 'reference', _ref: 'category-notcoffee' },
      description: 'Earl Grey, vanilla, steamed milk. Named after a city with terrible weather and excellent tea.',
      price: 4.50,
      variants: [
        { _key: 'sm', size: 'small', price: 4.50 },
        { _key: 'md', size: 'medium', price: 5.25 },
      ],
      tags: [],
      available: true,
      featured: false,
    },
    {
      _id: 'menu-hot-chocolate',
      name: 'Hot Chocolate',
      slug: { current: 'hot-chocolate' },
      category: { _type: 'reference', _ref: 'category-notcoffee' },
      description: 'Made with Woodblock chocolate and whole milk. Rich enough to count as dessert.',
      price: 4.25,
      variants: [
        { _key: 'sm', size: 'small', price: 4.25 },
        { _key: 'md', size: 'medium', price: 5.00 },
      ],
      tags: [],
      available: true,
      featured: false,
    },
    {
      _id: 'menu-chai',
      name: 'Chai Latte',
      slug: { current: 'chai-latte' },
      category: { _type: 'reference', _ref: 'category-notcoffee' },
      description: 'House-spiced chai—cardamom, ginger, black pepper, cinnamon. Made fresh, not from a box.',
      price: 4.75,
      variants: [
        { _key: 'sm', size: 'small', price: 4.75 },
        { _key: 'md', size: 'medium', price: 5.50 },
      ],
      tags: [],
      available: true,
      featured: false,
    },
    // Food
    {
      _id: 'menu-muffin',
      name: 'Morning Glory Muffin',
      slug: { current: 'morning-glory-muffin' },
      category: { _type: 'reference', _ref: 'category-food' },
      description: 'Carrots, apple, coconut, walnuts. Somehow both virtuous and delicious.',
      price: 4.25,
      tags: ['vegan'],
      available: true,
      featured: false,
    },
    {
      _id: 'menu-croissant',
      name: 'Almond Croissant',
      slug: { current: 'almond-croissant' },
      category: { _type: 'reference', _ref: 'category-food' },
      description: 'From Pine Street Bakery. Flaky, frangipane-filled, probably too good for a Monday.',
      price: 5.50,
      tags: [],
      available: true,
      featured: false,
    },
    {
      _id: 'menu-bagel',
      name: 'Everything Bagel',
      slug: { current: 'everything-bagel' },
      category: { _type: 'reference', _ref: 'category-food' },
      description: 'Housemade cream cheese, capers, pickled onion, cucumber. A proper bagel situation.',
      price: 7.50,
      tags: [],
      available: true,
      featured: false,
    },
    {
      _id: 'menu-avo-toast',
      name: 'Avocado Toast',
      slug: { current: 'avocado-toast' },
      category: { _type: 'reference', _ref: 'category-food' },
      description: 'Sourdough, smashed avo, chili flake, flaky salt, pepitas. Yes, that avocado toast.',
      price: 9.00,
      tags: ['vegan'],
      available: true,
      featured: false,
    },
    {
      _id: 'menu-granola',
      name: 'Granola Bowl',
      slug: { current: 'granola-bowl' },
      category: { _type: 'reference', _ref: 'category-food' },
      description: "House granola, Greek yogurt, seasonal fruit, honey. Changes with whatever's good at the market.",
      price: 8.50,
      tags: ['gluten-free'],
      available: true,
      featured: false,
    },
    {
      _id: 'menu-sandwich',
      name: 'Breakfast Sandwich',
      slug: { current: 'breakfast-sandwich' },
      category: { _type: 'reference', _ref: 'category-food' },
      description: 'Scrambled eggs, aged cheddar, bacon or tempeh, greens, sriracha aioli on a brioche bun.',
      price: 10.50,
      tags: ['staff-pick'],
      available: true,
      featured: true,
    },
  ]

  for (const item of menuItems) {
    await client.createOrReplace({ ...item, _type: 'menuItem' })
  }

  // Staff
  console.log('Creating staff members...')
  const staff = [
    {
      _id: 'staff-maya',
      name: 'Maya Chen',
      role: 'Founder & Head Roaster',
      bio: 'Former food scientist turned reluctant business owner. Still gets excited about bean density.',
      favoriteOrder: 'Cortado, no variations',
      funFact: 'Once blind-tested 47 oat milks to find the right one',
      order: 1,
    },
    {
      _id: 'staff-daniel',
      name: 'Daniel Chen',
      role: 'Operations Manager',
      bio: "Maya's brother. Fixed up the original space and never left. Handles everything that isn't coffee.",
      favoriteOrder: 'Red Eye with oat milk',
      funFact: 'Built all the furniture from reclaimed oak beams',
      order: 2,
    },
    {
      _id: 'staff-jess',
      name: 'Jess Okonkwo',
      role: 'Lead Barista',
      bio: '6 years in specialty coffee, latte art champion (regional, 2022). Strong opinions about tamping pressure.',
      favoriteOrder: 'Iced oat milk latte, light ice',
      funFact: 'Has a tattoo of a portafilter',
      order: 3,
    },
    {
      _id: 'staff-sam',
      name: 'Sam Reeves',
      role: 'Barista',
      bio: "Former music teacher, current caffeine artist. Knows everyone's regular order within two visits.",
      favoriteOrder: 'Chai latte, extra spicy',
      funFact: "Plays in a folk band called 'The Pour Overs'",
      order: 4,
    },
  ]

  for (const member of staff) {
    await client.createOrReplace({ ...member, _type: 'staffMember' })
  }

  // Locations
  console.log('Creating locations...')
  const locations = [
    {
      _id: 'location-division',
      name: 'Division Street',
      slug: { current: 'division' },
      address: {
        street: '3847 SE Division Street',
        city: 'Portland',
        state: 'OR',
        zip: '97202',
      },
      coordinates: { lat: 45.5045, lng: -122.6187 },
      phone: '(503) 555-0147',
      email: 'hello@emberandoak.coffee',
      description: 'Our original location in a converted auto shop. High ceilings, lots of light, and the espresso machine that started it all.',
      hours: [
        { _key: 'h1', days: 'Monday - Friday', hours: '6:30 AM - 6:00 PM' },
        { _key: 'h2', days: 'Saturday', hours: '7:00 AM - 6:00 PM' },
        { _key: 'h3', days: 'Sunday', hours: '7:30 AM - 4:00 PM' },
      ],
      features: ['wifi', 'outdoor', 'accessible', 'dog-friendly'],
      isPrimary: true,
    },
    {
      _id: 'location-alberta',
      name: 'Alberta Arts',
      slug: { current: 'alberta' },
      address: {
        street: '2215 NE Alberta Street',
        city: 'Portland',
        state: 'OR',
        zip: '97211',
      },
      coordinates: { lat: 45.5589, lng: -122.6456 },
      phone: '(503) 555-0283',
      email: 'alberta@emberandoak.coffee',
      description: 'Our Alberta outpost. Smaller, cozier, surrounded by galleries. Perfect for a quiet morning with a book.',
      hours: [
        { _key: 'h1', days: 'Monday - Friday', hours: '7:00 AM - 5:00 PM' },
        { _key: 'h2', days: 'Saturday - Sunday', hours: '8:00 AM - 5:00 PM' },
      ],
      features: ['wifi', 'outdoor', 'accessible'],
      isPrimary: false,
    },
  ]

  for (const loc of locations) {
    await client.createOrReplace({ ...loc, _type: 'location' })
  }

  // Events
  console.log('Creating events...')
  const events = [
    {
      _id: 'event-cupping',
      title: 'Cupping Session: Ethiopia Yirgacheffe',
      slug: { current: 'cupping-ethiopia' },
      date: '2026-01-15T10:00:00.000Z',
      shortDescription: "Join Maya for a guided tasting of our new single-origin Ethiopian. Learn about processing methods, flavor profiles, and why we're so excited about this coffee. Limited to 12 people.",
      location: { _type: 'reference', _ref: 'location-division' },
      recurring: 'none',
      featured: true,
    },
    {
      _id: 'event-music',
      title: 'Live Music: The Pour Overs',
      slug: { current: 'live-music-pour-overs' },
      date: '2026-01-18T19:00:00.000Z',
      shortDescription: 'Our own Sam Reeves and his folk band play their monthly set. Original songs about coffee, rain, and questionable life choices. No cover, just good music and late-night espresso.',
      location: { _type: 'reference', _ref: 'location-division' },
      recurring: 'monthly',
      featured: true,
    },
    {
      _id: 'event-throwdown',
      title: 'Latte Art Throwdown',
      slug: { current: 'latte-art-throwdown' },
      date: '2026-01-25T16:00:00.000Z',
      shortDescription: 'Local baristas compete for glory (and a $100 bar tab). Come watch, vote, and drink the evidence. Open to all skill levels—sign up at the bar.',
      location: { _type: 'reference', _ref: 'location-division' },
      recurring: 'none',
      featured: false,
    },
    {
      _id: 'event-poetry',
      title: 'Poetry Open Mic',
      slug: { current: 'poetry-open-mic' },
      date: '2026-01-21T19:00:00.000Z',
      shortDescription: 'Hosted by Portland Poets Collective. Sign-up starts at 6:30. Five-minute sets. Be brave.',
      location: { _type: 'reference', _ref: 'location-alberta' },
      recurring: 'weekly',
      featured: false,
    },
    {
      _id: 'event-workshop',
      title: 'Brewing 101: Pour Over Workshop',
      slug: { current: 'pour-over-workshop' },
      date: '2026-02-01T11:00:00.000Z',
      shortDescription: "Learn to make coffee shop quality pour-overs at home. We'll cover grind size, water temperature, timing, and technique. You'll leave with a bag of beans and newfound confidence.",
      location: { _type: 'reference', _ref: 'location-division' },
      recurring: 'none',
      featured: false,
    },
    {
      _id: 'event-vinyl',
      title: 'Coffee & Vinyl Night',
      slug: { current: 'coffee-vinyl-night' },
      date: '2026-02-08T18:00:00.000Z',
      shortDescription: "Bring your favorite records, we'll spin them on our vintage setup. Themed drink specials based on what's playing. Last month someone brought a Fleetwood Mac album and we all cried a little.",
      location: { _type: 'reference', _ref: 'location-alberta' },
      recurring: 'monthly',
      featured: false,
    },
  ]

  for (const event of events) {
    await client.createOrReplace({ ...event, _type: 'event' })
  }

  console.log('Done! Seeded all content.')
}

seed().catch(console.error)
