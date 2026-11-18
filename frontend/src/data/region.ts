// The "where are you joining us from?" overlay and the contact details of each region.
// Texts are translation keys (English copy in src/i18n/locales/en.json); the emails and phone numbers are plain.
import type { Region } from '../region/region'

export type RegionContent = {
  label: string
  // under the label on the overlay
  hint: string
  // shown on the Contact page; the email is also where the form is sent
  email: string
  phoneDisplay: string
  // digits for the tel: link
  phoneHref: string
  location: string
}

export const regionContent: Record<Region, RegionContent> = {
  european: {
    label: 'region.europe',
    hint: 'region.europeHint',
    email: 'admin@deewan.eu',
    phoneDisplay: '+49 163 2929209',
    phoneHref: '+491632929209',
    location: 'contact.locationValueEurope',
  },
  jordan: {
    label: 'region.jordan',
    hint: 'region.jordanHint',
    email: 'project@deewandevelopment.com',
    phoneDisplay: '(962) 7-7820-2083',
    phoneHref: '+962778202083',
    location: 'contact.locationValue',
  },
}

export const regionChooser = {
  eyebrow: 'region.eyebrow',
  title: 'region.title',
  subtitle: 'region.subtitle',
  note: 'region.note',
}
