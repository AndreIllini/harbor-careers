/**
 * ResumeCheck.tsx — Free resume analysis page (/resume-check)
 *
 * Lead-magnet entry point. Accepts a PDF upload (max 5 MB), sends it to
 * POST /resume/parse, and renders a scored results panel.
 *
 * Sections:
 *   1. Hero — headline + short description
 *   2. Upload area — drag-and-drop or click, file name preview, Analyze button
 *   3. Loading state — animated step cycling
 *   4. Results panel — score, tier badge, breakdown bars, strengths, gaps, CTA
 *   5. Error state — friendly message
 *
 * State: file, loading, result, error — all plain useState, no external lib.
 * Styling: all inline, matches Harbor design system (bg #0a1628, surface
 * #0f1f38, accent #4f8ef7).
 */

import { useEffect, useRef, useState } from 'react'
import type { DragEvent, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import type { ResumeParseResult } from '../lib/api'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const bg = '#0a1628'
const surface = '#0f1f38'
const accent = '#4f8ef7'

const LOADING_STEPS = [
  'Extracting text...',
  'Analyzing experience...',
  'Scoring profile...',
]

const MAX_FILE_BYTES = 5 * 1024 * 1024 // 5 MB

const TIER_META: Record<string, { label: string; color: string; bg: string }> = {
  STRONG: { label: 'Strong', color: '#34d399', bg: 'rgba(52,211,153,0.12)' },
  READY: { label: 'Ready', color: '#60a5fa', bg: 'rgba(96,165,250,0.12)' },
  DEVELOPING: { label: 'Developing', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
  NEEDS_WORK: { label: 'Needs Work', color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function tierMeta(tier: string) {
  return TIER_META[tier] ?? { label: tier, color: 'rgba(255,255,255,0.6)', bg: 'rgba(255,255,255,0.06)' }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ResumeCheck() {
  useEffect(() => { document.title = 'Free Resume Check | Harbor' }, [])

  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const [result, setResult] = useState<ResumeParseResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const stepInterval = useRef<ReturnType<typeof setInterval> | null>(null)

  // Cycle through loading steps every 2 s while loading
  useEffect(() => {
    if (loading) {
      setStepIndex(0)
      stepInterval.current = setInterval(() => {
        setStepIndex(i => (i + 1) % LOADING_STEPS.length)
      }, 2000)
    } else {
      if (stepInterval.current) clearInterval(stepInterval.current)
    }
    return () => { if (stepInterval.current) clearInterval(stepInterval.current) }
  }, [loading])

  // -------------------------------------------------------------------------
  // File handling
  // -------------------------------------------------------------------------

  function acceptFile(f: File | undefined | null) {
    if (!f) return
    if (f.type !== 'application/pdf') { setError('Please upload a PDF file.'); return }
    if (f.size > MAX_FILE_BYTES) { setError('File is too large. Maximum size is 5 MB.'); return }
    setError(null)
    setResult(null)
    setFile(f)
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    acceptFile(e.target.files?.[0])
  }

  function onDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragging(true)
  }

  function onDragLeave() {
    setDragging(false)
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragging(false)
    acceptFile(e.dataTransfer.files?.[0])
  }

  // -------------------------------------------------------------------------
  // Analysis
  // -------------------------------------------------------------------------

  async function handleAnalyze() {
    if (!file) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await api.parseResume(file)
      setResult(res)
    } catch (err) {
      setError(
        err instanceof Error
          ? `Analysis failed: ${err.message}`
          : 'Something went wrong. Please try again or email us at hello@harborcareers.com.',
      )
    } finally {
      setLoading(false)
    }
  }

  // -------------------------------------------------------------------------
  // Render helpers
  // -------------------------------------------------------------------------

  const tier = result ? tierMeta(result.score.tier) : null

  const breakdownEntries = result
    ? Object.entries(result.score.breakdown)
    : []

  const maxBreakdown = breakdownEntries.reduce((m, [, v]) => Math.max(m, v), 0) || 1

  // -------------------------------------------------------------------------
  // Styles
  // -------------------------------------------------------------------------

  const sectionPad: React.CSSProperties = { padding: '6rem 2rem', maxWidth: '760px', margin: '0 auto' }

  const surfaceCard: React.CSSProperties = {
    backgroundColor: surface,
    border: `1px solid rgba(255,255,255,0.07)`,
    borderRadius: '12px',
    padding: '2.5rem',
  }

  const dropZoneStyle: React.CSSProperties = {
    border: `2px dashed ${dragging ? accent : 'rgba(255,255,255,0.15)'}`,
    borderRadius: '10px',
    padding: '2.5rem 2rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'border-color 0.2s, background-color 0.2s',
    backgroundColor: dragging ? 'rgba(79,142,247,0.05)' : 'transparent',
  }

  const btnPrimary: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    padding: '12px 28px',
    backgroundColor: accent, color: '#ffffff',
    border: 'none', borderRadius: '6px',
    fontSize: '14px', fontWeight: 700, letterSpacing: '0.04em',
    cursor: 'pointer', transition: 'background-color 0.15s',
    fontFamily: "'Inter', sans-serif",
  }

  const btnDisabled: React.CSSProperties = {
    ...btnPrimary,
    backgroundColor: 'rgba(79,142,247,0.35)',
    cursor: 'not-allowed',
  }

  // -------------------------------------------------------------------------
  // JSX
  // -------------------------------------------------------------------------

  return (
    <div style={{ backgroundColor: bg, paddingTop: '64px' }}>

      {/* HERO */}
      <section style={{ padding: '6rem 2rem 4rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            marginBottom: '1.75rem', padding: '5px 14px',
            border: '1px solid rgba(79,142,247,0.25)', borderRadius: '100px',
            backgroundColor: 'rgba(79,142,247,0.06)',
          }}>
            <span style={{ color: accent, fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em' }}>
              Free · No login required
            </span>
          </div>
          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800,
            color: '#ffffff', margin: '0 0 1.25rem',
            letterSpacing: '-0.035em', lineHeight: 1.08,
          }}>
            See how your resume<br />
            <span style={{ color: 'rgba(255,255,255,0.38)' }}>stacks up.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', lineHeight: 1.75, margin: 0, maxWidth: '540px' }}>
            Upload your resume and get an instant score across five dimensions — no sign-up, no
            upsell. Free in 60 seconds.
          </p>
        </div>
      </section>

      {/* UPLOAD */}
      {!result && !loading && (
        <section style={{ ...sectionPad, paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div style={surfaceCard}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', margin: '0 0 1.5rem' }}>
              Upload your resume
            </h2>

            {/* Drop zone */}
            <div
              style={dropZoneStyle}
              onClick={() => inputRef.current?.click()}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf"
                style={{ display: 'none' }}
                onChange={onInputChange}
              />
              <div style={{ marginBottom: '0.75rem' }}>
                {/* Upload icon */}
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto' }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              {file ? (
                <div>
                  <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600 }}>{file.name}</span>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', marginLeft: '0.5rem' }}>
                    ({(file.size / 1024).toFixed(0)} KB)
                  </span>
                </div>
              ) : (
                <>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: '0 0 0.25rem' }}>
                    Drag and drop your PDF here, or <span style={{ color: accent }}>click to browse</span>
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px', margin: 0 }}>PDF only · Max 5 MB</p>
                </>
              )}
            </div>

            {error && (
              <p style={{ color: 'rgba(255,100,100,0.85)', fontSize: '13px', margin: '1rem 0 0' }}>{error}</p>
            )}

            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              <button
                style={file ? btnPrimary : btnDisabled}
                disabled={!file}
                onClick={handleAnalyze}
                onMouseEnter={e => { if (file) (e.currentTarget as HTMLElement).style.backgroundColor = '#3a7ae8' }}
                onMouseLeave={e => { if (file) (e.currentTarget as HTMLElement).style.backgroundColor = accent }}
              >
                Analyze Resume →
              </button>
              {file && (
                <button
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: '13px', cursor: 'pointer', padding: 0, fontFamily: "'Inter', sans-serif" }}
                  onClick={() => { setFile(null); setError(null) }}
                >
                  Remove
                </button>
              )}
            </div>

            <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: '12px', marginTop: '1.25rem', lineHeight: 1.65 }}>
              We use this only to provide your score. We don't store your resume without permission.
            </p>
          </div>
        </section>
      )}

      {/* LOADING */}
      {loading && (
        <section style={{ ...sectionPad, paddingTop: '5rem', paddingBottom: '5rem', textAlign: 'center' }}>
          {/* Spinner ring */}
          <div style={{ margin: '0 auto 2rem', width: '52px', height: '52px', position: 'relative' }}>
            <style>{`
              @keyframes harbor-spin { to { transform: rotate(360deg); } }
              .harbor-spinner { animation: harbor-spin 0.9s linear infinite; }
            `}</style>
            <svg className="harbor-spinner" width="52" height="52" viewBox="0 0 52 52" fill="none">
              <circle cx="26" cy="26" r="22" stroke="rgba(79,142,247,0.15)" strokeWidth="4" />
              <path d="M26 4 A22 22 0 0 1 48 26" stroke={accent} strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
          <p style={{ color: '#ffffff', fontSize: '16px', fontWeight: 600, margin: '0 0 0.5rem' }}>
            {LOADING_STEPS[stepIndex]}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', margin: 0 }}>This takes about 15–30 seconds.</p>
        </section>
      )}

      {/* RESULTS */}
      {result && !loading && (
        <section style={{ ...sectionPad, paddingTop: '4rem', paddingBottom: '6rem' }}>

          {/* Score header */}
          <div style={{ ...surfaceCard, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontSize: '4rem', fontWeight: 800, color: '#ffffff', lineHeight: 1, letterSpacing: '-0.04em' }}>
                {result.score.total}
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '4px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>/ 100</div>
            </div>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '4px 12px', borderRadius: '100px',
                backgroundColor: tier?.bg, marginBottom: '0.5rem',
              }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: tier?.color, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {tier?.label}
                </span>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff', marginBottom: '0.25rem' }}>
                {result.profile.name || 'Your Profile'}
              </div>
              {result.profile.current_title && (
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>
                  {result.profile.current_title}
                  {result.profile.current_employer ? ` · ${result.profile.current_employer}` : ''}
                </div>
              )}
            </div>
          </div>

          {/* Score breakdown */}
          {breakdownEntries.length > 0 && (
            <div style={{ ...surfaceCard, marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 1.25rem' }}>
                Score Breakdown
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {breakdownEntries.map(([dim, val]) => (
                  <div key={dim}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', textTransform: 'capitalize' }}>
                        {dim.replace(/_/g, ' ')}
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>{val}</span>
                    </div>
                    <div style={{ height: '4px', backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: '2px',
                        backgroundColor: accent,
                        width: `${(val / maxBreakdown) * 100}%`,
                        transition: 'width 0.6s ease',
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strengths & Gaps */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            {result.score.strengths.length > 0 && (
              <div style={surfaceCard}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 1rem' }}>
                  Strengths
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {result.score.strengths.map((s, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#34d399', fontSize: '13px', flexShrink: 0, marginTop: '1px' }}>✓</span>
                      <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: 1.55 }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {result.score.gaps.length > 0 && (
              <div style={surfaceCard}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 1rem' }}>
                  Gaps
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {result.score.gaps.map((g, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#fbbf24', fontSize: '8px', flexShrink: 0, marginTop: '5px' }}>●</span>
                      <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: 1.55 }}>{g}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Recommended service CTA */}
          {result.score.recommended_service && (
            <div style={{
              ...surfaceCard,
              borderLeft: `3px solid ${accent}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: '1.5rem', flexWrap: 'wrap',
            }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Recommended for you
                </div>
                <p style={{ color: '#ffffff', fontSize: '15px', fontWeight: 600, margin: '0 0 0.25rem' }}>
                  {result.score.recommended_service}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', margin: 0 }}>
                  Based on your profile and score.
                </p>
              </div>
              <Link to="/services" style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '10px 22px', backgroundColor: accent, color: '#ffffff',
                fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em',
                textDecoration: 'none', borderRadius: '6px',
                transition: 'background-color 0.15s', flexShrink: 0,
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#3a7ae8' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = accent }}
              >
                See Services →
              </Link>
            </div>
          )}

          {/* Parse notes / errors */}
          {(result.parse_notes || result.errors.length > 0) && (
            <div style={{ marginTop: '1.25rem', padding: '1rem 1.25rem', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
              {result.parse_notes && (
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', margin: result.errors.length ? '0 0 0.5rem' : '0', lineHeight: 1.6 }}>
                  Note: {result.parse_notes}
                </p>
              )}
              {result.errors.map((err, i) => (
                <p key={i} style={{ color: 'rgba(255,100,100,0.6)', fontSize: '12px', margin: '0', lineHeight: 1.6 }}>{err}</p>
              ))}
            </div>
          )}

          {/* Try again */}
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', fontSize: '13px', cursor: 'pointer', padding: 0, fontFamily: "'Inter', sans-serif" }}
              onClick={() => { setResult(null); setFile(null); setError(null) }}
            >
              ← Analyze a different resume
            </button>
          </div>
        </section>
      )}

      {/* Error state (no result) */}
      {error && !loading && !result && (
        <section style={{ ...sectionPad, paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div style={{ ...surfaceCard, textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,100,100,0.85)', fontSize: '15px', fontWeight: 600, margin: '0 0 0.75rem' }}>
              Analysis failed
            </p>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', lineHeight: 1.7, margin: '0 0 1.5rem' }}>
              {error}
            </p>
            <button
              style={btnPrimary}
              onClick={() => { setError(null) }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#3a7ae8' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = accent }}
            >
              Try Again
            </button>
          </div>
        </section>
      )}

    </div>
  )
}
