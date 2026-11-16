import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './style/main.scss'
import './i18n'
import App from './App.tsx'
import ConsentBanner from './components/consent/ConsentBanner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <ConsentBanner />
    </BrowserRouter>
  </StrictMode>,
)
