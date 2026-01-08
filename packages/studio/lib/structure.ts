import type { StructureBuilder } from 'sanity/structure'

// Singleton document IDs
const SINGLETONS = ['siteSettings', 'homePage', 'aboutPage']

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Singletons
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem()
        .title('About Page')
        .id('aboutPage')
        .child(S.document().schemaType('aboutPage').documentId('aboutPage')),

      S.divider(),

      // Menu
      S.listItem()
        .title('Menu')
        .child(
          S.list()
            .title('Menu')
            .items([
              S.listItem()
                .title('Categories')
                .schemaType('category')
                .child(S.documentTypeList('category').title('Categories')),
              S.listItem()
                .title('Menu Items')
                .schemaType('menuItem')
                .child(S.documentTypeList('menuItem').title('Menu Items')),
            ])
        ),

      // Team
      S.listItem()
        .title('Team')
        .schemaType('staffMember')
        .child(S.documentTypeList('staffMember').title('Team Members')),

      // Locations
      S.listItem()
        .title('Locations')
        .schemaType('location')
        .child(S.documentTypeList('location').title('Locations')),

      // Events
      S.listItem()
        .title('Events')
        .schemaType('event')
        .child(S.documentTypeList('event').title('Events')),
    ])
