import type { NextApiRequest, NextApiResponse } from 'next'
import { keywordPages } from '../utils/seo'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

function generateSiteMap() {
  const urls = [
    '/',
    ...keywordPages.map(k => k.path),
    '/blog/example-post'
  ]
  const body = urls
    .map(u => `<url><loc>${SITE}${u}</loc></url>`)
    .join('')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const xml = generateSiteMap()
  res.setHeader('Content-Type', 'application/xml')
  res.write(xml)
  res.end()
}
