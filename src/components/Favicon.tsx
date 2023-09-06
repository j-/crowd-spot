'use client';

import { useAppController } from '@/use-app-controller';
import Head from 'next/head';
import { FC, useMemo } from 'react';
import ReactDomServer from 'react-dom/server';
import { IconColors } from './IconColors';

export const Favicon: FC = () => {
  const { appColor1, appColor2, numColors } = useAppController();

  const staticMarkup = useMemo(() => (
    ReactDomServer.renderToStaticMarkup(
      <IconColors
        color1={appColor1}
        color2={numColors === 1 ? null : appColor2}
      />
    )
  ), [appColor1, appColor2, numColors]);

  const dataURL = (
    'data:image/svg+xml;base64,' +
    Buffer.from(staticMarkup).toString('base64')
  );

  return (
    <Head>
      <link rel="icon favicon" href={dataURL} />
    </Head>
  );
};
