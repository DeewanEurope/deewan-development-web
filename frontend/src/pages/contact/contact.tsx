import { useEffect, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import LottieGlobe from '../../components/lottieGlobe/lottieGlobe'
import SplitWords from '../../components/splitWords/splitWords'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { offers } from '../../data/offer'
import './contact.scss'

// empty in dev: requests go to /api on the Vite server, which proxies them to the backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''
const FALLBACK_ERROR = 'contact.error'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const icons: Record<string, ReactNode> = {
  email: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z" />
    </svg>
  ),
  location: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 2a5 5 0 0 1 5 5c0 3.2-3.2 7.6-5 9.9-1.8-2.3-5-6.7-5-9.9a5 5 0 0 1 5-5Zm0 2.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" />
    </svg>
  ),
}

// label and plain values are translation keys
const details = [
  { icon: 'email', label: 'contact.email', value: 'project@deewandevelopment.com', href: 'mailto:project@deewandevelopment.com' },
  { icon: 'phone', label: 'contact.phone', value: '(962) 7-7820-2083', href: 'tel:+962778202083' },
  { icon: 'location', label: 'contact.location', value: 'contact.locationValue', translate: true },
]

function Contact() {
  const { t, i18n } = useTranslation()
  const pageRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  useScrollReveal(pageRef)

  useEffect(() => {
    document.title = t('meta.title.contact')
  }, [t])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: data.get('fullName'),
          email: data.get('email'),
          service: data.get('service'),
          message: data.get('message'),
        }),
      })
      const result = await response.json().catch(() => ({}))

      if (!response.ok) throw new Error(result.error ?? t(FALLBACK_ERROR))

      setStatus('sent')
      form.reset()
    } catch (err) {
      setStatus('error')
      // fetch itself throws a TypeError when the server can't be reached
      setErrorMessage(err instanceof Error && !(err instanceof TypeError) ? err.message : t(FALLBACK_ERROR))
    }
  }

  return (
    <div ref={pageRef} className="contact">
      <div className="contact-shape contact-shape-left" data-reveal="fade">
        <LottieGlobe className="contact-shape-globe" />
      </div>
      <div className="contact-shape contact-shape-right" data-reveal="fade">
        <LottieGlobe className="contact-shape-globe" />
      </div>

      <section className="dw-container contact-body">
        <div className="contact-info">
          <h1 className="contact-title" data-reveal="words">
            <SplitWords text={t('contact.title')} />
          </h1>
          <p className="contact-text" data-reveal="up">
            {t('contact.text')}
          </p>

          <ul className="contact-details">
            {details.map(({ icon, label, value, href, translate }) => (
              <li key={label} className="contact-detail" data-reveal="slide">
                <span className="contact-detail-icon">{icons[icon]}</span>
                <span className="contact-detail-text">
                  <span className="contact-detail-label">{t(label)}</span>
                  {href ? (
                    // email and phone always read left to right, even on the Arabic page
                    <a className="contact-detail-value" href={href} dir="ltr">
                      {value}
                    </a>
                  ) : (
                    <span className="contact-detail-value">{translate ? t(value) : value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="contact-card" data-reveal="right">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-row">
              <label className="contact-field">
                <span className="contact-label">{t('contact.fullName')}</span>
                <input className="contact-input" type="text" name="fullName" placeholder={t('contact.fullNamePlaceholder')} autoComplete="name" required />
              </label>
              <label className="contact-field">
                <span className="contact-label">{t('contact.workEmail')}</span>
                <input
                  className="contact-input"
                  type="email"
                  name="email"
                  placeholder={t('contact.emailPlaceholder')}
                  autoComplete="email"
                  required
                />
              </label>
            </div>

            <label className="contact-field">
              <span className="contact-label">{t('contact.service')}</span>
              <span className="contact-select">
                <select className="contact-input" name="service" defaultValue="">
                  <option value="" disabled>
                    {t('contact.chooseService')}
                  </option>
                  {/* the value stays in English, so the enquiry email reads the same whatever the visitor's language */}
                  {offers.map(({ id, title }) => (
                    <option key={id} value={i18n.getFixedT('en')(title)}>
                      {t(title)}
                    </option>
                  ))}
                  <option value="Other">{t('contact.other')}</option>
                </select>
              </span>
            </label>

            <label className="contact-field">
              <span className="contact-label">{t('contact.message')}</span>
              <textarea
                className="contact-input contact-textarea"
                name="message"
                rows={4}
                placeholder={t('contact.messagePlaceholder')}
                required
              />
            </label>

            <div className="contact-submit">
              <button type="submit" className="contact-button" disabled={status === 'sending'}>
                {t(status === 'sending' ? 'contact.sending' : 'contact.send')}
              </button>

              <p className={`contact-status contact-status-${status}`} role="status" aria-live="polite">
                {status === 'sent' && t('contact.sent')}
                {status === 'error' && errorMessage}
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Contact
