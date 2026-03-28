/**
 * Services.tsx — Pricing page (/services)
 *
 * Tiers (edit the `tiers` array to update):
 *   - Resume Review   $149 one-time, 48hr turnaround
 *   - Career Sprint   $499 one-time, 2 coaching calls (Most Popular)
 *   - Full Placement  15% of first-year comp, paid at offer only
 *
 * Each tier.href is a mailto: link — swap for Stripe/Calendly when ready.
 * FAQ: openFaq tracks open accordion item (null = all closed).
 * Max-height CSS animation for smooth expand/collapse.
 */
import { useEffect, useRef, useState } from 'react'
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

const advisorPills = [
  { initials: 'SR', name: 'Sarah R.', specialty: 'Tech & Ops' },
  { initials: 'MJ', name: 'Marcus J.', specialty: 'Finance & Consulting' },
  { initials: 'TL', name: 'Tanya L.', specialty: 'Healthcare & Nonprofit' },
  { initials: 'DK', name: 'David K.', specialty: 'Construction & Legal' },
]

const tiers = [
  {
    label: 'Resume Review',
    price: '$149',
    sub: 'One-time · 48hr turnaround',
    tag: null,
    accent: false,
    desc: 'A real professional reviews your resume and tells you exactly what\'s working, what\'s hurting you, and what to fix. Written report delivered within 48 hours.',
    includes: [
      'Full written review from an experienced hiring professional',
      'Competitiveness score across role types you\'re targeting',
      'Line-by-line edits to phrasing, formatting, and impact',
      'LinkedIn headline and summary recommendations',
      'Delivered within 48 hours',
    ],
    cta: 'Buy Resume Review',
    href: 'mailto:hello@harborcareers.com?subject=Resume%20Review',
  },
  {
    label: 'Career Sprint',
    price: '$499',
    sub: 'One-time package',
    tag: 'Most Popular',
    accent: true,
    desc: 'Resume review plus two 45-minute 1-on-1 coaching calls. First call to build your strategy and fix your materials. Second call to prep you for interviews before you go live.',
    includes: [
      'Full resume review (as above)',
      'Two 45-min 1-on-1 coaching calls over Zoom',
      'Call 1: situation assessment, targeting strategy, material rewrite',
      'Call 2: mock interview prep, story coaching, offer expectations',
      '30 days of direct messaging access post-engagement',
      'LinkedIn full profile rewrite',
      'Personalized cold outreach templates for hiring managers',
    ],
    cta: 'Start Career Sprint',
    href: 'mailto:hello@harborcareers.com?subject=Career%20Sprint',
  },
  {
    label: 'Full Placement',
    price: '15% of comp',
    sub: 'First-year total comp · paid at offer',
    tag: null,
    accent: false,
    desc: 'We manage your entire search. Resume, positioning, warm introductions, interview prep, offer negotiation. You pay nothing upfront — only when you land.',
    includes: [
      'Everything in Career Sprint',
      'Active outreach to employers in our network on your behalf',
      'Warm introductions — not cold applications',
      'Interview prep tailored to each specific employer',
      'Offer evaluation and negotiation support with real market data',
      'No upfront cost — 15% of first-year comp at offer acceptance',
      '90-day check-in after your start date',
    ],
    cta: 'Apply for Full Placement',
    href: 'mailto:hello@harborcareers.com?subject=Full%20Placement',
  },
]

