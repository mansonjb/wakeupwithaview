// Shared Apify helper. Token read from staysinnambia/.env.local (never written here).
import { readFile } from 'node:fs/promises'
const ENV = new URL('../../staysinnambia/.env.local', import.meta.url)
export async function token() {
  if (process.env.APIFY_TOKEN) return process.env.APIFY_TOKEN.trim()
  const m = (await readFile(ENV, 'utf-8')).match(/APIFY_TOKEN=(.+)/)
  return m[1].trim().replace(/^["']|["']$/g, '')
}
export async function runActor(actor, input) {
  const t = await token()
  const res = await fetch(`https://api.apify.com/v2/acts/${actor}/run-sync-get-dataset-items?token=${t}`, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error(`Apify ${res.status}: ${(await res.text()).slice(0, 300)}`)
  return res.json()
}
