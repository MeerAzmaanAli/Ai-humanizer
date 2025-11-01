import type { AppProps } from 'next/app'
import Script from 'next/script'
import '../styles/globals.css'
import Layout from '../components/Layout/Layout'
import GA from '../components/Analytics/GA'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
        <Script
          id="adsense-script"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      )}
      <GA />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
