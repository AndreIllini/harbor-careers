/**
 * api.ts — Typed API client for the Harbor Careers backend
 *
 * Base URL is read from the VITE_API_URL env variable at build time.
 * Falls back to http://localhost:8000 for local development.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ResumeParseResult {
  candidate_id: string
  profile: {
    name: string
    email: string | null
    current_title: string | null
    current_employer: string | null
    years_experience: number
    career_level: string
    industries: string[]
    skills: string[]
    education: string[]
    achievements: string[]
    summary: string
  }
  score: {
    total: number
    tier: string // STRONG | READY | DEVELOPING | NEEDS_WORK
    breakdown: Record<string, number>
    strengths: string[]
    gaps: string[]
    recommended_service: string
  }
  parse_notes: string | null
  errors: string[]
}

export interface IntakeData {
  name: string
  email: string
  situation: string
  target: string
  level?: string
  timeline?: string
  message?: string
}

// ---------------------------------------------------------------------------
// Client
// ---------------------------------------------------------------------------

export const api = {
  /**
   * POST /resume/parse
   * Uploads a resume file (PDF) as multipart form data along with optional
   * context fields. Returns a structured parse result with a score breakdown.
   */
  parseResume: async (
    file: File,
    extras?: { situation?: string; target?: string; level?: string },
  ): Promise<ResumeParseResult> => {
    const form = new FormData()
    form.append('file', file)
    if (extras?.situation) form.append('situation', extras.situation)
    if (extras?.target) form.append('target', extras.target)
    if (extras?.level) form.append('level', extras.level)

    const res = await fetch(`${BASE_URL}/resume/parse`, {
      method: 'POST',
      body: form,
    })

    if (!res.ok) {
      const text = await res.text().catch(() => res.statusText)
      throw new Error(`Resume parse failed (${res.status}): ${text}`)
    }

    return res.json() as Promise<ResumeParseResult>
  },

  /**
   * POST /intake
   * Submits the contact / intake form. Returns a confirmation with a ticket ID.
   */
  submitIntake: async (
    data: IntakeData,
  ): Promise<{ received: boolean; ticket_id: string }> => {
    const res = await fetch(`${BASE_URL}/intake`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => res.statusText)
      throw new Error(`Intake submission failed (${res.status}): ${text}`)
    }

    return res.json() as Promise<{ received: boolean; ticket_id: string }>
  },

  /**
   * GET /health
   * Lightweight liveness check for the backend.
   */
  healthCheck: async (): Promise<{ status: string }> => {
    const res = await fetch(`${BASE_URL}/health`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    })

    if (!res.ok) {
      throw new Error(`Health check failed (${res.status})`)
    }

    return res.json() as Promise<{ status: string }>
  },
}
