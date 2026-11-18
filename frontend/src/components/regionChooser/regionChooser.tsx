import { useEffect, useRef, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Home from '../../pages/home/home'
import { regionChooser, regionContent } from '../../data/region'
import { REGIONS, type Region } from '../../region/region'
import './regionChooser.scss'

// five-pointed star centred on (cx, cy)
const star = (cx: number, cy: number, r: number) =>
  Array.from({ length: 10 }, (_, i) => {
    const radius = i % 2 === 0 ? r : r * 0.4
    const angle = (Math.PI / 5) * i - Math.PI / 2
    return `${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`
  }).join(' ')

const globe = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
    <circle cx="24" cy="24" r="18" />
    <ellipse cx="24" cy="24" rx="7.5" ry="18" />
    <path d="M6 24h36M9 15h30M9 33h30" />
  </svg>
)

const icons: Record<Region, ReactNode> = {
  // the ring of twelve stars
  european: (
    <svg viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (Math.PI / 6) * i - Math.PI / 2
        return <polygon key={i} points={star(24 + 17 * Math.cos(angle), 24 + 17 * Math.sin(angle), 3.4)} />
      })}
    </svg>
  ),
  jordan: globe,
}

// Shown on "/" and on links without a region (e.g. "/offer"). The home page stays visible behind the
// overlay; picking a region continues to the same page under /european/... or /jordan/...
function RegionChooser() {
  const navigate = useNavigate()
  const { pathname, search, hash } = useLocation()
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const options = () => Array.from(dialog.querySelectorAll<HTMLElement>('button'))
    // focus the dialog, not the first option, so neither region looks pre-selected
    dialog.focus({ preventScroll: true })

    // a choice is required: Tab stays inside the dialog and Esc does nothing
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const items = options()
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previous
    }
  }, [])

  const choose = (region: Region) => {
    const rest = pathname === '/' ? '' : pathname
    navigate(`/${region}${rest}${search}${hash}`, { replace: true })
  }

  return (
    <>
      <Home />
      <div className="dw-region">
        <div
          ref={dialogRef}
          className="dw-region-dialog"
          role="dialog"
          tabIndex={-1}
          aria-modal="true"
          aria-labelledby="dw-region-title"
          aria-describedby="dw-region-subtitle"
        >
          <header className="dw-region-head">
            <span className="dw-region-globe" aria-hidden="true">
              {globe}
            </span>
            <div>
              <p className="dw-region-eyebrow">{regionChooser.eyebrow}</p>
              <h2 id="dw-region-title" className="dw-region-title">
                {regionChooser.title}
              </h2>
            </div>
          </header>

          <div className="dw-region-body">
            <p id="dw-region-subtitle" className="dw-region-subtitle">
              {regionChooser.subtitle}
            </p>

            <div className="dw-region-options">
              {REGIONS.map((region) => (
                <button key={region} type="button" className="dw-region-option" onClick={() => choose(region)}>
                  <span className="dw-region-icon">{icons[region]}</span>
                  <span className="dw-region-text">
                    <span className="dw-region-label">{regionContent[region].label}</span>
                    <span className="dw-region-hint">{regionContent[region].hint}</span>
                  </span>
                  <svg className="dw-region-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              ))}
            </div>

            <p className="dw-region-note">{regionChooser.note}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegionChooser
