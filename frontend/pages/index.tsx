import { useState } from 'react'
import SEO from '../components/SEO/SEO'
import TextAreaWithTabs from '../components/UI/TextAreaWithTabs'
import CTAButton from '../components/UI/CTAButton'
import ResultCard from '../components/UI/ResultCard'
import AdBanner from '../components/UI/AdBanner'
import { apiHumanize, apiScore, ScoreResponse } from '../utils/api'
import ProcessingAd from '../components/ads/ProcessingAd'

export default function Home() {
  const [active, setActive] = useState<'humanizer'|'scorer'>('humanizer')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [scores, setScores] = useState<ScoreResponse | undefined>()
  const [loading, setLoading] = useState(false)

  async function run() {
    setLoading(true)
    try {
      if (active === 'humanizer') {
        const res = await apiHumanize(input)
        const humanized = res.humanized_text || ''
        setOutput(humanized)
        const scored = await apiScore(humanized, { humanized: true })
        setScores(scored)
      } else {
        const scored = await apiScore(input)
        setOutput('')
        setScores(scored)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO title="AI Humanizer & Text Scorer — Make AI Text Sound Human" />
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">AI Humanizer & Text Scorer</h1>
        <p className="text-gray-600 dark:text-gray-400">Paste text, humanize it, and see score instantly.</p>
        <TextAreaWithTabs value={input} onChange={setInput} active={active} onTab={setActive} />
        <p className="text-xs text-gray-500 dark:text-gray-400">AI humanizer and detector are not always accurate. If the result doesn't suit you, try rephrasing manually.</p>
        <div className="flex gap-3">
          <CTAButton onClick={run} disabled={loading || !input}>{loading ? 'Processing...' : (active==='humanizer' ? 'Humanize Text' : 'Score Text')}</CTAButton>
          {output && <button className="btn" onClick={() => navigator.clipboard.writeText(output)}>Copy</button>}
          {output && <a className="btn" href={`data:text/plain;charset=utf-8,${encodeURIComponent(output)}`} download="humanized.txt">Download</a>}
        </div>
        {loading && <ProcessingAd />}
        <ResultCard text={output} scores={scores as any} />
        <AdBanner />
      </section>
    </>
  )
}
