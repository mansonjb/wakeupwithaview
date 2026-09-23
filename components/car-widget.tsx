'use client'

import { useEffect, useRef } from 'react'

// GetRentacar.com search widget via Travelpayouts (same account as the sister sites:
// marker 730118, trs 530832, promo 8813, campaign 222). 10% reward, 90-day cookie.
// Injected after hydration so it never blocks the page.
const PARAMS = { campaign_id: '222', promo_id: '8813', shmarker: '730118', trs: '530832' }

export default function CarWidget({ locale }: { locale: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    node.innerHTML = ''
    const q = new URLSearchParams({ ...PARAMS, locale, currency: 'eur' })
    const s = document.createElement('script')
    s.async = true
    s.charset = 'utf-8'
    s.src = `https://tp.media/content?${q}`
    node.appendChild(s)
    return () => { node.innerHTML = '' }
  }, [locale])
  return <div ref={ref} className="min-h-[220px]" />
}
