export default function Scores({ human_score, readability_score, style_score }: { human_score: number; readability_score: number; style_score: number }) {
  const badge = (label: string, value: number) => (
    <div className="flex-1 text-center">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-xl font-semibold">{value}%</div>
    </div>
  )
  return (
    <div className="flex gap-4">
      {badge('Human Score', human_score)}
      {badge('Readability', readability_score)}
      {badge('Style', style_score)}
    </div>
  )
}
