/**
 * About.tsx — About page (/about)
 *
 * Sections:
 *   1. Hero        — "The job market is broken for most people"
 *   2. Values grid — 4 operating principles from `values` array
 *   3. NRC card    — sister brand relationship + link to noetherianring.com
 *   4. CTA         — blue section linking to /services
 *
 * Two separate useFadeIn() refs so values and NRC sections animate independently.
 * To update principles: edit the `values` array (title + body).
 */
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; observer.disconnect() }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

const bg = '#0a1628'
const surface = '#0f1f38'

const values = [
  {
    title: 'We only get paid when you do.',
    body: 'The full placement service costs you nothing upfront. We collect 15% of your first-year comp when you accept an offer. That alignment isn\'t a marketing line — it\'s the structure that forces us to actually deliver.',
  },
  {
    title: 'Honest over comfortable.',
    body: 'If your background isn\'t competitive for what you want, we tell you — with specifics on what to change. We don\'t take clients we can\'t place and let them pay for nothing.',
  },
  {
    title: 'Non-traditional is not a liability.',
    body: 'The recruiting industry was built to filter for pedigree. We were built to route around that. Gap in your resume, non-linear path, trade background, no degree — we\'ve placed all of it.',
  },
  {
    title: 'Access shouldn\'t require connections.',
    body: 'Most people find jobs through who they know. We extend that network to everyone. Warm introductions aren\'t reserved for people who went to the right school.',
  },
]

export default function About() {
  useEffect(() => { document.title = 'About | Harbor' }, [])
  const valuesRef = useFadeIn()
  const nrcRef = useFadeIn()

  return (
    <div style={{ backgroundColor: bg, paddingTop: '64px' }}>

      {/* HERO */}
      <section style={{ padding: '7rem 2rem 6rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.75rem)', fontWeight: 800, color: '#ffffff', margin: '0 0 1.5rem', letterSpacing: '-0.035em', lineHeight: 1.08 }}>
            The job market is broken<br />
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>for most people.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', lineHeight: 1.8, margin: '0 0 1.25rem', maxWidth: '640px' }}>
            If you went to the right school, worked at the right company, and know the right people — job searching is hard but manageable. For everyone else, it's a wall.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem', lineHeight: 1.8, margin: '0 0 1.25rem', maxWidth: '600px' }}>
            Recruiters work for employers, not for you. Job boards are noise. Applying cold to hundreds of listings is a strategy that works rarely and badly. The people who get placed get placed because of relationships and positioning — and those have historically required luck or privilege to access.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', lineHeight: 1.8, margin: 0, maxWidth: '600px' }}>
            Harbor exists to change that. We are career placement professionals who work for candidates — on a model where we only get paid when you do.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding: '7rem 2rem', backgroundColor: surface }}>
        <div ref={valuesRef} style={{ maxWidth: '1100px', margin: '0 auto', opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#ffffff', margin: '0 0 3.5rem', letterSpacing: '-0.03em' }}>
            How we operate.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {values.map((v, i) => (
              <div key={i} style={{
                backgroundColor: bg, border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '10px', padding: '2.25rem',
                transition: 'border-color 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(79,142,247,0.35)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)' }}
              >
                <div style={{ width: '28px', height: '2px', backgroundColor: '#4f8ef7', marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', margin: '0 0 0.75rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{v.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.8, margin: 0 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NRC CONNECTION */}
      <section style={{ padding: '7rem 2rem' }}>
        <div ref={nrcRef} style={{ maxWidth: '820px', margin: '0 auto', opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          <div style={{
            backgroundColor: surface, border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px', padding: '3rem',
          }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Our roots
            </div>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, color: '#ffffff', margin: '0 0 1.25rem', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              Harbor is a sister brand of Noetherian Ring Capital.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.8, margin: '0 0 1rem' }}>
              Noetherian Ring Capital is an AI-powered recruiting firm for buyside finance — private equity, growth equity, and corporate development. It was built with structured assessment and a methodology that placed candidates from non-target schools into mega funds.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', lineHeight: 1.8, margin: '0 0 1.75rem' }}>
              Harbor was built on the same principle — that capability matters more than pedigree — extended to everyone, across every industry.
            </p>
            <a href="https://noetherianring.com" style={{ color: 'rgba(79,142,247,0.75)', fontSize: '13px', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.04em' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#4f8ef7' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(79,142,247,0.75)' }}
            >
              Visit Noetherian Ring Capital →
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '7rem 2rem', backgroundColor: '#4f8ef7' }}>
        <div style={{ maxWidth: '580px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 800, color: '#ffffff', margin: '0 0 1rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Let's get you placed.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 2rem' }}>
            Email us your resume. Tell us where you are and where you want to be. We'll take it from there.
          </p>
          <Link to="/services" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '14px 28px', backgroundColor: '#ffffff', color: '#4f8ef7',
            fontSize: '14px', fontWeight: 700, textDecoration: 'none', borderRadius: '6px',
            transition: 'background-color 0.15s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#dce8ff' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#ffffff' }}
          >
            See Services →
          </Link>
        </div>
      </section>

    </div>
  )
}
