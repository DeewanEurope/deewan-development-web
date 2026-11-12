// What the "What We Offer" page shows. Text values are translation keys: the English copy lives in
// src/i18n/locales/en.json, then `npm run translate:all` updates Arabic and German.

const art = '/assets/images/about'

export type Offer = {
  id: string // also the #anchor, e.g. /offer#social
  eyebrow: string
  title: string
  intro: string[]
  capabilities: string[]
  image: string
  // optional half-globe stuck to the page edge, just above this section
  decor?: 'left' | 'right'
}

export const offerHero = {
  label: 'offer.hero.label',
  title: 'offer.hero.title',
  text: 'offer.hero.text',
}

export const offers: Offer[] = [
  {
    id: 'web',
    eyebrow: 'offer.web.eyebrow',
    title: 'service.web',
    intro: ['offer.web.p1', 'offer.web.p2', 'offer.web.p3'],
    capabilities: [
      'offer.web.cap1',
      'offer.web.cap2',
      'offer.web.cap3',
      'offer.web.cap4',
      'offer.web.cap5',
      'offer.web.cap6',
      'offer.web.cap7',
    ],
    image: `${art}/our-service-1.webp`,
  },
  {
    id: 'mobile',
    eyebrow: 'offer.mobile.eyebrow',
    title: 'service.mobileFull',
    intro: ['offer.mobile.p1', 'offer.mobile.p2'],
    capabilities: [
      'offer.mobile.cap1',
      'offer.mobile.cap2',
      'offer.mobile.cap3',
      'offer.mobile.cap4',
      'offer.mobile.cap5',
      'offer.mobile.cap6',
    ],
    image: `${art}/our-services-2.webp`,
    decor: 'left',
  },
  {
    id: 'ux',
    eyebrow: 'offer.ux.eyebrow',
    title: 'service.ux',
    intro: ['offer.ux.p1', 'offer.ux.p2'],
    capabilities: [
      'offer.ux.cap1',
      'offer.ux.cap2',
      'offer.ux.cap3',
      'offer.ux.cap4',
      'offer.ux.cap5',
      'offer.ux.cap6',
    ],
    image: `${art}/our-services-4.webp`,
    decor: 'right',
  },
  {
    id: 'social',
    eyebrow: 'offer.social.eyebrow',
    title: 'service.social',
    intro: ['offer.social.p1', 'offer.social.p2'],
    capabilities: [
      'offer.social.cap1',
      'offer.social.cap2',
      'offer.social.cap3',
      'offer.social.cap4',
      'offer.social.cap5',
      'offer.social.cap6',
      'offer.social.cap7',
      'offer.social.cap8',
    ],
    image: `${art}/our-services-3.webp`,
    decor: 'left',
  },
  {
    id: 'marketing',
    eyebrow: 'offer.marketing.eyebrow',
    title: 'service.marketing',
    intro: ['offer.marketing.p1', 'offer.marketing.p2'],
    capabilities: [
      'offer.marketing.cap1',
      'offer.marketing.cap2',
      'offer.marketing.cap3',
      'offer.marketing.cap4',
      'offer.marketing.cap5',
      'offer.marketing.cap6',
      'offer.marketing.cap7',
      'offer.marketing.cap8',
    ],
    image: `${art}/our-services-6.webp`,
  },
]
