import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../footer/footer'
import Navbar from '../navbar/navbar'
import PageLoader from '../pageLoader/pageLoader'

// shortest time the loader stays up, so it never just flashes
const LOADER_MS = 1400

// Navbar + footer wrap every page; the page itself renders in <Outlet />
function Layout() {
  const { pathname, hash } = useLocation()
  const [loadedPath, setLoadedPath] = useState<string | null>(null)
  const loading = loadedPath !== pathname
  const { t } = useTranslation()
  const mainRef = useRef<HTMLElement>(null)
  const firstPage = useRef(true)

  // After moving to another page, keyboard and screen-reader users start at the new page's content instead of
  // staying on the menu link they pressed (WCAG 2.4.3). Not on the first visit, and not for #section links.
  useEffect(() => {
    if (loading) return
    if (firstPage.current) { firstPage.current = false; return }
    if (!hash) mainRef.current?.focus({ preventScroll: true })
  }, [loading, hash])

  // Every page (first visit and each navigation) sits behind the loader for a moment
  useEffect(() => {
    const timer = window.setTimeout(() => setLoadedPath(pathname), LOADER_MS)
    return () => window.clearTimeout(timer)
  }, [pathname])

  // New page: back to the top. Link with #section: scroll to that section once the page has rendered.
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 })
      return
    }

    if (loading) return

    const frame = requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView())
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, loading])

  return (
    <>
      <a className="dw-skip-link" href="#main">{t('a11y.skipToContent')}</a>
      <PageLoader active={loading} />
      <Navbar />
      <main id="main" tabIndex={-1} ref={mainRef}>
        {!loading && <Outlet />}
      </main>
      <Footer />
    </>
  )
}

export default Layout
