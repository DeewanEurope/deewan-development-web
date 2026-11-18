import { Route, Routes, useParams } from 'react-router-dom'
import Layout from './components/layout/layout'
import RegionChooser from './components/regionChooser/regionChooser'
import About from './pages/about/about'
import Home from './pages/home/home'
import Offer from './pages/offer/offer'
import Portfolio from './pages/portfolio/portfolio'
import SocialMedia from './pages/socialMedia/socialMedia'
import Contact from './pages/contact/contact'
import NotFoundPage from './pages/notFound/notFound'
<<<<<<< Updated upstream
import Impressum from './pages/impressum/impressum'
import Privacy from './pages/privacy/privacy'
=======
import { isRegion } from './region/region'

// All pages live under /european/... and /jordan/...
function RegionRoutes() {
  const { region } = useParams()
  if (!isRegion(region)) return <RegionChooser />

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="portfolio" element={<Portfolio />} />
      <Route path="portfolio/social-media" element={<SocialMedia />} />
      <Route path="offer" element={<Offer />} />
      <Route path="contact" element={<Contact />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
>>>>>>> Stashed changes

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
<<<<<<< Updated upstream
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/social-media" element={<SocialMedia />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Privacy />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFoundPage />} />
=======
        {/* the root and old links without a region (e.g. /offer): ask the visitor to pick one */}
        <Route path="/" element={<RegionChooser />} />
        <Route path="/:region/*" element={<RegionRoutes />} />
>>>>>>> Stashed changes
      </Route>
    </Routes>
  )
}

export default App
