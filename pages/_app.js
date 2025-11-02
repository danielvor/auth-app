// pages/_app.js
import { SessionProvider } from 'next-auth/react'
import Header from '../components/Header'
import '../styles/global.css'

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <div className="container">
        <Header />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}