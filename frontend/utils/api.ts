import { BACKEND_URL } from './constants'

export type ScoreResponse = {
  humanized_text?: string
  human_score?: number
  readability_score?: number
  style_score?: number
}

export async function apiHumanize(text: string) {
  const url = `${BACKEND_URL}/api/humanize`
  const debug = process.env.NEXT_PUBLIC_DEBUG_API === '1'
  const t0 = performance.now()
  if (debug) console.debug('[api] POST', url, 'len=', text.length)
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(debug ? { 'x-debug-client': '1' } : {}) },
    body: JSON.stringify({ text })
  })
  const ms = Math.round(performance.now() - t0)
  if (!res.ok) {
    if (debug) console.debug('[api] POST', url, 'status=', res.status, 'ms=', ms)
    throw new Error('Failed to humanize')
  }
  const apiLog = res.headers.get('X-API-Log') || ''
  const data = await res.json() as ScoreResponse
  if (debug) {
    if (apiLog) console.debug('[api][server]', apiLog)
    console.debug('[api] RESP', url, 'ms=', ms, 'keys=', Object.keys(data))
  }
  return data
}

export async function apiScore(text: string, opts?: { humanized?: boolean }) {
  const url = `${BACKEND_URL}/api/score`
  const debug = process.env.NEXT_PUBLIC_DEBUG_API === '1'
  const t0 = performance.now()
  if (debug) console.debug('[api] POST', url, 'len=', text.length)
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(opts?.humanized ? { 'x-humanized': '1' } : {}),
      ...(debug ? { 'x-debug-client': '1' } : {}),
    },
    body: JSON.stringify({ text })
  })
  const ms = Math.round(performance.now() - t0)
  if (!res.ok) {
    if (debug) console.debug('[api] POST', url, 'status=', res.status, 'ms=', ms)
    throw new Error('Failed to score')
  }
  const apiLog = res.headers.get('X-API-Log') || ''
  const raw = await res.json() as any
  if (debug) {
    if (apiLog) console.debug('[api][server]', apiLog)
    console.debug('[api] RESP', url, 'ms=', ms, 'keys=', Object.keys(raw))
  }
  let parsed: any = {}
  try {
    if (typeof raw?.scores === 'string') {
      let s = String(raw.scores).trim()
      if (s.startsWith('```')) {
        s = s.replace(/^```[a-zA-Z]*\n?/, '').replace(/```\s*$/, '').trim()
      }
      const match = s.match(/\{[\s\S]*\}/)
      if (match) s = match[0]
      parsed = JSON.parse(s)
    } else if (raw?.scores && typeof raw.scores === 'object') {
      parsed = raw.scores
    }
  } catch (e) {
    if (debug) console.debug('[api] parse scores failed:', e)
  }
  const normalized: ScoreResponse = {
    human_score: parsed?.human_score != null ? Number(parsed.human_score) : undefined,
    readability_score: parsed?.readability_score != null ? Number(parsed.readability_score) : undefined,
    style_score: parsed?.style_score != null ? Number(parsed.style_score) : undefined,
  }
  return normalized
}

