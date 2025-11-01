import { useEffect, useRef } from 'react'

export default function ProcessingAd() {
  const insRef = useRef<HTMLModElement>(null)

  useEffect(() => {
    const el = insRef.current as any
    if (!el) return
    const alreadyInit = el.getAttribute && el.getAttribute('data-adsbygoogle-status')
    if (alreadyInit) return
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [])

  if (!process.env.NEXT_PUBLIC_ADSENSE_CLIENT) return null

  return (
    <div className="rounded-md border bg-white/70 dark:bg-gray-900/70 p-2 mt-3">
      <div className="text-xs text-gray-500 mb-1">Sponsored</div>
      <ins
        ref={insRef as any}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
        data-ad-slot="6145065549"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
