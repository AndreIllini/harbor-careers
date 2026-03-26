/**
 * NotFound.tsx — 404 page (catch-all route *)
 *
 * Shown for any unmatched route. vercel.json rewrites all paths to index.html
 * so React Router handles 404s client-side (no Vercel 404 page).
 */
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  useEffect(() => { document.title = '404 | Harbor' }, [])
  return (
    <div style={{ backgroundColor: '#0a1628', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '1.5rem' }}>404</div>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 800, color: '#ffffff', margin: '0 0 1rem', letterSpacing: '-0.03em' }}>Page not found.</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem', lineHeight: 1.7, margin: '0 0 2rem' }}>This page doesn't exist or has been moved.</p>
        <Link to="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '12px 24px', backgroundColor: '#4f8ef7', color: '#ffffff',
          fontSize: '14px', fontWeight: 700, textDecoration: 'none', borderRadius: '6px',
        }}>
          Back to Home →
        </Link>
      </div>
    </div>
  )
}
