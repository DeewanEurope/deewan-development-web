import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import RoughArrow from '../roughArrow/roughArrow'
import './serviceSlider.scss'

export type ServiceCard = {
  // translation key; a "\n" in the text breaks the big title exactly where the design does
  title: string
  to: string
}

type ServiceSliderProps = {
  cards: ServiceCard[]
}

// same breakpoint as $tablet in the stylesheet
const COMPACT = '(max-width: 820px)'
const SWIPE = 40

// Numbered tiles, two to a page on desktop and one on phones. The dots (or a swipe) turn the page.
function ServiceSlider({ cards }: ServiceSliderProps) {
  const { t, i18n } = useTranslation()
  const [perPage, setPerPage] = useState(() => (window.matchMedia(COMPACT).matches ? 1 : 2))
  const [page, setPage] = useState(0)
  const touchStart = useRef<number | null>(null)

  const pages = Math.ceil(cards.length / perPage)

  useEffect(() => {
    const query = window.matchMedia(COMPACT)
    const update = () => {
      setPerPage(query.matches ? 1 : 2)
      setPage(0)
    }
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  const goTo = (next: number) => setPage(Math.min(pages - 1, Math.max(0, next)))

  // +1 when "next" lies to the right on screen; in RTL (Arabic) the later pages are to the left
  const forward = i18n.dir() === 'rtl' ? -1 : 1

  return (
    <div
      className="dw-slider"
      role="region"
      aria-roledescription="carousel"
      aria-label={t('home.services.carousel')}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') goTo(page + forward)
        if (event.key === 'ArrowLeft') goTo(page - forward)
      }}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0].clientX
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return
        const delta = event.changedTouches[0].clientX - touchStart.current
        touchStart.current = null
        // swiping the cards left brings in what lies to the right
        if (Math.abs(delta) > SWIPE) goTo(page + (delta < 0 ? forward : -forward))
      }}
    >
      <div className="dw-slider-viewport">
        <ul className="dw-slider-track" style={{ '--page': page } as CSSProperties}>
          {cards.map(({ title, to }, index) => {
            const onPage = Math.floor(index / perPage) === page

            return (
              <li key={title} className="dw-slider-slide" inert={!onPage}>
                <Link to={to} className="dw-slider-card">
                  {/* the amber outline-only twin sits behind the filled face */}
                  <span className="dw-slider-outline" aria-hidden="true" />
                  <span className="dw-slider-face">
                    <span className="dw-slider-number">{String(index + 1).padStart(2, '0')}</span>
                    <h3 className="dw-slider-title">
                      {t(title).split('\n').map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </h3>
                    <span className="dw-slider-more">
                      <span>{t('common.viewMore')}</span>
                      <RoughArrow />
                    </span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="dw-slider-dots">
        {Array.from({ length: pages }, (_, index) => (
          <button
            key={index}
            type="button"
            className={index === page ? 'is-active' : undefined}
            aria-label={t('home.services.page', { page: index + 1 })}
            aria-current={index === page}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default ServiceSlider
