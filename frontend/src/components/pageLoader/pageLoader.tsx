import { useTranslation } from 'react-i18next'
import LottieGlobe from '../lottieGlobe/lottieGlobe'
import './pageLoader.scss'

function PageLoader({ active }: { active: boolean }) {
  const { t } = useTranslation()

  return (
    <div className={`page-loader${active ? ' is-active' : ''}`} role="status" aria-label={t('common.loading')}>
      {active && <LottieGlobe className="page-loader-animation" src="/assets/lottie/loader.json" />}
    </div>
  )
}

export default PageLoader
