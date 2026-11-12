import { useTranslation } from 'react-i18next'
import { LANGUAGES, type LanguageCode } from '../../i18n'
import './languageSwitcher.scss'

// Globe + language picker in the header. The pill shows the short code ("EN") so it stays small;
// a native <select> lies invisibly on top, so the list (with full names), keyboard and screen
// readers all work as usual. The choice is remembered and flips the page to RTL for Arabic
// (see src/i18n/index.ts).
function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { t, i18n } = useTranslation()
  const current = LANGUAGES.find(({ code }) => code === i18n.resolvedLanguage) ?? LANGUAGES[0]

  return (
    <label className={`dw-lang ${className}`}>
      <svg className="dw-lang-globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
      </svg>
      <span className="dw-lang-current" aria-hidden="true">
        {current.short}
      </span>
      <svg className="dw-lang-caret" viewBox="0 0 12 8" aria-hidden="true">
        <path d="m1 1.5 5 5 5-5" />
      </svg>
      <select
        className="dw-lang-select"
        aria-label={t('common.language')}
        value={current.code}
        onChange={(event) => i18n.changeLanguage(event.target.value as LanguageCode)}
      >
        {LANGUAGES.map(({ code, label }) => (
          <option key={code} value={code} lang={code}>
            {label}
          </option>
        ))}
      </select>
    </label>
  )
}

export default LanguageSwitcher
