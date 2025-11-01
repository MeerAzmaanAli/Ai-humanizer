import Scores from './Scores'

export default function ResultCard({ text, scores }: { text: string, scores?: { human_score: number; readability_score: number; style_score: number } }) {
  return (
    <div className="card p-4 space-y-4">
      <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">{text || 'Your humanized text will appear here.'}</div>
      {scores && scores.human_score != null && scores.readability_score != null && scores.style_score != null && (
        <Scores {...scores} />
      )}
    </div>
  )
}
