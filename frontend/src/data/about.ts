// What the About page shows. Text values are translation keys: the English copy lives in
// src/i18n/locales/en.json, then `npm run translate:all` updates Arabic and German.
import type { Service } from '../components/serviceRing/serviceRing'

const images = '/assets/images/about'
const teamPhotos = '/assets/images/team'

export const aboutHero = {
  label: 'about.hero.label',
  title: 'about.hero.title', // <em> words are amber
}

export const aboutWho = {
  label: 'about.who.label',
  title: 'about.who.title',
  paragraphs: ['about.who.p1', 'about.who.p2', 'about.who.p3'],
}

// "to" points at the matching section on the Offer page ]
export const aboutServices = {
  label: 'about.services.label',
  title: 'about.services.title',
  services: [
    { title: 'service.web', image: `${images}/our-service-1.webp`, to: '/offer#web' },
    { title: 'service.mobile', image: `${images}/our-services-2.webp`, to: '/offer#mobile' },
    { title: 'service.ux', image: `${images}/our-services-4.webp`, to: '/offer#ux' },
    { title: 'service.social', image: `${images}/our-services-3.webp`, to: '/offer#social' },
    { title: 'service.marketing', image: `${images}/our-services-6.webp`, to: '/offer#marketing' },
  ] satisfies Service[],
}

export type TeamMember = {
  name: string // translation key
  role: string // translation key
  photo?: string // leave out and a placeholder is shown
}

const members: TeamMember[] = [
  { name: 'about.team.saba.name', role: 'about.team.saba', photo: `${teamPhotos}/saba.webp` },
  { name: 'about.team.qutaibh.name', role: 'about.team.qutaibh', photo: `${teamPhotos}/qutaiba.webp` },
  { name: 'about.team.rula.name', role: 'about.team.rula', photo: `${teamPhotos}/rula.webp` },
  { name: 'about.team.aya.name', role: 'about.team.aya', photo: `${teamPhotos}/aya.webp` },

]

export const aboutTeam = {
  label: 'about.team.label',
  title: 'about.team.title',
  description: 'about.team.description',
  members,
}

// The founder spotlight above the team grid
export const theManager = {
  label: 'about.manager.label',
  title: 'about.manager.title',
  name: 'about.manager.name',
  role: 'about.manager.role',
  roleShort: 'about.manager.roleShort',
  paragraphs: ['about.manager.p1', 'about.manager.p2'],
  expertiseLabel: 'about.manager.expertise',
  expertise: [
    'about.manager.skill1',
    'about.manager.skill2',
    'about.manager.skill3',
    'about.manager.skill4',
    'about.manager.skill5',
    'about.manager.skill6',
  ],
  photo: `${teamPhotos}/manager.webp`,
}
