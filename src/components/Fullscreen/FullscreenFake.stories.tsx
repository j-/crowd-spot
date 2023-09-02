import type { Meta } from '@storybook/react';

import FullscreenFake, { FullscreenFakeHandle } from './FullscreenFake';
import { useRef } from 'react';

const meta: Meta<typeof FullscreenFake> = {
  component: FullscreenFake,
};

export default meta;

export const Primary = () => {
  const fullscreenFakeElement = useRef<FullscreenFakeHandle>(null);

  return (
    <>
      <button
        className="btn"
        type="button"
        onClick={() => {
          fullscreenFakeElement.current?.show();
        }}
      >
        Show fullscreen
      </button>
      <FullscreenFake ref={fullscreenFakeElement}>
        <div style={{ height: '100%', backgroundColor: 'hsl(200, 80%, 80%)' }}>
          <button
            className="btn m-4"
            type="button"
            onClick={() => {
              fullscreenFakeElement.current?.hide();
            }}
          >
            Hide fullscreen
          </button>
        </div>
      </FullscreenFake>
    </>
  );
};
