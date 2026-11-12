import { useEffect, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import { useTranslation } from 'react-i18next'
import NumberBadge from '../../components/numberBadge/numberBadge'
import PillLabel from '../../components/pillLabel/pillLabel'
import SplitWords from '../../components/splitWords/splitWords'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { gsap, useGSAP } from '../../lib/gsap'
import { platformIcons, socialHero, socialProjects } from '../../data/social'
import './socialMedia.scss'

const labelSpots = ['below-left', 'above-right', 'below-right', 'above-right'] as const

const SWIPE_PX = 50
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function SocialMedia() {
  const { t } = useTranslation()
  const pageRef = useRef<HTMLDivElement>(null)
  const slideRef = useRef<HTMLDivElement>(null)
  const moreRef = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const isBusy = useRef(false)
  const direction = useRef(1)
  const shownIndex = useRef(0)
  const swipeStart = useRef<number | null>(null)

  const [index, setIndex] = useState(0)
  const count = socialProjects.length
  const project = socialProjects[index]
  useScrollReveal(pageRef)

  useEffect(() => {
    document.title = t('meta.title.social')
  }, [t])

  const goTo = (next: number, dir: 1 | -1) => {
    if (isBusy.current || next === index) return
    direction.current = dir

    if (prefersReducedMotion()) return setIndex(next)
    isBusy.current = true
    gsap.to([slideRef.current, moreRef.current], {
      autoAlpha: 0,
      x: -60 * dir,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => setIndex(next),
    })
  }

  const step = (dir: 1 | -1) => goTo((index + dir + count) % count, dir)

  useGSAP(
    () => {
      if (shownIndex.current === index) return
      shownIndex.current = index
      const dir = direction.current

      gsap.fromTo(
        [slideRef.current, moreRef.current],
        { autoAlpha: 0, x: 60 * dir },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.6,
          ease: 'power3.out',
          clearProps: 'transform',
          onComplete: () => {
            isBusy.current = false
          },
        },
      )
      gsap.fromTo(
        numberRef.current,
        { yPercent: 70, rotation: -25, opacity: 0 },
        { yPercent: 0, rotation: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.8)', delay: 0.15 },
      )
    },
    { dependencies: [index] },
  )

  // swipe left / right on the mock-ups
  const onPointerDown = (event: PointerEvent) => {
    swipeStart.current = event.clientX
  }

  const onPointerUp = (event: PointerEvent) => {
    if (swipeStart.current === null) return
    const delta = event.clientX - swipeStart.current
    swipeStart.current = null
    if (Math.abs(delta) > SWIPE_PX) step(delta < 0 ? 1 : -1)
  }

  return (
    <div ref={pageRef} className="sm">
      <section className="sm-hero dw-container">
        <header className="sm-heading">
          <PillLabel data-reveal="zoom">{t(socialHero.label)}</PillLabel>
          <h1 data-reveal="words">
            <SplitWords text={t(socialHero.title)} />
          </h1>
        </header>

        <div
          className="sm-carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label={t('social.carousel')}
        >
          <div
            ref={slideRef}
            className="sm-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={t('social.slide', { index: index + 1, count, name: t(project.name) })}
          >
            <div className="sm-title">
              <NumberBadge number={index + 1} numberRef={numberRef} data-reveal="pop" />
              <div>
                <p className="sm-category" data-reveal="up">
                  {t(project.category)}
                </p>
                <h2 className="sm-name" data-reveal="up">
                  {t(project.name)}
                </h2>
              </div>
            </div>

            <p className="sm-description" data-reveal="up">
              {t(project.description)}
            </p>

            <figure
              className="sm-mockup"
              data-reveal="zoom"
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => (swipeStart.current = null)}
            >
              <img
                className="dw-float"
                src={project.image}
                alt={t('social.mockupAlt', { name: t(project.name) })}
                draggable={false}
              />
            </figure>
          </div>

          <div className="sm-controls">
            <button type="button" className="sm-arrow" aria-label={t('social.previous')} onClick={() => step(-1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 5 8 12l7 7" />
              </svg>
            </button>

            <div className="sm-dots">
              {socialProjects.map(({ id, name }, dot) => (
                <button
                  key={id}
                  type="button"
                  className={`sm-dot${dot === index ? ' is-active' : ''}`}
                  aria-label={t('social.show', { name: t(name) })}
                  aria-current={dot === index ? 'true' : undefined}
                  onClick={() => goTo(dot, dot > index ? 1 : -1)}
                />
              ))}
            </div>

            <button type="button" className="sm-arrow" aria-label={t('social.next')} onClick={() => step(1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m9 5 7 7-7 7" />
              </svg>
            </button>
          </div>

          <div ref={moreRef} className="sm-slide-more">
            <h3 className="sm-subtitle" data-reveal="up">
              {t('social.whatWeDo')}
            </h3>
            <ul className="sm-services">
              {project.services.map((service) => (
                <li key={service} data-reveal="up">
                  {t(service)}
                </li>
              ))}
            </ul>

            <h3 className="sm-subtitle" data-reveal="up">
              {t('social.platforms')}
            </h3>
            <ul className="sm-platforms">
              {project.platforms.map(({ name, href }, spot) => {
                const icon = <img src={platformIcons[name]} alt="" />
                return (
                  <li key={name} className={`sm-platform sm-platform-${labelSpots[spot]}`} data-reveal="pop">
                    {href ? (
                      <a href={href} target="_blank" rel="noreferrer" aria-label={t('social.onPlatform', { name: t(project.name), platform: name })}>
                        {icon}
                      </a>
                    ) : (
                      <span className="sm-platform-icon" aria-label={name} role="img">
                        {icon}
                      </span>
                    )}
                    <img className="sm-platform-arrow" src="/assets/images/portfolio/arrow.webp" alt="" />
                    <span className="sm-platform-name" aria-hidden="true">
                      {name}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SocialMedia
