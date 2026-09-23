'use client'

import { useEffect, useRef } from 'react'

export type MapPin = { n: number; lat: number; lng: number; name: string; view: boolean; href?: string }

/** Landmark + hotels. Green = view stated by the hotel, blue = nearby only (brief §33). */
export default function MapView({ center, label, pins, legend }: {
  center: { lat: number; lng: number }
  label: string
  pins: MapPin[]
  legend: { view: string; near: string }
}) {
  const el = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let map: import('leaflet').Map | undefined
    let cancelled = false
    import('leaflet').then((L) => {
      if (cancelled || !el.current) return
      map = L.map(el.current, { scrollWheelZoom: false, attributionControl: true })
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 19,
      }).addTo(map)
      const lm = L.marker([center.lat, center.lng], {
        icon: L.divIcon({ className: '', html: '<div class="pin-lm"></div>', iconSize: [22, 22], iconAnchor: [11, 11] }),
        zIndexOffset: 1000, title: label,
      }).addTo(map).bindTooltip(label)
      const pts: [number, number][] = [[center.lat, center.lng]]
      for (const p of pins) {
        const bg = p.view ? '#1FA463' : '#1A5CFF'
        const m = L.marker([p.lat, p.lng], {
          icon: L.divIcon({ className: '', html: `<div class="pin" style="background:${bg}">${p.n}</div>`, iconSize: [26, 26], iconAnchor: [13, 13] }),
          title: p.name,
        }).addTo(map)
        m.bindTooltip(`${p.n}. ${p.name}`)
        m.on('click', () => document.getElementById(`h-${p.n}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }))
        pts.push([p.lat, p.lng])
      }
      map.fitBounds(L.latLngBounds(pts), { padding: [30, 30], maxZoom: 16 })
      void lm
    })
    return () => { cancelled = true; map?.remove() }
  }, [center.lat, center.lng, label, pins])

  return (
    <div className="rounded-[20px] bg-paper p-2">
      <div ref={el} className="h-[360px] rounded-[14px] bg-[#E3E9F2] lg:h-[560px]" role="img" aria-label={label} />
      <div className="flex flex-wrap gap-4 px-2 pb-1.5 pt-3 text-[13px] font-semibold">
        <span><span className="text-ok">●</span> {legend.view}</span>
        <span><span className="text-sky">●</span> {legend.near}</span>
        <span><span className="text-sun">◆</span> {label}</span>
      </div>
    </div>
  )
}
