import _Layout from '../components/_Layout';
import { CurrentUserProvider } from '../providers/CurrentUserProvider';
import { ThemeProvider } from '../providers/ThemeProvider';
import type { AppProps } from "next/app";
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <CurrentUserProvider>
        <_Layout>
          <Component {...pageProps} />
        </_Layout>
      </CurrentUserProvider>
    </ThemeProvider>
  );
}

export default MyApp;
