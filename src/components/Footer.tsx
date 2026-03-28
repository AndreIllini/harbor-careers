/**
 * Footer.tsx — Site footer
 *
 * Four-column grid (collapses to 2 on small screens via auto-fit):
 *   1. Brand — anchor mark, tagline, NRC attribution
 *   2. Navigate — all main routes
 *   3. Services — pricing tier quick links to /services
 *   4. Contact — email + location
 *
 * Bottom bar:
 *   - Auto-updating copyright year via new Date().getFullYear()
 *   - NRC sister brand attribution with link to noetherianring.com
 *
 * To update service tiers listed here, edit the array in the Services column.
 * Keep in sync with the tiers array in src/pages/Services.tsx.
 */

import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#060e1c', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4.5rem 2rem 2.5rem' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>

          {/* Brand */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="14" r="13" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none"/>
                <line x1="14" y1="7" x2="14" y2="21" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="9" y1="17" x2="19" y2="17" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="14" cy="9" r="2" fill="rgba(255,255,255,0.6)"/>
              </svg>
              <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '15px', fontWeight: 700, letterSpacing: '-0.01em' }}>Harbor</span>
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', lineHeight: 1.7, margin: '0 0 0.4rem', maxWidth: '220px' }}>
              Career placement for everyone.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: '12px', lineHeight: 1.7, margin: 0, maxWidth: '220px' }}>
              A Harbor Careers company. Operated under Noetherian Ring Capital LLC.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h4 style={{ color: 'rgba(255,255,255,0.28)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1.25rem', marginTop: 0 }}>Navigate</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { label: 'How It Works', to: '/how-it-works' },
                { label: 'Services', to: '/services' },
                { label: 'About', to: '/about' },
                { label: 'Contact', to: '/contact' },
              ].map(link => (
                <Link key={link.to} to={link.to} style={{ color: 'rgba(255,255,255,0.42)', fontSize: '13px', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#ffffff' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.42)' }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: 'rgba(255,255,255,0.28)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1.25rem', marginTop: 0 }}>Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {['Resume Review — $149', 'Career Sprint — $499', 'Full Placement — 15%', '1-on-1 Coaching Calls'].map(item => (
                <Link key={item} to="/services" style={{ color: 'rgba(255,255,255,0.42)', fontSize: '13px', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#ffffff' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.42)' }}>
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'rgba(255,255,255,0.28)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1.25rem', marginTop: 0 }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <a href="mailto:hello@harborcareers.com" style={{ color: 'rgba(255,255,255,0.42)', fontSize: '13px', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#ffffff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.42)' }}>
                hello@harborcareers.com
              </a>
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '13px' }}>New York, NY</span>
            </div>
          </div>
        </div>

        <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.05)', marginBottom: '1.75rem' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.15)', fontSize: '12px', margin: 0 }}>
            &copy; {new Date().getFullYear()} Harbor Careers. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Noetherian Ring Capital', url: 'https://noetherianring.com' },
              { label: 'Tranche', url: 'https://tranche.co' },
              { label: 'Parallax', url: 'https://parallax.io' },
            ].map(b => (
              <a key={b.label} href={b.url} target="_blank" rel="noopener noreferrer"
                style={{ color: 'rgba(255,255,255,0.18)', fontSize: '11px', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.18)' }}>
                {b.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
