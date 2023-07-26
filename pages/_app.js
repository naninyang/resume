import { Lato } from 'next/font/google'
import Head from 'next/head'
import { isBrowser } from '@unly/utils'
import styled from '@emotion/styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.sass'
import { AuthProvider } from '@/components/hooks/authContext'
import { checkToken } from '@/components/hooks/checkToken'
import { Rem, hex, rgba } from '@/styles/designSystem';
import { useEffect } from 'react';

const lato = Lato({
  weight: ['100', '400', '700', '900'],
  subsets: ['latin'],
})

const ToastProvider = styled.div({
  '& .Toastify': {
    '& .Toastify__toast-container': {
      minWidth: Rem(320),
      width: 'auto',
      minHeight: Rem(78),
      '& .Toastify__toast': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: `${Rem(10)} ${Rem(15)}`,
        backgroundColor: hex.light,
        textAlign: 'center',
        borderRadius: Rem(10),
        '& .Toastify__toast-body': {
          margin: 0,
          padding: 0,
          position: 'relative',
          zIndex: 99999,
          '& div': {
            fontSize: Rem(16),
            lineHeight: '1.625',
            color: hex.dark,
          },
        },
        '& .Toastify__progress-bar': {
          height: '100%',
          backgroundColor: `rgba(${rgba.mint50})`,
        },
      },
    },
  },
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

  useEffect(() => {
    const tokenCheckInterval = setInterval(checkToken, 10000);
    return () => clearInterval(tokenCheckInterval);
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <AuthProvider>
        <style jsx global>{`
            body, pre, input, button, textarea, select, legend {
              font-family: ${lato.style.fontFamily}, 'Noto Sans KR', -apple-system, BlinkMacSystemFont, system-ui, 'Apple SD Gothic Neo', 'Nanum Gothic', 'Malgun Gothic', sans-serif
            }
          `}</style>
        <Component
          {...pageProps}
        />
        <ToastProvider>
          <ToastContainer
            icon={false}
            closeButton={false}
          />
        </ToastProvider>
      </AuthProvider>
    </>
  )
}