const faqs = [
  {
    q: 'Who actually reviews my resume — AI or a person?',
    a: 'A person. Every resume review is done by a hiring professional with direct experience in your target industry or role type. We use technology internally to flag patterns, but the written feedback is human.',
  },
  {
    q: 'How does the 15% placement fee work?',
    a: '15% of your first-year total compensation — base salary plus any signing bonus. Due within 30 days of your start date. If you don\'t accept an offer, you owe nothing. We only get paid when you do.',
  },
  {
    q: 'What industries do you cover?',
    a: 'Technology, finance, healthcare, marketing, sales, operations, legal, education, construction, nonprofit, and more. If you have a specific industry not listed, email us — we likely have someone who covers it.',
  },
  {
    q: 'What if I\'ve been out of work for a long time?',
    a: 'Gaps are addressable. We work with career returners regularly. The goal is honest framing — not hiding the gap, but positioning it correctly and making sure the rest of your materials are strong enough to move past it.',
  },
  {
    q: 'I don\'t have a traditional background. Can you still help?',
    a: 'Yes. Most of our clients don\'t have traditional paths. We specialize in translating non-obvious experience into language that resonates with hiring managers — and finding the employers who will actually value what you bring.',
  },
  {
    q: 'How is this different from applying through job boards?',
    a: 'Job boards are a volume game. We make warm introductions to employers who are actively hiring, with direct context on why you\'re a fit. That alone multiplies your interview rate significantly — before any resume improvements.',
  },
]

