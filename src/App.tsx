/**
 * App.tsx — Root component
 *
 * Wraps the entire app in BrowserRouter and renders a persistent Navbar + Footer
 * around a flex-growing main content area. All page routing lives here.
 *
 * Routes:
 *   /              → Home (landing page)
 *   /how-it-works  → HowItWorks (5-step process + who it's for)
 *   /services      → Services (pricing tiers + FAQ)
 *   /about         → About (mission, values, NRC connection)
 *   /contact       → Contact (intake form — Harbor backend with Formspree fallback)
 *   /resume-check  → ResumeCheck (free resume analysis lead magnet)
 *   *              → NotFound (404)
 *
 * To add a new page:
 *   1. Create src/pages/YourPage.tsx
 *   2. Import it here
 *   3. Add a <Route path="/your-path" element={<YourPage />} /> inside <Routes>
 *   4. Add a link in Navbar.tsx and Footer.tsx
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import HowItWorks from './pages/HowItWorks'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import ResumeCheck from './pages/ResumeCheck'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      {/* Full-height flex column so Footer stays at the bottom */}
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'Inter', sans-serif" }}>
        <Navbar />
        {/* flex: 1 makes main expand to fill remaining height */}
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resume-check" element={<ResumeCheck />} />
            {/* Catch-all — must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
