import { useState } from 'react'

const tabs = [
  { key: 'humanizer', label: 'Humanizer' },
  { key: 'scorer', label: 'Text Scorer' }
] as const

type Props = {
  value: string
  onChange: (v: string) => void
  active: 'humanizer' | 'scorer'
  onTab: (k: 'humanizer' | 'scorer') => void
}

export default function TextAreaWithTabs({ value, onChange, active, onTab }: Props) {
  return (
    <div className="card p-4">
      <div className="flex gap-2 mb-3">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => onTab(t.key)}
            className={`px-3 py-1 rounded-md border text-sm ${active===t.key ? 'bg-brand text-white border-brand' : 'border-gray-300 dark:border-gray-700'}`}
          >{t.label}</button>
        ))}
      </div>
      <textarea
        className="w-full h-48 p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Paste your text here..."
      />
    </div>
  )
}
