import _Layout from "../components/_Layout";
import { CurrentUserProvider } from "../hooks/useCurrentUser";
import { ThemeProvider } from "../hooks/useTheme";
import type { AppProps } from "next/app";
import "../styles/globals.css";

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
