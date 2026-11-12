import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import ar from './locales/ar.json'
import de from './locales/de.json'

// To add a language: add it here, add it to scripts/translate.ts, then run `npm run translate:<code>`
export const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN', dir: 'ltr' },
  //{ code: 'ar', label: 'العربية', short: 'AR', dir: 'rtl' },
  { code: 'de', label: 'Deutsch', short: 'DE', dir: 'ltr' },
] as const

export type LanguageCode = (typeof LANGUAGES)[number]['code']

const STORAGE_KEY = 'language'

const isLanguage = (code: string | null): code is LanguageCode =>
  LANGUAGES.some((language) => language.code === code)

const readSavedLanguage = (): LanguageCode => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return isLanguage(saved) ? saved : 'en'
  } catch {
    return 'en'
  }
}

// <html lang dir> drives the RTL layout and the Arabic font (see style/languages.scss)
const applyToDocument = (code: string) => {
  const language = LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0]
  document.documentElement.lang = language.code
  document.documentElement.dir = language.dir
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
  //  ar: { translation: ar },
    de: { translation: de },
  },
  lng: readSavedLanguage(),
  fallbackLng: 'en',
  // keys are flat strings like "home.hero.text", not nested objects
  keySeparator: false,
  interpolation: { escapeValue: false },
})

applyToDocument(i18n.language)

i18n.on('languageChanged', (code) => {
  applyToDocument(code)
  try {
    localStorage.setItem(STORAGE_KEY, code)
  } catch {
    // private mode: the choice just isn't remembered
  }
})

export default i18n
