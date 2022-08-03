import _Layout from '../components/_Layout';
import '../styles/globals.css';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <_Layout>
    <Component {...pageProps} />
  </_Layout>
}

export default MyApp
