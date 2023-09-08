import { AppStateProvider } from '@/components/AppStateProvider';
import '@/globals.css';
import type { AppType } from 'next/app';
import Head from 'next/head';

const App: AppType = ({ Component, pageProps }) => {
  return (
    <AppStateProvider>
      <Head>
        <title>Crowd Spot</title>
      </Head>
      <Component {...pageProps} />
    </AppStateProvider>
  );
};

export default App;
