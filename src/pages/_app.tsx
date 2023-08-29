import '@/globals.css';
import type { AppType } from 'next/app';
import Head from 'next/head';

const App: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Crowd Spot</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
