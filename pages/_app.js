import { Lato } from 'next/font/google'
import Head from 'next/head'
import { isBrowser } from '@unly/utils'
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.sass'

const lato = Lato({
  weight: ['100', '400', '700', '900'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }) {
  if (isBrowser()) {
    const WebFontLoader = require('webfontloader');
    WebFontLoader.load({
      google: {
        families: ['Noto Sans KR:100,400,700,900']
      }
    })
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <>
        <style jsx global>{`
            body, pre, input, button, textarea, select, legend {
              font-family: ${lato.style.fontFamily}, 'Noto Sans KR', -apple-system, BlinkMacSystemFont, system-ui, 'Apple SD Gothic Neo', 'Nanum Gothic', 'Malgun Gothic', sans-serif
            }
            ::-webkit-scrollbar {
              width: 0.625rem;
              height: 0.625rem
            }
            ::-webkit-scrollbar-track-piece {
              background-color: #F2F2F2
            }
            ::-webkit-scrollbar-thumb {
              border-radius: 0.3125rem;
              background-color: #485CC1
            }
          `}</style>
        <Component
          {...pageProps}
        />
      </>
    </>
  )
}
