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

const fullProcess = [
  {
    num: '01', time: '24–48 hrs',
    title: 'Intake & Honest Assessment',
    body: 'You send us your resume and a few sentences about what you\'re targeting. We review your background and tell you exactly how competitive you are, what gaps exist, and what a realistic outcome looks like. No false hope, no run-around.',
    detail: 'We\'ve turned down clients whose expectations didn\'t match reality. We\'d rather tell you that upfront than waste your time and ours.',
  },
  {
    num: '02', time: 'Week 1',
    title: 'Resume, Story & LinkedIn',
    body: 'We rewrite your resume from scratch if needed. We coach your story — the narrative you tell in interviews about your background and why you\'re making this move. We rewrite your LinkedIn to match.',
    detail: 'Most candidates undersell themselves on paper and overclaim in conversations. We fix both.',
  },
  {
    num: '03', time: 'Weeks 2–4',
    title: 'Targeting & Warm Outreach',
    body: 'We build a specific target list of employers where you\'re genuinely competitive. Then we reach out directly on your behalf — not applications into a void, but actual conversations with hiring managers and HR leads who know why we\'re calling.',
    detail: 'Warm intros convert at 4–8x the rate of cold applications. This is the most valuable thing we do.',
  },
  {
    num: '04', time: 'Ongoing',
    title: 'Interview Prep at Every Stage',
    body: 'Before every first-round, panel, and final interview, we run a prep session tailored to that specific employer and role. We share what we know about their process, their common questions, and what they actually care about.',
    detail: 'Most candidates fail late rounds on communication and conviction — not qualifications. We coach specifically for this.',
  },
  {
    num: '05', time: 'At close',
    title: 'Offer & Negotiation',
    body: 'We help you evaluate the offer against real market benchmarks. We coach the negotiation — when to push, what to ask for, how to handle competing offers. You will not leave comp on the table.',
    detail: 'Candidates who negotiate with data and a clear ask average 8–12% higher first-year comp than those who accept the first number.',
  },
]

const whoFor = [
  {
    title: 'Underemployed professionals',
    body: 'You have more capability than your current role reflects. Your title, comp, or industry doesn\'t match what you can actually do. We fix the positioning gap.',
  },
  {
    title: 'Unemployed and stuck',
    body: 'You\'ve been applying and getting nowhere. The applications go in, nothing comes back. The problem is usually positioning and distribution — both fixable.',
  },
  {
    title: 'Career changers',
    body: 'You want to move industries, change functions, or shift from big company to startup (or vice versa). The experience translates — it just needs to be framed right.',
  },
  {
    title: 'Returning professionals',
    body: 'You\'re coming back after a gap — parental leave, health, caregiving, a failed venture. Gaps are addressable. We help you frame them and move past them.',
  },
  {
    title: 'Non-traditional backgrounds',
    body: 'No degree, non-linear path, self-taught, trade background. More employers than you think are open to this — you just have to find them and position yourself correctly.',
  },
  {
    title: 'Anyone who\'s been applying alone',
    body: 'Job searching is a skill. Most people do it in isolation with outdated tactics. Having a professional in your corner changes the result.',
  },
]

export default function HowItWorks() {
  useEffect(() => { document.title = 'How It Works | Harbor' }, [])
  const processRef = useFadeIn()
  const whoRef = useFadeIn()
  const ctaRef = useFadeIn()

  return (
    <div style={{ backgroundColor: bg, paddingTop: '64px' }}>

      {/* HERO */}
      <section style={{ padding: '6rem 2rem 5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.75rem)', fontWeight: 800, color: '#ffffff', margin: '0 0 1.25rem', letterSpacing: '-0.035em', lineHeight: 1.08 }}>
            How Harbor works.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.05rem', lineHeight: 1.75, margin: 0, maxWidth: '560px' }}>
            From first contact to signed offer. We run the process — you stay focused on showing up well.
          </p>
        </div>
      </section>

      {/* FULL PROCESS */}
      <section style={{ padding: '7rem 2rem' }}>
        <div ref={processRef} style={{ maxWidth: '860px', margin: '0 auto', opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          {fullProcess.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: '2rem', marginBottom: i < fullProcess.length - 1 ? '3rem' : 0 }}>
              <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  border: '1px solid rgba(79,142,247,0.4)', backgroundColor: 'rgba(79,142,247,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: 700, color: '#4f8ef7', letterSpacing: '0.05em',
                }}>
                  {step.num}
                </div>
                {i < fullProcess.length - 1 && <div style={{ width: '1px', flex: 1, minHeight: '40px', backgroundColor: 'rgba(79,142,247,0.12)', marginTop: '10px' }} />}
              </div>
              <div style={{ paddingBottom: i < fullProcess.length - 1 ? '1rem' : 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff', margin: 0, letterSpacing: '-0.01em' }}>{step.title}</h3>
                  <span style={{ fontSize: '11px', color: 'rgba(79,142,247,0.6)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{step.time}</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.8, margin: '0 0 0.75rem' }}>{step.body}</p>
                <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '12px', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section style={{ padding: '7rem 2rem', backgroundColor: surface }}>
        <div ref={whoRef} style={{ maxWidth: '1100px', margin: '0 auto', opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          <div style={{ marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#ffffff', margin: '0 0 0.75rem', letterSpacing: '-0.03em' }}>
              Who Harbor is for.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '500px', margin: 0 }}>
              We work with people at all stages of the career journey — not just the ones who are already competitive.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
            {whoFor.map((item, i) => (
              <div key={i} style={{ backgroundColor: surface, padding: '2rem 1.75rem', transition: 'background-color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#142240' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = surface }}
              >
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', margin: '0 0 0.75rem', letterSpacing: '-0.01em' }}>{item.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', lineHeight: 1.75, margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '7rem 2rem', backgroundColor: '#4f8ef7' }}>
        <div ref={ctaRef} style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 800, color: '#ffffff', margin: '0 0 1rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Ready to start?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 2rem' }}>
            See our services and choose the level of support that fits your situation.
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
            See Services & Pricing →
          </Link>
        </div>
      </section>

    </div>
  )
}
