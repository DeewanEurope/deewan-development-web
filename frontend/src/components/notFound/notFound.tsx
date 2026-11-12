import { useTranslation } from 'react-i18next'
import Button from '../button/button'
import './notFound.scss'

function NotFound() {
  const { t } = useTranslation()

  return (
    <section className="dw-not-found dw-container">
      <p className="dw-not-found-code">404</p>
      <h1 className="dw-not-found-heading">{t('notFound.heading')}</h1>
      <p className="dw-not-found-description">
        {t('notFound.description')}
      </p>
      <Button to="/" variant="teal">
        {t('notFound.back')}
      </Button>
    </section>
  )
}

export default NotFound
