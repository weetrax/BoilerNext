import _Layout from '../components/_Layout';
import { ThemeProvider } from '../providers/ThemeProvider';
import type { AppProps } from 'next/app'
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <ThemeProvider>
    <_Layout>
      <Component {...pageProps} />
    </_Layout>
  </ThemeProvider>
}

export default MyApp
