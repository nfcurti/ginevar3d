import '@/styles/globals.css'
import '@/styles/Home.module.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return <>
  <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
  </Head>
  <Component {...pageProps} />
</>
}
