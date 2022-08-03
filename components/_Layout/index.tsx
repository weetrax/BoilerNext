import Footer from './Footer';
import Navbar from './Navbar';
import NextNprogress from 'nextjs-progressbar';
import React from 'react';
import { Toaster } from 'react-hot-toast';

type _LayoutProps = {
  children: React.ReactNode;
};

const _Layout: React.FC<_LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-dark-500 text-white font-body ">
      <Navbar />
      <Toaster position="bottom-right" reverseOrder={false} />
      <NextNprogress
        color="#fca311"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        options={{ showSpinner: false }}
        showOnShallow={true}
      />
      <main className="flex-1" style={{ backgroundImage: "url('/assets/img/topography.svg')" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default _Layout;