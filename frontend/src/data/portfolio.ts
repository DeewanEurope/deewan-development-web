
const logos = '/assets/images/portfolio'
const animations = '/assets/lottie'

export type TechName = 'Figma' | 'React' | 'Firebase' | 'JavaScript' | 'Flutter' | 'Dart'

export type CaseStudy = {
  duration: string
  service: string
  industry: string
  what: string
  challenge: string
  solution: string
  // walkthrough played inside the laptop; without one the laptop shows the logo
  video?: string
  // shown under the laptop, e.g. the live website or the Play Store page
  link?: { href: string; label: string } // label: translation key // label: translation key
  stack: TechName[]
}

export type Project = {
  id: string
  name: string
  logo: string
  // Lottie animation shown on the carousel card
  animation: string
  tags: [string, string, string, string]
  caseStudy: CaseStudy
}

// Text values are translation keys: the English copy lives in src/i18n/locales/en.json
// Text values are translation keys: the English copy lives in src/i18n/locales/en.json
export const portfolioHero = {
  label: 'portfolio.hero.label',
  title: 'portfolio.hero.title',
}

export const caseStudyHeading = {
  label: 'caseStudy.label',
  title: 'caseStudy.title',
}


export const projects: Project[] = [
  {
    id: 'development',
    name: 'project.development.name',
    logo: `${logos}/development_logo.webp`,
    animation: `${animations}/development_animation.json`,
    tags: ['project.development.tag1', 'project.development.tag2', 'project.development.tag3', 'project.development.tag4'],
    caseStudy: {
      duration: 'project.development.duration',
      service: 'service.web',
      industry: 'project.development.industry',
      what: 'project.development.what',
      challenge: 'project.development.challenge',
      solution: 'project.development.solution',
      stack: ['Figma', 'React', 'Firebase', 'JavaScript'],
    },
  },
  {
    id: 'tourism',
    name: 'project.tourism.name',
    logo: `${logos}/tourism_logo.webp`,
    animation: `${animations}/tourism_animation.json`,
    tags: ['project.tourism.tag1', 'project.tourism.tag2', 'project.tourism.tag3', 'project.tourism.tag4'],
    caseStudy: {
      duration: 'project.tourism.duration',
      service: 'service.web',
      industry: 'project.tourism.industry',
      what: 'project.tourism.what',
      challenge: 'project.tourism.challenge',
      solution: 'project.tourism.solution',
      video:
        'https://firebasestorage.googleapis.com/v0/b/deewanweb.firebasestorage.app/o/development%20videos%2Fdeewan-tourism-video.mp4?alt=media&token=83bc2608-02e7-40f4-af53-8a2d55a6e333',
      link: { href: 'https://www.deewantourism.com', label: 'project.tourism.link' },
      stack: ['Figma', 'React', 'Firebase', 'JavaScript'],
    },
  },
  {
    id: 'linguarabi',
    name: 'project.linguarabi.name',
    logo: `${logos}/linguarabi_logo.webp`,
    animation: `${animations}/linguarabi_animation.json`,
    tags: ['project.linguarabi.tag1', 'project.linguarabi.tag2', 'project.linguarabi.tag3', 'project.linguarabi.tag4'],
    caseStudy: {
      duration: 'project.linguarabi.duration',
      service: 'service.web',
      industry: 'project.linguarabi.industry',
      what: 'project.linguarabi.what',
      challenge: 'project.linguarabi.challenge',
      solution: 'project.linguarabi.solution',
      // TODO: Play Store page, e.g. link: { href: 'https://play.google.com/...', label: 'project.linguarabi.link' } (add the key to en.json)
      stack: ['Figma', 'Flutter', 'Dart', 'Firebase'],
    },
  },
  {
    id: 'bookshop',
    name: 'project.bookshop.name',
    logo: `${logos}/bookshop_logo.webp`,
    animation: `${animations}/bookshop_animation.json`,
    tags: ['project.bookshop.tag1', 'project.bookshop.tag2', 'project.bookshop.tag3', 'project.bookshop.tag4'],
    caseStudy: {
      duration: 'project.bookshop.duration',
      service: 'service.web',
      industry: 'project.bookshop.industry',
      what: 'project.bookshop.what',
      challenge: 'project.bookshop.challenge',
      solution: 'project.bookshop.solution',
      video:
        'https://firebasestorage.googleapis.com/v0/b/deewanweb.firebasestorage.app/o/development%20videos%2Fdeewan-bookshop-video.mp4?alt=media&token=19a93f6d-2507-4a27-8d41-e98399c689c1',
      link: { href: 'https://www.deewanbookshop.com', label: 'project.bookshop.link' },
      stack: ['Figma', 'React', 'Firebase', 'JavaScript'],
    },
  },
  {
    id: 'institute',
    name: 'project.institute.name',
    logo: `${logos}/institute_logo.webp`,
    animation: `${animations}/institute_animation.json`,
    tags: ['project.institute.tag1', 'project.institute.tag2', 'project.institute.tag3', 'project.institute.tag4'],
    caseStudy: {
      duration: 'project.institute.duration',
      service: 'service.web',
      industry: 'project.institute.industry',
      what: 'project.institute.what',
      challenge: 'project.institute.challenge',
      solution: 'project.institute.solution',
      video:
        'https://firebasestorage.googleapis.com/v0/b/deewanweb.firebasestorage.app/o/development%20videos%2Fdeewan-institute-video.mp4?alt=media&token=f0d066ac-2711-419b-9f1b-2a1bab266ee9',
      link: { href: 'https://www.deewaninstitute.com', label: 'project.institute.link' },
      stack: ['Figma', 'React', 'Firebase', 'JavaScript'],
    },
  },
]

// Which project sits in the middle when the page opens
export const initialProject = 'linguarabi'
