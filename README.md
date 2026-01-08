# Ember & Oak Coffee

A demo coffee shop website built with Next.js 14 and Sanity CMS.

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **CMS**: Sanity v3
- **Styling**: Tailwind CSS v4
- **Monorepo**: Turborepo
- **Package Manager**: npm

## Project Structure

```
democoffeeshop/
├── apps/
│   └── web/          # Next.js frontend
├── packages/
│   └── studio/       # Sanity Studio
├── turbo.json
└── package.json
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Sanity

1. Create a new project at [sanity.io/manage](https://sanity.io/manage)
2. Copy your project ID
3. Create environment files:

```bash
# apps/web/.env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production

# packages/studio/.env
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
```

### 3. Run development servers

```bash
# Run both Next.js and Sanity Studio
npm run dev

# Or run individually
cd apps/web && npm run dev      # Next.js at http://localhost:3000
cd packages/studio && npm run dev  # Sanity at http://localhost:3333
```

### 4. Add content in Sanity Studio

1. Open Sanity Studio at http://localhost:3333
2. Add site settings, menu categories, menu items, etc.
3. Content will appear on the Next.js frontend

## Pages

- **Home** (`/`) - Hero, featured items, story preview, locations, events
- **Menu** (`/menu`) - Full menu with category navigation
- **About** (`/about`) - Story, values, timeline, team
- **Locations** (`/locations`) - Both Portland locations
- **Events** (`/events`) - Upcoming events and happenings
- **Contact** (`/contact`) - Contact form and FAQ

## Sanity Schemas

### Documents
- `category` - Menu categories (Espresso, Drip, Food, etc.)
- `menuItem` - Individual menu items with prices, variants, tags
- `staffMember` - Team members with bios and fun facts
- `location` - Shop locations with hours and features
- `event` - Events with dates and descriptions

### Singletons
- `siteSettings` - Shop name, logo, social links
- `homePage` - Hero content, featured section
- `aboutPage` - Story, values, timeline

## Design System

### Colors
- `cream` (#FAF7F2) - Backgrounds
- `espresso` (#2C1810) - Text
- `ember` (#C65D3B) - Accent/CTAs
- `oak` (#8B7355) - Secondary

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Prices**: JetBrains Mono

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

### Sanity Studio

```bash
cd packages/studio
npx sanity deploy
```

## License

MIT
