export type MapPin = { n: number; lat: number; lng: number; name: string; view: boolean; href?: string }

/** Stay22 map centred on the landmark (affiliate map, live availability and prices). */
export default function MapView({ center, label }: {
  center: { lat: number; lng: number }
  label: string
  pins?: MapPin[]
  legend?: { view: string; near: string }
}) {
  const q = new URLSearchParams({
    aid: 'eijeanbaptistemanson',
    lat: String(center.lat),
    lng: String(center.lng),
    venue: label,
    maincolor: '1A5CFF',
    zoom: '15',
    campaign: 'map',
  })
  return (
    <div className="overflow-hidden rounded-2xl border border-black/5 bg-white">
      <iframe
        title={label}
        src={`https://www.stay22.com/embed/gm?${q}`}
        loading="lazy"
        className="block h-[560px] w-full border-0"
        allowFullScreen
      />
    </div>
  )
}
