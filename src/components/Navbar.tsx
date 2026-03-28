/**
 * Navbar.tsx — Fixed top navigation bar
 *
 * Behavior:
 *   - Transparent at the top of the page; frosted-glass (backdrop-filter blur)
 *     with a subtle border once the user scrolls past 20px
 *   - Mobile hamburger menu (≤767px) collapses into a full-width dropdown
 *   - Active link gets a white underline indicator
 *   - Menu auto-closes on route change (via location effect)
 *
 * To add a nav link:
 *   Push an object { label, to } into the navLinks array.
 *   Also add the link to Footer.tsx for consistency.
 *
 * Brand mark:
 *   SVG anchor — circle + vertical staff + horizontal crossbar + top circle.
 *   Keep in sync with public/favicon.svg.
 */

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const navLinks = [
    { label: 'How It Works', to: '/how-it-works' },
    { label: 'Free Resume Check', to: '/resume-check' },
    { label: 'Services', to: '/services' },
    { label: 'About', to: '/about' },
  ]

  const isActive = (to: string) => to === '/' ? location.pathname === '/' : location.pathname === to

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        backgroundColor: scrolled ? 'rgba(10,22,40,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>

            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
              {/* Harbor anchor mark */}
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="14" r="13" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" fill="none"/>
                <line x1="14" y1="7" x2="14" y2="21" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="9" y1="17" x2="19" y2="17" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="14" cy="9" r="2" fill="rgba(255,255,255,0.9)"/>
              </svg>
              <span style={{ color: '#ffffff', fontSize: '17px', fontWeight: 700, letterSpacing: '-0.02em' }}>Harbor</span>
            </Link>

            {/* Desktop Nav */}
            <div className="harbor-nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              {navLinks.map(link => (
                <Link key={link.to} to={link.to} style={{
                  textDecoration: 'none', fontSize: '14px', fontWeight: 500,
                  color: isActive(link.to) ? '#ffffff' : 'rgba(255,255,255,0.5)',
                  transition: 'color 0.15s ease', position: 'relative', paddingBottom: '2px',
                }}
                  onMouseEnter={e => { if (!isActive(link.to)) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)' }}
                  onMouseLeave={e => { if (!isActive(link.to)) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)' }}
                >
                  {link.label}
                  {isActive(link.to) && <span style={{ position: 'absolute', bottom: '-2px', left: 0, right: 0, height: '1px', backgroundColor: '#ffffff' }} />}
                </Link>
              ))}

              <div style={{ width: '1px', height: '16px', backgroundColor: 'rgba(255,255,255,0.12)' }} />

              <Link to="/contact" style={{
                textDecoration: 'none', fontSize: '13px', fontWeight: 600,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.45)', transition: 'color 0.15s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)' }}
              >
                Contact
              </Link>

              <Link to="/services" style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '8px 18px', backgroundColor: '#4f8ef7', color: '#ffffff',
                fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em',
                textDecoration: 'none', borderRadius: '6px',
                transition: 'background-color 0.15s ease',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#3a7ae8' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#4f8ef7' }}
              >
                Get Started
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button className="harbor-nav-mobile" onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'none' }}
              aria-label="Toggle menu">
              <div style={{ width: '20px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {[
                  menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
                  '',
                  menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
                ].map((transform, i) => (
                  <span key={i} style={{
                    display: 'block', height: '1.5px', backgroundColor: '#ffffff',
                    transition: 'transform 0.2s, opacity 0.2s',
                    transform: transform || 'none',
                    opacity: i === 1 && menuOpen ? 0 : 1,
                  }} />
                ))}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="harbor-nav-mobile" style={{
          overflow: 'hidden', maxHeight: menuOpen ? '320px' : '0',
          transition: 'max-height 0.3s ease',
          backgroundColor: 'rgba(10,22,40,0.98)',
          borderBottom: menuOpen ? '1px solid rgba(255,255,255,0.07)' : 'none',
        }}>
          <div style={{ padding: '1.25rem 2rem 2rem', display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[...navLinks, { label: 'Contact', to: '/contact' }].map(link => (
              <Link key={link.to} to={link.to} style={{
                textDecoration: 'none', fontSize: '15px', fontWeight: 500,
                color: isActive(link.to) ? '#ffffff' : 'rgba(255,255,255,0.6)',
                padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
                transition: 'color 0.15s',
              }}>
                {link.label}
              </Link>
            ))}
            <Link to="/services" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginTop: '1.25rem', padding: '13px 20px',
              backgroundColor: '#4f8ef7', color: '#ffffff',
              fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em',
              textDecoration: 'none', borderRadius: '6px',
            }}>
              Get Started →
            </Link>
          </div>
        </div>
      </nav>

      <style>{`
        @media (min-width: 768px) {
          .harbor-nav-desktop { display: flex !important; }
          .harbor-nav-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .harbor-nav-desktop { display: none !important; }
          .harbor-nav-mobile { display: flex !important; }
        }
      `}</style>
    </>
  )
}

export default Navbar
