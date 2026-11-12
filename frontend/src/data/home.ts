// What the Home page shows. Text values are translation keys: the English copy lives in
// src/i18n/locales/en.json, then `npm run translate:all` updates Arabic and German.
import type { ServiceCard } from '../components/serviceSlider/serviceSlider'

const art = '/assets/images/home'

export const homeHero = {
  // "\n" starts a new line; <em> words are amber
  title: 'home.hero.title',
  text: 'home.hero.text',
  primary: { label: 'home.hero.primary', to: '/contact' },
  secondary: { label: 'home.hero.secondary', to: '/offer' },
}

export const homeWho = {
  label: 'home.who.label',
  title: 'home.who.title', // the design breaks the title at the "\n"
  paragraphs: ['home.who.p1', 'home.who.p2'],
}

// Each card turns a service into a big numbered tile; "to" points at the matching section of the Offer page.
export const homeServices = {
  label: 'home.services.label',
  title: 'home.services.title',
  description: 'home.services.description',
  cards: [
    { title: 'home.services.web', to: '/offer#web' },
    { title: 'home.services.mobile', to: '/offer#mobile' },
    { title: 'home.services.ux', to: '/offer#ux' },
    { title: 'home.services.social', to: '/offer#social' },
    { title: 'home.services.marketing', to: '/offer#marketing' },
  ] satisfies ServiceCard[],
}

export const homePortfolio = {
  label: 'home.portfolio.label',
  title: 'home.portfolio.title',
  description: 'home.portfolio.description',
  project: {
    name: 'home.portfolio.project',
    to: '/portfolio',
    laptop: `${art}/macbook.webp`,
    screen: `${art}/bookshop-screen.webp`,
  },
}
