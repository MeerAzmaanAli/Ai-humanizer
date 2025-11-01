import Document, { Html, Head, Main, NextScript } from 'next/document'
import AdSense from '../components/Analytics/AdSense'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#0ea5e9" />
          <link rel="icon" href="/favicon.ico" />
          <AdSense />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
