import type { Meta } from '@storybook/react';

import FullscreenReal, { FullscreenRealHandle } from './FullscreenReal';
import { useRef } from 'react';

const meta: Meta<typeof FullscreenReal> = {
  component: FullscreenReal,
};

export default meta;

export const Primary = () => {
  const fullscreenRealElement = useRef<FullscreenRealHandle>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          fullscreenRealElement.current?.show();
        }}
      >
        Show fullscreen
      </button>
      <FullscreenReal ref={fullscreenRealElement}>
        <div style={{ height: '100%', backgroundColor: 'hsl(100, 80%, 80%)' }}>
          <button
            type="button"
            onClick={() => {
              fullscreenRealElement.current?.hide();
            }}
          >
            Hide fullscreen
          </button>
        </div>
      </FullscreenReal>
    </>
  );
};
