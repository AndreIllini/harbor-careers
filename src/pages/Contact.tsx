import { useEffect, useRef, useState } from 'react'

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

interface FormState {
  name: string
  email: string
  situation: string
  target: string
  message: string
}

export default function Contact() {
  useEffect(() => { document.title = 'Contact | Harbor' }, [])
  const formRef = useFadeIn()

  const [form, setForm] = useState<FormState>({ name: '', email: '', situation: '', target: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('https://formspree.io/f/hello@harborcareers.com', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) { setSubmitted(true) }
      else { setError('Something went wrong. Email us directly at hello@harborcareers.com') }
    } catch {
      setError('Unable to send. Email us at hello@harborcareers.com')
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '12px 14px',
    backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '6px', color: '#ffffff', fontSize: '14px',
    outline: 'none', transition: 'border-color 0.15s',
    boxSizing: 'border-box' as const,
    fontFamily: "'Inter', sans-serif",
  }

  const labelStyle = {
    display: 'block', fontSize: '12px', fontWeight: 600,
    color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em',
    textTransform: 'uppercase' as const, marginBottom: '0.5rem',
  }

  return (
    <div style={{ backgroundColor: bg, paddingTop: '64px' }}>
      <section style={{ padding: '6rem 2rem 8rem' }}>
        <div ref={formRef} style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '5rem', alignItems: 'start', opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>

          {/* Left */}
          <div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#ffffff', margin: '0 0 1.25rem', letterSpacing: '-0.035em', lineHeight: 1.1 }}>
              Let's talk.
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 2.5rem' }}>
              Tell us where you are and what you're trying to do. We'll respond within 24 hours with an honest assessment and a recommendation.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Email</div>
                <a href="mailto:hello@harborcareers.com" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', textDecoration: 'none' }}>hello@harborcareers.com</a>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Response time</div>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Within 24 hours on business days</span>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>What to include</div>
                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', lineHeight: 1.7, display: 'block' }}>Your current situation, what you're targeting, and your resume if you have it ready. We'll work with whatever you have.</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{ backgroundColor: surface, border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '2.5rem' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✓</div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', margin: '0 0 0.75rem' }}>Got it — we'll be in touch.</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>Expect a response within 24 hours with an honest read on your situation and a clear recommendation.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={labelStyle}>Your name</label>
                    <input style={inputStyle} type="text" required placeholder="Full name" value={form.name} onChange={set('name')}
                      onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = '#4f8ef7' }}
                      onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)' }} />
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input style={inputStyle} type="email" required placeholder="you@email.com" value={form.email} onChange={set('email')}
                      onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = '#4f8ef7' }}
                      onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={labelStyle}>Current situation</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.situation} onChange={set('situation')} required>
                    <option value="" style={{ backgroundColor: '#0a1628' }}>Select one</option>
                    <option value="unemployed" style={{ backgroundColor: '#0a1628' }}>Currently unemployed</option>
                    <option value="underemployed" style={{ backgroundColor: '#0a1628' }}>Employed but underemployed / wrong role</option>
                    <option value="changing" style={{ backgroundColor: '#0a1628' }}>Looking to change industries or function</option>
                    <option value="returning" style={{ backgroundColor: '#0a1628' }}>Returning after a gap</option>
                    <option value="exploring" style={{ backgroundColor: '#0a1628' }}>Exploring options, not urgent</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={labelStyle}>What you're targeting</label>
                  <input style={inputStyle} type="text" placeholder="Job title, industry, company type..." value={form.target} onChange={set('target')}
                    onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = '#4f8ef7' }}
                    onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)' }} />
                </div>

                <div style={{ marginBottom: '1.75rem' }}>
                  <label style={labelStyle}>Anything else</label>
                  <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }} placeholder="Tell us more about your situation, timeline, or specific questions..." value={form.message} onChange={set('message')}
                    onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = '#4f8ef7' }}
                    onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)' }} />
                </div>

                {error && <p style={{ color: 'rgba(255,80,80,0.8)', fontSize: '13px', margin: '0 0 1rem' }}>{error}</p>}

                <button type="submit" disabled={submitting} style={{
                  width: '100%', padding: '13px 24px',
                  backgroundColor: submitting ? 'rgba(79,142,247,0.5)' : '#4f8ef7',
                  color: '#ffffff', border: 'none', borderRadius: '6px',
                  fontSize: '14px', fontWeight: 700, letterSpacing: '0.04em',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.15s',
                  fontFamily: "'Inter', sans-serif",
                }}>
                  {submitting ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