export default function Services() {
  useEffect(() => { document.title = 'Services | Harbor' }, [])
  const advisorMatchRef = useFadeIn()
  const tiersRef = useFadeIn()
  const faqRef = useFadeIn()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div style={{ backgroundColor: bg, paddingTop: '64px' }}>

      {/* HERO */}
      <section style={{ padding: '6rem 2rem 5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', padding: '5px 14px', border: '1px solid rgba(79,142,247,0.25)', borderRadius: '100px', backgroundColor: 'rgba(79,142,247,0.06)' }}>
            <span style={{ color: '#4f8ef7', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em' }}>Services & Pricing</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.75rem)', fontWeight: 800, color: '#ffffff', margin: '0 0 1.5rem', letterSpacing: '-0.035em', lineHeight: 1.08 }}>
            Real help.<br />
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>Real professionals.<br />You pay when you land.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.05rem', lineHeight: 1.75, margin: '0 0 2rem', maxWidth: '580px' }}>
            Choose the level of support you need. Start with a resume review. Level up to coaching calls. Or hand us the wheel completely and let us run your search on a success-only model.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '13px', margin: 0 }}>
            Questions? Email <a href="mailto:hello@harborcareers.com" style={{ color: 'rgba(79,142,247,0.7)', textDecoration: 'none' }}>hello@harborcareers.com</a> — we'll tell you honestly which service fits.
          </p>
        </div>
      </section>

      {/* ADVISOR MATCH */}
      <section style={{ padding: '4rem 2rem 0' }}>
        <div ref={advisorMatchRef} style={{ maxWidth: '1100px', margin: '0 auto', opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          <div style={{
            backgroundColor: surface,
            borderLeft: '3px solid #4f8ef7',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            borderRight: '1px solid rgba(255,255,255,0.08)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            padding: '2.5rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'center',
          }}>
            {/* Left: copy */}
            <div>
              <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Human review, matched to your industry</div>
              <h2 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 800, color: '#ffffff', margin: '0 0 1rem', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                Your review is done by a person who has worked in your industry.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.8, margin: 0 }}>
                Every resume review is performed by a hiring professional with direct experience in your target industry. We match you to an advisor before we start.
              </p>
            </div>

            {/* Right: advisor pills 2×2 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {advisorPills.map((a, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '8px', padding: '0.75rem 1rem',
                }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                    backgroundColor: 'rgba(79,142,247,0.15)', border: '1.5px solid rgba(79,142,247,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#4f8ef7' }}>{a.initials}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>{a.name}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.38)', marginTop: '2px' }}>{a.specialty}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TIERS */}
      <section style={{ padding: '6rem 2rem' }}>
        <div ref={tiersRef} style={{ maxWidth: '1100px', margin: '0 auto', opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {tiers.map((tier, i) => (
              <div key={i} style={{
                backgroundColor: surface,
                border: tier.accent ? '1px solid rgba(79,142,247,0.5)' : '1px solid rgba(255,255,255,0.07)',
                borderTop: tier.accent ? '2px solid #4f8ef7' : '1px solid rgba(255,255,255,0.07)',
                borderRadius: '10px', padding: '2.25rem',
                position: 'relative', display: 'flex', flexDirection: 'column',
              }}>
                {tier.tag && (
                  <div style={{
                    position: 'absolute', top: '-1px', left: '1.5rem', transform: 'translateY(-50%)',
                    backgroundColor: '#4f8ef7', color: '#ffffff',
                    fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                    padding: '3px 10px', borderRadius: '100px',
                  }}>
                    {tier.tag}
                  </div>
                )}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{tier.label}</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1 }}>{tier.price}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '0.35rem' }}>{tier.sub}</div>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', lineHeight: 1.75, margin: '0 0 1.75rem', flex: 1 }}>{tier.desc}</p>
                <div style={{ marginBottom: '2rem' }}>
                  {tier.includes.map((item, j) => (
                    <div key={j} style={{ display: 'flex', gap: '10px', marginBottom: '0.6rem' }}>
                      <span style={{ color: '#4f8ef7', fontSize: '12px', flexShrink: 0, marginTop: '2px' }}>✓</span>
                      <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
                <a href={tier.href} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '12px 20px',
                  backgroundColor: tier.accent ? '#4f8ef7' : 'transparent',
                  color: tier.accent ? '#ffffff' : 'rgba(255,255,255,0.75)',
                  border: tier.accent ? 'none' : '1px solid rgba(255,255,255,0.2)',
                  fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em',
                  textDecoration: 'none', borderRadius: '6px',
                  transition: 'background-color 0.15s, border-color 0.15s, color 0.15s',
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    if (tier.accent) el.style.backgroundColor = '#3a7ae8'
                    else { el.style.borderColor = 'rgba(255,255,255,0.5)'; el.style.color = '#ffffff' }
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    if (tier.accent) el.style.backgroundColor = '#4f8ef7'
                    else { el.style.borderColor = 'rgba(255,255,255,0.2)'; el.style.color = 'rgba(255,255,255,0.75)' }
                  }}
                >
                  {tier.cta}
                </a>
                {tier.label === 'Resume Review' && (
                  <div style={{ textAlign: 'center', marginTop: '0.9rem' }}>
                    <Link to="/resume-check" style={{ color: 'rgba(79,142,247,0.7)', fontSize: '12px', textDecoration: 'none', transition: 'color 0.15s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#4f8ef7' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(79,142,247,0.7)' }}
                    >
                      Start with a free resume check →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '6rem 2rem', backgroundColor: surface }}>
        <div ref={faqRef} style={{ maxWidth: '760px', margin: '0 auto', opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: '#ffffff', margin: '0 0 2.5rem', letterSpacing: '-0.03em' }}>
            Common questions.
          </h2>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
                padding: '1.5rem 0', textAlign: 'left',
              }}>
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', lineHeight: 1.4 }}>{faq.q}</span>
                <span style={{ flexShrink: 0, fontSize: '18px', color: 'rgba(255,255,255,0.35)', transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>+</span>
              </button>
              <div style={{ overflow: 'hidden', maxHeight: openFaq === i ? '200px' : '0', transition: 'max-height 0.3s ease' }}>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.8, margin: '0 0 1.5rem', paddingRight: '2rem' }}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '7rem 2rem', backgroundColor: '#4f8ef7' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 800, color: '#ffffff', margin: '0 0 1rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Not sure where to start?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 2rem' }}>
            Email us your resume and a few sentences about what you're targeting. We'll come back with an honest read on which service makes sense — no upsell, no pressure.
          </p>
          <a href="mailto:hello@harborcareers.com" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '14px 28px', backgroundColor: '#ffffff', color: '#4f8ef7',
            fontSize: '14px', fontWeight: 700, textDecoration: 'none', borderRadius: '6px',
            transition: 'background-color 0.15s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#dce8ff' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#ffffff' }}
          >
            Email Us →
          </a>
        </div>
      </section>

    </div>
  )
}
