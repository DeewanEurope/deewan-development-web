// The "where are you joining us from?" overlay. Edit the wording and the contact details here.
import type { Region } from '../region/region'

export type RegionContent = {
  label: string
  // under the label on the overlay
  hint: string
  // the contact details shown on the Contact page; the email is also where the form is sent
  email: string
  phoneDisplay: string
  // digits for the tel: link
  phoneHref: string
  location: string
}

export const regionContent: Record<Region, RegionContent> = {
  european: {
    label: 'Europe',
    hint: 'Our team in Germany',
    email: 'admin@deewan.eu',
    phoneDisplay: '+49 163 2929209',
    phoneHref: '+491632929209',
    location: 'Robert-Bosch-Straße 110, 74081 Heilbronn, Germany',
  },
  jordan: {
    label: 'Other parts of the world',
    hint: 'Our team in Amman, Jordan',
    email: 'project@deewandevelopment.com',
    phoneDisplay: '(962) 7-7820-2081',
    phoneHref: '+962778202081',
    location: 'Amman, Jordan',
  },
}

export const regionChooser = {
  eyebrow: 'Welcome to Deewan',
  title: 'Where are you joining us from?',
  subtitle: "Choose your region and we'll connect you with the Deewan team closest to you.",
  note: 'Our services are the same in both regions — only your contact team changes.',
}
