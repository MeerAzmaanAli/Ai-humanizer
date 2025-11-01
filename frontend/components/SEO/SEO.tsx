import Head from 'next/head'
import { useRouter } from 'next/router'
import { defaultMeta } from '../../utils/seo'

export default function SEO(meta?: Partial<typeof defaultMeta>) {
  const router = useRouter()
  const m = { ...defaultMeta, ...meta }
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`
  return (
    <Head>
      <title>{m.title}</title>
      <meta name="description" content={m.description} />
      <meta property="og:title" content={m.title} />
      <meta property="og:description" content={m.description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={url} />
    </Head>
  )
}
