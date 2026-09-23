// Landmark photos (Unsplash licence, free use). The mockup's picks, kept only after checking the
// subject visually. A landmark without a checked photo falls back to its top hotel's listing photo.
const U = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`

export const LANDMARK_PHOTO: Record<string, string> = {
  'eiffel-tower': U('1502602898657-3e91760cbb34'),
  'sacre-coeur': U('1550340499-a6c60fc8287c'),
  seine: U('1499856871958-5b9627545d1a'),
  'arc-de-triomphe': U('1509439581779-6298f75bf6e5'),
  'notre-dame': U('1478391679764-b2d8b3cd1e94'),
}
export const CITY_PHOTO = U('1502602898657-3e91760cbb34', 2000)
export const HOME_PHOTO = U('1511739001486-6bfe10ce785f', 1200)
export const SOON = [
  { photo: U('1534270804882-6b5048b1c1fc', 900), landmark: 'Central Park', city: 'New York' },
  { photo: U('1552832230-c0197dd311b5', 900), landmark: 'Colosseum', city: 'Rome' },
  { photo: U('1513635269975-59663e0ac1ad', 900), landmark: 'Tower Bridge', city: 'London' },
]
