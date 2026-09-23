'use client'

import { useEffect, useState } from 'react'

/**
 * Hero word that cycles through cities. The server renders the first one (Paris, the live city),
 * so the H1 in the HTML stays stable and true; the rotation is client-side only.
 */
export default function RotatingCity({ cities, interval = 2200 }: { cities: string[]; interval?: number }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setI((x) => (x + 1) % cities.length), interval)
    return () => clearInterval(id)
  }, [cities.length, interval])
  return (
    <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
      <span key={i} className="city-in inline-block text-peach">{cities[i]}</span>
    </span>
  )
}
