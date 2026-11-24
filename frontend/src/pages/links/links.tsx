import { useEffect, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { LANGUAGES } from '../../i18n'
import './links.scss'

type LinkItem = {
  id: string
  label: string // translation key
  hint: string // translation key
  href: string
  icon: ReactNode
}

const links: LinkItem[] = [
  {
    id: 'instagram',
    label: 'links.instagram',
    hint: 'links.instagramHint',
    href: 'https://www.instagram.com/deewan_for_digital_learning/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: 'facebook',
    label: 'links.facebook',
    hint: 'links.facebookHint',
    href: 'https://www.facebook.com/people/Deewan-for-Digital-Learning-Developmen/61589663083228/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.5 21v-8h2.7l.5-3.3h-3.2V7.6c0-1 .4-1.7 1.8-1.7h1.5V3.1C16.1 3 15.2 3 14.3 3c-2.6 0-4.1 1.5-4.1 4.2v2.5H7.5V13h2.7v8z" />
      </svg>
    ),
  },
  {
    id: 'youtube',
    label: 'links.youtube',
    hint: 'links.youtubeHint',
    href: 'https://www.youtube.com/@Deewanfordigitallearningdevelo',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.6 2.6 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8a2.6 2.6 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3z" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'links.linkedin',
    hint: 'links.linkedinHint',
    href: 'https://www.linkedin.com/company/deewan-for-digital-learning-development/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <rect x="3" y="9" width="4" height="12" />
        <circle cx="5" cy="5" r="2.2" />
        <path d="M10 9h3.8v1.8c.7-1.2 2.1-2.1 4-2.1 3.3 0 4.2 2.1 4.2 5.3V21h-4v-6.1c0-1.5-.4-2.5-1.9-2.5-1.6 0-2.1 1.1-2.1 2.6V21h-4z" />
      </svg>
    ),
  },
  {
    id: 'google',
    label: 'links.google',
    hint: 'links.googleHint',
    href: 'https://www.google.com/search?sca_esv=c43d336a116f8bd5&sxsrf=APpeQnsIPm9yz5Pd8Xq280fPPI6BQ_Lbxw%3A1787555809273&q=Deewan%20for%20Digital%20Learning%20Development&stick=H4sIAAAAAAAAAONgU1I1qLBINTQyM01OSkwyNDAzNzW3MqhIszQzt0g1tTBKSzFOS05LXMSq7pKaWp6Yp5CWX6TgkpmeWZKYo-CTmliUl5mXruCSWpaak1-Qm5pXAgBNsOmAUwAAAA&mat=CUoHYv5VyEHd&ved=2ahUKEwjbmJyo3LiWAxUzVkEAHUToI_QQrMcEegQIRxAC',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M4.5 3h15L21 8a2.25 2.25 0 0 1-4.5 0 2.25 2.25 0 0 1-4.5 0 2.25 2.25 0 0 1-4.5 0A2.25 2.25 0 0 1 3 8z"
          fill="currentColor"
          stroke="none"
        />
        <path d="M5 11.5v9h14v-9" />
        <path d="M14.1 14.4A2.6 2.6 0 1 0 14.8 16.2H12.2" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    id: 'maps',
    label: 'links.maps',
    hint: 'links.mapsHint',
    href: 'https://maps.app.goo.gl/Wg3dvyACc7KihRvg7',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z" />
        <circle cx="12" cy="9.5" r="2.6" />
      </svg>
    ),
  },
]

const arrow = (
  <svg className="dw-links-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

// deewandevelopment.com/links — a "link in bio" page. It stands on its own (no navbar, footer or loader).
function Links() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    document.title = t('meta.title.links')
  }, [t])

  return (
    <main id="main" className="dw-links">
      <span className="dw-links-blob dw-links-blob-1" aria-hidden="true" />
      <span className="dw-links-blob dw-links-blob-2" aria-hidden="true" />

      <div className="dw-links-card">
        <div className="dw-links-langs" role="group" aria-label={t('common.language')}>
          {LANGUAGES.map(({ code, short }) => (
            <button
              key={code}
              type="button"
              className={i18n.language === code ? 'is-active' : undefined}
              aria-pressed={i18n.language === code}
              onClick={() => i18n.changeLanguage(code)}
            >
              {short}
            </button>
          ))}
        </div>

        <header className="dw-links-head">
          {/* the logo already spells out the brand name, so it is the heading */}
          <h1 className="dw-links-title">
            <img src="/assets/images/logos/logo.png" alt={t('common.brand')} width="1330" height="606" />
          </h1>
          <p className="dw-links-tagline">{t('links.tagline')}</p>
        </header>

        <ul className="dw-links-list">
          {links.map(({ id, label, hint, href, icon }) => (
            <li key={id}>
              <a className="dw-links-item" href={href} target="_blank" rel="noreferrer">
                <span className="dw-links-icon" aria-hidden="true">
                  {icon}
                </span>
                <span className="dw-links-text">
                  <span className="dw-links-label">{t(label)}</span>
                  <span className="dw-links-hint">{t(hint)}</span>
                </span>
                {arrow}
              </a>
            </li>
          ))}
        </ul>

        <Link to="/" className="dw-links-site">
          {t('links.website')}
          {arrow}
        </Link>

        <p className="dw-links-copy">{t('footer.copyright')}</p>
      </div>
    </main>
  )
}

export default Links
