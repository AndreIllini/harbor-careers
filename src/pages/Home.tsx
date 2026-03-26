/**
 * Home.tsx — Landing page (/)
 *
 * Sections:
 *   1. Hero         — "You pay when you land", two CTAs
 *   2. Stats bar    — 87% placement rate, 6 wks avg, $0 upfront, 40+ industries
 *   3. Process      — 4-step card grid (Intake → Materials → Outreach → Interviews)
 *   4. Industries   — 8 industry badges
 *   5. Testimonials — 3 anonymized client quotes with industry tag
 *   6. CTA          — blue full-width "Stop applying into the void" section
 *
 * Each scroll-animated section uses useFadeIn() (IntersectionObserver, fires once).
 * To add a testimonial: push { quote, name, tag } into the testimonials array.
 * To add an industry: push a string into the industries array.
 */
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
            observer.disconnect()
          }
        },
        { threshold: 0.1 }
      )
      observer.observe(el)
      return () => observer.disconnect()
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])
  return ref
}

const industries = [
  { icon: '💻', label: 'Technology', roles: 'Software, product, data, design' },
  { icon: '📊', label: 'Finance & Accounting', roles: 'FP&A, banking, accounting, ops' },
  { icon: '🏥', label: 'Healthcare', roles: 'Clinical ops, admin, health tech' },
  { icon: '📣', label: 'Marketing & Sales', roles: 'Growth, brand, account management' },
  { icon: '⚙️', label: 'Operations', roles: 'Supply chain, logistics, project mgmt' },
  { icon: '🎓', label: 'Education & Nonprofit', roles: 'Program management, admin, comms' },
  { icon: '🏗️', label: 'Construction & Trades', roles: 'Project management, estimating' },
  { icon: '⚖️', label: 'Legal & Compliance', roles: 'Paralegal, compliance, legal ops' },
]

const steps = [
  {
    num: '01',
    title: 'Tell us where you are',
    body: 'Share your background, current situation, and what you\'re looking for. We assess your materials honestly and tell you exactly what a realistic outcome looks like.',
  },
  {
    num: '02',
    title: 'We fix your positioning',
    body: 'Resume rewrite, story coaching, LinkedIn cleanup. We make sure you look as strong on paper as you are in person — and we know what hiring managers actually look for.',
  },
  {
    num: '03',
    title: 'We make the introductions',
    body: 'We reach out to employers on your behalf with warm context. Not cold applications into a void — actual conversations with people who are hiring.',
  },
  {
    num: '04',
    title: 'You land. We get paid.',
    body: 'We only collect a fee when you accept an offer. 15% of first-year comp. Zero upfront. Our incentive and yours are exactly the same.',
  },
]

const proof = [
  { stat: '87%', label: 'placement rate', sub: 'for full-service clients' },
  { stat: '6 wks', label: 'avg time to offer', sub: 'from first call to signed' },
  { stat: '$0', label: 'upfront cost', sub: 'for full placement service' },
  { stat: '40+', label: 'industries served', sub: 'from tech to trades' },
]

const testimonials = [
  {
    quote: "I'd been applying for five months and getting nowhere. Harbor rewrote my resume, coached my story, and I had three interviews in two weeks. Accepted an offer 40 days after I started working with them.",
    name: 'D.M.',
    role: 'Operations Manager → Sr. Program Manager',
    industry: 'Healthcare',
  },
  {
    quote: "I was underemployed for two years after relocating. I thought my experience wouldn't translate. Harbor showed me it absolutely does — I just had to present it differently. Got a 35% raise in the process.",
    name: 'T.R.',
    role: 'Regional Sales Rep → Account Executive',
    industry: 'SaaS',
  },
  {
    quote: "Coming back from a two-year gap felt impossible. Harbor didn't treat it like a liability — they helped me frame it, position around it, and I landed a role better than where I left off.",
    name: 'A.K.',
    role: 'Career Returner → Marketing Director',
    industry: 'Consumer Goods',
  },
]

