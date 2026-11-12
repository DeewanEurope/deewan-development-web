import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import NotFound from '../../components/notFound/notFound'

// Rendered by the router for every route that does not exist
function NotFoundPage() {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = t('meta.title.notFound')
  }, [t])

  return <NotFound />
}

export default NotFoundPage
