import { Fragment, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/button/button'
import SectionHeading from '../../components/sectionHeading/sectionHeading'
import ServiceRing from '../../components/serviceRing/serviceRing'
import SplitWords from '../../components/splitWords/splitWords'
import { aboutHero, aboutServices, aboutTeam, aboutWho, theManager } from '../../data/about'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './about.scss'

function About() {
  const { t } = useTranslation()
  const pageRef = useRef<HTMLDivElement>(null)
  useScrollReveal(pageRef)

  useEffect(() => {
    document.title = t('meta.title.about')
  }, [t])

  return (
    <div ref={pageRef} className="about">
      <section className="about-hero dw-container">
        <div className="about-hero-card" data-reveal="zoom">
          <div className="about-hero-shape about-hero-shape-left dw-float" data-reveal="fade" />
          <div className="about-hero-shape about-hero-shape-right dw-float" data-reveal="fade" />
          <p className="about-hero-label" data-reveal="up">
            {t(aboutHero.label)}
          </p>
          <h1 className="about-hero-title" data-reveal="words">
            <SplitWords text={t(aboutHero.title)} />
          </h1>
        </div>
      </section>

      <section className="about-who dw-container dw-section">
        <SectionHeading label={t(aboutWho.label)} title={t(aboutWho.title)} />

        <div className="about-who-body">
          <div className="about-who-text">
            {aboutWho.paragraphs.map((paragraph) => (
              <p key={paragraph} data-reveal="up">
                {t(paragraph)}
              </p>
            ))}
            <div className="about-who-actions" data-reveal="up">
              <Button href="#services" variant="amber">
                {t('about.who.checkServices')}
              </Button>
              <Button to="/contact" variant="teal">
                {t('common.contactUs')}
              </Button>
            </div>
          </div>

          <div className="about-who-card" data-reveal="right">
            <p className="about-who-card-title dw-hand">
              {t('about.who.cardTitle')
                .split('\n')
                .map((line, index) => (
                  <Fragment key={line}>
                    {index > 0 && <br />}
                    {line}
                  </Fragment>
                ))}
            </p>
            <div className="about-who-plan dw-float" role="img" aria-label={t('about.who.cardAlt')} />
          </div>
        </div>
      </section>

      <section id="services" className="about-services dw-section">
        <div className="dw-container">
          <SectionHeading label={t(aboutServices.label)} title={t(aboutServices.title)} />
        </div>
        <div className="about-services-ring dw-container" data-reveal="zoom">
          <ServiceRing services={aboutServices.services} />
        </div>
      </section>
<section className="about-manager dw-container dw-section">
        <SectionHeading label={t(theManager.label)} title={t(theManager.title)} />

        <div className="about-manager-body">
          <article className="about-team-card about-manager-card" data-reveal="left">
            <div className="about-team-photo">
              <img src={theManager.photo} alt={t(theManager.name)} loading="lazy" />
            </div>
            <h3>{t(theManager.name)}</h3>
            <p>{t(theManager.roleShort)}</p>
          </article>

          <div className="about-manager-text">
            <h3 className="about-manager-name" data-reveal="up">
              {t(theManager.name)}
            </h3>
            <p className="about-manager-role" data-reveal="up">
              {t(theManager.role)}
            </p>
            {theManager.paragraphs.map((paragraph) => (
              <p key={paragraph} className="about-manager-paragraph" data-reveal="up">
                {t(paragraph)}
              </p>
            ))}

            <p className="about-manager-expertise-label dw-hand" data-reveal="up">
              {t(theManager.expertiseLabel)}
            </p>
            <ul className="about-manager-expertise" data-reveal="up">
              {theManager.expertise.map((skill) => (
                <li key={skill}>{t(skill)}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="about-team dw-container dw-section">
        <SectionHeading
          label={t(aboutTeam.label)}
          title={t(aboutTeam.title)}
          description={t(aboutTeam.description)}
        />

        <div className="about-team-grid">
          {aboutTeam.members.map((member) => (
            <article key={member.name} className="about-team-card" data-reveal="up">
              <div className="about-team-photo">
                {member.photo ? (
                  <img src={member.photo} alt={t(member.name)} loading="lazy" />
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor" role="img" aria-label={t('about.team.photoSoon')}>
                    <circle cx="12" cy="8" r="4.2" />
                    <path d="M3.5 21c0-4.7 3.8-7.5 8.5-7.5s8.5 2.8 8.5 7.5z" />
                  </svg>
                )}
              </div>
              <h3>{t(member.role)}</h3>
              <p>{t(member.name)}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About