export default function Home() {
  useEffect(() => { document.title = 'Harbor — You Pay When You Land' }, [])

  const statsRef = useFadeIn()
  const stepsRef = useFadeIn()
  const industriesRef = useFadeIn()
  const testimonialsRef = useFadeIn()
  const ctaRef = useFadeIn()

  const bg = '#0a1628'
  const surface = '#0f1f38'

  return (
    <div style={{ backgroundColor: bg }}>

      {/* HERO */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden', paddingTop: '64px',
        background: `linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)`,
      }}>
        {/* Subtle grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, opacity: 0.03,
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        {/* Blue glow */}
        <div style={{ position: 'absolute', top: '30%', right: '10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,142,247,0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '720px' }}>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', padding: '6px 14px', border: '1px solid rgba(79,142,247,0.3)', borderRadius: '100px', backgroundColor: 'rgba(79,142,247,0.08)' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4f8ef7' }} />
              <span style={{ color: '#4f8ef7', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em' }}>
                Career placement for everyone
              </span>
            </div>

            <h1 style={{ margin: '0 0 1.5rem', fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.035em', color: '#ffffff' }}>
              You pay when<br />
              <span style={{ color: 'rgba(255,255,255,0.35)' }}>you land.</span>
            </h1>

            <p style={{ margin: '0 0 1rem', fontSize: '1.15rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.7)', maxWidth: '560px' }}>
              Harbor is a career placement service for people who are underemployed, unemployed, or stuck in the wrong role. We fix your positioning, make the introductions, and manage your search from first call to signed offer.
            </p>

            <p style={{ margin: '0 0 2.75rem', fontSize: '0.9rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.35)', maxWidth: '480px' }}>
              No upfront cost. No subscription. We collect 15% of your first-year comp — only when you accept an offer. If we don't deliver, you owe nothing.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}>
              <Link to="/services" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 28px', backgroundColor: '#4f8ef7', color: '#ffffff',
                fontSize: '14px', fontWeight: 700, letterSpacing: '0.02em',
                textDecoration: 'none', borderRadius: '6px', transition: 'background-color 0.15s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#3a7ae8' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#4f8ef7' }}
              >
                See How It Works →
              </Link>
              <a href="mailto:hello@harborcareers.com" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 28px', backgroundColor: 'transparent', color: 'rgba(255,255,255,0.65)',
                fontSize: '14px', fontWeight: 600,
                textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px',
                transition: 'border-color 0.15s, color 0.15s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.5)'; el.style.color = '#ffffff' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.2)'; el.style.color = 'rgba(255,255,255,0.65)' }}
              >
                Talk to Someone
              </a>
            </div>

            <p style={{ marginTop: '1.5rem', fontSize: '12px', color: 'rgba(255,255,255,0.22)' }}>
              Not sure which service fits? Start with a <Link to="/services" style={{ color: 'rgba(79,142,247,0.7)', textDecoration: 'underline' }}>$149 resume review</Link> — no commitment required.
            </p>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <div ref={statsRef} style={{ backgroundColor: surface, borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', opacity: 0, transform: 'translateY(12px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
            {proof.map((p, i) => (
              <div key={i} style={{
                padding: '2.5rem 1.5rem', textAlign: 'center',
                borderRight: i < proof.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}>
                <div style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: '#4f8ef7', letterSpacing: '-0.04em', lineHeight: 1 }}>{p.stat}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0.4rem 0 0.2rem' }}>{p.label}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.28)' }}>{p.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section style={{ padding: '8rem 2rem', backgroundColor: bg }}>
        <div ref={stepsRef} style={{ maxWidth: '1000px', margin: '0 auto', opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#ffffff', margin: '0 0 0.75rem', letterSpacing: '-0.03em' }}>
              The simplest path<br />to your next role.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto' }}>
              Four steps. One goal. You get placed — or you don't pay.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {steps.map((s, i) => (
              <div key={i} style={{
                backgroundColor: surface, border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '10px', padding: '2rem',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(79,142,247,0.4)'; el.style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.07)'; el.style.transform = 'translateY(0)' }}
              >
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#4f8ef7', letterSpacing: '0.15em', marginBottom: '1rem' }}>{s.num}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', margin: '0 0 0.75rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.75, margin: 0 }}>{s.body}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/how-it-works" style={{ color: 'rgba(79,142,247,0.8)', fontSize: '13px', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.04em' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#4f8ef7' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(79,142,247,0.8)' }}
            >
              See the full process →
            </Link>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section style={{ padding: '7rem 2rem', backgroundColor: surface }}>
        <div ref={industriesRef} style={{ maxWidth: '1200px', margin: '0 auto', opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, color: '#ffffff', margin: '0 0 0.75rem', letterSpacing: '-0.03em' }}>
              Every industry. Every level.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto' }}>
              We've placed people in roles from entry-level to director across 40+ industries. If you work for a living, we can help.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
            {industries.map((ind, i) => (
              <div key={i} style={{ backgroundColor: surface, padding: '1.75rem 1.5rem', transition: 'background-color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#142240' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = surface }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{ind.icon}</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', marginBottom: '0.3rem' }}>{ind.label}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.38)' }}>{ind.roles}</div>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: '13px', marginTop: '1.5rem' }}>
            Don't see your industry? <a href="mailto:hello@harborcareers.com" style={{ color: 'rgba(79,142,247,0.65)', textDecoration: 'none' }}>Email us</a> — we likely cover it.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '8rem 2rem', backgroundColor: bg }}>
        <div ref={testimonialsRef} style={{ maxWidth: '1200px', margin: '0 auto', opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          <div style={{ marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, color: '#ffffff', margin: '0 0 0.5rem', letterSpacing: '-0.03em' }}>
              People who got placed.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, margin: 0 }}>
              Identifying details changed for privacy
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{
                backgroundColor: surface, border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '10px', padding: '2.25rem',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(79,142,247,0.3)'; el.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.07)'; el.style.transform = 'translateY(0)' }}
              >
                <div style={{ fontSize: '2rem', color: 'rgba(79,142,247,0.2)', lineHeight: 1, marginBottom: '1.25rem', fontFamily: 'Georgia, serif', fontWeight: 700 }}>&ldquo;</div>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', lineHeight: 1.8, margin: '0 0 1.5rem', fontStyle: 'italic' }}>{t.quote}</p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>{t.name}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginTop: '0.2rem' }}>{t.role}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(79,142,247,0.6)', marginTop: '0.2rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{t.industry}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '8rem 2rem', backgroundColor: '#4f8ef7' }}>
        <div ref={ctaRef} style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center', opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#ffffff', margin: '0 0 1.25rem', letterSpacing: '-0.035em', lineHeight: 1.1 }}>
            Stop applying into the void.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', lineHeight: 1.75, margin: '0 0 2.5rem' }}>
            Send us your resume and tell us what you're looking for. We'll respond within 24 hours with an honest assessment and a clear next step.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <a href="mailto:hello@harborcareers.com" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 28px', backgroundColor: '#ffffff', color: '#4f8ef7',
              fontSize: '14px', fontWeight: 700, letterSpacing: '0.02em',
              textDecoration: 'none', borderRadius: '6px', transition: 'background-color 0.15s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#dce8ff' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#ffffff' }}
            >
              Email Us Your Resume →
            </a>
            <Link to="/services" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 28px', backgroundColor: 'transparent', color: 'rgba(255,255,255,0.85)',
              fontSize: '14px', fontWeight: 600,
              textDecoration: 'none', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '6px',
              transition: 'border-color 0.15s, color 0.15s',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#ffffff'; el.style.color = '#ffffff' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.4)'; el.style.color = 'rgba(255,255,255,0.85)' }}
            >
              See Pricing
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
