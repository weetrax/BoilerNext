import Footer from "./Footer";
import Navbar from "./Navbar";
import NextNprogress from "nextjs-progressbar";
import React from "react";
import { Toaster } from "react-hot-toast";
import { useTheme } from "../../hooks/useTheme";

type _LayoutProps = {
  children: React.ReactNode;
};

const _Layout: React.FC<_LayoutProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={theme}>
      <Toaster position="top-center" reverseOrder={false} />
      <NextNprogress
        color="#fca311"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        options={{ showSpinner: false }}
        showOnShallow={true}
      />
      <div
        className={
          "flex flex-col min-h-screen bg-gray-50 dark:bg-dark-500 text-black dark:text-white font-body"
        }
      >
        <header>
          <Navbar />
        </header>
        <main className="flex-1">{children}</main>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default _Layout;
