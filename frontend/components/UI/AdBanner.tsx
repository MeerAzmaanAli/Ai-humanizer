import { useEffect, useRef } from 'react'

export default function AdBanner() {
  const insRef = useRef<HTMLModElement>(null)
  const didInit = useRef(false)
  useEffect(() => {
    const el = insRef.current as any
    if (!el) return
    // Google sets data-adsbygoogle-status on initialized slots
    const alreadyInit = el.getAttribute && el.getAttribute('data-adsbygoogle-status')
    if (alreadyInit || didInit.current) return
    const slot = el.getAttribute && el.getAttribute('data-ad-slot')
    // @ts-ignore
    const g = (globalThis as any)
    g.__ads_inited_slots = g.__ads_inited_slots || new Set()
    if (slot && g.__ads_inited_slots.has(slot)) return
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      didInit.current = true
      if (slot) g.__ads_inited_slots.add(slot)
    } catch {}
  }, [])

  if (!process.env.NEXT_PUBLIC_ADSENSE_CLIENT) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t bg-white/90 dark:bg-gray-900/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-2 py-1 flex items-center justify-center" style={{ minHeight: 50 }}>
        <ins
          ref={insRef as any}
          className="adsbygoogle"
          style={{ display: 'inline-block', width: '100%', height: 60, maxHeight: 60 }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
          data-ad-slot="3518902208"
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  )
}
