import { AppStateProvider } from '@/components/AppStateProvider';
import '@/globals.css';
import type { AppType } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

const App: AppType = ({ Component, pageProps }) => {
  return (
    <AppStateProvider>
      <Head>
        <title>Crowd Spot</title>
      </Head>
      <Component {...pageProps} />
      <Script defer src="https://skeoh-umami.fly.dev/script.js" data-website-id="a5c13983-7415-4b75-be55-0ca0d5181134" />
    </AppStateProvider>
  );
};

export default App;
